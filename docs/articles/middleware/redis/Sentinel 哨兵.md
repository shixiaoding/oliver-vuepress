---
isTimeLine: true
sidebar: true
isComment: false
title: Sentinel 哨兵
date: 2022-4-20
tags:
- Redis
---

> `Sentinal(哨兵)`  是Redis的高可用解决方案：是由一个 或 多个 `Sentinal实例` 组成的 Sentinel 系统

- 一个哨兵哨兵实例，也可以保证服务，但是为了服务的健壮性，至少需要3个实例
- 哨兵 + Redis 主从的部署架构，是**不保证数据零丢失**的，只能保证 Redis 集群的高可用性。



**作用**

- 集群监控：负责监控 Redis master 和 slave 进程是否正常工作。

* 消息通知：如果某个 Redis 实例有故障，那么哨兵负责发送消息作为报警通知给管理员。
* 故障转移：如果 master node 挂掉了，会自动转移到 slave node 上。
* 配置中心：如果故障转移发生了，通知 client 客户端新的 master 地址。



<center><b>Sentinel案例图</b></center>

<img :src="$withBase('/middleware/redislearn/image-20220410103019964.png')" alt="foo">





## 启动 Sentinel

> `Redis-Sentinel`  是一台特殊的 Redis 服务器，支持的命令 和 普通的 Redis服务器不同
> 并且 无需持久化机制



**启动命令**

```C
redis-sentinel /path/to/your/sentinel.conf

// 或

redis-server /path/to/your/sentinel.conf --sentinel
```



**配置文件相关参数**

```shell
# 哨兵sentinel监控的redis主节点的 ip port
# master-name 可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。
# quorum 当这些quorum个数sentinel哨兵认为master主节点失联 那么这时 客观上认为主节点失联了
# sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 2

# 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供密码
# 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码
# sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd

# 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒，改成3秒
# sentinel down-after-milliseconds <master-name> <milliseconds>
sentinel down-after-milliseconds mymaster 3000

# 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，这个数字越小，完成failover所需的时间就越长，但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。
# sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1

# 故障转移的超时时间 failover-timeout 可以用在以下这些方面：
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。
#3.当想要取消一个正在进行的failover所需要的时间。
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了
# 默认三分钟
# sentinel failover-timeout <master-name> <milliseconds>
sentinel failover-timeout mymaster 180000
```



### 启动步骤



1. 初始化服务器
2. Redis服务器，设置专用的Sentinel 标识
3. 初始化Sentinel 状态信息（即实例化SentinelState对象）
4. 初始化 Sentinel 监控的主服务器列表
5. 创建 主服务器的 网络连接



**1.初始化服务器**

由于 和 正常 Redis 功能有所不同，在初始化的过程中，会去除掉一些在 Sentinel 模式下不使用的功能

比如：载入 RDB 和 AOF 文件



**2.Redis服务器，设置专用的Sentinel 标识**

1、设置 Sentinel 对应的 端口号 （sentinel.c/REDIS_SENTINEL_PORT常量）

2、设置对应的 Sentinel 命令表   （sentinel.c/sentinelcmds）



**3.初始化Sentinel 状态信息（即实例化SentinelState对象）**

创建一个 SentinelState 结构，用于保存服务器中所有的 Sentinel 功能相关的数据信息

```c
struct sentinelState {     
  // 当前纪元,用于实现故障转移  
	uint64_t current_epoch;   
  
  // 保存了所有被这个sentinel 监视的主服务器 (key：服务器器名 value:sentinelRedisInstance (字典))
	dict *masters;    
  
	// 是否进入了TILT 模式?    
 	int tilt;    
  
 	// 目前正在执行的脚本的数量  
  int running_scripts;   
  
	// 进入TILT 模式的时间    
	mstime_t tilt_start_time;   
  
	// 最后一次执行时间处理器的时间   
	mstime_t previous_time;  
  
	// 一个FIFO 队列,包含了所有需要执行的用户脚本    
	list *scripts_queue;
 } sentinel;
```



**4.初始化 Sentinel 监控的主服务器列表**

SentinelState 中 使用一个 字典去存储 所有的主服务器信息列表

- 字典键：服务器名
- 字典值： sentinel.c/sentinelRedisInstance结构


<img :src="$withBase('/middleware/redislearn/image-20220410111528575.png')" alt="foo">



```c
typedef struct sentinelRedisInstance {    
  
  // 标识值,记录了实例的类型,以及该实例的当前状态  
  int flags;   
  
  // 实例的名字  如果没有配置的话 默认： 格式为ip:port 
  char *name;   
  
  // 实例的运行ID     
  char *runid;   
  
  // 配置纪元,用于实现故障转移  
  uint64_t config_epoch;     
  
  // 实例的地址   
  sentinelAddr *addr;   
  
  // 实例无响应多少毫秒之后才会被判断为主观下线(subjectively down )   
  mstime_t down_after_period;
  
	// 判断这个实例为客观下线所需的支持投票数量  
  int quorum;   
  
  // 在执行故障转移操作时,可以同时对新的主服务器进行同步的从服务器数量   
  int parallel_syncs;  
  
  // 刷新故障迁移状态的最大时限  
  mstime_t failover_timeout;    
  
  // 从服务器列表
  dict *slaves;   
} sentinelRedisInstance;
```



