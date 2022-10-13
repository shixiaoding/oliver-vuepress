---
isTimeLine: true
sidebar: true
isComment: false
title: ThreadLocal
date: 2021-10-17
tags:
- Java
--- 
## 什么是ThreadLocal
> `ThreadLocal`   即：线程 的 局部变量，主要是存放每个线程的私有数据   
> 每当你创建一个  `ThreadLocal`  变量，那么访问这个变量的每个线程都会在当前线程存一份这个变量的本地副本，只有自身线程能够访问，和其他线程是不共享的，这样可以避免线程资源共享变量冲突的问题

## ThreadLocal的基本使用方式
```java
public class ThreadLocalDemoOne {

    /**
     * 创建 ThreadLocal 变量
     */
    private static ThreadLocal<Integer> intLocal = new ThreadLocal<>();

    /**
     * 创建 ThreadLocal 并 初始化赋值
     */
    private static ThreadLocal<Integer> intLocal2 = ThreadLocal.withInitial(() -> 6);

    public static void main(String[] args) {
        // 设置变量值
        intLocal.set(8);
        // 读取变量值
        System.out.println("intLocal data: " + intLocal.get());
        // 清空变量值
        intLocal.remove();
        System.out.println("intLocal data: " + intLocal.get());
        System.out.println("intLocal data: " + intLocal2.get());
    }
}

```

## ThreadLocal  基本的数据结构

> 从 `Thread` 类源代码入手，可以看到 `Thread`  中 存有两个  `ThreadLocal.ThreadLocalMap`  的对象

```java
public class Thread implements Runnable {
    //......
    //与此线程有关的ThreadLocal值。由ThreadLocal类维护
    ThreadLocal.ThreadLocalMap threadLocals = null;

    //与此线程有关的InheritableThreadLocal值。由InheritableThreadLocal类维护
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
    //......
}
```

`Thread`  类中的变量存储变量私有的 ThreadLocal值

- threadLocals： 线程私有的ThreadLocal 的值
- inheritableThreadLocals：可以被线程继承的 线程私有的值

**`ThreadLocalMap`**

<img :src="$withBase('/java/concurrent/threadlocal/1.jpg')" alt="foo">

`ThreadLocalMap`  是 ThreadLocal  类实现的定制化的 HashMap

```java
static class ThreadLocalMap {

    static class Entry extends WeakReference<ThreadLocal<?>> {
        /** The value associated with this ThreadLocal. */
        Object value;

        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }

    /**
     * 初始化空间大小
     */
    private static final int INITIAL_CAPACITY = 16;

    /**
     * The table, resized as necessary.
     * table.length MUST always be a power of two.
     */
    private Entry[] table;
```

- key：就是当前线程的 就是 ThreadLocal 对象
- value:  通过 set 设置的值
**`注意:`** `Entry extends WeakReference<ThreadLocal<?>>`  table 中的 key 是一个 弱引用，这是个值得探讨的点、Java 为何要设计 key 为 弱引用呢？

**`总结:`**  最终的变量是放在了当前线程的 ThreadLocalMap 中，并不是存在 ThreadLocal 上，ThreadLocal 可以理解为只是ThreadLocalMap的封装，传递了变量值。

## InheritableThreadLocal
> `InheritableThreadLocal`   主要用于将 主线程的 `ThreadLocal` 对象, 传递到子线程中

```java
public class InheritableThreadLocalDemo {

    private static ThreadLocal<Integer> intLocal= new ThreadLocal<>();
    private static InheritableThreadLocal<Integer> intInheritableLocal = new InheritableThreadLocal<>();

    public static void main(String[] args) {

        intLocal.set(1);
        intInheritableLocal.set(2);

        Thread thread = new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + “ ：” + intLocal.get());
            System.out.println(Thread.currentThread().getName() + “ ：” + intInheritableLocal.get());
        });
        thread.start();
    }
}
```

执行结果
```
Thread-0 ：null
Thread-0 ：2
```

可以看到 声明  `InheritableThreadLocal` 的对象，是能被子线程继承到的。

