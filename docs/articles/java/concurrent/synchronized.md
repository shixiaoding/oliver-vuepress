---
isTimeLine: true
sidebar: true
isComment: false
title: Synchronized
date: 2021-10-22
tags:
- Java
--- 
## 简介
> `Synchronized`   是 Java中的关键字，其目的：为了保证同一时刻只能被一个线程使用。
> 同时  `Synchronized`   作为一个 `内部锁` ，它保障原子性、可见性、有序性

**`注`**  在 Java 早期版本中，synchronized 属于 **重量级锁**，效率低下。 常被人说【synchronized好用，简单，性能不差】

## 使用方式
`Synchronized`  有三种使用方式：
- 修饰实例方法:   锁作用在 当前对象
- 修饰静态方法： 锁作用在 当前对象的类
- 修饰代码块:  可以指定锁在 对象  或  类 

```java
class SynchronizedDemo {

    // 同步方法 - 给 当前对象加锁
    public synchronized void doMethod() {
        System.out.println("hello world");
    }

    // 同步静态方法 给 对象的 class 类 进行加锁
    public synchronized static void doMethod2() {
        System.out.println("hello world");
    }

    // 同步代码块 可以指定 对象 或 类 进行加锁
    public void doMethod3() {
        synchronized (this) {
            System.out.println("hello world");
        }
        synchronized (SynchronizedDemo.class) {
            System.out.println("hello world");
        }
    }
}
```

## 锁实现原理
> 通过 反编译后，可以看出 JVM 使用两种不同的方式实现同步操作
> 同步方法：  JVM 采用 `ACC_SYNCHRONIZED`  标识符来实现同步
> 同步代码块： JVM 采用 `monitorenter` 、 `monitorexit`  两个指令来实现同步

```java
public synchronized void doMethod();
  descriptor: ()V
  flags: ACC_PUBLIC, ACC_SYNCHRONIZED
  Code:
    stack=2, locals=1, args_size=1
       0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
       3: ldc           #3                  // String hello world
       5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
       8: return
    LineNumberTable:
      line 5: 0
      line 6: 8

public static synchronized void doMethod2();
  descriptor: ()V
  flags: ACC_PUBLIC, ACC_STATIC, ACC_SYNCHRONIZED
  Code:
    stack=2, locals=0, args_size=0
       0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
       3: ldc           #3                  // String hello world
       5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
       8: return
    LineNumberTable:
      line 10: 0
      line 11: 8

public void doMethod3();
  descriptor: ()V
  flags: ACC_PUBLIC
  Code:
    stack=2, locals=4, args_size=1
       0: aload_0
       1: dup
       2: astore_1
       3: monitorenter
       4: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
       7: ldc           #3                  // String hello world
       9: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      12: aload_1
      13: monitorexit
      14: goto          22
      17: astore_2
      18: aload_1
      19: monitorexit
      20: aload_2
      21: athrow
      22: ldc           #5                  // class SynchronizedDemo
      24: dup
      25: astore_1
      26: monitorenter
      27: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
      30: ldc           #3                  // String hello world
      32: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      35: aload_1
      36: monitorexit
      37: goto          45
      40: astore_3
      41: aload_1
      42: monitorexit
      43: aload_3
      44: athrow
      45: return

```

**`注`**   无论是 ACC_SYNCHRONIZED 还是 monitorenter、monitorexit都是基于Monitor实现的，在Java虚拟机(HotSpot)中，Monitor是基于C++实现的，由ObjectMonitor实现。

### Monitor 主要数据结构如下： 

