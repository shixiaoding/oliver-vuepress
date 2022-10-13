---
isTimeLine: true
sidebar: true
isComment: false
title: 线程池
date: 2021-10-22
tags:
- Java
--- 
## 什么是线程池
线程池：指管理一组相同工作线程的资源池
线程池 与 工作队列是相互的，线程池通过从工作队列中获取任务，执行任务
优点：
* 可以重用现有的线程，避免重复创建 和 销毁 线程产生巨大的开销
* 请求到达时，减少因为等待创建线程而延迟任务的执行，提供响应性

## 核心的Executor
三大组成部分：
- 任务(Runnable /Callable)
- 任务的执行(Executor)
- 异步计算的结果(Future) 

**类框架图**

<img :src="$withBase('/java/concurrent/executor/1.png')" alt="foo">

**Executor 执行器**

* Executor - 运行任务的简单接口。
* ExecutorService - 扩展了 Executor 接口。扩展能力：
	* 支持有返回值的线程；
	* 支持管理线程的生命周期。

`ThreadPoolExecutor` 和`ScheduledThreadPoolExecutor`  这两个关键类实现了`ExecutorService` 接口

## ThreadPoolExecutor
> ThreadPoolExecutor 是 Executor  框架最核心的类。

```java

public ThreadPoolExecutor(int corePoolSize, //线程池的核心线程数量
                          int maximumPoolSize, //线程池的最大线程数
                          long keepAliveTime, //当线程数大于核心线程数时，多余的空闲线程存活的最长时间
                          TimeUnit unit,  //时间单位
                          BlockingQueue<Runnable> workQueue,  //任务队列，用来储存等待执行任务的队列
                          ThreadFactory threadFactory,  //线程工厂，用来创建线程，一般默认即可
                          RejectedExecutionHandler handler  //拒绝策略，当提交的任务过多而不能及时处理时，我们可以定制策略来处理任务
) {
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    if (workQueue == null || threadFactory == null || handler == null)
        throw new NullPointerException();
    this.acc = System.getSecurityManager() == null ?
            null :
            AccessController.getContext();
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}

```

重要的核心参数：

- corePoolSize: 核心线程数线程数定义了最小可以同时运行的线程数量。
- maximumPoolSize: 当队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数量变为最大线程数。
- workQueue: 当新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。
- keepAliveTime:  线程保持活动的时间
	- 当线程池中的线程数量大于 `corePoolSize` 的时候，如果这时没有新的任务提交，核心线程外的线程不会立即销毁，而是会等待，直到等待的时间超过了 keepAliveTime才会被回收销毁；
- unit: `keepAliveTime` 参数的时间单位。
- threadFactory: `executor` 创建新线程的时候会用到。
- handler: 饱和策略
	- AbortPolicy: 抛出 `RejectedExecutionException` 来拒绝新任务的处理。这也是默认策略。
	- DiscardPolicy：不处理新任务，直接丢弃掉，不会抛出异常
	- DiscardOldestPolicy：将丢弃最早的未处理的任务请求
	- CallerRunsPolicy： 直接调用 `run` 方法并且阻塞执行
	- 也可以通过实现 `RejectedExecutionHandler` 接口来定制处理策略

**`CallerRunsPolicy`** 当线程池中工作线程数达到最大值，阻塞队列也已经满了，就会直接让主线程去执行调用 `Runnable` 的 `run()` 方法执行任务。主线程就会被堵塞，等待主线程执行完成后，新的任务才能放入队列中

## 线程池原理
### 线程池的基本元素

- ctl 为原子类型的变量, 有两个概念，高3位保存 `runState`，低29位保存 `workerCount`
	- workerCount: 表示有效的线程数  
	- runState: 表示线程状态, 是否正在运行, 关闭等

