---
isTimeLine: true
sidebar: true
isComment: false
title: ReentrantLock
date: 2021-10-22
tags:
- Java
--- 

> ReentrantLock  是基于 Lock 可重入且独占式锁   提供了 与  Synchornzied  相同的 互斥性、内存可见性 和 可重入性
> 但是相比 Synchornzied 它更灵活，ReentrantLock 支持 轮询、超时、中断等功能 。

<img :src="$withBase('/java/concurrent/reentrantLock/1.png')" alt="foo">


## 基本的使用案例

```java
private final Lock lock = new ReentrantLock();
// 申请锁，不能放在 try 块里，防止抛异常的时候执行 finally 块中的unlock()
lock.lock();
try{
    //对共享数据进行访问
    ...
} finally {
    // 总是在 finally 块的第一行释放锁，避免锁泄露
   // Lock 不会像 synchronized 发生异常的时候释放锁
    lock.unlock();
}
```


## 公平锁 和 非公平锁
> ReentrantLock 内部类  Sync 继承了 AQS，并内部实现了 两种锁模式

- ReentrantLock 支持两种锁模式：
	- 公平锁  (FairSync)
	- 非公平锁  (NonfairSync)

```java
/**
 *  构造方法 默认是 非公平锁
 */
public ReentrantLock() {
    sync = new NonfairSync();
}

/**
 * 传参 fair ： true 为公平锁  false 为 非公平锁
 */
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}

```

### 获取锁的过程

> 获取 lock 的过程 是区别 公平锁 和 非 公平锁的

<img :src="$withBase('/java/concurrent/reentrantLock/2.png')" alt="foo">

### 获取锁失败 加入队列

<img :src="$withBase('/java/concurrent/reentrantLock/3.png')" alt="foo">

### 释放锁的过程

> unlock不区分 公平锁 还是 非公平锁

方法：**`AbstractQueuedSynchronizer. release`**
```java

public final boolean release(int arg) {
    // 尝试 释放锁 如果成功释放锁，让 head 获取锁
    if (tryRelease(arg)) {
        Node h = head;
        if (h != null && h.waitStatus != 0)
            unparkSuccessor(h);
        return true;
    }
    return false;
}

```

方法：**`ReentrantLock. tryRelease`**

```java
protected final boolean tryRelease(int releases) {
    // 先计算当前线程释放锁后的state值
    int c = getState() - releases;
    // 获取当前线程是否是 独占锁， 如果不是 则抛出异常
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    boolean free = false;
    // 如果 计算值 为 0 即 可以释放锁 ，将锁的占有线程 给清空
    if (c == 0) {
        free = true;
        setExclusiveOwnerThread(null);
    }
    // 设置 锁状态
    setState(c);
    return free;
}
```

<img :src="$withBase('/java/concurrent/reentrantLock/4.png')" alt="foo">


## ReentrantLock 相对 synchronized  之间的区别

<img :src="$withBase('/java/concurrent/reentrantLock/5.png')" alt="foo">
