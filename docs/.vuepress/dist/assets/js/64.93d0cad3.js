(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{619:function(v,_,i){"use strict";i.r(_);var s=i(17),e=Object(s.a)({},(function(){var v=this,_=v.$createElement,i=v._self._c||_;return i("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[i("p",[v._v("主从、哨兵、集群的三个解决的问题是什么，什么关系")]),v._v(" "),i("p",[v._v("三者是相互配合使用的")]),v._v(" "),i("p",[v._v("主从：")]),v._v(" "),i("ul",[i("li",[v._v("可以保证读写")]),v._v(" "),i("li",[v._v("保证服务的可用性")])]),v._v(" "),i("p",[v._v("哨兵 越多  会影响 效率吗？")]),v._v(" "),i("p",[v._v("会的 因为 你1台哨兵的话 只有1台确认")]),v._v(" "),i("p",[v._v("3台 需要2台")]),v._v(" "),i("p",[v._v("10台 需要6台")]),v._v(" "),i("p",[v._v("你这个台数越多 你就需要等待6台机器的答复 肯定会有更多的网络请求")]),v._v(" "),i("p",[v._v("为什么 不使用1台呢 ？ 这就和 主从一样，主要是为了实现 高可用")]),v._v(" "),i("p",[v._v("主从解决什么问题：实现读写分离，提高服务的可用性")]),v._v(" "),i("p",[v._v("哨兵解决什么问题：服务的崩溃复制，")]),v._v(" "),i("p",[v._v("1.监控服务服务是都在正常服务  2. 如果发现服务器 状态异常，可以进行服务器切换")]),v._v(" "),i("p",[v._v("集群解决什么问题：解决写请求的瓶颈")]),v._v(" "),i("p",[v._v("Redis服务器系统基本信息告警，你认为有那些原因？")]),v._v(" "),i("ul",[i("li",[v._v("内存告警：Redis如果内存彪高，会触发逐出，此时业务受影响，解决办法，是对key 的绝对数据量进行监控。内存使用量的监控，一定要低于逐出赋值的监控")]),v._v(" "),i("li",[v._v("CPU告警, I/O告警： "),i("strong",[v._v("主从间的网络，频繁不问题， 是不是主从不在一个机房，如果不是，在看复制积压缓冲区是不是设置得太小了")]),v._v(" "),i("ul",[i("li",[v._v("可能网络不稳定，并且是redis 2.8 之前的，是一直在进行全量同步导致，同步主服务器一直在进行I/O操作")]),v._v(" "),i("li",[v._v("或者是 从节点太多了。导致要给多个从节点进行数据同步, 多个全量同步导 频繁的进行I/O操作")]),v._v(" "),i("li",[v._v("假设在2.8之后，为什么还会出现这个问题嗯\n"),i("ul",[i("li",[v._v("1、有可能是设置的 积压缓存区 过小，导致一直执行全量复制")]),v._v(" "),i("li",[v._v("2、或者 如果 积压缓存区 过大，带来的弊端是什么？\n"),i("ul",[i("li",[v._v("恢复时间过长")])])])])])])]),v._v(" "),i("li",[v._v("为什么压缩缓冲器，不涉及类似 AOF"),i("u",[v._v("的重写压缩器")])])]),v._v(" "),i("p",[v._v("哨兵：主要还是解决 服务自动化主从切换，提供可用性的服务")]),v._v(" "),i("p",[v._v("还是会存在一些问题：每个服务器都存在全量数据")]),v._v(" "),i("p",[v._v("而 集群： 通过 分片 进行 数据共享， 并提供复制 和 故障转移功能")]),v._v(" "),i("ul",[i("li",[v._v("Redis集群 是务中心")])]),v._v(" "),i("p",[i("img",{attrs:{src:"/Users/shiding/Documents/study-notes/Redis/images/image-20220417205450473.png",alt:"image-20220417205450473"}})]),v._v(" "),i("p",[i("img",{attrs:{src:"/Users/shiding/Documents/study-notes/Redis/images/image-20220417205513930.png",alt:"image-20220417205513930"}})]),v._v(" "),i("p",[v._v("哨兵模式下：")]),v._v(" "),i("ul",[i("li",[v._v("新的服务器是如何被选出来的")])]),v._v(" "),i("p",[i("img",{attrs:{src:"/Users/shiding/Documents/study-notes/Redis/images/image-20220417214315616.png",alt:"image-20220417214315616"}})]),v._v(" "),i("p",[v._v("复制 + 哨兵有什么缺点：")]),v._v(" "),i("ul",[i("li",[v._v("不支持分片操作，如果需要分片，就需要手动业务实现")]),v._v(" "),i("li",[v._v("Sentienl 会占用一部分资源")])]),v._v(" "),i("p",[v._v("集群：")]),v._v(" "),i("ul",[i("li",[i("p",[v._v("实现了分片操作")])]),v._v(" "),i("li",[i("p",[v._v("无中心化设计，资源占用资源少")])]),v._v(" "),i("li",[i("p",[i("img",{attrs:{src:"/Users/shiding/Documents/study-notes/Redis/images/image-20220417214752034.png",alt:"image-20220417214752034"}})])])])])}),[],!1,null,null,null);_.default=e.exports}}]);