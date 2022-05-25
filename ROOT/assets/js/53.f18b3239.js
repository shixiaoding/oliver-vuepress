(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{551:function(t,_,v){"use strict";v.r(_);var e=v(9),r=Object(e.a)({},(function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("blockquote",[v("p",[t._v("压缩列表 是 Redis 列表 和 hash的底层实现之一。")]),t._v(" "),v("p",[t._v("当 包含少量元素 或者 元素为小整数值 或者 较短的字符串时，才会选用  压缩列表")]),t._v(" "),v("p",[t._v("压缩列表 主要还是为 节约内存而实现的，是由一组特殊编码的连续内存块组成的顺序型数据结构")])]),t._v(" "),v("p",[t._v("与 数组把不同 数组会创建相同大小的空间，来存储不用大小的数据，如果我们要存储不同长度的字符串，都是短字符串的话，会浪费大量空间")]),t._v(" "),v("p",[t._v("而 压缩列表 可以对存储的数据，指定存储的数据大小")]),t._v(" "),v("h2",{attrs:{id:"基本数据结构"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#基本数据结构"}},[t._v("#")]),t._v(" 基本数据结构")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/middleware/redislearn/redis压缩列表.png"),alt:"foo"}}),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"left"}},[t._v("属性")]),t._v(" "),v("th",[t._v("用途")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("zlbytes")]),t._v(" "),v("td",[t._v("记录整个压缩列表占用的内存字节数：在对压缩列表进行内存重分配或者计算zlend的位置时使用")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("zltail")]),t._v(" "),v("td",[t._v("记录压缩列表表尾节点距离压缩列表的起始地址有多少字节"),v("br"),t._v("通过这个"),v("code",[t._v("偏移量")]),t._v("，程序无须遍历整个压缩列表就可以确定表尾节点的地址")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("zllen")]),t._v(" "),v("td",[t._v("记录压缩列表的节点数量 "),v("br"),t._v("值小于 65535：该值就是真实的节点数据"),v("br"),t._v("值大于65535：该值则无用，需要遍历整个压缩列表才能进行计算")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("entryX")]),t._v(" "),v("td",[t._v("压缩列表节点")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("zlend")]),t._v(" "),v("td",[t._v("特殊值0xF℉（十进制255），用于标记压缩列表的末端")])])])]),t._v(" "),v("p",[v("strong",[t._v("节点元素")])]),t._v(" "),v("img",{attrs:{src:t.$withBase("/middleware/redislearn/redis压缩列表节点元素.png"),alt:"foo"}}),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("属性")]),t._v(" "),v("th",[t._v("用途")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("previous_entry_length")]),t._v(" "),v("td",[t._v("记录压缩表前一个节点的长度"),v("br"),t._v("前一个节点长度小于254字节：属性使用长度为1个字节存储"),v("br"),t._v("前一个节点长度大于254字节：属于使用长度为5个字存储。第一个字节 0xFE(固定的) 后四个自己保存前一个节点的长度")])]),t._v(" "),v("tr",[v("td",[t._v("encoding")]),t._v(" "),v("td",[t._v("保存数据的类型  以及 长度  （即 content 的长度 和 数据类型）")])]),t._v(" "),v("tr",[v("td",[t._v("content")]),t._v(" "),v("td",[t._v("具体的内存")])])])]),t._v(" "),v("p",[t._v("由于节点 使用 "),v("code",[t._v("previous_entry_length")]),t._v(" 存储了 上一个节点的长度，配合 压缩列表中  "),v("code",[t._v("zltail")]),t._v(" 尾节点的起始位置。进行遍历 可以实现从尾节点 一路 寻找到 头节点")]),t._v(" "),v("p",[t._v("计算公式： p = zltail - previous_entry_length")]),t._v(" "),v("h2",{attrs:{id:"连锁更新"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#连锁更新"}},[t._v("#")]),t._v(" 连锁更新")]),t._v(" "),v("blockquote",[v("p",[t._v("连锁更新问题 ：由于当前节点的 "),v("code",[t._v("previous_entry_length")]),t._v(" 值取决于前一个节点的内容，所以当前一个节点改动时，当前节点的\n"),v("code",[t._v("previous_entry_length")]),t._v(" 也可能发生改变 。如果连续发生这样的事情，将会触发连锁更新问题，消耗性能。")])]),t._v(" "),v("p",[t._v("在一个极其特殊的情况：")]),t._v(" "),v("p",[t._v("所有的节点都正常介于 250  ~  253 字节")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/middleware/redislearn/redis压缩列表添加节点.png"),alt:"foo"}}),t._v(" "),v("p",[t._v("当新增 一个大于 254字节的节点时，e1的previous_entry_length属性仅长1字节,它没办法保存新节点new的长度\n因此 需要进行空间重分配操作，将 e1的previous_entry_length 从 1个字节 扩展为 5字节。 后续节点也是如此，都需要进行连续扩容")]),t._v(" "),v("p",[v("strong",[t._v("因为连锁更新在最坏情况下需要对压缩列表执行 N 次空间重分配操作，而空间重分配的最坏复杂度为 O(N) ，所以连锁更新的最坏复杂度为 O(N 的平方 ）")])]),t._v(" "),v("p",[v("strong",[t._v("删除节点也可能发生")])]),t._v(" "),v("p",[v("strong",[t._v("其实这种情况发生的几率比较低")])]),t._v(" "),v("ol",[v("li",[t._v("恰好有多个连续的、长度介于250字节至253 字节之间的节点")]),t._v(" "),v("li",[t._v("即使出现连锁更新,但只要被更新的节点数量不多,就不会对性能造成任何影响")])])])}),[],!1,null,null,null);_.default=r.exports}}]);