(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{552:function(t,s,a){"use strict";a.r(s);var n=a(9),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("blockquote",[a("p",[t._v("整型集合 "),a("code",[t._v("(intset)")]),t._v("  是集合的底层实现之一，当一个集合 只包含 "),a("code",[t._v("整型元素")]),t._v(" 且 "),a("code",[t._v("元素数量并不多")]),t._v("时，Redis就会使用 整型集合")])]),t._v(" "),a("h2",{attrs:{id:"基本数据结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本数据结构"}},[t._v("#")]),t._v(" 基本数据结构")]),t._v(" "),a("blockquote",[a("p",[t._v("整型集合 "),a("code",[t._v("(intset)")]),t._v("  可以保存类型为int16_t、int32_t或者int64_t的整数值")]),t._v(" "),a("p",[t._v("并且保证集合中"),a("code",[t._v("不会出现重复元素")])])]),t._v(" "),a("div",{staticClass:"language-C extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("intset")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("     \n  uint32_t encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 编码方式 ")]),t._v("\n  uint32_t length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 集合包含的元素数量       ")]),t._v("\n  int8_t contents"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 保存元素的数组")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" intset"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("img",{attrs:{src:t.$withBase("/middleware/redislearn/redis整数集合.png"),alt:"foo"}}),t._v(" "),a("p",[a("strong",[t._v("注")]),t._v(" 虽然  "),a("code",[t._v("contents")]),t._v(" 定义了 int8_t 类型 但是实际上 是由 "),a("code",[t._v("encoding")]),t._v(" 编码方式决定的")]),t._v(" "),a("h2",{attrs:{id:"升级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#升级"}},[t._v("#")]),t._v(" 升级")]),t._v(" "),a("blockquote",[a("p",[t._v("虽然   整数集合 "),a("code",[t._v("(intset)")]),t._v("  可以保存类型为int16_t、int32_t或者int64_t的整数值")]),t._v(" "),a("p",[t._v("每当我们要将一个新元素添加到整数集合里面,并且新元素的类型比整数集合现有所有元素的类型都要长时,整数集合需要先进行升级")])]),t._v(" "),a("h3",{attrs:{id:"升级的过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#升级的过程"}},[t._v("#")]),t._v(" 升级的过程")]),t._v(" "),a("ol",[a("li",[t._v("根据新元素的类型,扩展整数集合底层数组的空间大小,并为新元素分配空间。")]),t._v(" "),a("li",[t._v("将底层数组现有的所有元素都转换成与新元素相同的类型,并将类型转换后的元素放置到正确的位上,而且在放置元素的过程中,需要继续维持底层数组的有序性质不变。")]),t._v(" "),a("li",[t._v("将新元素添加到底层数组里面")]),t._v(" "),a("li",[t._v("修改 整数集合的 "),a("code",[t._v("encoding属性")]),t._v("  和 "),a("code",[t._v("length属性")])])]),t._v(" "),a("h3",{attrs:{id:"升级的好处"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#升级的好处"}},[t._v("#")]),t._v(" 升级的好处")]),t._v(" "),a("ul",[a("li",[t._v("提升整数集合的灵活性：我们可以通过升级来 自适应添加的新元素 ，而不必担心类型错误")]),t._v(" "),a("li",[t._v("节约内存：为了兼容3中类型的值，最保险的情况是 直接分配所有的元素都是最大类型就好了，但会造成空间浪费，而 升级操作只会在有需要的时候进行, 这可以尽量节省内存。")])]),t._v(" "),a("h2",{attrs:{id:"降级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#降级"}},[t._v("#")]),t._v(" 降级")]),t._v(" "),a("blockquote",[a("p",[t._v("降级？ 降级是不可能的。 整数集合不支持降级操作,一旦对数组进行了升级,编码就会一直保持升级后的状态。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);