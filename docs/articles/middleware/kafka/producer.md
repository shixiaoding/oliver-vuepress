---
title: kafka 生产者
date: 2021-12-05
tags:
- 消息队列
- kafka
---

> 生产者： 负责将消息发送到kafka中，生产者核心通过 主线程 和 `Sender`  线程 将发送拆分成两部  
> 并使用的批处理 和 压缩 技术 大大的提高了 消息发送的效率  

## kafka 批量发送机制
> Kafak 发送的消息主要会将数据打包按批次发送，主要靠两个参数决定，那个条件先满足，就算那个  
* `batch.size` :  每批数据大小 默认是16KB
* `linger.ms`：设置延时时间 默认是 0 （即有消息则直接发送）

**注：两个参数同时设置时，当 `batch.size`  数据没有填满时，等待 `linger.ms`  设置的时间后，进行发送数据**

`linger.ms`  会增加 消息发送的延时性，负载低时 消息会延时发送
负载高时，batch被填满的时间远低于 `linger.ms`, 此时参数起不到作用

**生产者架构图**

<img :src="$withBase('/middleware/kafka/producer1.jpg')" alt="foo">

[详细的流程图解析](https://www.processon.com/view/6197b4db1efad406f8795981)

**简述发送消息流程**
- 主线程：
	- 消息经过 拦截器 -> 序列化器 -> 分区器 写到 消息累加器中 指定分区队列的尾部 （RecoderAccumulator为每个分区都维护了一个 `Deque<ProducerBatch>` 类型的双端队列）
- Sender线程 
	- 异步监听获取 消息累计器中的数据
	- 将 数据 转换成 Broker （node 即 对应的服务器地址）对应的 request  Map集合发送结构体 存储在 `NetworkClient` 中 等待发送
	- 成功发送后，接收到发送成功的回调消息后，清理 `NetworkClient` 和 `消息累加器`  中存在的数据


## 生产者集群架构
### 拦截器
> 主要作用 实现 Client端的定制化控制逻辑，一般拦截器会对 消息发送前 以及 Producer 回调逻辑进行拦截  

- 一个生产者 可以指定多个拦截器，多个拦截的线程安全 需要自己的应用程序保证
* 拦截器抛出异常后，不会向上传递，可能会直接爆出异常

**源码**

```Java
public interface ProducerInterceptor<K, V> extends Configurable {
  	// 在消息序列化 和 计算分区之前，可以对消息进行定制化操作
    ProducerRecord<K, V> onSend(ProducerRecord<K, V> var1);
	
  	// 会在消息被应答（Acknowledgement）之前或消息发送）之前或消息发送失败时调用生产者拦截器的onAcknowledgement（）方法，优先于用户设定的Callback之前执行这个方法运行在 Producer I/O 线程中，所以这个方法中实现的代码逻辑越简单越好则会影响消息的发送速度
    void onAcknowledgement(RecordMetadata var1, Exception var2);
		
    // 用于在关闭拦截器时执行一些资源的清理工作
    void close();
}
```

**注** 可通过实现  `org.apache.kafka.clients.producer.ProducerInterceptor`  接口来实现 自定义拦截器

### 序列化器
> kafka 中 数据都是 字节数组， 所以需要在消息发送前，将 数据 序列化为 字节数组  

**基本的序列化器**
- ByteArraySerializer
- ByteBufferSerializer
- ByteSerializer
- DoubleSerializer
- FloatSerializer
- IntegerSerializer
- LongSerializer
- ShortSerializer

**注** 可通过实现  `org.apache.kafka.common.serialization.Serializer`  接口来实现 自定义序列化器

### 分区器
> 用于确认数据应该被发送到 `topic`  中的那个分区  

kafka 默认分区器 `DefaultPartitioner`  中提供了三种策略:
1. 通过 指定 分区号，发往指定的分区
2. 通过 指定 key, 对 key 进行 hash 取模 得到 分区号，发往指定的分区
3. 通过轮询方式，进行分配分区 （可以实现绝对的分配均衡）

**注**  可以通过实现 `org.apache.kafka.clients.producer.Partitioner`   进行自定分区

### 消息累加器

> kafka发送消息时，并不是直接将消息从客户端通过网络发送给服务器端，而是先将消息存储在客户端的记录收集器中，当队列满了 或者 发送时间已到的时候才会去发送，这个记录收集器就是 `RecordAccumulator `  

<img :src="$withBase('/middleware/kafka/producer2.jpg')" alt="foo">

**核心参数**
**buffer.memory** 
- 默认值：32M 
- 该参数决定了 消息累加器的 整个缓存区的大小，当内存满时，消费发送 `Send()`  方法会被堵塞

**max.block.ms**
- 默认值：60000, 即 60秒 
- 该参数决定了 当内存满时，消息发送被堵塞的时间长度
- 当超过堵塞的时间长度，则会抛出异常

**batch.size**
- 默认值：16KB
-  该参数决定了 每批次数据达到16K 发送一次 ， 而kafka 将每一批次打包成一个 `ProducerBatch` 对象
- 每次发送消息，就是在像 `ProducerBatch`   中插入数据

::插入ProducerBatch的逻辑::

<img :src="$withBase('/middleware/kafka/producer3.jpg')" alt="foo">


**数据结构**

```Java

// kafka 生产者
public class KafkaProducer<K, V> implements Producer<K, V> {
	  // 消息缓存区
    private final RecordAccumulator accumulator;
}

// 消息缓存区
public final class RecordAccumulator {
	  
  /**
   * 具体存放数据的Map集合
   * key: TopicPartition   主题信息对象 【主题、分区】
   * value: Deque<ProducerBatch>  一个 由 ProducerBatch 组成的 消息双端队列
	 * 一个 producerBatch 一组批量的数据 默认为 16K
   */
    private final ConcurrentMap<TopicPartition, Deque<ProducerBatch>> batches;
}

// 消息结构体
public class ProducerRecord<K, V> {
    private final String topic;  			// 主题
    private final Integer partition;  		// 分区号	
    private final Headers headers;			// 消息头部
    private final K key;						// 键	
    private final V value; 					// 值
    private final Long timestamp;     		// 消息的时间戳
}
```

## ack策略
> Kafka producer 有三种 ack 机制，为解决消息的重复和丢失。可以在初始化 producer时在 config 中进行配置，默认值：acks=1  

**具体参数类型**
* acks = 0
	* 生产者不等待broker的任何消息确认。只要将消息放到了socket的缓冲区，就认为消息已发送
	* retries【配置重试参数】 设置也不起作用，因为客户端不关心消息是否发送失败。
* acks = 1
	* leader分区 将记录写到它本地日志，就响应客户端确认消息，而不等待follower副本的确认。
	* 如果leader确认了消息就宕机，则可能会丢失消息，因为follower副本可能还没来得及同步该消息。
* acks = all (-1)
	* leader等待所有同步的副本确认该消息。保证了只要有一个同步副本存在，消息就不会丢失。这是最强的可用性保证

::**最小同步副本**::

[Kafka生产者ack机制剖析 - 知乎](https://zhuanlan.zhihu.com/p/165988882)

## 重试机制
> Kafka 提供了生成消息时，可以设置对失败消息进行重试的机制  

**核心参数**
- retries：重试次数
- retry.backoff.ms：间隔多少时间重试一次

**注**  Kafka 中 重试机制 会破坏原有的顺序消费，如果需要保证顺序消费。如果原本需要顺序发送的信息，失败后会变成异步定时发送，特殊情况会影响原有的前后顺序

**解决方式**
 需要进行设置 `max.in.flight.requests.per.connection` 参数。 该参数 是指定服务器每次可以发送消息的批次数，当设置为 1 时，则每次只能有一个批次进行发送，当出现发送失败重试时，则会堵塞请求队列
