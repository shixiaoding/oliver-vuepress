(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{554:function(t,s,a){"use strict";a.r(s);var n=a(9),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("blockquote",[a("p",[t._v("字典,又称为 "),a("code",[t._v("符号表(symbol table)")]),t._v("、"),a("code",[t._v("关联数组(associative array)")]),t._v("或 "),a("code",[t._v("映射(map)")]),t._v(",是一种用于保存键值对"),a("code",[t._v("(key-value pair)")]),t._v(" 的抽象数据结构。当一个哈希键包含的键值对比较多,又或者键值对中的元素都是比较长的字符串时,Redis就会使用字典作为哈希键的底层实现")])]),t._v(" "),a("h2",{attrs:{id:"基本数据结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本数据结构"}},[t._v("#")]),t._v(" 基本数据结构")]),t._v(" "),a("img",{attrs:{src:t.$withBase("/middleware/redislearn/redis字典.png"),alt:"foo"}}),t._v(" "),a("div",{staticClass:"language-C extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[t._v("dict"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("h"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("dict\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("dict")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  类型特定函数")]),t._v("\n  dictType "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  私有数据，提供给 dictType 中函数的参数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("privdata"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  哈希表")]),t._v("\n  dictht ht"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// rehash 索引，当 rehash 不在进行时，值为 ‑ 1")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" trehashidx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" dict\n\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("dict")]),a("span",{pre:!0,attrs:{class:"token expression"}},[t._v("的两个哈希表")])]),t._v("\ndict"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("h"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("dictht\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("dictht")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  哈希表数组")]),t._v("\n  dictEntry "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("table"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  哈希表大小")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  哈希表大小掩码，用于计算索引值，总是等于 size ‑ 1")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" sizemark"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  该哈希表已有节点的数量")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" used"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" dictht\n  \n# 对应 dict 中的 type 值\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("dictType")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  计算哈希值的函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("unsigned")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("hashFunction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  复制键的函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("keyDup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("privdata"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  复制值的函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("valDup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("privdata"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  对比键的函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  销毁键的函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  销毁值的函数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" dictType\n\n "),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("hash")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token expression"}},[t._v("表中的元素节点")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("dictEntry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  键")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  值")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("union")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    uint64_u64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    int64_t s64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  指向下个哈希表节点，形成链表")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("dictEntry")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  dictEntry\n")])])]),a("p",[a("strong",[t._v("为什么字典中的 哈希表定义2个")]),t._v("？")]),t._v(" "),a("p",[t._v("一般情况下,字典只使用ht[0]哈希表,ht[1]哈希表只会在对ht[0] 哈希表进行rehash时使用")]),t._v(" "),a("p",[a("strong",[t._v("字典中 "),a("code",[t._v("rehashidx")]),t._v("  属性的作用")])]),t._v(" "),a("ul",[a("li",[t._v("-1：没有 rehash")]),t._v(" "),a("li",[t._v("0： 开始 rehash\n"),a("ul",[a("li",[t._v("每执行完一个 rehashidx+1")])])]),t._v(" "),a("li",[t._v("-1:    完成 rehash")])]),t._v(" "),a("h2",{attrs:{id:"哈希算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#哈希算法"}},[t._v("#")]),t._v(" 哈希算法")]),t._v(" "),a("p",[a("strong",[t._v("如何计算索引位")]),t._v("：")]),t._v(" "),a("p",[t._v("1 . 计 算 key 的 "),a("code",[t._v("哈希值")]),t._v(" ；\n2 . 使 用 "),a("code",[t._v("哈希表")]),t._v(" 的 sizemask + "),a("code",[t._v("哈希值")]),t._v(" ，计算出 "),a("code",[t._v("索引位置")]),t._v(" ;\n3 . 如果出现 Hash 冲突， Redis 是使用"),a("code",[t._v("拉链法来")]),t._v(" 解决的，新的值会成为"),a("code",[t._v("链表头节点")]),t._v("。")]),t._v(" "),a("blockquote",[a("p",[t._v("Redis 使用的是 MurmuHash2 的算法来计算哈希值的，该算法的优点在于，即使输入的键是有规律的，算法仍能给出一个很好的随机分布性，并且算法\n的计算速度也非常快")])]),t._v(" "),a("h2",{attrs:{id:"rehash"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rehash"}},[t._v("#")]),t._v(" Rehash")]),t._v(" "),a("blockquote",[a("p",[t._v("由于 哈希表 保存的数量 太多 或者 太少时，需要对哈希表 进行 扩展 或 收缩，这个时候需要rehash")])]),t._v(" "),a("p",[a("strong",[t._v("Rehash的步骤")])]),t._v(" "),a("ul",[a("li",[t._v("为字典的ht[1]哈希表分配空间；")]),t._v(" "),a("li",[t._v("将保存在ht[0]中的所有键值对rehash到ht[1]上面：rehash指的是重新计算键的哈希值和索引值，然后将键值对放置到ht[1]哈希表的指定位置上；")]),t._v(" "),a("li",[t._v("当ht[0]包含的所有键值对放置到ht[1]之后（ht[0]变为空表），释放ht[0]，将ht[1]设置为ht[0]，并在ht[1]新创建一个空白哈希表，为下一次rehash做准备")])]),t._v(" "),a("p",[a("strong",[t._v("哈希表的扩展与收缩（即触发Rehash操作的时机）")])]),t._v(" "),a("p",[a("strong",[t._v("核心是通过负载因子来判断触发的时机")]),t._v("计算负载因子的公式： ht[0].used / ht[0]size")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("当一下条件任意一个被满足时，开始对哈希表执行扩展操作")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("服务器目前没有在执行BGSAVE命令或者BGREWRITEAOF命令，并且哈希表的负载因子大于1；")])]),t._v(" "),a("li",[a("p",[t._v("服务器目前在执行BGSAVE命令或者BGREWRITEAOF命令，并且哈希表的负载因子大5；")])])])]),t._v(" "),a("li",[a("p",[t._v("当哈希表的负载因子小于0.1时，程序自动开始对哈希表执行收缩操作。")])])]),t._v(" "),a("h3",{attrs:{id:"渐进试rehash"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#渐进试rehash"}},[t._v("#")]),t._v(" 渐进试Rehash")]),t._v(" "),a("blockquote",[a("p",[t._v("如果哈希表里保存的键值对数量不是四个,而是四百万、四千万甚至四亿个键值对,那么要一次性将这些键值对全部rehash到ht[1]的话,庞大的计算量可能会导致服务器在一段时间内停止服务.")]),t._v(" "),a("p",[a("strong",[t._v("这个rehash动作并不是一次性、集中式地完成的,而是分多次、渐进式地完成的")])])]),t._v(" "),a("p",[t._v("步骤：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("为ht[1]分配空间,让字典同时持有ht[0]和ht[1]两个哈希表。")])]),t._v(" "),a("li",[a("p",[t._v("rehash 开始时，将 rehashidx 设置为 0")])]),t._v(" "),a("li",[a("p",[t._v("在rehash 进行期间")]),t._v(" "),a("ul",[a("li",[t._v("对字典执行添加、删除、查找或者更新操作时 都将写入 ht[1]")]),t._v(" "),a("li",[t._v("将 ht[0] 键 移动到 ht[1]，每次执行 rehashidx状态位+1")]),t._v(" "),a("li",[t._v("当 ht[0]全部移动到ht[1]后，rehashidx回到‑1；")])])]),t._v(" "),a("li",[a("p",[t._v("当出现读写时，如果发现rehashidx不为‑1，则将当前被读写的元素进行rehash。")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);