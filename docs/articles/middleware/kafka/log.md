---
title: kafka 日志
date: 2022-05-15
tags:
- 消息队列
- kafka
---

## 日志的文件的布局
::: tip
 `kafka` 中的消息以主题为单位进行分类，在文件存储中 我们将 一个分区 对应 一个日志文件夹，为了防止分区Log 过大，kafka 又引入了 日志分段（LogSegment）即分成多个小的日志文件
:::

<img :src="$withBase('/middleware/kafka/kafka日志文件布局.png')" alt="foo">


### 日志文件

<img :src="$withBase('/middleware/kafka/linuxkafka日志分区目录文件.png')" alt="foo">

日志文件是以： `.log`  后缀为标识

文件命名是以：一个 64位的长整数标识，每个日志段文件名，都是该段中第一条数据的偏移量（它是一个基准偏移量**baseOffset**）

Log的顺序写入机制：所以每次只有一个日志文件可以写入，满足一定条件后欧，将创新新的 日志段文件



**日志的分段策略**

- `log.segment.bytes`: 每个日志段的文件最大值，**默认为 1G**
- `log.roll.ms`   或 `log.roll.hours`:  日志段最大的时间戳与当前时间相差的时间。**默认为7天**
- `log.index.size.max.bytes`偏移量索引 或 时间戳索引文件超过文件最大值，**默认为 10MB**
- 消息的偏移量 与 当前分段的偏移量之间差值，大于 `Integer.MAX_VALUE`

## 索引文件

::: tip
Kafka 通过两种索引文件，来提高查询消息效率。

`偏移量索引： 通过消息偏移量建立物理地址映射` `时间戳索引： 通过实际戳建立物理地址映射`
:::


Kafka 的并不是把所有的消息offset 或 时间戳 都存储了对应的地址映射

而是 选择了 `稀疏索引` 在存储空间 和 查找效率 找了一种折中方式，存储部分的偏移量

如果在索引文件中找不到对应的索引项，则通过获取 小于指定偏移量的最大的偏移量，然后根据该偏移量进行二次定位操作



### 偏移量索引文件

<center>索引文件存储数据</center>

<img :src="$withBase('/middleware/kafka/偏移量索引文件.png')" alt="foo">

- relaticeOffset：相对偏移量,表示消息相对于 `baseOffset` 的偏移量,占用4个字节,当前索引文件的文件名即为 `baseOffset`的值
- position：具体的物理地址



###  时间戳索引文件

<center>索引文件存储数据</center>

<img :src="$withBase('/middleware/kafka/时间戳偏移量文件.png')" alt="foo">


- Timestamp: 当前日志分段最大的时间戳
- relativeOffset: 时间戳所对应的消息的相对偏移量

## 日志的删除策略

- 基于时间删除
  - 相关参数：`log.retention.ms`、`log.retention.hours`、`log.retention.minutes`  
  - 默认参数： 7天
- 基于日志大小删除
  - 相关参数：`log.retention.bytes`
  - 默认为： -1 即无穷大









