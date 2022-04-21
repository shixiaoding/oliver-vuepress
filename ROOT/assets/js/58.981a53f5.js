(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{555:function(t,s,a){"use strict";a.r(s);var n=a(9),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("blockquote",[a("p",[t._v("快速链表 是 "),a("code",[t._v("Redis 3.2")]),t._v("  之后结合 adlist(普通链表) 和 ziplist (压缩链表)的 产物")]),t._v(" "),a("p",[t._v("它将 普通双向链表 按段切分，每一段都是用 ziplist来紧凑存储，多个 ziplist 之间是用双向指针连接起来")])]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/redislearn/redis快速链表.png"),alt:"foo"}}),t._v(" "),a("div",{staticClass:"language-C extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("quicklistNode")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("   \n  quicklistNode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" prev"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \n  quicklistNode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \n  ziplist"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" zl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 指向压缩列表   ")]),t._v("\n  int32 size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ziplist 的字节总数    ")]),t._v("\n  int16 count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ziplist 中的元素数量     ")]),t._v("\n  int2 encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 存储形式 2bit,原生字节数组还是 LZF 压缩存储   ")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" container "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 预留字段，存放数据的方式，1--NONE，2--ziplist")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" recompress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解压标记，当查看一个被压缩的数据时，需要暂时解压，标记此参数为 1，之后再重新进行压缩")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" attempted_compress "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 测试相关")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" extra "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 扩展字段，暂时没用")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("quicklist")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("    \n  quicklistNode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" head"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \n  quicklistNode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" tail"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    \n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 元素总数    ")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" nodes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ziplist 节点的个数     ")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" compressDepth"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// LZF 算法压缩深度     ... ")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"相关核心配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#相关核心配置"}},[t._v("#")]),t._v(" 相关核心配置")]),t._v(" "),a("p",[a("strong",[t._v("每个ziplist存多少元素")])]),t._v(" "),a("p",[t._v("quicklist 默认 单个 ziplist 长度 为 8k字节，超过则会重写起一个 ziplist (可以修改 "),a("code",[t._v("list-max-ziplist-size")]),t._v("  参数)")]),t._v(" "),a("p",[a("strong",[t._v("压缩深度")])]),t._v(" "),a("p",[t._v("Quicklist  还可以对 ziplist 进行在压缩，通过选择压缩深度")]),t._v(" "),a("p",[t._v("配置参数："),a("code",[t._v("list- compress-depth")])]),t._v(" "),a("p",[t._v("默认：0 不进行任何压缩")]),t._v(" "),a("p",[t._v("设置为：1 （即 首尾的 第一个元素进行压缩）")]),t._v(" "),a("p",[t._v("设置为：2 （即 首尾的 头2个元素进行压缩）")])])}),[],!1,null,null,null);s.default=e.exports}}]);