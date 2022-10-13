---
title: kafka 消费者
date: 2021-12-05
tags:
- 消息队列
- kafka
---

## 消费者 & 消费者组
**消费者简介**
消费者 通过 订阅主题，进行消费消息。消费者自己维护这消费消息的偏移量，存储在 kafka 主题 `__consumer_offsets`   中
消费者 也提供将自己的偏移量存储在 `Zookeeper`  中,  需要设置 `置offset.storage=zookeeper`
消费者 可以被分配一个主题的多个分区进行消费，同一个分区内的消息，能保证顺序消费
**注：** Zookeeper 不适合高并发

**消费者组**
通过 设置 同一个 `group_id`  将 多个消费者 加入同一个消费者组
消费组能均衡的给消费者分配一个主题中的分区，确保一个主题的分区在该消费组中 只能分配给一个消费者进行消费

**kafka广播和点对点模式**
- kafka中的广播模式：即 设定 多个消费组，不同的消费组中的消费者 能同时消费 同一个主题
- 点对点模式：即 只设定一个消费组进行消费指定的主题

<img :src="$withBase('/middleware/kafka/consumer1.jpg')" alt="foo">


**如何提高消费组的消费能力？**
可以通过 添加消费者来进行增加并发的消费能力，前提 主题分区数 >= 消费者数量
当消费者数量大于 分区数时 则是对消费能力的浪费

<img :src="$withBase('/middleware/kafka/consumer2.jpg')" alt="foo">


## 消费者的心跳机制
> Kafka 的心跳是 Kafka Consumer 和 Broker 之间的健康检查，只有当 Broker Coordinator 正常时，Consumer 才会发送心跳。  

**消费者核心心跳参数**
- session.timeout.ms：  默认值是：10000 （10s）【Consumer Seesion 过期时间 - 即心跳超时时间】
- heartbeat.interval.ms： 默认值是：3000 （3s） 【心跳间隔 - 每几秒向协调者进行发送心跳】
- max.poll.interval.ms:   默认值是：300000 （5分钟）【指定consumer两次poll的最大时间间隔】

**上面的参数**   `session.timeout.ms`   和 `heartbeat.interval.ms`   在 10 秒的超时时间内，每3秒触发一次心跳 ， 一般来说 尽可能缩短心跳，以及 尽可能的延长超时时间，这样能够在指定时间内竟可能的多长时间心跳检测，每次心跳操作可能会存在高负载的延时问题 或 心跳丢失等。所以尽可能的合理分配两个参数，让心跳能尽可能的多。但太频繁的心跳，也会影响性能。


### Broker端的检测机制
主要通过： session.timeout.ms  
> Broker 处理心跳的逻辑：如果心跳超期， broker coordinator（协调者）会把消费者从 group 中移除，并触发 rebalance。  

### Consumer端的检测机制
主要通过： session.timeout.ms  、max.poll.interval.ms
- 如果消费者发现自身心跳超期，会标记 broker 协调者 不能用，并堵塞心跳 【 session.timeout.ms】
- 如果消费者发现自身 poll 消息超过 指定时间，则任务消费者丧失能力，主动 告知 broker 离开消费组

::注:: 消费者心跳超时后，不管是如何发生的超时，都会触发 `rebalance`  重平衡操作  **(后续详解)**

##  位移提交
> Consumer 需要向Kafka记录自己的位移数据，这个汇报过程称为 提交位移(CommittingOffsets)  
> Consumer 需要为分配给它的每个分区提交各自的位移数据  
> 位移提交的由Consumer 端负责的，Kafka只负责保管 在 `__consumer_offsets`  主题中  

 **位移提交可以分为：**
- 自动提交 
- 手动提交
	- 同步提交
	- 异步提交

### 自动提交

**核心参数**
- 开启自动提交： enable.auto.commit=true
- 配置自动提交间隔：Consumer端： auto.commit.interval.ms ，默认 5s

**自动提交有什么好处？**
> Kafka会保证在开始调用poll方法时，提交上次poll返回的所有消息, 因此自动提交不会出现消息丢失  

**自动提交又会带来什么问题？**
> 可能会出现重复消费的问题  

可能会触发的案例：
- Consumer 每 5s 提交 offset
- 假设提交 offset 后的 3s 发生了 Rebalance
- Rebalance 之后的所有 Consumer 从上一次提交的 offset 处继续消费
- 因此 Rebalance 发生前 3s 的消息会被重复消费