### 线程池拥有5中状态
  - RUNNING： 能接受新提交的任务，并且也能处理阻塞队列中的任务
  - SHUTDOWN：关闭状态，不再接受新提交的任务，但却可以继续处理阻塞队列中已保存的任务。在线程池处于 `RUNNING` 状态时，调用 `shutdown()`方法会使线程池进入到该状态。（`finalize()` 方法在执行过程中也会调用shutdown()方法进入该状态）
  - STOP：不能接受新任务，也不处理队列中的任务，会中断正在处理任务的线程。在线程池处于 RUNNING 或SHUTDOWN 状态时，调用 shutdownNow() 方法会使线程池进入到该状态
  - TIDYING：如果所有的任务都已终止了，workerCount (有效线程数) 为0，线程池进入该状态后会调用 terminated() 方法进入TERMINATED 状态
  - TERMINATED： 在terminated() 方法执行完后进入该状态，默认terminated()方法中什么也没有做


```java
/**
 * ctl 为原子类型的变量, 有两个概念
 * workerCount, 表示有效的线程数
 * runState, 表示线程状态, 是否正在运行, 关闭等
 */
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));

// 29
private static final int COUNT_BITS = Integer.SIZE - 3;
private static final int CAPACITY   = (1 << COUNT_BITS) - 1;

// runState is stored in the high-order bits
// 线程池的五种状态
// 即高3位为111, 接受新任务并处理排队任务
private static final int RUNNING    = -1 << COUNT_BITS;
// 即高3位为000, 不接受新任务, 但处理排队任务
private static final int SHUTDOWN   =  0 << COUNT_BITS;
// 即高3位为001, 不接受新任务, 不处理排队任务, 并中断正在进行的任务
private static final int STOP       =  1 << COUNT_BITS;
// 即高3位为010, 所有任务都已终止, 工作线程为0, 线程转换到状态TIDYING, 将运行terminate()钩子方法
private static final int TIDYING    =  2 << COUNT_BITS;
// 即高3位为011, 标识terminate（）已经完成
private static final int TERMINATED =  3 << COUNT_BITS;
```

****线程池状态流程过程****

<img :src="$withBase('/java/concurrent/executor/2.png')" alt="foo">


****execute() 执行方法****
```java

public void execute(Runnable command) {
    // 如果任务为null，则抛出异常。
    if (command == null)
        throw new NullPointerException();
    /*
     * Proceed in 3 steps:
     *
     * 1. If fewer than corePoolSize threads are running, try to
     * start a new thread with the given command as its first
     * task.  The call to addWorker atomically checks runState and
     * workerCount, and so prevents false alarms that would add
     * threads when it shouldn't, by returning false.
     *
     * 2. If a task can be successfully queued, then we still need
     * to double-check whether we should have added a thread
     * (because existing ones died since last checking) or that
     * the pool shut down since entry into this method. So we
     * recheck state and if necessary roll back the enqueuing if
     * stopped, or start a new thread if there are none.
     *
     * 3. If we cannot queue task, then we try to add a new
     * thread.  If it fails, we know we are shut down or saturated
     * and so reject the task.
     */
    // ctl 中保存的线程池当前的一些状态信息
    int c = ctl.get();
    //  下面会涉及到 3 步 操作
    // 1.首先判断当前线程池中之行的任务数量是否小于 corePoolSize
    // 如果小于的话，
    // 通过addWorker(command, true)新建一个线程，并将任务(command)添加到该线程中；然后，启动该线程从而执行任务。
    if (workerCountOf(c) < corePoolSize) {
        if (addWorker(command, true))
            return;
        c = ctl.get();
    }
    // 2.如果当前之行的任务数量大于等于 corePoolSize 的时候就会走到这里
    // 通过 isRunning 方法判断线程池状态，线程池处于 RUNNING 状态才会被并且队列可以加入任务，该任务才会被加入进去
    if (isRunning(c) && workQueue.offer(command)) {
        int recheck = ctl.get();
        // 再次获取线程池状态，如果线程池状态不是 RUNNING 状态就需要从任务队列中移除任务，
        // 并尝试判断线程是否全部执行完毕。同时执行拒绝策略。
        if (! isRunning(recheck) && remove(command))
            reject(command);
            // 如果当前线程池为空就新创建一个线程并执行。
        else if (workerCountOf(recheck) == 0)
            addWorker(null, false);
    }
    //3. 通过addWorker(command, false)新建一个线程，并将任务(command)添加到该线程中；然后，启动该线程从而执行任务。
    //如果addWorker(command, false)执行失败，则通过reject()执行相应的拒绝策略的内容。
    else if (!addWorker(command, false))
        reject(command);
}

```