```java
ObjectMonitor() {
  _header       = NULL;
  _count        = 0;    // 记录个数
  _waiters      = 0,
  _recursions   = 0;     // 线程的重入次数
  _object       = NULL;  // 存储 Monitor 对象
  _owner        = NULL;  // 持有锁的 当前线程
  _WaitSet      = NULL;  // 处于 wait 状态的线程，会被加入到 _WaitSet
  _WaitSetLock  = 0 ;
  _Responsible  = NULL ;
  _succ         = NULL ;
  _cxq          = NULL ;   // 单向列表
  FreeNext      = NULL ;
  _EntryList    = NULL ; // 处于等待锁 block 状态的线程，会被加入到该列表
  _SpinFreq     = 0 ;
  _SpinClock    = 0 ;
  OwnerIsThread = 0 ;
  _previous_owner_tid = 0;
}
```

### 同步方法 什么时候获取锁

> 检测 是否 有 `ACC_SYNCHRONIZED` 标识,需要先获取监视器锁，然后在开始执行方法，方法执行完成后在释放监视器锁

**`注`**  其他线程来请求执行时，无法获得监视器锁而被阻断

### 同步方法 什么时候释放锁：
1. 方法执行完成后在释放监视器锁
2. 当出现异常时，方法内没有处理异常，就会在抛出异常之前，监视器锁会被释放

### 同步代码块 什么时候获取锁？什么时候释放锁？
* monitorenter ： 指令理解为加锁
* monitorexit:        指令理解为解锁