### 手动提交
只需要将 参数  `enable.auto.commit = false`  即 将提交方式设置为 手动提交

手动提交分为：
- 同步提交  `consumer.commitSync()`  
同步提交，会让 Consumer 处于堵塞状态，会影响 TPS。可以通过选择拉长提交间隔 提高性能 （和自动提交类似，降低了提交的频率，则会触发消息重复消息的问题）

```java
while (true) {
	ConsumerRecords<String, String> records =
	consumer.poll(Duration.ofSeconds(1));
	process(records); // 处理消息
	try {
		consumer.commitSync();
	} catch (CommitFailedException e) {
		handle(e); // 处理提交失败异常
	}
}
```

- 异步提交  `consumer.commitAsync()` 

由下面代码可见：当异步操作是，发生异常后，服务实现重试操作

```Java

while (true) {
	ConsumerRecords<String, String> records = consumer.poll(3_000);
	process(records); // 处理消息
	consumer.commitAsync((offsets, exception) -> {
		if (exception != null) {
			handle(exception);
		}
	});
}
```

可以使用 `try ... catch`  的方式在不影响性能的情况下，保证提交的可靠性。毕竟正常情况失败的可能性比较少，如果大批量都失败了，可能是服务出现了问题

**优化处理逻辑**
```Java
try {
	while(true) {
		ConsumerRecords<String, String> records =
		consumer.poll(Duration.ofSeconds(1));
		process(records); // 处理消息
		commitAysnc(); // 使用异步提交规避阻塞
	}
} catch(Exception e) {
		handle(e); // 处理异常
} finally {
	try {
		consumer.commitSync(); // 最后一次提交使用同步阻塞式提交
	} finally {
		consumer.close();
	}
}
```

