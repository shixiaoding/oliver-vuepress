(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{595:function(a,t,s){"use strict";s.r(t);var e=s(17),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("blockquote",[s("p",[a._v("生产者： 负责将消息发送到kafka中，生产者核心通过 主线程 和 "),s("code",[a._v("Sender")]),a._v("  线程 将发送拆分成两部"),s("br"),a._v("\n并使用的批处理 和 压缩 技术 大大的提高了 消息发送的效率")])]),a._v(" "),s("h2",{attrs:{id:"kafka-批量发送机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kafka-批量发送机制"}},[a._v("#")]),a._v(" kafka 批量发送机制")]),a._v(" "),s("blockquote",[s("p",[a._v("Kafak 发送的消息主要会将数据打包按批次发送，主要靠两个参数决定，那个条件先满足，就算那个")])]),a._v(" "),s("ul",[s("li",[s("code",[a._v("batch.size")]),a._v(" :  每批数据大小 默认是16KB")]),a._v(" "),s("li",[s("code",[a._v("linger.ms")]),a._v("：设置延时时间 默认是 0 （即有消息则直接发送）")])]),a._v(" "),s("p",[s("strong",[a._v("注：两个参数同时设置时，当 "),s("code",[a._v("batch.size")]),a._v("  数据没有填满时，等待 "),s("code",[a._v("linger.ms")]),a._v("  设置的时间后，进行发送数据")])]),a._v(" "),s("p",[s("code",[a._v("linger.ms")]),a._v("  会增加 消息发送的延时性，负载低时 消息会延时发送\n负载高时，batch被填满的时间远低于 "),s("code",[a._v("linger.ms")]),a._v(", 此时参数起不到作用")]),a._v(" "),s("p",[s("strong",[a._v("生产者架构图")])]),a._v(" "),s("img",{attrs:{src:a.$withBase("/middleware/kafka/producer1.jpg"),alt:"foo"}}),a._v(" "),s("p",[s("a",{attrs:{href:"https://www.processon.com/view/6197b4db1efad406f8795981",target:"_blank",rel:"noopener noreferrer"}},[a._v("详细的流程图解析"),s("OutboundLink")],1)]),a._v(" "),s("p",[s("strong",[a._v("简述发送消息流程")])]),a._v(" "),s("ul",[s("li",[a._v("主线程：\n"),s("ul",[s("li",[a._v("消息经过 拦截器 -> 序列化器 -> 分区器 写到 消息累加器中 指定分区队列的尾部 （RecoderAccumulator为每个分区都维护了一个 "),s("code",[a._v("Deque<ProducerBatch>")]),a._v(" 类型的双端队列）")])])]),a._v(" "),s("li",[a._v("Sender线程\n"),s("ul",[s("li",[a._v("异步监听获取 消息累计器中的数据")]),a._v(" "),s("li",[a._v("将 数据 转换成 Broker （node 即 对应的服务器地址）对应的 request  Map集合发送结构体 存储在 "),s("code",[a._v("NetworkClient")]),a._v(" 中 等待发送")]),a._v(" "),s("li",[a._v("成功发送后，接收到发送成功的回调消息后，清理 "),s("code",[a._v("NetworkClient")]),a._v(" 和 "),s("code",[a._v("消息累加器")]),a._v("  中存在的数据")])])])]),a._v(" "),s("h2",{attrs:{id:"生产者集群架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生产者集群架构"}},[a._v("#")]),a._v(" 生产者集群架构")]),a._v(" "),s("h3",{attrs:{id:"拦截器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#拦截器"}},[a._v("#")]),a._v(" 拦截器")]),a._v(" "),s("blockquote",[s("p",[a._v("主要作用 实现 Client端的定制化控制逻辑，一般拦截器会对 消息发送前 以及 Producer 回调逻辑进行拦截")])]),a._v(" "),s("ul",[s("li",[a._v("一个生产者 可以指定多个拦截器，多个拦截的线程安全 需要自己的应用程序保证")])]),a._v(" "),s("ul",[s("li",[a._v("拦截器抛出异常后，不会向上传递，可能会直接爆出异常")])]),a._v(" "),s("p",[s("strong",[a._v("源码")])]),a._v(" "),s("div",{staticClass:"language-Java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("interface")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ProducerInterceptor")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("extends")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Configurable")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  \t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 在消息序列化 和 计算分区之前，可以对消息进行定制化操作")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ProducerRecord")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("onSend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ProducerRecord")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" var1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\t\n  \t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 会在消息被应答（Acknowledgement）之前或消息发送）之前或消息发送失败时调用生产者拦截器的onAcknowledgement（）方法，优先于用户设定的Callback之前执行这个方法运行在 Producer I/O 线程中，所以这个方法中实现的代码逻辑越简单越好则会影响消息的发送速度")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("void")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("onAcknowledgement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RecordMetadata")]),a._v(" var1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Exception")]),a._v(" var2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\t\t\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 用于在关闭拦截器时执行一些资源的清理工作")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("void")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("close")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[s("strong",[a._v("注")]),a._v(" 可通过实现  "),s("code",[a._v("org.apache.kafka.clients.producer.ProducerInterceptor")]),a._v("  接口来实现 自定义拦截器")]),a._v(" "),s("h3",{attrs:{id:"序列化器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#序列化器"}},[a._v("#")]),a._v(" 序列化器")]),a._v(" "),s("blockquote",[s("p",[a._v("kafka 中 数据都是 字节数组， 所以需要在消息发送前，将 数据 序列化为 字节数组")])]),a._v(" "),s("p",[s("strong",[a._v("基本的序列化器")])]),a._v(" "),s("ul",[s("li",[a._v("ByteArraySerializer")]),a._v(" "),s("li",[a._v("ByteBufferSerializer")]),a._v(" "),s("li",[a._v("ByteSerializer")]),a._v(" "),s("li",[a._v("DoubleSerializer")]),a._v(" "),s("li",[a._v("FloatSerializer")]),a._v(" "),s("li",[a._v("IntegerSerializer")]),a._v(" "),s("li",[a._v("LongSerializer")]),a._v(" "),s("li",[a._v("ShortSerializer")])]),a._v(" "),s("p",[s("strong",[a._v("注")]),a._v(" 可通过实现  "),s("code",[a._v("org.apache.kafka.common.serialization.Serializer")]),a._v("  接口来实现 自定义序列化器")]),a._v(" "),s("h3",{attrs:{id:"分区器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分区器"}},[a._v("#")]),a._v(" 分区器")]),a._v(" "),s("blockquote",[s("p",[a._v("用于确认数据应该被发送到 "),s("code",[a._v("topic")]),a._v("  中的那个分区")])]),a._v(" "),s("p",[a._v("kafka 默认分区器 "),s("code",[a._v("DefaultPartitioner")]),a._v("  中提供了三种策略:")]),a._v(" "),s("ol",[s("li",[a._v("通过 指定 分区号，发往指定的分区")]),a._v(" "),s("li",[a._v("通过 指定 key, 对 key 进行 hash 取模 得到 分区号，发往指定的分区")]),a._v(" "),s("li",[a._v("通过轮询方式，进行分配分区 （可以实现绝对的分配均衡）")])]),a._v(" "),s("p",[s("strong",[a._v("注")]),a._v("  可以通过实现 "),s("code",[a._v("org.apache.kafka.clients.producer.Partitioner")]),a._v("   进行自定分区")]),a._v(" "),s("h3",{attrs:{id:"消息累加器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#消息累加器"}},[a._v("#")]),a._v(" 消息累加器")]),a._v(" "),s("blockquote",[s("p",[a._v("kafka发送消息时，并不是直接将消息从客户端通过网络发送给服务器端，而是先将消息存储在客户端的记录收集器中，当队列满了 或者 发送时间已到的时候才会去发送，这个记录收集器就是 "),s("code",[a._v("RecordAccumulator")])])]),a._v(" "),s("img",{attrs:{src:a.$withBase("/middleware/kafka/producer2.jpg"),alt:"foo"}}),a._v(" "),s("p",[s("strong",[a._v("核心参数")]),a._v(" "),s("strong",[a._v("buffer.memory")])]),a._v(" "),s("ul",[s("li",[a._v("默认值：32M")]),a._v(" "),s("li",[a._v("该参数决定了 消息累加器的 整个缓存区的大小，当内存满时，消费发送 "),s("code",[a._v("Send()")]),a._v("  方法会被堵塞")])]),a._v(" "),s("p",[s("strong",[a._v("max.block.ms")])]),a._v(" "),s("ul",[s("li",[a._v("默认值：60000, 即 60秒")]),a._v(" "),s("li",[a._v("该参数决定了 当内存满时，消息发送被堵塞的时间长度")]),a._v(" "),s("li",[a._v("当超过堵塞的时间长度，则会抛出异常")])]),a._v(" "),s("p",[s("strong",[a._v("batch.size")])]),a._v(" "),s("ul",[s("li",[a._v("默认值：16KB")]),a._v(" "),s("li",[a._v("该参数决定了 每批次数据达到16K 发送一次 ， 而kafka 将每一批次打包成一个 "),s("code",[a._v("ProducerBatch")]),a._v(" 对象")]),a._v(" "),s("li",[a._v("每次发送消息，就是在像 "),s("code",[a._v("ProducerBatch")]),a._v("   中插入数据")])]),a._v(" "),s("p",[a._v("::插入ProducerBatch的逻辑::")]),a._v(" "),s("img",{attrs:{src:a.$withBase("/middleware/kafka/producer3.jpg"),alt:"foo"}}),a._v(" "),s("p",[s("strong",[a._v("数据结构")])]),a._v(" "),s("div",{staticClass:"language-Java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// kafka 生产者")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("KafkaProducer")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("implements")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Producer")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\t  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 消息缓存区")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RecordAccumulator")]),a._v(" accumulator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 消息缓存区")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RecordAccumulator")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\t  \n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("/**\n   * 具体存放数据的Map集合\n   * key: TopicPartition   主题信息对象 【主题、分区】\n   * value: Deque<ProducerBatch>  一个 由 ProducerBatch 组成的 消息双端队列\n\t * 一个 producerBatch 一组批量的数据 默认为 16K\n   */")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ConcurrentMap")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("TopicPartition")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Deque")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ProducerBatch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" batches"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 消息结构体")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ProducerRecord")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" topic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("  \t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 主题")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Integer")]),a._v(" partition"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("  \t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 分区号\t")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Headers")]),a._v(" headers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 消息头部")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("K")]),a._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\t\t\t\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 键\t")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("V")]),a._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \t\t\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 值")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Long")]),a._v(" timestamp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("     \t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 消息的时间戳")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h2",{attrs:{id:"ack策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ack策略"}},[a._v("#")]),a._v(" ack策略")]),a._v(" "),s("blockquote",[s("p",[a._v("Kafka producer 有三种 ack 机制，为解决消息的重复和丢失。可以在初始化 producer时在 config 中进行配置，默认值：acks=1")])]),a._v(" "),s("p",[s("strong",[a._v("具体参数类型")])]),a._v(" "),s("ul",[s("li",[a._v("acks = 0\n"),s("ul",[s("li",[a._v("生产者不等待broker的任何消息确认。只要将消息放到了socket的缓冲区，就认为消息已发送")]),a._v(" "),s("li",[a._v("retries【配置重试参数】 设置也不起作用，因为客户端不关心消息是否发送失败。")])])]),a._v(" "),s("li",[a._v("acks = 1\n"),s("ul",[s("li",[a._v("leader分区 将记录写到它本地日志，就响应客户端确认消息，而不等待follower副本的确认。")]),a._v(" "),s("li",[a._v("如果leader确认了消息就宕机，则可能会丢失消息，因为follower副本可能还没来得及同步该消息。")])])]),a._v(" "),s("li",[a._v("acks = all (-1)\n"),s("ul",[s("li",[a._v("leader等待所有同步的副本确认该消息。保证了只要有一个同步副本存在，消息就不会丢失。这是最强的可用性保证")])])])]),a._v(" "),s("p",[a._v("::"),s("strong",[a._v("最小同步副本")]),a._v("::")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/165988882",target:"_blank",rel:"noopener noreferrer"}},[a._v("Kafka生产者ack机制剖析 - 知乎"),s("OutboundLink")],1)]),a._v(" "),s("h2",{attrs:{id:"重试机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重试机制"}},[a._v("#")]),a._v(" 重试机制")]),a._v(" "),s("blockquote",[s("p",[a._v("Kafka 提供了生成消息时，可以设置对失败消息进行重试的机制")])]),a._v(" "),s("p",[s("strong",[a._v("核心参数")])]),a._v(" "),s("ul",[s("li",[a._v("retries：重试次数")]),a._v(" "),s("li",[a._v("retry.backoff.ms：间隔多少时间重试一次")])]),a._v(" "),s("p",[s("strong",[a._v("注")]),a._v("  Kafka 中 重试机制 会破坏原有的顺序消费，如果需要保证顺序消费。如果原本需要顺序发送的信息，失败后会变成异步定时发送，特殊情况会影响原有的前后顺序")]),a._v(" "),s("p",[s("strong",[a._v("解决方式")]),a._v("\n需要进行设置 "),s("code",[a._v("max.in.flight.requests.per.connection")]),a._v(" 参数。 该参数 是指定服务器每次可以发送消息的批次数，当设置为 1 时，则每次只能有一个批次进行发送，当出现发送失败重试时，则会堵塞请求队列")])])}),[],!1,null,null,null);t.default=n.exports}}]);