## ThreadLocal  内存泄露问题
**内存泄露**
>  程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但内存泄露堆积后果很严重，无论多少内存,迟早会被占光

我看到的很多文章都说，内存泄露 是由于 `ThreadLocalMap`  的 `key` 为弱引用导致的，弱引用对象，在没有被外部引用时，当发生GC 是 key 被回收为 null, 但是 value 还存在强引用，可能会存在 内存泄露问题

但其实，由于 Thread -> ThreadLocalMap -> Entry -> value 存在这样一条引用链   
只要 `Thread` 不被退出，`ThreadLocalMap` 的生命周期将是一样长的，如果不进行手动删除，必然会出现内存泄露。更何况我们大多数是以线程池的方式去操作线程。

> 那又是如果解决的内存泄露 ? 

`ThreadLocal` 设置了两层保障: 
- key :  创建为弱引用对象
- 调用 `set()`, `get()`, `remove()`   都会对 key = null 进行清除 value 操作


**`总结:`**   
`threadLocal` 内存泄漏的根源是：由于 `ThreadLocalMap` 的生命周期跟 `Thread`一样长，如果没有手动删除对应 `key` 就会导致内存泄漏，而不是因为弱引用。

**建议：在使用ThreadLocal的时候要养成及时 `remove()`的习惯**

### 源码中分析防止内存泄露的 清除操作

`ThreadLocal`  中有两种清除方式:
- expungeStaleEntry()  探测式清理  
- cleanSomeSlots() 启发式清除


**`remove() 源码:`**  

```java
public void remove() {
    // 获取当前线程绑定的 threadLocals
    ThreadLocalMap m = getMap(Thread.currentThread());
    // 当 map 不为 null 进行移除当前线程中指点的 ThreadLocal 对象的 值
    if (m != null)
        m.remove(this);
}

private void remove(ThreadLocal<?> key) {
    Entry[] tab = table;
    int len = tab.length;
    // 计算 ThreadLocal key 的下标值
    int i = key.threadLocalHashCode & (len-1);
    // 循环遍历 只要不为null
    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        // 比对 key 值，如果相等的话
        if (e.get() == key) {
            // 调用 clear() 方法清理掉
            e.clear();
            // 执行 探测式清理  将 key 为 null 的节点 进行清除
            expungeStaleEntry(i);
            return;
        }
    }
}


private int expungeStaleEntry(int staleSlot) {
    Entry[] tab = table;
    int len = tab.length;

    // expunge entry at staleSlot
    tab[staleSlot].value = null;
    tab[staleSlot] = null;
    size--;

    // Rehash until we encounter null
    Entry e;
    int i;
    for (i = nextIndex(staleSlot, len);
         (e = tab[i]) != null;
         i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();
        //对table中key为null进行处理,将value设置为null，清除value的引用
        if (k == null) {
            e.value = null;
            tab[i] = null;
            size--;
        } else {
            int h = k.threadLocalHashCode & (len - 1);
            if (h != i) {
                tab[i] = null;
                //这里主要的作用是由于采用了开放地址法，所以删除的元素是多个冲突元素中的一个，需要对后面的元素作
                //处理，可以简单理解就是让后面的元素往前面移动
                // Unlike Knuth 6.4 Algorithm R, we must scan until
                // null because multiple entries could have been stale.
                while (tab[h] != null)
                    h = nextIndex(h, len);
                tab[h] = e;
            }
        }
    }
    return i;
}
```

<img :src="$withBase('/java/concurrent/threadlocal/2.jpg')" alt="foo">

**`get() 源码:`**  

