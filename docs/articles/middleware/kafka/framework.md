---
title: kafka 架构体系
date: 2021-12-05
tags:
- 消息队列
- kafka
---

## 集群架构

<img :src="$withBase('/middleware/kafka/kafka架构图.png')" alt="foo">

### Zookeeper

> Kafka主要使用ZooKeeper来保存它的元数据、监控Broker和分区的存活状态，并利用ZooKeeper来进行选举


### Proudcuer

> **生产者**  负责生产消息，将消费推送到 Broker 中

[详细介绍](./prooducer.html)

### Consumer

> **消费者** 负责消费 `Broker` 中的消息，与其他MQ不同 ，kafka 使用的 `pull` 拉取模式


**消费者组（Consumer group）**

设置了同一个 `broker.id` 的 消费者 认为是在同一个消费组中的
消费者组 可以确保 一个主题的一个分区 只能被一个消费者 去进行消费

### Broker

> 一个kafka独立的服务器称为 Broker，集群中的一个 Broker ，可能会存在一个 或多个 topic

[详细介绍](./consumer.html) 

### Topic

> kafka 中将消息 以 `主题` 进行分类。
>
> 主题是逻辑上的概念， 物理上:  不同 tpoic 的数据时分开存储 



### Partition

> 主题可以被分为若干个分区，一个分区就是一个提交日志（即一个分区一个log文件），通过分区可以提高kafka并发消费能力

每个分区都会有一个 `offset` 标识 分区的偏移量。从而保证 **分区内的消费顺序性**

由于 每个分区各自维护 各自的 `offset`,  并不是 一个主题共享维护一个 `offset` ， 所以 kafka 只能维护 **分区有序而不是主题有序**



### Replica

>  副本： kafka 提供了 分区副本机制，为每个分区，提供多个备份副本，提供了高可用性

- Leader副本： 对外提供服务的分区
- Follower 副本： 不对外提供服务，只用作 Leader的备份，当 Leader奔溃时，Follower 可以切换成Leader副本



## 可用的 Follower 副本

follower 副本消息同步的过程中， 很多时候会存在一定的消息滞后

由于：

- 为了保证性能：没有会用 同步操作
- 为了防止数据丢失：没有使用异步操作，只要Leader写入就认为操作

而是使用了 ISR的 方式 有效地权衡了数据可靠性和性能之间的关系。



**副本通称**

- **AR**: 分区中的所有副本 （AR = ISR + OSR）
- **ISR**: 与 Leader副本保持一定同步的副本
- **OSR**:  与 Leader副本同步滞后过多的副本



**只有在ISR中的 Follower 副本 才能在，Leader宕机时，参与Leader选举**

**OSR中的 Follower 副本当，同步数据 追上 Leader，则会重新回到 ISR集合中**



**判断条件**

```shell
# 配置 ISR判断参数

## 默认为10S, 理解为：在该时间段内，Follower 副本存在一次 与 Leader 副本 同步 数据一致的情况
replica.lag.time.max.ms

## （0.9版本之后移除配置） 允许 follower 副本落后 leader 副本的消息数量，超过这个数量后，follower 会被踢出 ISR  
replica.lag.max.messages 
```


## 可见的消息

<img :src="$withBase('/middleware/kafka/kafka可见消息.png')" alt="foo">

- **HW(高水位)**: 取 follower 副本中 最小的 LEO  
- **LEO**: 标识为：日志将要写入消息的 offset



**对于 `Conusmer` 来说 只能 pull 到 HW 之前的数据**


























