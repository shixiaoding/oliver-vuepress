---
title: kafka 架构体系
date: 2021-12-05
tags:
- 消息队列
- kafka
---

<img :src="$withBase('/middleware/kafka/framework1.jpg')" alt="foo">

## zookeeper
> Kafka主要使用ZooKeeper来保存它的元数据、监控Broker和分区的存活状态，并利用ZooKeeper来进行选举  

## Producer
> 负责生产消息，将消费推送到 Broker 中  

## Consumer
> 负责消费 Broker 中的消息，与其他MQ不同 ，kafka 使用的 `pull`   拉取模式  

## Consumer Group
> 设置了同一个 `broker.id`  的 消费者 认为是在同一个消费组中的  
> 消费者组 可以确保 一个主题的一个分区 只能被一个消费者 去进行消费  

## broker
> 一个kafka独立的服务器称为 Broker，集群中的一个 Broker ，可能会存在一个 或多个 topic  

## Topic
> 主题: 将不同的消息分开存储， 物理上 不同 tpoic 的数据时分开存储  

## Partition
> 主题可以被分为若干个分区，一个分区就是一个提交日志，通过分区可以提高kafka并发消费能力  

## Replica
> 副本： kafka 提供了 分区副本机制，为每个分区，提供多个备份副本，提供了高可用性  

- Leader副本： 对外提供服务的分区
- Follower 副本： 不对位提供服务，只用作 Leader的备份，当 Leader奔溃时，Follower 可以切换成Leader副本