```java

public T get() {
    // 获取当前线程绑定的 threadLocals
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    // 当 map 不为 null
    if (map != null) {
        // 查询当前ThreadLocal变量实例对应的Entry  (获取中内部调用了清除)
        ThreadLocalMap.Entry e = map.getEntry(this);
        // 如果不为null,获取value,返回
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T) e.value;
            return result;
        }
    }
    // 当 map 为 null 进行初始化
    return setInitialValue();
}

private Entry getEntry(ThreadLocal<?> key) {
    int i = key.threadLocalHashCode & (table.length - 1);
    Entry e = table[i];

    // 对应的entry存在且 ThreadLocal就是key，则命中返回
    if (e != null && e.get() == key)
        return e;
    else
        // 如果不是 则进行线性探针，往后进行查找元素
        return getEntryAfterMiss(key, i, e);
}


private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
    Entry[] tab = table;
    int len = tab.length;

    while (e != null) {
        ThreadLocal<?> k = e.get();
        // 该 entry 当前的 ThreadLocal 返回数据
        if (k == key)
            return e;
        // 该 entry 对应的 ThreadLocal 已经被回收 进行 探测式清除
        if (k == null)
            expungeStaleEntry(i);
        else
            // 指向下个 槽位 往下循环
            i = nextIndex(i, len);
        e = tab[i];
    }
    return null;
}

```

<img :src="$withBase('/java/concurrent/threadlocal/3.jpg')" alt="foo">

**`set() 源码:`**  

```java
private void set(ThreadLocal<?> key, Object value) {
    //.... 省略部分代码 
    for (Entry e = tab[i];
		   //.... 省略部分代码 
        // 冲突位 key 为 null 则说明  被 GC 回收，进行清理回收数据
        if (k == null) {
            // 清理 key 被 GC 为null的数据  replaceStaleEntry 内部进行探针式清除
            replaceStaleEntry(key, value, i);
            return;
        }
    }
    //.... 省略部分代码 
    // 检查是否需要进行扩容   cleanSomeSlots(i, sz) 启发式清除
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}

```

> 通过  `set()`, `get()`, `remove()`  三个方法的源码调用查看，可以明确的知道 `ThreadLocal`  做了很多清除操作，为了防止 内存泄露

### 具体的清除流程

>  expungeStaleEntry： 是对 ThreadLocal 被回收的节点开始，向后进行查找时候还存在被回收的节点进行清除操作

```java

/**
 * 探测式清除
 * @param staleSlot 为null 的 节点位置
 * @return
 */
private int expungeStaleEntry(int staleSlot) {
    Entry[] tab = table;
    int len = tab.length;

    // expunge entry at staleSlot
    tab[staleSlot].value = null;
    tab[staleSlot] = null;
    size--;

    // Rehash until we encounter null
    Entry e;
    int i;
    for (i = nextIndex(staleSlot, len);
         (e = tab[i]) != null;
         i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();
        //对table中key为null进行处理,将value设置为null，清除value的引用
        if (k == null) {
            e.value = null;
            tab[i] = null;
            size--;
        } else {
            int h = k.threadLocalHashCode & (len - 1);
            if (h != i) {
                tab[i] = null;
                //这里主要的作用是由于采用了开放地址法，所以删除的元素是多个冲突元素中的一个，需要对后面的元素作
                //处理，可以简单理解就是让后面的元素往前面移动
                // Unlike Knuth 6.4 Algorithm R, we must scan until
                // null because multiple entries could have been stale.
                while (tab[h] != null)
                    h = nextIndex(h, len);
                tab[h] = e;
            }
        }
    }
    return i;
}
```


- cleanSomeSlots： 是从指定节点位置，通过n 来控制查找的次数，进行多次清除操作
	- expungeStaleEntry 返回了下一个为空的节点位置
	- cleanSomeSlots 会从 下一个为空节点位置，再次进行扫描操作
	- 具体能进行几次扫描 ，第一次是 传递来的 n , 从第二次开始 是 table 的 长度来决定的

```


/**
 * 启发式清除
 * @param i 当前的节点位置
 * @param n 是用于控制控制扫描次数的
 * @return
 */
private boolean cleanSomeSlots(int i, int n) {
    boolean removed = false;
    Entry[] tab = table;
    int len = tab.length;
    do {
        i = nextIndex(i, len);
        Entry e = tab[i];
        if (e != null && e.get() == null) {
            // 扩大扫描控制因子 设置成表的长度
            n = len;
            removed = true;
            // 使用 探测式清除 进行清除操作
            i = expungeStaleEntry(i);
        }
    } while ((n >>>= 1) != 0);
    return removed;
}
```

