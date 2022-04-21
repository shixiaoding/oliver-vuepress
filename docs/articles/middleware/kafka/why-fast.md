---
title: kafka 为什么快
date: 2021-12-05
tags:
- 消息队列
- kafka
---
## 顺序写入
> 操作系统可以针对线性读写做深层次的优化，比如预读(read-ahead，提前将一个比较大的磁盘块  
> 读入内存) 和后写(write-behind，将很多小的逻辑写操作合并起来组成一个大的物理写操作)技术。  

**各个存储介质的速度层级,  理论上磁盘写入的速度相对来说慢的 但实际上 顺序写入数据的速度未必很慢**

<img :src="$withBase('/middleware/kafka/fast1.jpg')" alt="foo">

**案例数据**  一个由 7200r/min RAID阵列组成的磁盘簇的线性（顺序）写入速度可以达到 600MB/s，而随机写入速度只有 lOOKB/s，两性能相 6000 倍

**Kafka 使用了是 日志文件尾部追加新消息，并且也不允许修改已写入的消息，这种方式属于典型的顺序写盘的操作**

**一次写入操作**
完成一次磁盘 IO，需要经过寻道、旋转和数据传输三个步骤。
- 寻道时间： 指将读写磁头移动至正确的磁道上所需要的时间
- 旋转延迟： 指盘片旋转将请求数据所在的扇区移动到读写磁盘下方所需要的时间  （取决于 磁盘的转速）
- 数据传输时间：指完成传输所请求的数据所需要的时间 （取决于 接口传输速率）

> 顺序写入的操作：减少了 寻道、旋转的步骤  

## PageCache 页缓存
> 页缓存时操作系统实现的一种主要的磁盘缓存，以此用来减少对磁盘I/O 的操作 。 具体来说，就是把磁盘中的数据缓存到内存中  
> 把对磁盘的访问变为对内存的访问。  

**线程进行操作时**
- 读操作：
	- 读取数据时，会直接在 页缓存（pagecache）中进行查找
	- 存在则直接返回数据，从而避免I/O 操作
	- 不存在，则向磁盘发起读取请求并将读取的数据页存入 页缓存
- 写操作
	- 操作系统也会检测数据对应的页是否在页缓存中，如果不存在，则会先在页缓存中添加相应的页，最后将数据写入对应的页
	- 被修改过后的页也就变成了脏页，操作系统会在合适的时间把脏页中的数据写入磁盘，以保持数据的一致性。
	
**页缓存 和 Mysql  InnoDB 的 内存架构类似**

**总结: 消息先被写入页缓存，由操作系统负责刷盘任务。**

**Linux 操作的脏页刷盘命令**

- `vm.dirtybackground.ratio` ：指定脏页数量到达系统内存的百分之多少触发 `pdflush/flush/kdmflush`等后台回写进程的运行来理脏页
- `vm.dirtyratio` :  参数它用来指定当脏页数达到系统内存的百分之多少之后就不得不开始对脏页进行处理在此过程中，新的I/O请求会被阻挡直至所有脏页被冲刷到磁盘中

**Kafka为什么不自己管理缓存，而非要用page cache？原因有如下三点：**
* JVM中一切皆对象，数据的对象存储会带来所谓object overhead，浪费空间；
* 如果由JVM来管理缓存，会受到GC的影响，并且过大的堆也会拖累GC的效率，降低吞吐量；
* 一旦程序崩溃，自己管理的缓存数据会全部丢失。


## 零拷贝机制
> 零拷贝 （Zero-copy）是指数据直接从磁盘文件复制到网卡设备中，而不需要经由应用程序之手。零拷贝大大提高了应用程序的性能，减少了内核和用户模式之间的上下文切换  
> 常见的将 文件发送个用户的流程  传统IO比如：读取文件，socket发送  需要经过4次 copy  

