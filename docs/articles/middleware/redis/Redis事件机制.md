---
isTimeLine: true
sidebar: true
isComment: false
title: Redis 事件
date: 2022-4-20
tags:
- Redis
---

> Redis 服务器是一个 `事件驱动程序` 主要分为两类事件 `文件事件`、`时间事件`

- 文件事件：是 服务器 对 套接字（socket）操作的抽象，即 客户端 通过 套接字 和 服务器通信 产生相应的文件事件
- 时间事件：需要在给定的时间点执行



### 文件事件

> Redis 基于 `Reactor` 模式开发了自己的网络事件处理器 被称为： 文件事件处理器
>
> 文件事件处理器以单线程方式运行， 使用I/O多路复用程序来监听多个套接字,文件事件处理器既实现了高性能的网络通信模型,又可以很好地与Redis服务器中其他同样以单线程方式运行的模块进行对接



#### 文件事件处理器

> 文件事件处理器的四个组成部分,它们分别是套接字、I/O多路复用程序、文件事件分派器(dispatcher),以及事件处理器。

<img :src="$withBase('/middleware/redislearn/redis事件处理器.png')" alt="foo">



- `套接字`：socket请求执行每次连接应答(accept)、写入、读取、关闭等操作时，都对产生对应的事件给服务器
- `I/O多路复用程序`:  
  - 会将所有产生的事件，放到 **队列中**，以 **有序**、**同步** 的方式, 向 **文件事件分派器** 传输 套接字
  - I/O 多路服务程序：Redis 将常见的 select、epoll、evport和kqueue  实现方式都实现了，程序会在编译时自动选择系统中性能最高的I/O多路复用函数库来作为Redis的I/O多路复用程序的底层实现
- 文件事件分派器： 会根据 具体的事件 分配给 具体的事件处理器
- 文件事件处理器:
  - 连接应答处理器
  - 命令请求处理器
  - 命令回复处理器
  - 复制处理器

### 时间事件

**分为两大类：**

- 定时事件： 让一段程序在指定的时间之后执行一次
- 周期性事件： 让一段程序每隔指定时间就执行一次

**目前版本的Redis只使用周期性事件， 没有 定时事件**



**一个时间事情的组成**

- id:  服务器为时间事件创建的全局唯一ID
- when:  毫秒精度的UNIX时间戳,记录了时间事件的到达(arrive)时间
- timeProc:  时间事件处理器（一个函数），当时间到达时，用来处理事件的



**如何判断/生成周期性任务**

定时事件 还是 周期性事件 是通过 事件处理器的 返回值 确定的

- 返回：`AE_NOMORE`  （定时事件）
- 返回：非 `AE_NOMORE`  (周期性事件，并更新 时间事件的 when属性)



#### 具体实现

<img :src="$withBase('/middleware/redislearn/redis时间事件.png')" alt="foo">



Redis 将所有的 时间事件 存放在一个 **无序链表**  中 （此无序是指，不更具id排序，更具when 大小排序）。

每当创建 时间事件时，会插入到 链表头部



#### serverCron函数

> 时间事件 主要的应用是在 Redis服务器 需要定期对自身的资源和状态进行检查和调整,从而确保服务器可以长期、稳定地运行。
> 这些定期操作由redis.c中的 `serverCron`函数负责执行,它的主要工作包括:

1. 更新服务器的各类统计信息,比如时间、内存占用、数据库占用情况等
2. 清理数据库中的过期键值对
3. 关闭和清理连接失效的客户端
4. 尝试进行AOF或RDB持久化操作
5. 如果服务器是主服务器,那么对从服务器进行定期同步。
6. 如果处于集群模式,对集群进行定期同步和连接测试



Redis2.6版本：默认 `serverCron`函数 每秒运行 10次，平均 每间隔 100毫秒运行一次

Redis2.8开始 可以进行配置修改 serverCron在一秒内执行的次数 ， 在redis/conf中可以配置

```
hz 100
```



### 事件的调度与执行

> 服务器中同时存在文件事件和时间事件两种事件类型,所以服务器必须对这两种事件进行调度

<img :src="$withBase('/middleware/redislearn/redis事件调度流程.png')" alt="foo">



1. 文件事件是随机出现的，处理完一次文件事件后，任为有时间事件到达，则会接着执行文件事件
2. 因为 时间事件 在文件事件之后执行，事件之间不会抢占，所以时间事件的处理时间，通常比设定的到达时间晚一些