**`总结:`**  可以看到  `cleanSomeSlots`  底层 还是通过  `expungeStaleEntry`  去进行清除的。但是  `cleanSomeSlots`  清除范围 要比  `expungeStaleEntry`   大


## ThreadLocalMap 的Hash冲突
>  `ThreadLocal`  底层 没有 `java.util.HashMap` 作为底层的Map 数据结构 所以需要使用不同的 Hash冲突解决方案
>  `java.util.HashMap`  使用  数组 + 链表 （链表一定长度转化为红黑树）的方式解决 Hash 冲突问题
> `ThreadLocalMap`  则是使用 线性探测法 

```java
private void set(ThreadLocal<?> key, Object value) {
    Entry[] tab = table;
    int len = tab.length;
    // 根据 hash 找到 map 中的下标
    int i = key.threadLocalHashCode & (len-1);
    // 进行 线性探测 如果有冲突 则 进循环体内进行操作
    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();
        // 冲突位置的 key 就是自身时，直接赋值
        if (k == key) {
            e.value = value;
            return;
        }
        // 冲突位 key 为 null 则说明  被 GC 回收，进行清理回收数据
        if (k == null) {
            // 清理 key 被 GC 为null的数据
            replaceStaleEntry(key, value, i);
            return;
        }
    }

    // 找到可利用的桶位 赋值
    tab[i] = new Entry(key, value);
    int sz = ++size;
    // 检查是否需要进行扩容
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
```


## ThreadLocalMap 的扩容机制
相关扩容参数: 

```java
/**
 * 初始化容量条数
 */
private static final int INITIAL_CAPACITY = 16;

/**
 * The table, resized as necessary.
 * table.length MUST always be a power of two.
 */
private Entry[] table;

/**
 * 当前表中的条数
 */
private int size = 0;

/**
 * 表 扩容的 下次扩容阀值
 */
private int threshold; // Default to 0

/**
 * 设定扩容阈值公式
 */
private void setThreshold(int len) {
    threshold = len * 2 / 3;
}
```

具体的 `set()`  方法

```java
private void set(ThreadLocal<?> key, Object value) {
		//..... 上面代码省略
      // 检查是否需要进行扩容
      // 条件： 当 启发式清除操作 没有清除到数据时 && 表中条数 >= 当前设置的扩容阀值
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
```
从基本的参数 、扩容 参数 、以及 set() 中的 扩容判断  我们知道 基本的扩容判断

- 启发式清除操作 没有清除到数据时
- 当前 表中元素个数 >= threshold (16 * 2/ 3 = 10.6)

**`但真的是这样吗？`** 接着查看  `rehash()`  方法

```java

private void rehash() {
    // 先进行探针式 清除 GC 元素
    expungeStaleEntries();
    
    // Use lower threshold for doubling to avoid hysteresis
    
    // 清除 后的 表中个数 大于  下次 扩容阀值 75% ~ 80%进行 扩容
    // 是以 第一次扩容的值来算的 具体对不对 不是很确定
    // 初始： threshold =  threshold = len * 2 / 3;  16 * 2/ 3 = 10.6  
    if (size >= threshold - threshold / 4)
        resize();
}

```

**`总结:`**    
`ThreadLocalMap`  的扩容操作，进行了2次 `Null`  key 元素的清除，并在每次清除后进行 阀值计算。个人理解这样的操作的原因，主要还是由于扩容时，需要进行元素位置的移动操作，为了减少移动操作。  
**`注:`**  元素位移时 会再一次  对 `Null`  key 元素的进行清除操作

<img :src="$withBase('/java/concurrent/threadlocal/4.jpg')" alt="foo">

【相关资料】
- [ThreadLocal的内存泄露？什么原因？如何避免？ - 知乎](https://zhuanlan.zhihu.com/p/102571059)