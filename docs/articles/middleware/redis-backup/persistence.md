---
isTimeLine: true
sidebar: true
isComment: false
title: Redis持久化
date: 2022-3-02
tags:
- Redis
---
## Redis 的持久化

> 首先我们要明确 Redis 为什么需要持久化？
>
> Redis 持久化 并不是为了 `保证数据的完全性`,  保证完整性我们完全可以使用 **关系型数据库** 去存储数据。而是为了保证服务 出现故障 或 重启后快速的进行**故障恢复** 

**持久化的机制**

Redis 提供了两种持久化方式 `RDB` 和 `AOF`

## RDB

### 什么是RDB?

> Redis DateBase, 是redis 默认的存储方式，是通过 `快照` 完成的，即存储的是某一时刻的数据副本。 所生成的RDB文件是一个经过压缩的二进制文件

**RDB 不关注存储的过程，只关注某一时刻的最终结果数据**



### 触发生成快照时间 或 方式

1. 符合自定义配置（自动间隔保存）的快照规则 （服务有默认配置，可以进行修改）
2. 执行 `save` 或 `bgsave`命令
3. 执行 `flushall` 命令
4. 执行主从服务操作 （仅第一次操作时）



**配置自动间隔保存**

> 当redis服务部署完成后就会有默认的生成快照的规则，
>
> 在 redis.conf 文件中进行配置: save 多少秒内 数据变了多少

```
# 默认 save "" 是注释掉的
save "" # 不使用RDB存储 不能主从

save 900 1          # 表示15分钟（900秒钟）内至少1个键被更改则进行快照。
save 300 10         # 表示5分钟（300秒）内至少10个键被更改则进行快照。
save 60 10000       # 表示1分钟内至少10000个键被更改则进行快照。
```

**注：** 在配置文件中 save 命令的配置 其实运行时 和 bgsave 是一样的效果，会由子进程操作

配置文件 Redis 服务启动会存储在 redisServer 中

<img :src="$withBase('/middleware/redis/image-20220301155917270.png')" alt="foo">


```c
	struct redisServer {     
    // 记录保存的条件数组 设置的规则 都已数据形式存放
    struct saveparam *saveparams;  
    // 修改计数器 （从上一次成功执行完 save 操作后 执行的修改次数）   
    long long dirty;     
    // 上一次执行保存的时间   
    time_t lastsave;   
};
```



**`save` 和  `bgsave` 的区别？**

-  save：是一个同步保存操作,会堵塞redis服务进程,直到rdb文件创建完成为止, 进程堵塞期间不能处理任何命令请求

-  bgsave: 是一个异步操作，bgsave命令会派生出一个子进程，由子进程负责创建rdb文件，父进程继续处理 redis命令

### 生成 和 载入



#### 生成

<img :src="$withBase('/middleware/redis/ECD69A54-4954-400A-8A41-62A1872D0215.png')" alt="foo">

1. 客户端发送 bgsave 命令， Redis父进程首先判断是否有其他正在执行子进程（save | bgsave | bgrewriteaof）, 如果 有则：直接返回，无则：向下执行
2. 父进程执行 fork 操作创建 子进程 （在 fork 期间 父进程会堵塞，不会执行来自客户端的任何命令）
3. 父进程 fork后，bgsave命返回 " Background saving started " 信息并不再阻塞 Redis父进程，可以继续响应其他命令了。
4. 子进程，根据父进程内存快照生成临时RDB文件，完成后替换原来的 RDB 文件，同时发送信息给父进程表示RDB操作完成，父进程则更新统计信息

#### 载入

1. 服务器启动时自动加载检测是否有RDB文件存在
2. 若有则自动再载入RDB文件，在载入期间处于阻塞状态
3. 执行载入操作过，服务则可以对外响应请求

**如果 Reids 开启了 AOF 会优先使用AOF 文件来还原数据库状态**

<img :src="$withBase('/middleware/redis/image-20220301161615211.png')" alt="foo">


### RDB的文件格式

<img :src="$withBase('/middleware/redis/image-20220301194800936.png')" alt="foo">

## AOF

> `AOF (Append Only File)` 持久化功能，默认是不开启的，` AOF`持久化是通过保存 Redis所有的执行写入命令。 这样 Redis 重启后 只要按照顺序回访这些命令就会恢复到原始状态
>
> **AOF** 和 **RDB** 都开启了，redis重启的时候，也是优先通过 **AOF**进行数据恢复的，因为**AOF** 数据比较完整

### 文件写入 和 保存

<img :src="$withBase('/middleware/redis/image-20220301214726480.png')" alt="foo">