**在不使用零拷贝的技术的流程下**
<img :src="$withBase('/middleware/kafka/fast2.jpg')" alt="foo">
- 步骤：
	- (1) 调用 read() 时，文件中的内容被复制到了内核模式下的Read Buffer 中。（操作系统内核缓冲区）
	- (2) CPU 控制将内核模式数据复制到用户模式下
	- (3）调用 write() 时，将用户模式下的容复制到内核模式下的 Socket Buffer 中
	- (4）将内核模式下的 Socket Buffe 的数据复制到网卡设备中传送

**使用零拷贝的技术的流程**
<img :src="$withBase('/middleware/kafka/fast3.jpg')" alt="foo">

- 步骤：
	- (1) 调用 read() 时，文件中的内容被复制到了内核模式下的Read Buffer 中。（操作系统内核缓冲区）
	- (2) 将内核模式下的 Socket Buffe 的数据复制到网卡设备中传送


**对于kafka来说  主要是优化了kafka的两个过程：**
1. 网络数据持久化到磁盘 (Producer 到 Broker)
2. 磁盘文件通过网络发送（Broker 到 Consumer）

###  网络数据持久化到磁盘 (Producer 到 Broker)

> 对于kafka来说，Producer生产的数据存到broker，这个过程读取到socket buffer的网络数据，其实可以直接在OS内核缓冲区，完成落盘。并没有必要将socket buffer的网络数据，读取到应用进程缓冲区；在这里应用进程缓冲区其实就是broker，broker收到生产者的数据，就是为了持久化。  

**在 Producer 到 Broker 写入数据中使用了 `mmap`  进行加快写入操作**  (`mmap`将磁盘文件映射到内存，支持读和写，对内存的操作会反映在磁盘文件上。)

###  磁盘文件通过网络发送（Broker 到 Consumer）

> 磁盘数据 通过 `DMA`  直接将存储器访问的 数据 拷贝到 内核态 buffer 中, `DMA` 拷贝到 NIC Buffer(socket buffer)，无需 CPU 拷贝整个流程上 减少了数据拷贝，整个读取文件 —》 网络发送 由一个 Sendfile 调用完成，整个过程只有两次上下文切换，因此大大提供了性能  

- 操作系统：底层依赖  `sendfile()`  方法实现
- Java语言：`FieChannal.transferTo()` 方法的底层实现就是 `sendfile()`  方法


**底层技术**
> 零拷贝技术通过DMA(Direct Memory Access）技术将文件内容复制到内核模式下的ReadBuffer。不过没有数据被复制到SockeBuffer  

**总结**
> 零拷贝 不是真的零拷贝，而是适当的减少无用的拷贝，减少CPU上下文切换  
> Kafka 的 Producer 使用 `MMAP`  技术实现的  
> Kafka 的 Consumer 使用 `sendfile` 技术实现的  
>  `MMAP`  和  `sendfile`  底层都是使用 `DMA`(Direct Memory Access，直接存储器）可以让外部设备不通过CPU而直接与系统内存交换数据的接口技术  
> `MMAP`  和   `sendfile`  是代码手段（逻辑方式）、   `DMA`  是 硬件手段 （物理方式）  

**相关好文**
- [零拷贝(Zero-copy) 浅析及其应用 - rickiyang - 博客园](https://www.cnblogs.com/rickiyang/p/13265043.html)


## 批量与压缩
**批量**
<img :src="$withBase('/middleware/kafka/fast4.jpg')" alt="foo">

> Kafka Producer 向 Broker 发送消息不是一条消息一条消息的发送。使用过 Kafka 的同学应该知道，Producer 有两个重要的参数：`batch.size` 和`linger.ms` 。这两个参数就和 Producer 的批量发送有关。  

**压缩**
Kafka 支持多种压缩算法： lz4、snappy、gzip、Kafka 

**Producer、Broker 和 Consumer 使用相同的压缩算法**: 
这样在 producer 向 Broker 写入数据，Consumer 向 Broker 读取数据时甚至可以不用解压缩， **只要最终在 `Consumer`  端 Poll到消息时才解压**, 这样节省了大量的网络和磁盘开销  

## 分区并发
Kafka 的一个topic 可以分为 多个 parition,  只要在同一个 Consumer Group 中 的不同的 Consumer 并发的消费一个或多个 parition，每增加一个 Paritition 就增加了一个消费并发。 可以大大的提高并发的分区消费能里

**并不是分区数越多越好**
**分区数过度对导致什么问题？**
- **越多的分区需要打开更多的文件句柄**: 即分区越多，Broker 上需要打开的日志文件句柄越多
- **客服端服务端需要使用的内存就越多**：分区越多，需要分区缓存的消息就越多
- **降低高可用性**： 分区越多，每个Broker上分配的分区也就越多，当Broker 宕机，恢复时间将很长 

## 底层文件结构


[Kafka对PageCache的使用_G-CSDN博客_kafka pagecache](https://blog.csdn.net/gx11251143/article/details/107620259)

