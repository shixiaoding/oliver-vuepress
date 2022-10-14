(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{593:function(t,s,a){"use strict";a.r(s);var n=a(17),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"消费者-消费者组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#消费者-消费者组"}},[t._v("#")]),t._v(" 消费者 & 消费者组")]),t._v(" "),a("p",[a("strong",[t._v("消费者简介")]),t._v("\n消费者 通过 订阅主题，进行消费消息。消费者自己维护这消费消息的偏移量，存储在 kafka 主题 "),a("code",[t._v("__consumer_offsets")]),t._v("   中\n消费者 也提供将自己的偏移量存储在 "),a("code",[t._v("Zookeeper")]),t._v("  中,  需要设置 "),a("code",[t._v("置offset.storage=zookeeper")]),t._v("\n消费者 可以被分配一个主题的多个分区进行消费，同一个分区内的消息，能保证顺序消费\n"),a("strong",[t._v("注：")]),t._v(" Zookeeper 不适合高并发")]),t._v(" "),a("p",[a("strong",[t._v("消费者组")]),t._v("\n通过 设置 同一个 "),a("code",[t._v("group_id")]),t._v("  将 多个消费者 加入同一个消费者组\n消费组能均衡的给消费者分配一个主题中的分区，确保一个主题的分区在该消费组中 只能分配给一个消费者进行消费")]),t._v(" "),a("p",[a("strong",[t._v("kafka广播和点对点模式")])]),t._v(" "),a("ul",[a("li",[t._v("kafka中的广播模式：即 设定 多个消费组，不同的消费组中的消费者 能同时消费 同一个主题")]),t._v(" "),a("li",[t._v("点对点模式：即 只设定一个消费组进行消费指定的主题")])]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/kafka/consumer1.jpg"),alt:"foo"}}),t._v(" "),a("p",[a("strong",[t._v("如何提高消费组的消费能力？")]),t._v("\n可以通过 添加消费者来进行增加并发的消费能力，前提 主题分区数 >= 消费者数量\n当消费者数量大于 分区数时 则是对消费能力的浪费")]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/kafka/consumer2.jpg"),alt:"foo"}}),t._v(" "),a("h2",{attrs:{id:"消费者的心跳机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#消费者的心跳机制"}},[t._v("#")]),t._v(" 消费者的心跳机制")]),t._v(" "),a("blockquote",[a("p",[t._v("Kafka 的心跳是 Kafka Consumer 和 Broker 之间的健康检查，只有当 Broker Coordinator 正常时，Consumer 才会发送心跳。")])]),t._v(" "),a("p",[a("strong",[t._v("消费者核心心跳参数")])]),t._v(" "),a("ul",[a("li",[t._v("session.timeout.ms：  默认值是：10000 （10s）【Consumer Seesion 过期时间 - 即心跳超时时间】")]),t._v(" "),a("li",[t._v("heartbeat.interval.ms： 默认值是：3000 （3s） 【心跳间隔 - 每几秒向协调者进行发送心跳】")]),t._v(" "),a("li",[t._v("max.poll.interval.ms:   默认值是：300000 （5分钟）【指定consumer两次poll的最大时间间隔】")])]),t._v(" "),a("p",[a("strong",[t._v("上面的参数")]),t._v(" "),a("code",[t._v("session.timeout.ms")]),t._v("   和 "),a("code",[t._v("heartbeat.interval.ms")]),t._v("   在 10 秒的超时时间内，每3秒触发一次心跳 ， 一般来说 尽可能缩短心跳，以及 尽可能的延长超时时间，这样能够在指定时间内竟可能的多长时间心跳检测，每次心跳操作可能会存在高负载的延时问题 或 心跳丢失等。所以尽可能的合理分配两个参数，让心跳能尽可能的多。但太频繁的心跳，也会影响性能。")]),t._v(" "),a("h3",{attrs:{id:"broker端的检测机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#broker端的检测机制"}},[t._v("#")]),t._v(" Broker端的检测机制")]),t._v(" "),a("p",[t._v("主要通过： session.timeout.ms")]),t._v(" "),a("blockquote",[a("p",[t._v("Broker 处理心跳的逻辑：如果心跳超期， broker coordinator（协调者）会把消费者从 group 中移除，并触发 rebalance。")])]),t._v(" "),a("h3",{attrs:{id:"consumer端的检测机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consumer端的检测机制"}},[t._v("#")]),t._v(" Consumer端的检测机制")]),t._v(" "),a("p",[t._v("主要通过： session.timeout.ms  、max.poll.interval.ms")]),t._v(" "),a("ul",[a("li",[t._v("如果消费者发现自身心跳超期，会标记 broker 协调者 不能用，并堵塞心跳 【 session.timeout.ms】")]),t._v(" "),a("li",[t._v("如果消费者发现自身 poll 消息超过 指定时间，则任务消费者丧失能力，主动 告知 broker 离开消费组")])]),t._v(" "),a("p",[t._v("::注:: 消费者心跳超时后，不管是如何发生的超时，都会触发 "),a("code",[t._v("rebalance")]),t._v("  重平衡操作  "),a("strong",[t._v("(后续详解)")])]),t._v(" "),a("h2",{attrs:{id:"位移提交"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#位移提交"}},[t._v("#")]),t._v(" 位移提交")]),t._v(" "),a("blockquote",[a("p",[t._v("Consumer 需要向Kafka记录自己的位移数据，这个汇报过程称为 提交位移(CommittingOffsets)"),a("br"),t._v("\nConsumer 需要为分配给它的每个分区提交各自的位移数据"),a("br"),t._v("\n位移提交的由Consumer 端负责的，Kafka只负责保管 在 "),a("code",[t._v("__consumer_offsets")]),t._v("  主题中")])]),t._v(" "),a("p",[a("strong",[t._v("位移提交可以分为：")])]),t._v(" "),a("ul",[a("li",[t._v("自动提交")]),t._v(" "),a("li",[t._v("手动提交\n"),a("ul",[a("li",[t._v("同步提交")]),t._v(" "),a("li",[t._v("异步提交")])])])]),t._v(" "),a("h3",{attrs:{id:"自动提交"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动提交"}},[t._v("#")]),t._v(" 自动提交")]),t._v(" "),a("p",[a("strong",[t._v("核心参数")])]),t._v(" "),a("ul",[a("li",[t._v("开启自动提交： enable.auto.commit=true")]),t._v(" "),a("li",[t._v("配置自动提交间隔：Consumer端： auto.commit.interval.ms ，默认 5s")])]),t._v(" "),a("p",[a("strong",[t._v("自动提交有什么好处？")])]),t._v(" "),a("blockquote",[a("p",[t._v("Kafka会保证在开始调用poll方法时，提交上次poll返回的所有消息, 因此自动提交不会出现消息丢失")])]),t._v(" "),a("p",[a("strong",[t._v("自动提交又会带来什么问题？")])]),t._v(" "),a("blockquote",[a("p",[t._v("可能会出现重复消费的问题")])]),t._v(" "),a("p",[t._v("可能会触发的案例：")]),t._v(" "),a("ul",[a("li",[t._v("Consumer 每 5s 提交 offset")]),t._v(" "),a("li",[t._v("假设提交 offset 后的 3s 发生了 Rebalance")]),t._v(" "),a("li",[t._v("Rebalance 之后的所有 Consumer 从上一次提交的 offset 处继续消费")]),t._v(" "),a("li",[t._v("因此 Rebalance 发生前 3s 的消息会被重复消费")])]),t._v(" "),a("h3",{attrs:{id:"手动提交"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#手动提交"}},[t._v("#")]),t._v(" 手动提交")]),t._v(" "),a("p",[t._v("只需要将 参数  "),a("code",[t._v("enable.auto.commit = false")]),t._v("  即 将提交方式设置为 手动提交")]),t._v(" "),a("p",[t._v("手动提交分为：")]),t._v(" "),a("ul",[a("li",[t._v("同步提交  "),a("code",[t._v("consumer.commitSync()")]),a("br"),t._v("\n同步提交，会让 Consumer 处于堵塞状态，会影响 TPS。可以通过选择拉长提交间隔 提高性能 （和自动提交类似，降低了提交的频率，则会触发消息重复消息的问题）")])]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ConsumerRecords")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" records "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n\tconsumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("poll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Duration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ofSeconds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("process")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("records"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理消息")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconsumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("commitSync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CommitFailedException")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理提交失败异常")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("异步提交  "),a("code",[t._v("consumer.commitAsync()")])])]),t._v(" "),a("p",[t._v("由下面代码可见：当异步操作是，发生异常后，服务实现重试操作")]),t._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ConsumerRecords")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" records "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" consumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("poll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3_000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("process")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("records"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理消息")]),t._v("\n\tconsumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("commitAsync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("offsets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exception"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exception "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exception"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("可以使用 "),a("code",[t._v("try ... catch")]),t._v("  的方式在不影响性能的情况下，保证提交的可靠性。毕竟正常情况失败的可能性比较少，如果大批量都失败了，可能是服务出现了问题")]),t._v(" "),a("p",[a("strong",[t._v("优化处理逻辑")])]),t._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ConsumerRecords")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" records "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n\t\tconsumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("poll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Duration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ofSeconds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("process")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("records"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理消息")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("commitAysnc")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用异步提交规避阻塞")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理异常")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconsumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("commitSync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最后一次提交使用同步阻塞式提交")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconsumer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("close")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("相关提交操作案例："),a("a",{attrs:{href:"https://www.cnblogs.com/biehongli/p/14105658.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Kafka的消费者提交方式手动同步提交、和异步提交 - 别先生 - 博客园"),a("OutboundLink")],1)])]),t._v(" "),a("p",[a("strong",[t._v("重点思考：")]),t._v("  我们需要思考  如何即能解决 消息丢失 和 重复消费 呢？")]),t._v(" "),a("h2",{attrs:{id:"再-重均衡-reblance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#再-重均衡-reblance"}},[t._v("#")]),t._v(" 再/重均衡 reblance")]),t._v(" "),a("blockquote",[a("p",[t._v("重平衡其实就是一个协议，它规定了如何让消费者组下的所有消费者来分配topic中的每一个分区。")])]),t._v(" "),a("p",[a("strong",[t._v("重均衡的触发条件：")])]),t._v(" "),a("ol",[a("li",[t._v("消费者组内成员发生变更，这个变更包括了增加和减少消费者，比如消费者宕机退出消费组。")]),t._v(" "),a("li",[t._v("主题的分区数发生变更，kafka目前只支持增加分区，当增加的时候就会触发重平衡")]),t._v(" "),a("li",[t._v("订阅的主题发生变化，当消费者组使用正则表达式订阅主题，而恰好又新建了对应的主题，就 会触发重平衡")])]),t._v(" "),a("p",[a("strong",[t._v("为什么说重平衡为人诟病呢？")])]),t._v(" "),a("blockquote",[a("p",[t._v("因为重平衡过程中，消费者无法从kafka消费消息，这对kafka的TPS 影响极大，而如果kafka集内节点较多，比如数百个，那重平衡可能会耗时极多。数分钟到数小时都有可能，而这段时间kafka基本处于不可用状态。**")])]),t._v(" "),a("blockquote",[a("p",[a("strong",[t._v("要说完全避免重平衡，是不可能，所以我们需要保证尽力避免消费者故障")])])]),t._v(" "),a("p",[t._v("部分情况，可能是负责过高 没来得急心跳 或者网络堵塞 或者是自身消费处理能力不够\n避免重平衡相关的配置：")]),t._v(" "),a("ul",[a("li",[t._v("session.timout.ms：默认10秒  控制心跳超时时间")]),t._v(" "),a("li",[t._v("heartbeat.interval.ms： 默认3秒 控制心跳发送频率 (常见的可能网络抖动 或者 网络延迟等可能 心跳的超时时间要大于 心跳发送频率)")]),t._v(" "),a("li",[t._v("max.poll.interval.ms :  控制poll的间隔。 指定consumer两次poll的最大时间间隔（默认5分钟），如果超过了该间隔consumer client会主动向coordinator发起LeaveGroup请求，触发rebalance")]),t._v(" "),a("li",[t._v("max-poll-records:  150 每次拉取的数据条数 (默认500条）")])]),t._v(" "),a("p",[a("strong",[t._v("总结")])]),t._v(" "),a("ul",[a("li",[t._v("在心跳测：我们可以尽可能的提高 超时时间  "),a("code",[t._v("session.timout.ms")]),t._v(" 和 加快心跳发送频率（heartbeat.interval.ms），让充分多的进行心跳，减少超时的可能")]),t._v(" "),a("li",[t._v("在消费能力侧：通过控制poll的间隔 "),a("code",[t._v("max.poll.interval.ms")]),t._v("  和 每次拉取的条数 "),a("code",[t._v("max-poll-records")]),t._v("  竟可能的在指定的时间内最大化的的保证任务能完成的数量，不要因为每次拉取的数据过多，导致消费不完，而导致的 reblance")]),t._v(" "),a("li",[t._v("自身处理能力侧：可以优化业务逻辑代码 或 使用多线程消费 来提高消费侧的能力，避免一次拉取消费不完的情况")])]),t._v(" "),a("h2",{attrs:{id:"消费组内分区分配策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#消费组内分区分配策略"}},[t._v("#")]),t._v(" 消费组内分区分配策略")]),t._v(" "),a("p",[t._v("三种分配策略：")]),t._v(" "),a("ul",[a("li",[t._v("RangeAssignor  【默认的分配策略】")]),t._v(" "),a("li",[t._v("RoundRobinAssignor")]),t._v(" "),a("li",[t._v("StickyAssignor")]),t._v(" "),a("li",[t._v("自定义分配策略：通过实现 "),a("code",[t._v("org.apache.kafka.clients.consumer.internals.PartitionAssignor")]),t._v("  接口")])]),t._v(" "),a("h3",{attrs:{id:"rangeassignor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rangeassignor"}},[t._v("#")]),t._v(" RangeAssignor")]),t._v(" "),a("blockquote",[a("p",[t._v("RangeAssignor对每个Topic进行独立的分区分配。对于每一个Topic，首先对分区按照分区ID进行数值排序，然后订阅这个Topic的消费组的消费者再进行字典排序，之后尽量均衡的将分区分配给消费者。这里只能是尽量均衡，因为分区数可能无法被消费者数量整除，那么有一些消费者就会多分配到一些分区。"),a("br"),t._v(" "),a("strong",[t._v("总结:")]),t._v(" 首先通过  分区数/消费者 数量进行平均分配。多余的分区数进行顺序挨个往下分配")])]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/kafka/consumer3.jpg"),alt:"foo"}}),t._v(" "),a("p",[a("strong",[t._v("存在的问题")])]),t._v(" "),a("blockquote",[a("p",[t._v("当主题数增加后，可能会造成 字典序靠前的消费组中的消费者比较“贪婪”  即 靠前的消费者 需要消费更的分区数据")])]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/kafka/consumer4.jpg"),alt:"foo"}}),t._v(" "),a("h3",{attrs:{id:"roundrobinassignor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#roundrobinassignor"}},[t._v("#")]),t._v(" RoundRobinAssignor")]),t._v(" "),a("blockquote",[a("p",[t._v("轮询消费：分配策略是将消费组内订阅的所有Topic的分区及所有消费者进行排序后尽量均衡的分配")])]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/kafka/consumer5.jpg"),alt:"foo"}}),t._v(" "),a("h3",{attrs:{id:"stickyassignor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stickyassignor"}},[t._v("#")]),t._v(" StickyAssignor")]),t._v(" "),a("blockquote",[a("p",[t._v("个人理解，后续的分配会更具上过一次分配的结果，进行做间隔分配（往后跳过）几个消费者进行分配")])]),t._v(" "),a("h2",{attrs:{id:"序列化器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#序列化器"}},[t._v("#")]),t._v(" 序列化器")]),t._v(" "),a("blockquote",[a("p",[t._v("Kafka的broker中所有的消息都是字节数组，消费者获取到消息之后，需要先对消息进行反序列化处理，然后才能交给用户程序消费处理。")])]),t._v(" "),a("p",[a("strong",[t._v("自定义序列化器")]),t._v("： 可以通过现 "),a("code",[t._v("org.apache.kafka.common.serialization.Deserializer<T>")]),t._v(" 接口")]),t._v(" "),a("h2",{attrs:{id:"拦截器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拦截器"}},[t._v("#")]),t._v(" 拦截器")]),t._v(" "),a("blockquote",[a("p",[t._v("消费者在拉取了分区消息之后，要首先经过反序列化器对key和value进行反序列化处理。"),a("br"),t._v("\n处理完之后，如果消费端设置了拦截器，则需要经过拦截器的处理之后，才能返回给消费者应用程序进行处理。"),a("br"),t._v("\n::注:: 可以使用多个拦截器，拦截器按顺序执行的")])]),t._v(" "),a("p",[a("strong",[t._v("自定义消息拦截器")]),t._v(" 可以通过实现 "),a("code",[t._v("org.apache.kafka.clients.consumer.ConsumerInterceptor<K, V>")]),t._v(" 接口")]),t._v(" "),a("p",[a("strong",[t._v("常见的拦截器功能：")])]),t._v(" "),a("ul",[a("li",[t._v("允许拦截甚至更改消费者接收到的消息，一般用于定制的监控、日志处理等")])]),t._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ConsumerInterceptor")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("K")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("V")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Configurable")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n\t*\n\t* 该方法在poll方法返回之前调用。调用结束后poll方法就返回消息了。\n\t*\n\t* 该方法可以修改消费者消息，返回新的消息。拦截器可以过滤收到的消息或生成新的消息。\n\t* 如果有多个拦截器，则该方法按照KafkaConsumer的configs中配置的顺序调用。\n\t*\n\t* @param records 由上个拦截器返回的由客户端消费的消息。\n\t*/")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ConsumerRecords")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("K")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("V")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onConsume")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ConsumerRecords")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("K")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("V")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" records"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n\t* 当消费者提交偏移量时，调用该方法。\n\t* 该方法抛出的任何异常调用者都会忽略。\n\t*/")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onCommit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TopicPartition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("OffsetAndMetadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" offsets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("close")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"协调器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#协调器"}},[t._v("#")]),t._v(" 协调器")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://blog.csdn.net/liyiming2017/article/details/82867765",target:"_blank",rel:"noopener noreferrer"}},[t._v("Apache Kafka核心组件和流程-协调器（消费者和组协调器）-设计-原理（入门教程轻松学）_稀有气体的技术博客-CSDN博客_kafka组协调器"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"多线程消费"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多线程消费"}},[t._v("#")]),t._v(" 多线程消费")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://blog.csdn.net/Johnnyz1234/article/details/98318528",target:"_blank",rel:"noopener noreferrer"}},[t._v("正确处理kafka多线程消费的姿势_Johnnie Zhang的专栏-CSDN博客_kafka多线程消费"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/huxi2b/p/6124937.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("【原创】Kafka Consumer多线程实例 - huxihx - 博客园"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://blog.csdn.net/qq_31289187/article/details/81983017",target:"_blank",rel:"noopener noreferrer"}},[t._v("kafka多线程消费_燕少江湖-CSDN博客_kafka多线程消费同一个topic"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/144870495?from_voters_page=true",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用两种多线程模式消费kafka数据 - 知乎"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000018640106",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用多线程增加kafka消费能力 - SegmentFault 思否"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),a("ul",[a("li",[t._v("为什么说 Zookeeper不适合高并发")])])])}),[],!1,null,null,null);s.default=e.exports}}]);