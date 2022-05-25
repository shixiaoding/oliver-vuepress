(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{547:function(t,s,_){"use strict";_.r(s);var v=_(9),a=Object(v.a)({},(function(){var t=this,s=t.$createElement,_=t._self._c||s;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("blockquote",[_("p",[t._v("Redis 服务器 是典型的一对多服务器程序，通过 使用 I/O 多路复用技术 实现了 事件处理")]),t._v(" "),_("p",[t._v("Redis客户端：每个与 服务端 需要建立连接的客户端，服务端都会为其建立响应的 "),_("code",[t._v("redis.h/redisClient结构")]),t._v("  用于保存客户端信息")])]),t._v(" "),_("h2",{attrs:{id:"客户端"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#客户端"}},[t._v("#")]),t._v(" 客户端")]),t._v(" "),_("img",{attrs:{src:t.$withBase("/middleware/redislearn/image-20220403164219355.png"),alt:"foo"}}),t._v(" "),_("ul",[_("li",[t._v("Clients属性：是一个链表，存储这所有连接的服务。每新增一个客户端 都会向 链表尾部添加")])]),t._v(" "),_("p",[_("strong",[t._v("伪客户端")])]),t._v(" "),_("ul",[_("li",[_("p",[t._v("Lua伪客户端：服务器初始化后，就会创建专门执行 Lua命令的客户端，只有服务器关闭Lua伪客户端才会被关闭")])]),t._v(" "),_("li",[_("p",[t._v("AOF伪客户端：服务器启动时，如果存在AOF文件导入，则会创建一个伪客户端，并在载入完数据后，关闭伪客户端")])])]),t._v(" "),_("p",[_("strong",[t._v("关闭客户端的方式")])]),t._v(" "),_("ul",[_("li",[t._v("客户端进程退出或者被杀死")]),t._v(" "),_("li",[t._v("客户端向服务器发送了带有不符合协议格式的命令请求")]),t._v(" "),_("li",[t._v("客户端成为了 "),_("code",[t._v("CLIENT KILL命令")]),t._v(" 的目标")]),t._v(" "),_("li",[t._v("服务器设置了"),_("code",[t._v("timeout配置")]),t._v(" 选项, 当客户端存在 空转时间(空闲为请求服务器的诗句) 超过 timeout设置的值")]),t._v(" "),_("li",[t._v("客户端 命令请求的大小 超过 输入缓存区 限制大小 1G")]),t._v(" "),_("li",[t._v("命令回复的大小 超过 输出缓冲区大小 ("),_("strong",[t._v("硬性限制")]),t._v(" )")]),t._v(" "),_("li",[t._v("命令回复的大小 超过  软性限制所设置的大小,但还没超过硬性限制 ("),_("strong",[t._v("软性限制")]),t._v(")。\n"),_("ul",[_("li",[t._v("在指定的时间内 不在超过 软性限制 则 客户端不会关闭")])])])]),t._v(" "),_("h3",{attrs:{id:"客户端属性"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#客户端属性"}},[t._v("#")]),t._v(" 客户端属性")]),t._v(" "),_("div",{staticClass:"language-c extra-class"},[_("pre",{pre:!0,attrs:{class:"language-c"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("redisClient")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("    \n    "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" fd"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \t\t\t\t "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 客户端标识符 ")]),t._v("\n    robj "),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("name；  \t\t\t  "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 名字")]),t._v("\n    "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" flags"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 记录客户端角色")]),t._v("\n    sds querybuf"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \t\t\t "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输入缓存区")]),t._v("\n    robj "),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("argv"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 命令与命令参数数组")]),t._v("\n    "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" argc"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t\t "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 命令参数数组元素个数")]),t._v("\n    redisCommand "),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("cmd    "),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 命令 对应的操作函数")]),t._v("\n    "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" buf"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("EDIS_REPLY_CHUNK_BYTES"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出缓冲区 - 固定大小缓冲区")]),t._v("\n    "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" bufpos"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出缓冲区 - 元素个数")]),t._v("\n    list "),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("reply"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出缓冲区 - 可变大小缓冲区")]),t._v("\n    "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" authenticated"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t\t\t\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 身份验证")]),t._v("\n    time_t ctime"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建客户端的时间")]),t._v("\n    time_t lastinteraction"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t\t\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最后一次和服务器交互的时间")]),t._v("\n    time_t obuf_soft_limit_reached_t"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\t\t\t"),_("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一次到达软性限制的时间")]),t._v("\n")])])]),_("img",{attrs:{src:t.$withBase("/middleware/redislearn/image-20220403193232214.png"),alt:"foo"}}),t._v(" "),_("h3",{attrs:{id:"输入缓冲区"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#输入缓冲区"}},[t._v("#")]),t._v(" 输入缓冲区")]),t._v(" "),_("blockquote",[_("p",[t._v("输入缓冲区 保存客户端发送的命令")])]),t._v(" "),_("p",[t._v("输入缓冲区  支持动态 缩小 或 扩大，但是最大内存不能超过 1G")]),t._v(" "),_("h3",{attrs:{id:"输出缓冲区"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#输出缓冲区"}},[t._v("#")]),t._v(" 输出缓冲区")]),t._v(" "),_("blockquote",[_("p",[t._v("每个客户端都有两个缓冲区： "),_("code",[t._v("固定缓冲区")]),t._v(" 和 "),_("code",[t._v("可变大小缓冲区")])])]),t._v(" "),_("ul",[_("li",[t._v("固定缓冲区(buf): 字符数组\n"),_("ul",[_("li",[t._v("保存长度比较小的回复、OK、简短的字符串、整数值、错误")])])]),t._v(" "),_("li",[t._v("可变大小缓冲区(reply): 链表\n"),_("ul",[_("li",[t._v("非常长的字符串值")])])])]),t._v(" "),_("p",[_("code",[t._v("buf")]),t._v("  数组默认使用 常量 "),_("code",[t._v("REDIS_REPLY_CHUNK_BYTES")]),t._v("  默认为：16*1024 = 16K")]),t._v(" "),_("h2",{attrs:{id:"服务器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务器"}},[t._v("#")]),t._v(" 服务器")]),t._v(" "),_("img",{attrs:{src:t.$withBase("/middleware/redislearn/image-20220403222822821.png"),alt:"foo"}}),t._v(" "),_("p",[_("strong",[t._v("具体流程")])]),t._v(" "),_("ul",[_("li",[_("p",[t._v("请求端")]),t._v(" "),_("ul",[_("li",[t._v("用户 发送命令请求")]),t._v(" "),_("li",[t._v("客户端将这个 命令请求转换成协议格式  将 通过与服务器的套接字（socket）发送命令请求给服务器")])])]),t._v(" "),_("li",[_("p",[t._v("服务端")]),t._v(" "),_("ul",[_("li",[t._v("读取命令请求：\n"),_("ul",[_("li",[t._v("读取 套接字中的协议格式的命令请求 ，将其保存到客户端状态的输入缓冲区中")]),t._v(" "),_("li",[t._v("提起 命令请求中 命令 和 命令参数")]),t._v(" "),_("li",[t._v("调用命令执行器,执行客户端指定的命令\n"),_("ul",[_("li",[t._v("查找命令实现：\n"),_("ul",[_("li",[t._v("他那个个 argv[0] 参数，寻找 命令表中对应的命令，将命令保存到 RedisClient 中 cmd 中 （忽略大小写 查找不受大小写影响）")])])]),t._v(" "),_("li",[t._v("执行预备操作 （在真正执行前，做一下预处理，保证命令能正确、顺利的被执行）\n"),_("ul",[_("li",[t._v("检查客户端 cmd 指针是否执行 null")]),t._v(" "),_("li",[t._v("通过 RedisCommand结构的 arity 属性 判断 参数的个数是否符号命令要求")]),t._v(" "),_("li",[t._v("检查客户端是否已经通过身份验证")]),t._v(" "),_("li",[t._v("打开了maxmemory功能, 执行前会检查内存占用情况，并在需要的时候执行内存回收")]),t._v(" "),_("li",[t._v("如果服务器上一次执行BGSAVE命令时出错,并且服务器打开了stop-writes-on-bgsave-error功能,而且服务器即将要执行的命令是一个写命令,")]),t._v(" "),_("li",[t._v("如果客户端当前正在用SUBSCRIBE命令订阅频道,或者正在用PSUBSCRIBE命令订阅模式,那么服务器只会执行客户端发来的SUBSCRIBE、PSUBSCRIBE、UNSUBSCRIBE、PUNSUBSCRIBE四个命令")]),t._v(" "),_("li",[t._v("如果服务器正在进行数据载入,那么客户端发送的命令必须带有l 标识(比如INFO、SHUTDOWN、PUBLISH等等)才会被服务器执行")]),t._v(" "),_("li",[t._v("如果客户端正在执行事务,那么服务器只会执行客户端发来的EXEC、DISCARD、MULTI、WATCH四个命令,其他命令都会被放进事务队列中")]),t._v(" "),_("li",[t._v("如果服务器打开了监视器功能,那么服务器会将要执行的命令和参数等信息发送给监视器。当完成了以上预备操作之后,服务器就可以开始真正执行命令了")])])]),t._v(" "),_("li",[t._v("调用命令的实现函数\n"),_("ul",[_("li",[t._v("（具体的执行操作，执行完成 会产生一个命令回复，保存在 客户端的输出缓冲区）")])])]),t._v(" "),_("li",[t._v("执行后续工作\n"),_("ul",[_("li",[t._v("慢查询日志")]),t._v(" "),_("li",[t._v("更新 redisCommand结构的milliseconds属性,并将命令的redisCommand结构的calls计数器的值增一")]),t._v(" "),_("li",[t._v("写入AOF缓冲区")]),t._v(" "),_("li",[t._v("传播命令给从服务器")])])])])]),t._v(" "),_("li",[t._v("命令回复发送给客户端\n"),_("ul",[_("li",[t._v("当客户端 套接字为 可写状态时，将执行 回复处理器，将输出缓冲区的命令发送给客户端")]),t._v(" "),_("li",[t._v("发送完毕后，清除输出缓冲区")]),t._v(" "),_("li",[t._v("客户端接收并打印命令\n"),_("ul",[_("li",[t._v("将 回复的内容，转换后打印给用户")])])])])])])])])])]),t._v(" "),_("h3",{attrs:{id:"servercron-函数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#servercron-函数"}},[t._v("#")]),t._v(" serverCron 函数")]),t._v(" "),_("blockquote",[_("p",[t._v("每隔 100 毫秒 执行一次，这个函数 负责管理服务器的资源")])]),t._v(" "),_("p",[_("strong",[t._v("ServerCron执行那些操作")])]),t._v(" "),_("ul",[_("li",[_("p",[t._v("更新服务器时间缓存")])]),t._v(" "),_("li",[_("p",[t._v("更新LRU时钟")])]),t._v(" "),_("li",[_("p",[_("strong",[t._v("更新服务器内秒执行命令次数")])])]),t._v(" "),_("li",[_("p",[t._v("更新服务器内存峰值记录")]),t._v(" "),_("ul",[_("li",[t._v("每次ServerCron函数执行时，都会进行计算  如果比原值大 则更新")])])]),t._v(" "),_("li",[_("p",[t._v("处理SIGTERM信号")])]),t._v(" "),_("li",[_("p",[t._v("管理客户端资源")])]),t._v(" "),_("li",[_("p",[t._v("管理数据库资源")])]),t._v(" "),_("li",[_("p",[t._v("执行被延迟的BGREWRITEAOF")])]),t._v(" "),_("li",[_("p",[t._v("检查持久化操作的运行状态")])]),t._v(" "),_("li",[_("p",[t._v("将AOF缓冲区中的内容写入AOF文件")])]),t._v(" "),_("li",[_("p",[t._v("关闭异步客户端")])]),t._v(" "),_("li",[_("p",[t._v("增加cronloops计数器的值")])])]),t._v(" "),_("h3",{attrs:{id:"初始化服务器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#初始化服务器"}},[t._v("#")]),t._v(" 初始化服务器")]),t._v(" "),_("ol",[_("li",[t._v("初始化服务器状态： 即初始化 server变量操作")]),t._v(" "),_("li",[t._v("载入服务器配置：载入用户的配置 和 配置文件")]),t._v(" "),_("li",[t._v("初始化服务器数据结构：客户端连接、db数组、lua客户端、慢日志等")]),t._v(" "),_("li",[t._v("还原数据库状态： 通过 AOF 或 RDB 还原数据")]),t._v(" "),_("li",[t._v("执行事件循环:  用于监听事件")])])])}),[],!1,null,null,null);s.default=a.exports}}]);