原理：
- 每个对象自身维护这一个加锁的计数器
- 当线程 获取到锁 则对计数器 +1  （同一个线程可以多次获取该对象的锁）
- 当线程 释放锁 则对计数器 -1
- 当计数器 自减到 0 是，锁将被释放，其他线程可以进行获取锁

 [Moniter 实现原理](https://www.hollischuang.com/archives/2030) 

## 三特性
### 原子性
> 一个操作不可中断的，要么全部执行完成、要么就都不执行

`Synchronized`   通过 `monitorenter` 和 `monitorexit`指令，可以保证被synchronized修饰的代码在同一时间只能被一个线程访问，在锁未释放之前，无法被其他线程访问到。

**`例`** 

> 线程1在执行`monitorenter`指令的时候，会对`Monitor`进行加锁，加锁后其他线程无法获得锁，除非线程1主动解锁。即使在执行过程中，由于某种原因，比如CPU时间片用完，线程1放弃了CPU，但是，他并没有进行解锁。而由于`synchronized` 的锁是可重入的，下一个时间片还是只能被他自己获取到，还是会继续执行代码。直到所有代码执行完。这就保证了原子性

### 可见性
> 当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值

synchronized又是如何保障可见性的呢？

**`核心`**  `Synchronized`  关键字锁住的是对象，其值是具有可见性的

- JAVA内存模型：
	- 规定了所有的变量存储在主内存中，每个线程都要维护一个工作内存，使用变量时，会将主内存变量拷贝到工作内存中，改变变量值，也是对工作内存中进行改变。在不主动 与 主内存之间进行数据同步时，其他线程对变量的值是不可见的
- Synchronized 执行机制 ：
	- 为了保证可见性， 在释放锁之前，必须先把变量同步到主内存中，后续的线程访问到的就是被修改后的值

### 有序性
> 程序执行的顺序按照代码的先后顺序执行

**`注`**  `Synchroized`  是  无法像 `volatile`  通过使用 `内存屏障` 进行 禁止指令重排 和 处理器优化的

**为什么还说synchronized也提供了有序性保证呢？**

- 基于 `as-if-serial`  语义 :  保证了 单线程中 指令重排是有一定的限制的，只要编译器和处理器遵循这个语义，那么就可以任务单线程执行时 按照顺序执行的
- 基于 `synchronized`  修饰的代码是 `原子性` 的，同一时间只能被同一个线程访问，也就是 `单线程` 执行

## 锁优化
- Java 1.6 之前 `Synchronized`  只存在，无锁、重量锁
- Java 1.6 之后 对其进行了锁的优化 无锁、偏向锁、轻量锁、重量锁

### Java对象头
JDK1.6 JVM 对象实现堆内存分为三部分：
- 对象头
- 实例数据
- 对其填充

对象头中有分为三部分：
- Mark Word 
	- Mark Word 记录了对象和锁有关的信息
- 指向类的指针
- 数组长度

<img :src="$withBase('/java/concurrent/synchronized/1.png')" alt="foo">

<img :src="$withBase('/java/concurrent/synchronized/2.png')" alt="foo">

**`核心`**   锁升级主要依赖于 Mark Word中的 锁标志位 和 释放偏向锁的标志位


### 无锁
> 默认状态是无锁的。无锁没有对资源进行锁定，所有的线程都能访问并修改同一个资源，但同时只有一个线程能修改成功。 即 没用 `Synchornized`  修饰的代码块都是无锁的

### 偏向锁

> 当没有竞争出现时，默认会使用偏向锁。JVM 会利用 CAS 操作，在对象头上的 Mark Word 部分设置> 线程 ID以表示这个对象偏向于当前线程，所以并不涉及真正的互斥锁。这样做的假设是基于在很多应用场景中，大部分对象生命周期中最多会被一个线程锁定，使用偏斜锁可以降低无竞争开销

<img :src="$withBase('/java/concurrent/synchronized/3.png')" alt="foo">

- 升级的过程： 进程进入同步代码块时，会利用 CAS 将 Markwork 进行标识
	- 线程ID
	- 锁状态标识：01
	- 是否偏向： 1
- 膨胀过程：当有另外线程进入，偏向锁会升级成轻量级锁。比如线程A是偏向锁，这是B线程进入，就会成轻量级锁，**只要有两个线程就会升级成轻量级锁**

### 轻量级锁
> 多个线程竞争同步资源时，没有获取资源的线程自旋等待锁释放

* 升级过程：在线程运行获取锁后，会在栈帧中创造锁记录并将MarkWord复制到锁记录，然后将MarkWord指向锁记录，如果当前线程持有锁，其他线程再进入，此时其他线程会cas自旋，直到获取锁，轻量级锁适合多线程交替执行，效率高（cas只消耗cpu，我在cas原理一篇文章中详细讲过。）。
* 膨胀过程：有两种情况会膨胀成重量级锁。
	* 1、cas自旋10次还没获取锁。
	* 2、其他线程正在cas获取锁，第三个线程竞争获取锁，锁也会膨胀变成重量级锁。

### 重量级锁
- 重量锁

<img :src="$withBase('/java/concurrent/synchronized/4.png')" alt="foo">

<img :src="$withBase('/java/concurrent/synchronized/5.png')" alt="foo">


## 锁消除
> 在使用synchronized的时候，如果JIT经过逃逸分析之后发现并无线程安全问题的话，就会做锁消除。

锁消除：
* 逃逸分析：即: JIT 比编译器 借助 逃逸分析 来判断同步快所使用的锁对象是否只能够被一个线程访问
* 如果是的话 JIT编译器 在编译这个同步代码块的时候就会取消这部分代码的同步

**`例`** 

```java
// 优化前
public void f() {
    Object oliver = new Object();
    synchronized(oliver) {
        System.out.println(oliver);
    }
}

// 优化后
public void f() {
    Object oliver = new Object();
    System.out.println(oliver);
}
```

## 锁粗化

* 如果在一段代码中连续的对同一个对象反复加锁解锁，其实是相对耗费资源的，这种情况可以适当放宽加锁的范围，减少性能消耗。
* 当JIT发现一系列连续的操作都对同一个对象反复加锁和解锁，甚至加锁操作出现在循环体中的时候，会将加锁同步的范围扩散（粗化）到整个操作序列的外部。

```java
# 粗化前
for(int i=0;i<100000;i++){  
    synchronized(this){  
        do();  
}  

# 粗化后    
  synchronized(this){
    for(int i=0;i<100000;i++){  
       do();  
    }
}
```


## 疑问点：
- 锁降级