**5、创建 主服务器的 网络连接**

Sentinel 会与 需要被监控的主服务器建立网络连接，一共会创建两个连接

- 命令连接：专门用于向主服务器发送命令，并获取的信息
  - 获取主服务器的信息
  - 获取主服务器下的从服务器的信息
- 订阅连接：用于订阅主服务器 `__sentinel__:hello` 频道
  - 以及定时向 主、从服务器发送心跳信息



**问题1： 为什么有两个连接**

1. 有一为了确保数据不会丢失，所以专门用一个订阅连接来接收频道信息



**问题2：Sentinel 实例之间为什么只有一个命令连接**

Sentinel 与 Sentinel 不需要进行订阅连接，Sentinel 通过订阅 主服务器 和 从服务器 就可以感知到对方



## Sentinel 信息获取过程

- Sentinel 默认每隔10秒 向 主服务器发送  info 消息 获取主服务器 和其从服务器的信息

- 与主服务器建立 命令连接 和 订阅连接
- 通过 获取都的从服务器 在向从服务器发送 info 消息 获取从服务器的信息 并建立连接
- Sentinel每2s一次，向所有被监视的主服务器和从服务器所订阅的—sentinel—:hello频道上发送消息，消息中会携带Sentinel自身的信息和主服务器的信息。 【进行信息交互，判断自身和集群的信息是否一致】

## 故障迁移

**主要分为一下3步**

1. 判断是否下线
2. 哨兵Leader选举
3. Leader进行故障转移
   1. 选举 Master 节点
   2. 进行故障转移



### 判断下线

> 判断服务器是否下线的分为2个阶段  **主观下线** 、 **客观下线**

**检测是如何发起的:**

Sentinel 每秒  向所有建立连接的服务器 发送一次 PING 命令进行心跳

返回：

- +PONG
- -LOADING
- -MASTERDOWN 

其中一种，都任务服务正常，其他类型返回 或 指定时间内没有返回，则会认为无效



**主观下线**

Sentinel 通过在配置文件中的 `down-after-milliseconds` 选项，设置的多少毫秒内，没有返回有效的回复 或 超时，则认为是`主观下线` ，会对 实例结构中 `flags` 属性设置为 `SRI_S_DOWN` 标识



问题1:  多个Sentinel设置的主观下线时长可能不同

一个设置了5S, 一个设置了8s。Sentinel 则会当 两个Sentinel 都符合条件后，才会认为是主观下线

即: 多个Sentinel 配置的短线时长 不一致时，只有两个都满足了，才认为是真的下线了



**客观下线**

> 当服务器实例为 `主观下线` ：Sentinel 会发送 `SENTINEL is-master-down-by-addr` 命令，通知其他的哨兵进行判定该Redis是否已经下线，当判断下线的哨兵数 等于或超过 配置的数量，则认为是 `客观下线` ， 会对 实例结构中 `flags` 属性设置为 `SRI_O_DOWN` 标识

**相关配置： `quorum=1`   quorum  符合投票哨兵的个数**



### 哨兵 Leader 选举

>主服务器 判定为 客观下线时，就需要选举出一个 Leader ，由 Leader Sentinel 对下主服务器进行故障转移
>
>哨兵的Leader 选举使用了 Raft协议来解决分布式一致性问题



Sentinel 选举的过程：

1. 某Sentinel认定master客观下线后，该Sentinel会先看看自己有没有投过票，如果自己已经投过票
给其他Sentinel了，在一定时间内自己就不会成为Leader。
2. 如果该Sentinel还没投过票，那么它就成为Candidate（候选人），并完成一下几件事情
	- 更新故障转移状态为start
	- 当前epoch加1，相当于进入一个新term，在Sentinel中epoch就是Raft协议中的term。
	- 向其他节点发送 is-master-down-by-addr 命令请求投票。命令会带上自己的epoch。
	- 给自己投一票（leader、leader_epoch）
3. 当其它哨兵收到此命令时，可以同意或者拒绝它成为领导者；（通过判断epoch）
4. Candidate会不断的统计自己的票数，直到他发现认同他成为Leader的票数超过一半而且超过它配置的quorum，这时它就成为了Leader。
5. 如果这个过程出现多个sentinel成为领导者(或者说票数相同时)，则会等待一段时间重新选举。
6. 其他Sentinel等待Leader从slave选出master后，检测到新的master正常工作后，就会去掉客观下
线的标识，进行故障转移操作



### 故障转移



**转移步骤**

1、在已下线主服务器下的 所有从服务器中，选出一个服务器

2、将 下线主服务器下的 所有从服务器，改为  复制 新的 主服务器

3、将已下线主服务器设置为新的主服务器的从服务器



**主服务器的选择**

1. 过滤掉已经 下线 或 断连 的从服务器
2. 过滤掉 最近5秒内 没有回复过  Sentinel的从服务器
3. 过滤掉 失效master  和 slave  断开时间超过了 `down-after-milliseconds ` 10秒 的服务 （即选出相对新的从服务）
4. 对 slave 进行排序选出优先级高的
   1. 多个相同优先级的服务器，那么看 复制的偏移量，偏移量越靠后，优先级越高
   2. 多个优先级相同，偏移量相同，则看 run id ，优先选小的  （越小说明重启数越少）
