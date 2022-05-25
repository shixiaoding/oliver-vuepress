(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{527:function(t,a,s){"use strict";s.r(a);var n=s(9),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("volatile 关键字是 Java虚拟机提供的最轻量级的同步机制。\nvolatile  是轻量级锁 只能保证 "),s("code",[t._v("可见性")]),t._v("  和 "),s("code",[t._v("有序性")]),t._v("  ，不保证 原子性 （最能保证64位类型的写入的原子性）。 由于没有排他锁，不会像 "),s("code",[t._v("Synchronized")]),t._v("  引起线程上下文的切换 和 调度")]),t._v(" "),s("p",[s("strong",[t._v("三大特性:")])]),t._v(" "),s("ul",[s("li",[t._v("内存可见性")]),t._v(" "),s("li",[t._v("不保证原子性")]),t._v(" "),s("li",[t._v("禁止重排序")])]),t._v(" "),s("h2",{attrs:{id:"内存可见性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存可见性"}},[t._v("#")]),t._v(" 内存可见性")]),t._v(" "),s("p",[t._v("可见性概念：当多线程访问同一个变量时，一个线程修改了变量的值，其他线程能立即看到改变后的变量值")]),t._v(" "),s("p",[t._v("::"),s("em",[t._v("什么原因产生的可见性问题")]),t._v("::")]),t._v(" "),s("p",[t._v("计算机CPU层面：\n由于现代计算机的CPU 多层缓存，L1、L2、L3 之间的 缓存更新是同步进行的，但在 核心 与 L1 之间存在着 "),s("code",[t._v("Store buffer")]),t._v("   和 "),s("code",[t._v("Load buffer")]),t._v("  ，写入操作写写入 "),s("code",[t._v("Store buffer")]),t._v("  在异步刷入 L1 ，异步操作可能导致可见性问题：")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile1.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("Java内存模型(JMM)：\nJMM定义了：每个线程都有自己的工作内存，读取 和 写入 都需要 将变量 从 主内存读取到 自己的工作内存中进行操作，由于不同的线程之间是无法访问对方的工作内存，所以存在 线程 工作内存 与 主内存 同步的操作。由于同步时间，和线程执行的时间存在顺序问题，可能会导致可见性问题")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile2.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("::解决方案::")]),t._v(" "),s("p",[t._v("通过对变量添加 "),s("code",[t._v("volatile")]),t._v("  关键字，保证其可见性，主要是通过：")]),t._v(" "),s("ul",[s("li",[t._v("volatile 修饰的变量，JMM会把该线程本地内存中的变量强制刷新到主内存中")]),t._v(" "),s("li",[t._v("写操作会让其他线程中的 volatile 变量缓存无效")])]),t._v(" "),s("p",[t._v("::案例::")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Main")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throws")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),t._v(" t1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                \n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"T1得知a = 1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),t._v(" t2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"T2修改a = 1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InterruptedException")]),t._v(" e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printStackTrace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        t1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        t2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("p",[t._v("当 "),s("code",[t._v("a")]),t._v("  变量 不声明 "),s("code",[t._v("volatile")]),t._v("  关键字时，t1将永远在while循环中")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile3.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("当 "),s("code",[t._v("a")]),t._v("  变量 声明 "),s("code",[t._v("volatile")]),t._v("  关键字时：")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile4.jpg"),alt:"foo"}}),t._v(" "),s("h2",{attrs:{id:"不保证原子性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#不保证原子性"}},[t._v("#")]),t._v(" 不保证原子性")]),t._v(" "),s("blockquote",[s("p",[t._v("volatile 对于常见的多线程对于i++ 方法是不能保证原子性的")])]),t._v(" "),s("p",[t._v("::案例::")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" nums "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" k "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" k "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" k"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                nums"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"nums: "')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" nums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("执行多次结果不一致:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("nums: 14642\nnums: 12505\nnums: 6732\n")])])]),s("p",[t._v("总结： 像 "),s("code",[t._v("Synchronized")]),t._v(" 一样 对修饰的代码块，进行加锁，只有它执行完成之后，其他线程才能被执行，只有这样才能保证 原子性。 由于 "),s("code",[t._v("volatile")]),t._v("   并不使用锁，由于CPU按照时间片来进行线程调度的，只要是包含多个步骤的操作的执行，天然就是无法保证原子性的。")]),t._v(" "),s("p",[t._v("即 当A线程修改数据，还没执行同步主内存前挂起，线程B完成了i++操作并写会主内存，则当A线程唤醒后会进行再次同步， 这样则会造成数据 少累加一次")]),t._v(" "),s("h2",{attrs:{id:"禁止重排序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#禁止重排序"}},[t._v("#")]),t._v(" 禁止重排序")]),t._v(" "),s("blockquote",[s("p",[t._v("重排序不是必然会出现的，但是出现重排序会导致线程安全问题"),s("br"),t._v("\n::单线程:不管怎么重排序，单线程情况下的程序执行结果时不能被改变::")])]),t._v(" "),s("p",[t._v("常见的重排序类型：")]),t._v(" "),s("ul",[s("li",[t._v("编译器重排序； 对没有先后依赖关系的语句，编译器可以进行重新调整语句的执行属性")]),t._v(" "),s("li",[t._v("CPU重排序： 指令级别的重排序，对没有依赖关系的多条指令并行执行")]),t._v(" "),s("li",[t._v("内存重排序： CPU有自己的缓存，指令执行顺序 和 写入主内存顺序不一致")])]),t._v(" "),s("p",[s("code",[t._v("volatile")]),t._v("  是通过编译器在生成字节码时，在指令序列中添加“内存屏障”来禁止指令重排序的")]),t._v(" "),s("h3",{attrs:{id:"内存屏障"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存屏障"}},[t._v("#")]),t._v(" 内存屏障")]),t._v(" "),s("p",[t._v("内存屏障作用：")]),t._v(" "),s("ul",[s("li",[t._v("阻止屏障两侧的指令重排序")]),t._v(" "),s("li",[t._v("强制把写缓冲区/高速缓存中的数据 写回主内存")])]),t._v(" "),s("p",[t._v("基本的内存屏障类型：")]),t._v(" "),s("ul",[s("li",[t._v("硬件层面的 “内存屏障” 类型:\n"),s("ul",[s("li",[t._v("sfence：即写屏障(Store Barrier)")]),t._v(" "),s("li",[t._v("lfence：即读屏障(Load Barrier)")]),t._v(" "),s("li",[t._v("mfence：即全能屏障(modify/mix Barrier)")]),t._v(" "),s("li",[t._v("lock 前缀：lock不是内存屏障")])])]),t._v(" "),s("li",[t._v("JMM层面的“内存屏障”类型:\n"),s("ul",[s("li",[t._v("LoadLoad：禁止读和读的重排序")]),t._v(" "),s("li",[t._v("StoreStore：禁止写和写的重排序")]),t._v(" "),s("li",[t._v("LoadStore：禁止读和写的重排序")]),t._v(" "),s("li",[t._v("StoreLoad：禁止写和读的重排序")])])])]),t._v(" "),s("h3",{attrs:{id:"双重检查锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#双重检查锁"}},[t._v("#")]),t._v(" 双重检查锁")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Singleton")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Singleton")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Singleton")]),t._v(" instance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Singleton")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInstance")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("instance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("synchronized")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Singleton")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("instance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    instance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Singleton")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" instance"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("instance = new Singleton()")]),t._v("   这行代码并不是一个原子指令, 可能会存在 指令重排的问题。当处于 多线程的情况下，会存在线程安全问题，导致某个线程创建了一个错误的单例对象")]),t._v(" "),s("p",[s("code",[t._v("instance = new Singleton()")]),t._v("  创建的对象的过程：")]),t._v(" "),s("ol",[s("li",[t._v("分配对象的内存空间")]),t._v(" "),s("li",[t._v("初始化对象")]),t._v(" "),s("li",[t._v("设置instance指向刚分配的内存地址")])]),t._v(" "),s("p",[t._v("创建对象的过程中，可能会存在2，3步骤的重排序，导致某些线程访问到未初始化的变量。 所以为了保证多线程情况下的 单例模式下的线程安全， 对检测对象 添加 "),s("code",[t._v("volatile")])]),t._v(" "),s("h2",{attrs:{id:"底层实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#底层实现原理"}},[t._v("#")]),t._v(" 底层实现原理")]),t._v(" "),s("p",[t._v("1、通过反编译，知道 会对 volatile 修饰的变量，追加 "),s("code",[t._v("ACC_VOLATILE")]),t._v("   标识")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile5.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("2、 更具静态变量元素的写入找到  文件:"),s("code",[t._v("bytecodeInterpreter.cpp")])]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile6.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("3、 用来判断访问标记是否为volatile修饰 文件："),s("code",[t._v("accessFlags.hpp")])]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile7.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("4、具体使用的调动方法  文件： "),s("code",[t._v("accessFlags.hpp")])]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile8.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("5、对于不同的CPU架构有不同的实现机制： 这些目录下都会有一个 OrderAccess 类")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile9.jpg"),alt:"foo"}}),t._v(" "),s("p",[t._v("6、 具体底层 volatile 操作：")]),t._v(" "),s("ul",[s("li",[t._v("单线程情况下，不使用内存屏障")]),t._v(" "),s("li",[t._v("多线程线程下使用 C的 "),s("code",[t._v("volatile")]),t._v("   关键字修饰，对其 添加 "),s("code",[t._v("lock")]),t._v("  标识")])]),t._v(" "),s("img",{attrs:{src:t.$withBase("/java/concurrent/volatile/volatile10.jpg"),alt:"foo"}}),t._v(" "),s("h2",{attrs:{id:"总结："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结："}},[t._v("#")]),t._v(" 总结：")]),t._v(" "),s("p",[s("code",[t._v("volatile")]),t._v(" 可以保证线程的 可见性、有序性、但是无法保证有序性，底层是通过 "),s("code",[t._v("内存屏障")]),t._v("  来实现的。 通过反编译 我们可以知道每一个 "),s("code",[t._v("volatile")]),t._v("   变量都会打上 "),s("code",[t._v("ACC_VOLATILE")]),t._v("  ，执行时 会判断 是否有 volatile 关键字，有则会进行添加屏障。")]),t._v(" "),s("p",[t._v("屏障的核心作用：")]),t._v(" "),s("ol",[s("li",[t._v("阻止屏障两侧的指令重排序")]),t._v(" "),s("li",[t._v("强制把写缓冲区/高速缓存中的数据 写回主内存")]),t._v(" "),s("li",[t._v("写操作会让其他线程中的 volatile 变量缓存无效")])]),t._v(" "),s("p",[t._v("【相关资料】")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://book.douban.com/subject/10484692/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java并发编程实战"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/250657181",target:"_blank",rel:"noopener noreferrer"}},[t._v("吃透Java并发：volatile是怎么保证可见性的 - 知乎"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/133851347",target:"_blank",rel:"noopener noreferrer"}},[t._v("volatile底层原理详解 - 知乎"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.zhihu.com/question/329746124",target:"_blank",rel:"noopener noreferrer"}},[t._v("volatile为什么不能保证原子性"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);