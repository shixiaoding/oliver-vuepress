(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{561:function(_,v,e){"use strict";e.r(v);var t=e(9),s=Object(t.a)({},(function(){var _=this,v=_.$createElement,e=_._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("blockquote",[e("p",[e("code",[_._v("Redis")]),_._v(" 集群是 Redis 提供的分布式数据库方案，集群通过 "),e("code",[_._v("分片")]),_._v("(sharding) 来进行数据共享,并提供了 复制 和 故障转移的功能")]),_._v(" "),e("p",[_._v("Redis 集群 是无中心的")])]),_._v(" "),e("p",[e("strong",[_._v("不同模式的解决了什么问题")])]),_._v(" "),e("ul",[e("li",[_._v("主从复制：实现读写分离，提高服务的可用性，实现灾备，当主节点故障时，可以进行手动切换节点。")]),_._v(" "),e("li",[_._v("主从 + 哨兵：在实现读写分离的情况下，通过 哨兵 可以实现 节点故障转移")]),_._v(" "),e("li",[_._v("集群：在解决了读写分离、故障转移同时\n"),e("ul",[e("li",[_._v("通过 分片 将不同的数据，存储在不同的节点上，解决了 主从 + 哨兵情况下的单机存储达到瓶颈的情况，并且 让 Redis 具备了集群扩容的能力")]),_._v(" "),e("li",[_._v("各个节点内部自己存储的集群信息，减少 哨兵集群的使用，节省了一定资源")])])])]),_._v(" "),e("h2",{attrs:{id:"节点的数据结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#节点的数据结构"}},[_._v("#")]),_._v(" 节点的数据结构")]),_._v(" "),e("blockquote",[e("p",[_._v("一 个 节点就 是一个 运 行 在 集群模式 下 的 Redis 服务器， Redis 服务器在启动时会根据 "),e("code",[_._v("cluster - enabled")]),_._v(" 配置选项是否为 "),e("code",[_._v("yes")]),_._v("来决定 是否  开启服务器的 集群模式, 并会创建响应的数据结构")])]),_._v(" "),e("ul",[e("li",[e("strong",[_._v("clusterNode")]),_._v(" ：每个节点都会创建一个，用于保存节点的基本信息")]),_._v(" "),e("li",[e("strong",[_._v("clusterLink")]),_._v("： 保存 当前节点 锁连接的其他节点的 套接字 、输入/输出缓存区")]),_._v(" "),e("li",[e("strong",[_._v("clusterState")]),_._v("：记录了在当前节点的视角下,集群中的节点目前所处的状态")])]),_._v(" "),e("img",{attrs:{src:_.$withBase("/middleware/redislearn/image-20220418225925088.png"),alt:"foo"}}),_._v(" "),e("h2",{attrs:{id:"节点的启动过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#节点的启动过程"}},[_._v("#")]),_._v(" 节点的启动过程")]),_._v(" "),e("p",[_._v("​\t 节点注册的命令:  "),e("code",[_._v("CLUSTER MEET <ip> <port>")])]),_._v(" "),e("img",{attrs:{src:_.$withBase("/middleware/redislearn/image-20220418231625953.png"),alt:"foo"}}),_._v(" "),e("p",[e("strong",[_._v("通过向"),e("code",[_._v("Node1")]),_._v("节点  发 送 CLUSTER MEET 命令，客户端可以让接收命令的  "),e("code",[_._v("Node1")]),_._v("节点  将另一个  "),e("code",[_._v("Node2")]),_._v("节点添加到 "),e("code",[_._v("Node1")]),_._v("节点  当前所在的集群里面：")])]),_._v(" "),e("ol",[e("li",[e("strong",[_._v("Node1")]),_._v("  会为 "),e("strong",[_._v("Node2")]),_._v(" 创建一个 "),e("code",[_._v("clusterNode")]),_._v(" 存入 自己的 "),e("code",[_._v("clusterState.nodes")])]),_._v(" "),e("li",[_._v("Node1 向 Node2 发送一个  "),e("code",[_._v("CLUSTER MEET")]),_._v(" ， 让 Node2 也创建 一个 "),e("code",[_._v("clusterNode")]),_._v(" 存入 自己的 "),e("code",[_._v("clusterState.nodes")])]),_._v(" "),e("li",[e("strong",[_._v("Node2")]),_._v(" 向 "),e("strong",[_._v("Node1")]),_._v(" 返回一个 "),e("code",[_._v("PONG")]),_._v("消息")]),_._v(" "),e("li",[_._v("如何接送顺利，则 Node1 会返回 Node2 一条 PING 消息")]),_._v(" "),e("li",[_._v("两个节点都获取到相应的响应信息 则任务服务器牵手成功")])]),_._v(" "),e("h2",{attrs:{id:"槽指派"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#槽指派"}},[_._v("#")]),_._v(" 槽指派")]),_._v(" "),e("blockquote",[e("p",[_._v("Redis集群通过分片的方式来保存数据库中的键值对， 整个集群分为  "),e("strong",[_._v("16384")]),_._v(" 个槽（slot）")]),_._v(" "),e("p",[_._v("只有对 16384 个槽都指派了，集群就会进入上线状态")])]),_._v(" "),e("ul",[e("li",[_._v("clusterNode.slots： 记录当前节点负责 的 槽 ： [00101011, 00010101, ..., 11010111] ；\n"),e("ul",[e("li",[_._v("二进制位的值为1，则为节点负责的槽")]),_._v(" "),e("li",[_._v("二进制位的值为1，则为节点不负责的槽")])])])]),_._v(" "),e("img",{attrs:{src:_.$withBase("/middleware/redislearn/image-20220418232410198.png"),alt:"foo"}}),_._v(" "),e("ul",[e("li",[_._v("clusterState.slots ：记录集群全局 的槽指派信息： [node3, node2, node3, ..., node1]\n"),e("ul",[e("li",[_._v("通过全局的操作指派信息，每个节点都能知道 不是我负责的槽 需要指派给 那个节点去处理了")])])])]),_._v(" "),e("img",{attrs:{src:_.$withBase("/middleware/redislearn/image-20220418232634292.png"),alt:"foo"}}),_._v(" "),e("p",[e("strong",[_._v("为节点指派槽")]),_._v("："),e("code",[_._v("CLUSTER ADDSLOTS <slot> [slot ...]")])]),_._v(" "),e("h2",{attrs:{id:"集群中的命令执行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#集群中的命令执行"}},[_._v("#")]),_._v(" 集群中的命令执行")]),_._v(" "),e("img",{attrs:{src:_.$withBase("/middleware/redislearn/image-20220418233306347.png"),alt:"foo"}}),_._v(" "),e("p",[e("strong",[_._v("MOVED 错误")])]),_._v(" "),e("p",[_._v("命令执行的过程中，如果不是该节点 负责该槽的操作的话，节点会向客户端返回 MOVED错误")]),_._v(" "),e("p",[_._v("客户端会根据 MOVED 错误 返回的 ip 和 端口号，转向 该节点去执行响应的命令 （Redis-cli 会自通过 MOVED 错误 进行转换到相应的节点，我们用户端是看不到节点返回的1 MOVED错误）")]),_._v(" "),e("h2",{attrs:{id:"集群中的过期元素"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#集群中的过期元素"}},[_._v("#")]),_._v(" 集群中的过期元素")]),_._v(" "),e("blockquote",[e("p",[_._v("在 clusterState 中使用  .slots_to_keys 跳跃表来保存槽 和 键值的关系")])]),_._v(" "),e("ul",[e("li",[_._v("新增数据时：会在跳跃表中创建一个元素，score：是槽位。 value 存放键")]),_._v(" "),e("li",[_._v("节点元素过期时:  可以通过 slots_to_keys 进行确认需要删除元素的位置")])]),_._v(" "),e("p",[_._v("也可以通过  "),e("code",[_._v("slots_to_keys")]),_._v(" 完成 统计出 槽slot 中存放了多少个键")]),_._v(" "),e("h2",{attrs:{id:"重新分片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重新分片"}},[_._v("#")]),_._v(" 重新分片")]),_._v(" "),e("blockquote",[e("p",[e("code",[_._v("重新分片")]),_._v(" Redis 支持将已经分配的槽，重新指派给某个节点，并且相关槽上的键值对 也会被转移到新的节点上。")]),_._v(" "),e("p",[_._v("这个 "),e("code",[_._v("重新分片")]),_._v(" 的过程 可以在不下线的情况下进行")])]),_._v(" "),e("p",[_._v("Redis 使用 Redis扩展： "),e("code",[_._v("Redis-trib")]),_._v(" 来完成重新分片的过程")]),_._v(" "),e("p",[_._v("实现原理：")]),_._v(" "),e("ul",[e("li",[_._v("目标节点\n"),e("ul",[e("li",[_._v("会通过 "),e("code",[_._v("importing_slots_from")]),_._v(" 数组 记录槽 锁对应的 "),e("code",[_._v("clusterNode")]),_._v(", 用于标识该槽点正在被迁移")]),_._v(" "),e("li",[_._v("当 "),e("code",[_._v("importing_slots_from == null")]),_._v(" 则标识没有分片在进行")])])]),_._v(" "),e("li",[_._v("源节点：\n"),e("ul",[e("li",[_._v("会通过 "),e("code",[_._v("migrating_slots_to")]),_._v(" 数组 记录槽 所对应的 "),e("code",[_._v("clusterNode （）")]),_._v(", 用于标识该槽点正在被迁移")]),_._v(" "),e("li",[_._v("当 "),e("code",[_._v("migrating_slots_to == null")]),_._v(" 则标识没有分片在进行")])])])]),_._v(" "),e("p",[e("strong",[_._v("ASK错误")])]),_._v(" "),e("blockquote",[e("p",[_._v("在重新分⽚未完成时，如果源节点接收到请求，且命令中的key已经被迁移到了⽬标节点，就会出现ASK错误。")])]),_._v(" "),e("img",{attrs:{src:_.$withBase("/middleware/redislearn/image-20220419095202338.png"),alt:"foo"}}),_._v(" "),e("p",[e("strong",[_._v("ASKING命令")])]),_._v(" "),e("ul",[e("li",[_._v("当 客户端请求的key 在 迁移的槽中，则会返回ASK错误，同时会为客户端加上 "),e("code",[_._v("REDIS_ASKING")]),_._v(" 标识")]),_._v(" "),e("li",[_._v("客户端 会向 迁移节点 先发送  ASKING命令 后 在进行 key的相关操作")]),_._v(" "),e("li",[_._v("客户端的   "),e("code",[_._v("REDIS_ASKING")]),_._v(" 标识 是一次性的（不影响后续操作）")])]),_._v(" "),e("h2",{attrs:{id:"故障转移"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#故障转移"}},[_._v("#")]),_._v(" 故障转移")]),_._v(" "),e("h3",{attrs:{id:"复制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#复制"}},[_._v("#")]),_._v(" 复制")]),_._v(" "),e("p",[e("strong",[_._v("设置从节点")])]),_._v(" "),e("p",[_._v("向主节点发送 CLUSTER REPLICATE <node_id> 命令 设置从节点")]),_._v(" "),e("ul",[e("li",[_._v("1、从 将 clusterState.nodes字典 找到 对应的 node_id 节点  clusterState.myself.slaveof 指针 指向 主节点")]),_._v(" "),e("li",[_._v("2、将自己 clusterState.myself.flags 属性 设置为  REDIS_NODE_SLAVE标识")]),_._v(" "),e("li",[_._v("3、调用复制代码 进行 主从复制 相当于 是从节点 向 主节点 发送 slaveOF 命令")])]),_._v(" "),e("p",[e("strong",[_._v("主节点")])]),_._v(" "),e("p",[_._v("都会通过 ClusterNode 记录，该主节点下 的从节点数量（numslaves），和 从节点地址（slaves）")]),_._v(" "),e("h3",{attrs:{id:"故障检测"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#故障检测"}},[_._v("#")]),_._v(" 故障检测")]),_._v(" "),e("blockquote",[e("p",[_._v("主要分为2个阶段：疑似下线、正式下线"),e("br"),_._v("\n判断方式：单机认为下线，先标识为 疑似下线，多数集群节点认为是下线，则为正式下线")])]),_._v(" "),e("p",[e("strong",[_._v("所有的主节点，都会相互定时发送 PING 消息，检测对⽅是否在线。并且会分享检测信息。如果半数以上的主节点都认为某节点疑似下线，那么他就会被标记为下线")])]),_._v(" "),e("h3",{attrs:{id:"故障转移-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#故障转移-2"}},[_._v("#")]),_._v(" 故障转移")]),_._v(" "),e("p",[e("strong",[_._v("故障转移过程")])]),_._v(" "),e("ol",[e("li",[e("p",[_._v("复制下线主节点的所有从节点里面，会有个从节点被选中；")])]),_._v(" "),e("li",[e("p",[_._v("被选中的从节点会执行SLAVEOF 命令成为新的主节点；")])]),_._v(" "),e("li",[e("p",[_._v("新的主节点会撤销所有对已下线主节点的槽指派，并将这些槽全部指派给自己")])]),_._v(" "),e("li",[e("p",[_._v("新的主节点向集群广播一条PONE消息，高坠自己变为主节点")])]),_._v(" "),e("li",[e("p",[_._v("新的主节点开始工作")])])]),_._v(" "),e("p",[e("strong",[_._v("选举过程")])]),_._v(" "),e("ol",[e("li",[e("p",[_._v("集群的配置纪元是一个自增计数器，它的初始值为0；")])]),_._v(" "),e("li",[e("p",[_._v("当集群里的某个节点开始一次故障转移操作时，集群配置纪元的值会被增一；")])]),_._v(" "),e("li",[e("p",[_._v("对于每个配置纪元，集群里每个负责处理槽的主节点都有一次投票的机会，而第一个向主节点要求投票的从节点将获得主\n节点的投票；")])]),_._v(" "),e("li",[e("p",[_._v("当从节点发现自己正在复制的主节点进入已下线状态时，从节点会向集群广播一条消息，要求所有收到这条消息，并且具\n有投票权的主节点向这个从节点投票；")])]),_._v(" "),e("li",[e("p",[_._v("如果一个主节点具有投票权，并且这个主节点尚未投票给其他从节点，那么主节点将向要求投票的从节点返回一条消息，\n标识这个主节点支持从节点成为新的主节点；")])]),_._v(" "),e("li",[e("p",[_._v("每个参与选举的从节点都会接收消息，并根据自己收到了多少条这种消息来统计自己获得了多少主节点的支持；")])]),_._v(" "),e("li",[e("p",[_._v("如果集群里有N个具有投票权的主节点，那么当一个从节点收集到大于等于N/2 + 1张支持票时，这个从节点就会当选为新\n的主节点；")])]),_._v(" "),e("li",[e("p",[_._v("因为在每个配置纪元里面，每个具有投票权的主节点只能投一次票，所以如果有N个主节点进行投票，那么具有大于等于\nN/2 + 1张支持票的从节点只会有一个，这确保了新的主节点只会有一个。")])]),_._v(" "),e("li",[e("p",[_._v("如果再一个配置及原理没有从节点能收集到足够多的支持票，那么集群进入一个新的配置及原，并再次进行选举，直到选\n出新的主节点为止。")])])])])}),[],!1,null,null,null);v.default=s.exports}}]);