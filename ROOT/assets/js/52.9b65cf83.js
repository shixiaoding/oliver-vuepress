(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{550:function(v,a,s){"use strict";s.r(a);var _=s(9),e=Object(_.a)({},(function(){var v=this,a=v.$createElement,s=v._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[s("h2",{attrs:{id:"redis-的持久化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redis-的持久化"}},[v._v("#")]),v._v(" Redis 的持久化")]),v._v(" "),s("blockquote",[s("p",[v._v("首先我们要明确 Redis 为什么需要持久化？")]),v._v(" "),s("p",[v._v("Redis 持久化 并不是为了 "),s("code",[v._v("保证数据的完全性")]),v._v(",  保证完整性我们完全可以使用 "),s("strong",[v._v("关系型数据库")]),v._v(" 去存储数据。而是为了保证服务 出现故障 或 重启后快速的进行"),s("strong",[v._v("故障恢复")])])]),v._v(" "),s("p",[s("strong",[v._v("持久化的机制")])]),v._v(" "),s("p",[v._v("Redis 提供了两种持久化方式 "),s("code",[v._v("RDB")]),v._v(" 和 "),s("code",[v._v("AOF")])]),v._v(" "),s("h2",{attrs:{id:"rdb"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdb"}},[v._v("#")]),v._v(" RDB")]),v._v(" "),s("h3",{attrs:{id:"什么是rdb"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是rdb"}},[v._v("#")]),v._v(" 什么是RDB?")]),v._v(" "),s("blockquote",[s("p",[v._v("Redis DateBase, 是redis 默认的存储方式，是通过 "),s("code",[v._v("快照")]),v._v(" 完成的，即存储的是某一时刻的数据副本。 所生成的RDB文件是一个经过压缩的二进制文件")])]),v._v(" "),s("p",[s("strong",[v._v("RDB 不关注存储的过程，只关注某一时刻的最终结果数据")])]),v._v(" "),s("h3",{attrs:{id:"触发生成快照时间-或-方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#触发生成快照时间-或-方式"}},[v._v("#")]),v._v(" 触发生成快照时间 或 方式")]),v._v(" "),s("ol",[s("li",[v._v("符合自定义配置（自动间隔保存）的快照规则 （服务有默认配置，可以进行修改）")]),v._v(" "),s("li",[v._v("执行 "),s("code",[v._v("save")]),v._v(" 或 "),s("code",[v._v("bgsave")]),v._v("命令")]),v._v(" "),s("li",[v._v("执行 "),s("code",[v._v("flushall")]),v._v(" 命令")]),v._v(" "),s("li",[v._v("执行主从服务操作 （仅第一次操作时）")])]),v._v(" "),s("p",[s("strong",[v._v("配置自动间隔保存")])]),v._v(" "),s("blockquote",[s("p",[v._v("当redis服务部署完成后就会有默认的生成快照的规则，")]),v._v(" "),s("p",[v._v("在 redis.conf 文件中进行配置: save 多少秒内 数据变了多少")]),v._v(" "),s("p",[v._v("服务器 会使用周期性事件： "),s("code",[v._v("ServerCron")]),v._v(" 每隔 100毫秒 执行一次。验证是否满足配合的规则")])]),v._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[v._v('# 默认 save "" 是注释掉的\nsave "" # 不使用RDB存储 不能主从\n\nsave 900 1          # 表示15分钟（900秒钟）内至少1个键被更改则进行快照。\nsave 300 10         # 表示5分钟（300秒）内至少10个键被更改则进行快照。\nsave 60 10000       # 表示1分钟内至少10000个键被更改则进行快照。\n')])])]),s("p",[s("strong",[v._v("注：")]),v._v(" 在配置文件中 save 命令的配置 其实运行时 和 bgsave 是一样的效果，会由子进程操作")]),v._v(" "),s("p",[v._v("配置文件 Redis 服务启动会存储在 redisServer 中")]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/redisserver-saveparams.png"),alt:"foo"}}),v._v(" "),s("div",{staticClass:"language-c extra-class"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[v._v("\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[v._v("struct")]),v._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[v._v("redisServer")]),v._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("{")]),v._v("     \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[v._v("// 记录保存的条件数组 设置的规则 都已数据形式存放")]),v._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[v._v("struct")]),v._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[v._v("saveparam")]),v._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[v._v("*")]),v._v("saveparams"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("  \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[v._v("// 修改计数器 （从上一次成功执行完 save 操作后 执行的修改次数）   ")]),v._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[v._v("long")]),v._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[v._v("long")]),v._v(" dirty"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("     \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[v._v("// 上一次执行保存的时间   ")]),v._v("\n    time_t lastsave"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("   \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("\n")])])]),s("p",[s("strong",[s("code",[v._v("save")]),v._v(" 和  "),s("code",[v._v("bgsave")]),v._v(" 的区别？")])]),v._v(" "),s("ul",[s("li",[s("p",[v._v("save：是一个同步保存操作,会堵塞redis服务进程,直到rdb文件创建完成为止, 进程堵塞期间不能处理任何命令请求")])]),v._v(" "),s("li",[s("p",[v._v("bgsave: 是一个异步操作，bgsave命令会派生出一个子进程，由子进程负责创建rdb文件，父进程继续处理 redis命令")])])]),v._v(" "),s("h3",{attrs:{id:"生成-和-载入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成-和-载入"}},[v._v("#")]),v._v(" 生成 和 载入")]),v._v(" "),s("h4",{attrs:{id:"生成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成"}},[v._v("#")]),v._v(" 生成")]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/bgsave操作.png"),alt:"foo"}}),v._v(" "),s("ol",[s("li",[v._v("客户端发送 bgsave 命令， Redis父进程首先判断是否有其他正在执行子进程（save | bgsave | bgrewriteaof）, 如果 有则：直接返回，无则：向下执行")]),v._v(" "),s("li",[v._v("父进程执行 fork 操作创建 子进程 （在 fork 期间 父进程会堵塞，不会执行来自客户端的任何命令）")]),v._v(" "),s("li",[v._v('父进程 fork后，bgsave命返回 " Background saving started " 信息并不再阻塞 Redis父进程，可以继续响应其他命令了。')]),v._v(" "),s("li",[v._v("子进程，根据父进程内存快照生成临时RDB文件，完成后替换原来的 RDB 文件，同时发送信息给父进程表示RDB操作完成，父进程则更新统计信息")])]),v._v(" "),s("h4",{attrs:{id:"载入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#载入"}},[v._v("#")]),v._v(" 载入")]),v._v(" "),s("ol",[s("li",[v._v("服务器启动时自动加载检测是否有RDB文件存在")]),v._v(" "),s("li",[v._v("若有则自动再载入RDB文件，在载入期间处于阻塞状态")]),v._v(" "),s("li",[v._v("执行载入操作过，服务则可以对外响应请求")])]),v._v(" "),s("p",[s("strong",[v._v("如果 Reids 开启了 AOF 会优先使用AOF 文件来还原数据库状态")])]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/服务器启动时恢复文件选择.png"),alt:"foo"}}),v._v(" "),s("h3",{attrs:{id:"rdb的文件格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdb的文件格式"}},[v._v("#")]),v._v(" RDB的文件格式")]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/RDB文件格式.png"),alt:"foo"}}),v._v(" "),s("h3",{attrs:{id:"过期键处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过期键处理"}},[v._v("#")]),v._v(" 过期键处理")]),v._v(" "),s("p",[s("strong",[v._v("生成RDB文件时")])]),v._v(" "),s("p",[v._v("对于 已过期的键，将不会被保存到 新创建的 RDB文件中")]),v._v(" "),s("p",[s("strong",[v._v("载入RDB文件时")])]),v._v(" "),s("ul",[s("li",[v._v("主服务器模式：\n"),s("ul",[s("li",[v._v("过期键会被忽略")])])]),v._v(" "),s("li",[v._v("从服务器模式：\n"),s("ul",[s("li",[v._v("会将 RDB中的所有键（包含 过期键）都恢复，因为 主从同步、会从服务器的数据清空")])])])]),v._v(" "),s("h2",{attrs:{id:"aof"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aof"}},[v._v("#")]),v._v(" AOF")]),v._v(" "),s("blockquote",[s("p",[s("code",[v._v("AOF (Append Only File)")]),v._v(" 持久化功能，默认是不开启的，"),s("code",[v._v("AOF")]),v._v("持久化是通过保存 Redis所有的执行写入命令。 这样 Redis 重启后 只要按照顺序回访这些命令就会恢复到原始状态")]),v._v(" "),s("p",[s("strong",[v._v("AOF")]),v._v(" 和 "),s("strong",[v._v("RDB")]),v._v(" 都开启了，redis重启的时候，也是优先通过 "),s("strong",[v._v("AOF")]),v._v("进行数据恢复的，因为"),s("strong",[v._v("AOF")]),v._v(" 数据比较完整")]),v._v(" "),s("p",[v._v("AOF 持久化功能的实现 可以分为 "),s("code",[v._v("命令追加")]),v._v("、"),s("code",[v._v("文件写入")]),v._v("、"),s("code",[v._v("文件同步")])])]),v._v(" "),s("h3",{attrs:{id:"文件写入-和-保存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件写入-和-保存"}},[v._v("#")]),v._v(" 文件写入 和 保存")]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/AOF持久化文件的生成.png"),alt:"foo"}}),v._v(" "),s("center",[v._v("AOF持久化文件的生成")]),v._v(" "),s("p",[v._v("简单的可以理解为，每当client 端执行，非查询命令时，就会将其执行的命令，追加到 AOF 文件中")]),v._v(" "),s("center",[s("font",{attrs:{color:"red"}},[v._v("具体流程")])],1),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/AOF具体流程.png"),alt:"foo"}}),v._v(" "),s("ol",[s("li",[v._v("命令追加：服务器每执行一次写命令都会以 协议格式 将执行的写命令追加到 "),s("code",[v._v("aof_buf")]),v._v(" 缓冲区的尾部")]),v._v(" "),s("li",[v._v("根据设定的规则，会进行异步将数据刷入磁盘中")])]),v._v(" "),s("p",[s("strong",[v._v("AOF 的 save/fsync 策略")])]),v._v(" "),s("p",[v._v("有三种：")]),v._v(" "),s("ul",[s("li",[v._v("always: 每次写入数据，就立即将数据刷入磁盘")]),v._v(" "),s("li",[v._v("everysec: 每隔1秒，将数据从 os cache 中写入磁盘 （每秒都是通过 fork 子进程进行写入）")]),v._v(" "),s("li",[v._v("no：仅写入 os cache, 不会写入磁盘，然后根据系统自身的策略来决定什么时候刷入磁盘")])]),v._v(" "),s("p",[v._v("Redis默认配置： "),s("code",[v._v("everysec")])]),v._v(" "),s("h3",{attrs:{id:"数据恢复"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据恢复"}},[v._v("#")]),v._v(" 数据恢复")]),v._v(" "),s("blockquote",[s("p",[v._v("AOF 恢复的过程相当简单，因为AOF文件里面包含了重建数据状态所需的所有写的命令，只需要服务根据顺序读入并重写执行一遍AOF文件里面所有的写命令即可")])]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/AOF数据恢复.png"),alt:"foo"}}),v._v(" "),s("h3",{attrs:{id:"文件重写"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件重写"}},[v._v("#")]),v._v(" 文件重写")]),v._v(" "),s("p",[s("strong",[v._v("为什么要重写")])]),v._v(" "),s("p",[v._v("随着命令的不断写入，数据会越来越多，文件会越来越大，所以需要瘦身，这样的好处在于，去除重复命令，较少数据，数据恢复时，熟读更快")]),v._v(" "),s("p",[s("strong",[v._v("重写那些命令")])]),v._v(" "),s("blockquote",[s("p",[v._v("将同一个key 的多条写入命令，重构成一条命令")])]),v._v(" "),s("p",[s("strong",[v._v("重写的配置 和 启动方式")])]),v._v(" "),s("ol",[s("li",[v._v("设置重写配置  "),s("code",[v._v("redis.conf")]),v._v(" 进行配置")])]),v._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[v._v("# 表示当前aof文件大小超过上一次aof文件大小的百分之多少的时候会进行重写。如果之前没有重写过，以")]),v._v("\n启动时aof文件大小为准\nauto-aof-rewrite-percentage "),s("span",{pre:!0,attrs:{class:"token number"}},[v._v("100")]),v._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[v._v("# 限制允许重写最小aof文件大小，也就是文件大小小于64mb的时候，不需要进行优化")]),v._v("\nauto-aof-rewrite-min-size 64mb\n\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[v._v("也可以通过手动输入 "),s("code",[v._v("bgrewriteaof")]),v._v(" 命令 进行执行")])]),v._v(" "),s("p",[s("strong",[v._v("具体执行流程")])]),v._v(" "),s("img",{attrs:{src:v.$withBase("/middleware/redislearn/AOF文件重写.png"),alt:"foo"}}),v._v(" "),s("ol",[s("li",[v._v("AOF文件大小超过配置的最大值时，会触发AOF文件的 "),s("code",[v._v("rewrite")]),v._v(" 执行bgrewriteaof命令")]),v._v(" "),s("li",[v._v("redis进程会fork一个子进程，子进程会带有主进程的数据副本，来构建新的AOF文件")]),v._v(" "),s("li",[v._v("在rewrite期间，redis主进程会记录新的写入命令，并会开启AOF重写缓存")]),v._v(" "),s("li",[v._v("子进程完成AOF重写之后，会向主进程发送一个完成信号")]),v._v(" "),s("li",[v._v("主进程收到完成信号后，会将缓存池中的数据全部写入新的AOF文件中，对新的AOF文件改名，替换原有的AOF文件")])]),v._v(" "),s("h3",{attrs:{id:"过期键处理-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过期键处理-2"}},[v._v("#")]),v._v(" 过期键处理")]),v._v(" "),s("p",[s("strong",[v._v("写入AOF文件时")])]),v._v(" "),s("ul",[s("li",[v._v("过期，但未被 惰性删除 或 定期删除： 则不会产生任何影响")]),v._v(" "),s("li",[v._v("过期， 被执行 惰性删除 或 定期删除： 则会想 AOF 追加一条 "),s("code",[v._v("DEL message")]),v._v(" 命令")])]),v._v(" "),s("p",[s("strong",[v._v("AOF重写")])]),v._v(" "),s("p",[v._v("已过期的键 不会被写到 新的AOF文件中")]),v._v(" "),s("p",[s("strong",[v._v("主从复制时")])]),v._v(" "),s("ul",[s("li",[v._v("主服务器： 删除一个过期键时，会同步发送信息给 从服务器删除")]),v._v(" "),s("li",[v._v("从服务器：那么键过期也不会进行删除，只有接收到主服务器发送来的 删除信息 从服务器才会删除 (保持主从一致)")])]),v._v(" "),s("h3",{attrs:{id:"相关问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#相关问题"}},[v._v("#")]),v._v(" 相关问题")]),v._v(" "),s("h4",{attrs:{id:"aof重写-一定会是重写成一条吗"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aof重写-一定会是重写成一条吗"}},[v._v("#")]),v._v(" AOF重写 一定会是重写成一条吗?")]),v._v(" "),s("p",[v._v("一般情况下都会重写成一条")]),v._v(" "),s("p",[v._v("但是有两种情况会生成多条：")]),v._v(" "),s("p",[v._v("1、当执行 AOF文件重写时，由于 新的aof文件内容 = 重写后的 aof文件数据  + 重写时新增的缓冲区数据  （当 重写时，正好又有对相关key 进行操作时，则会在最后合并时存在多条）")]),v._v(" "),s("p",[v._v("2、为了保证 "),s("code",[v._v("客户端输入缓存池溢出")]),v._v(" （即一次操作过多的元素), Redis 设置了 指定参数 "),s("code",[v._v("REDIS_AOF_REWRITE_ITEMS_PER_CMD")]),v._v(" = 64。 重写时会对 （列表、哈希表、集合、有序集合） 进行元素数量检测，超过改设置，则会拆分成多条")]),v._v(" "),s("h4",{attrs:{id:"aof-重写使用子线程的好处？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aof-重写使用子线程的好处？"}},[v._v("#")]),v._v(" AOF 重写使用子线程的好处？")]),v._v(" "),s("ul",[s("li",[v._v("子线程的好处，避免锁、保证了数据的安全性")])]),v._v(" "),s("h2",{attrs:{id:"rdb-和-aof-两者的优缺点："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdb-和-aof-两者的优缺点："}},[v._v("#")]),v._v(" RDB 和 AOF 两者的优缺点：")]),v._v(" "),s("h4",{attrs:{id:"rdb-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdb-2"}},[v._v("#")]),v._v(" RDB")]),v._v(" "),s("ul",[s("li",[v._v("优点；\n"),s("ul",[s("li",[v._v("RDB 会生成多个数据文件，是更具某一时刻的redis数据，非常适合做冷备份")]),v._v(" "),s("li",[v._v("RDB 是二进制压缩文件，占用空间小，便于传输")]),v._v(" "),s("li",[v._v("RDB 对redis对外提供的读写服务, 影响非常小，可以让redis保持高性能，因为主进程只需要fork一个子进程，子进程来处理RDB持久化")]),v._v(" "),s("li",[v._v("RDB 存放的是一份数据文件，恢复时，直接加载到内存中即可 （恢复过程更快）")])])]),v._v(" "),s("li",[v._v("缺点:\n"),s("ul",[s("li",[v._v("RDB 因为是存储的某个时刻的数据，不能保证数据的完整性")]),v._v(" "),s("li",[v._v("如果 fork的子进程，数据文件特别大时，可能会导致暂停数毫秒或秒")])])])]),v._v(" "),s("h4",{attrs:{id:"aof-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aof-2"}},[v._v("#")]),v._v(" AOF")]),v._v(" "),s("ul",[s("li",[v._v("优点：\n"),s("ul",[s("li",[v._v("AOF 可以更好的保证数据的完整性，不丢失数据，一般AOF 会每隔1秒进行fsync操作，最多丢失一秒的数据")]),v._v(" "),s("li",[v._v("AOF 日志文件以 "),s("code",[v._v("append-only")]),v._v(" 模式写入，对磁盘寻址没有任何开销，写入性能高，文件不易破损，即使尾部破损，也容易恢复")]),v._v(" "),s("li",[v._v("AOF 文件过大，出现后台重写时，也不会用影响客户端的读写操作")]),v._v(" "),s("li",[v._v("AOF 日志文件是记录所有的命令，所有非常适合做灾难性的误删除的紧急恢复 （当不小心用了flushall命令时，只要后台rewrite 还没发生，就能通过AOF文件，将数据都回访回去）")])])]),v._v(" "),s("li",[v._v("缺点：\n"),s("ul",[s("li",[v._v("AOF日志文件 通常比 RDB数据快照要更大")]),v._v(" "),s("li",[v._v("AOF开启后的 写的QPS 会 比 RDB 的QPS低 （因为AOF每秒 fsync 一次，对性能的影响还是很大的）")]),v._v(" "),s("li",[v._v("做恢复时，会比较慢（需要回放和执行指令）")]),v._v(" "),s("li",[v._v("不方便做定期备份和 冷备份，需要手写脚本去恢复数据")])])])])],1)}),[],!1,null,null,null);a.default=e.exports}}]);