<img :src="$withBase('/java/concurrent/executor/3.png')" alt="foo">
<img :src="$withBase('/java/concurrent/executor/4.png')" alt="foo">

核心执行流程： [Java并发（三）线程池原理 - 写出高级BUG - 博客园](https://www.cnblogs.com/warehouse/p/10720781.html)

### 具体的执行流程

<img :src="$withBase('/java/concurrent/executor/5.png')" alt="foo">

### 相关方法的区别

#### Runnable vs Callable
- Runnable ：不会返回结果或抛出检查异常
- Callable：会返回结果或抛出检查异常

#### execute vs submit
1. execute()： 方法用于提交不需要返回值的任务，所以无法判断任务是否被线程池执行成功与否；
2. submit()： 方法用于提交需要返回值的任务。线程池会返回一个**Future**类型的对象，通过这个**Future**对象可以判断任务是否执行成功 
#### shutdown vs shutdownNow
* shutdown() :  关闭线程池，线程池的状态变为 SHUTDOWN。线程池不再接受新任务了，但是队列里的任务得执行完毕。
* shutdownNow(): 关闭线程池，线程的状态变为 STOP。线程池会终止当前正在运行的任务，并停止处理排队的任务并返回正在等待执行的 List。

#### isShutDown 和 isTerminated
- isShutDown  当调用 shutdown() 方法后返回为 true。
- isTerminated 当调用 shutdown() 方法后，并且所有提交的任务完成后返回为 true

## Executors
> Executors  是 Executor 的工具类，内部定义了几种 线程池，底层还是调用 `ThreadPoolExecutor`   去创建线程池。 只不过是设置了一些相关的默认值

### FixedThreadPool

> 创建一个可重用固定数量线程的线程池   `corePoolSize` 和 `maximumPoolSize`  都被设置为 `nThreads`  

- 相关特点：
	- 使用了 `LinkedBlockingQueue`  堵塞队列，最大容量为 `Integer.MAX_VALUE`  可能堆积大量的请求，从而导致 OOM
	- 核心线程数 和 最大线程数 相同，则线程池都满的情况下，都会进入任务队列

```java
public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>(),
                                  threadFactory);
}
```

### SingleThreadExecutor

>  创建单一线程的线程池, `corePoolSize` 和 `maximumPoolSize`  都被设置为 1

- 相关特点：
	- 使用了 `LinkedBlockingQueue`  堵塞队列，最大容量为 `Integer.MAX_VALUE`  可能堆积大量的请求，从而导致 OOM

```
public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory) {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>(),
                                threadFactory));
}
```


### CachedThreadPool
> `CachedThreadPool `  是会根据需求去创建去创建线程的 线程池

- 相关特点：
	- 默认核心线程数为 0，等需要使用时创建线程，但是核心线程数 为  `Integer.MAX_VALUE`  ，可以无界限的创建线程，极端情况下 会导致耗尽 cpu 和内存资源

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}

public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>(),
                                  threadFactory);
}
```

### 相关好文
-  [《Java线程池实现原理及其在美团业务中的实践》](https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html) 
- [如何设置线程池参数？美团给出了一个让面试官虎躯一震的回答。](https://mp.weixin.qq.com/s?__biz=Mzg3NjU3NTkwMQ==&mid=2247505103&idx=1&sn=a041dbec689cec4f1bbc99220baa7219&source=41#wechat_redirect)
- [线程池运用不当的一次线上事故 | HeapDump性能社区](https://www.heapdump.cn/article/646639)
- [Java并发（三）线程池原理 - 写出高级BUG - 博客园](https://www.cnblogs.com/warehouse/p/10720781.html)