- 相关提交操作案例：[Kafka的消费者提交方式手动同步提交、和异步提交 - 别先生 - 博客园](https://www.cnblogs.com/biehongli/p/14105658.html)

**重点思考：**  我们需要思考  如何即能解决 消息丢失 和 重复消费 呢？

## 再/重均衡 reblance
> 重平衡其实就是一个协议，它规定了如何让消费者组下的所有消费者来分配topic中的每一个分区。  

**重均衡的触发条件：**
1. 消费者组内成员发生变更，这个变更包括了增加和减少消费者，比如消费者宕机退出消费组。
2. 主题的分区数发生变更，kafka目前只支持增加分区，当增加的时候就会触发重平衡
3. 订阅的主题发生变化，当消费者组使用正则表达式订阅主题，而恰好又新建了对应的主题，就 会触发重平衡

**为什么说重平衡为人诟病呢？**
> 因为重平衡过程中，消费者无法从kafka消费消息，这对kafka的TPS 影响极大，而如果kafka集内节点较多，比如数百个，那重平衡可能会耗时极多。数分钟到数小时都有可能，而这段时间kafka基本处于不可用状态。**

> **要说完全避免重平衡，是不可能，所以我们需要保证尽力避免消费者故障**  

部分情况，可能是负责过高 没来得急心跳 或者网络堵塞 或者是自身消费处理能力不够
避免重平衡相关的配置：
* session.timout.ms：默认10秒  控制心跳超时时间
* heartbeat.interval.ms： 默认3秒 控制心跳发送频率 (常见的可能网络抖动 或者 网络延迟等可能 心跳的超时时间要大于 心跳发送频率) 
* max.poll.interval.ms :  控制poll的间隔。 指定consumer两次poll的最大时间间隔（默认5分钟），如果超过了该间隔consumer client会主动向coordinator发起LeaveGroup请求，触发rebalance
* max-poll-records:  150 每次拉取的数据条数 (默认500条）

**总结**
- 在心跳测：我们可以尽可能的提高 超时时间  `session.timout.ms` 和 加快心跳发送频率（heartbeat.interval.ms），让充分多的进行心跳，减少超时的可能
- 在消费能力侧：通过控制poll的间隔 `max.poll.interval.ms`  和 每次拉取的条数 `max-poll-records`  竟可能的在指定的时间内最大化的的保证任务能完成的数量，不要因为每次拉取的数据过多，导致消费不完，而导致的 reblance
- 自身处理能力侧：可以优化业务逻辑代码 或 使用多线程消费 来提高消费侧的能力，避免一次拉取消费不完的情况 


## 消费组内分区分配策略
三种分配策略：
- RangeAssignor  【默认的分配策略】
- RoundRobinAssignor
- StickyAssignor
- 自定义分配策略：通过实现 `org.apache.kafka.clients.consumer.internals.PartitionAssignor`  接口

### RangeAssignor
> RangeAssignor对每个Topic进行独立的分区分配。对于每一个Topic，首先对分区按照分区ID进行数值排序，然后订阅这个Topic的消费组的消费者再进行字典排序，之后尽量均衡的将分区分配给消费者。这里只能是尽量均衡，因为分区数可能无法被消费者数量整除，那么有一些消费者就会多分配到一些分区。  
> **总结:** 首先通过  分区数/消费者 数量进行平均分配。多余的分区数进行顺序挨个往下分配  

<img :src="$withBase('/middleware/kafka/consumer3.jpg')" alt="foo">

**存在的问题**

> 当主题数增加后，可能会造成 字典序靠前的消费组中的消费者比较“贪婪”  即 靠前的消费者 需要消费更的分区数据  

<img :src="$withBase('/middleware/kafka/consumer4.jpg')" alt="foo">


### RoundRobinAssignor

> 轮询消费：分配策略是将消费组内订阅的所有Topic的分区及所有消费者进行排序后尽量均衡的分配  

<img :src="$withBase('/middleware/kafka/consumer5.jpg')" alt="foo">

### StickyAssignor

> 个人理解，后续的分配会更具上过一次分配的结果，进行做间隔分配（往后跳过）几个消费者进行分配  


## 序列化器
> Kafka的broker中所有的消息都是字节数组，消费者获取到消息之后，需要先对消息进行反序列化处理，然后才能交给用户程序消费处理。  

**自定义序列化器**： 可以通过现 `org.apache.kafka.common.serialization.Deserializer<T>` 接口

## 拦截器
> 消费者在拉取了分区消息之后，要首先经过反序列化器对key和value进行反序列化处理。  
> 处理完之后，如果消费端设置了拦截器，则需要经过拦截器的处理之后，才能返回给消费者应用程序进行处理。  
> ::注:: 可以使用多个拦截器，拦截器按顺序执行的  

**自定义消息拦截器** 可以通过实现 `org.apache.kafka.clients.consumer.ConsumerInterceptor<K, V>` 接口 

**常见的拦截器功能：**
- 允许拦截甚至更改消费者接收到的消息，一般用于定制的监控、日志处理等

```Java
public interface ConsumerInterceptor<K, V> extends Configurable {

	/**
	*
	* 该方法在poll方法返回之前调用。调用结束后poll方法就返回消息了。
	*
	* 该方法可以修改消费者消息，返回新的消息。拦截器可以过滤收到的消息或生成新的消息。
	* 如果有多个拦截器，则该方法按照KafkaConsumer的configs中配置的顺序调用。
	*
	* @param records 由上个拦截器返回的由客户端消费的消息。
	*/
	public ConsumerRecords<K, V> onConsume(ConsumerRecords<K, V> records);

	/**
	* 当消费者提交偏移量时，调用该方法。
	* 该方法抛出的任何异常调用者都会忽略。
	*/
	public void onCommit(Map<TopicPartition, OffsetAndMetadata> offsets);

	public void close();
}
```

## 协调器
- [Apache Kafka核心组件和流程-协调器（消费者和组协调器）-设计-原理（入门教程轻松学）_稀有气体的技术博客-CSDN博客_kafka组协调器](https://blog.csdn.net/liyiming2017/article/details/82867765)


## 多线程消费
- [正确处理kafka多线程消费的姿势_Johnnie Zhang的专栏-CSDN博客_kafka多线程消费](https://blog.csdn.net/Johnnyz1234/article/details/98318528)
- [【原创】Kafka Consumer多线程实例 - huxihx - 博客园](https://www.cnblogs.com/huxi2b/p/6124937.html)
- [kafka多线程消费_燕少江湖-CSDN博客_kafka多线程消费同一个topic](https://blog.csdn.net/qq_31289187/article/details/81983017)
- [使用两种多线程模式消费kafka数据 - 知乎](https://zhuanlan.zhihu.com/p/144870495?from_voters_page=true)
- [使用多线程增加kafka消费能力 - SegmentFault 思否](https://segmentfault.com/a/1190000018640106)
 

##  其他
- 为什么说 Zookeeper不适合高并发 