<center>AOF持久化文件的生成</center>

简单的可以理解为，每当client 端执行，非查询命令时，就会将其执行的命令，追加到 AOF 文件中

<center><font color=red>具体流程</font></center>

<img :src="$withBase('/middleware/redis/image-20220301220652881.png')" alt="foo">

1. 命令追加：服务器每执行一次写命令都会以 协议格式 将执行的写命令追加到 `aof_buf` 缓冲区的尾部
2. 根据设定的规则，会进行异步将数据刷入磁盘中



**AOF 的 save/fsync 策略**

有三种：

 - always: 每次写入数据，就立即将数据刷入磁盘
 - everysec: 每隔1秒，将数据从 os cache 中写入磁盘 （每秒都是通过 fork 子进程进行写入） 
 - no：仅写入 os cache, 不会写入磁盘，然后根据系统自身的策略来决定什么时候刷入磁盘

Redis默认配置： `everysec`



### 数据恢复

> AOF 恢复的过程相当简单，因为AOF文件里面包含了重建数据状态所需的所有写的命令，只需要服务根据顺序读入并重写执行一遍AOF文件里面所有的写命令即可

<img :src="$withBase('/middleware/redis/image-20220301214447632.png')" alt="foo">


### 文件重写

**为什么要重写**

 随着命令的不断写入，数据会越来越多，文件会越来越大，所以需要瘦身，这样的好处在于，去除重复命令，较少数据，数据恢复时，熟读更快



**重写那些命令**

>  将同一个key 的多条写入命令，重构成一条命令

**重写的配置 和 启动方式**

1. 设置重写配置  `redis.conf` 进行配置

```shell
# 表示当前aof文件大小超过上一次aof文件大小的百分之多少的时候会进行重写。如果之前没有重写过，以
启动时aof文件大小为准
auto-aof-rewrite-percentage 100

# 限制允许重写最小aof文件大小，也就是文件大小小于64mb的时候，不需要进行优化
auto-aof-rewrite-min-size 64mb

```

2. 也可以通过手动输入 `bgrewriteaof` 命令 进行执行



**具体执行流程**

<img :src="$withBase('/middleware/redis/45236039-F859-4992-94F9-6947F1524D09.png')" alt="foo">



1. AOF文件大小超过配置的最大值时，会触发AOF文件的 `rewrite` 执行bgrewriteaof命令
2. redis进程会fork一个子进程，子进程会带有主进程的数据副本，来构建新的AOF文件
3. 在rewrite期间，redis主进程会记录新的写入命令，并会开启AOF重写缓存
4. 子进程完成AOF重写之后，会向主进程发送一个完成信号
5. 主进程收到完成信号后，会将缓存池中的数据全部写入新的AOF文件中，对新的AOF文件改名，替换原有的AOF文件

## RDB 和 AOF 两者的优缺点：

#### RDB

- 优点；
  - RDB 会生成多个数据文件，是更具某一时刻的redis数据，非常适合做冷备份
  - RDB 是二进制压缩文件，占用空间小，便于传输
  - RDB 对redis对外提供的读写服务, 影响非常小，可以让redis保持高性能，因为主进程只需要fork一个子进程，子进程来处理RDB持久化
  - RDB 存放的是一份数据文件，恢复时，直接加载到内存中即可 （恢复过程更快）
- 缺点:
  - RDB 因为是存储的某个时刻的数据，不能保证数据的完整性
  - 如果 fork的子进程，数据文件特别大时，可能会导致暂停数毫秒或秒

#### AOF

- 优点：
  - AOF 可以更好的保证数据的完整性，不丢失数据，一般AOF 会每隔1秒进行fsync操作，最多丢失一秒的数据
  - AOF 日志文件以 `append-only` 模式写入，对磁盘寻址没有任何开销，写入性能高，文件不易破损，即使尾部破损，也容易恢复
  - AOF 文件过大，出现后台重写时，也不会用影响客户端的读写操作
  - AOF 日志文件是记录所有的命令，所有非常适合做灾难性的误删除的紧急恢复 （当不小心用了flushall命令时，只要后台rewrite 还没发生，就能通过AOF文件，将数据都回访回去）
- 缺点：
  - AOF日志文件 通常比 RDB数据快照要更大
  - AOF开启后的 写的QPS 会 比 RDB 的QPS低 （因为AOF每秒 fsync 一次，对性能的影响还是很大的）
  - 做恢复时，会比较慢（需要回放和执行指令）
  - 不方便做定期备份和 冷备份，需要手写脚本去恢复数据