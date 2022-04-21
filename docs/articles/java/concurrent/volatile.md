---
isTimeLine: true
sidebar: true
isComment: false
title: volatile
date: 2021-10-09
tags:
- Java
--- 

volatile 关键字是 Java虚拟机提供的最轻量级的同步机制。
volatile  是轻量级锁 只能保证 `可见性`  和 `有序性`  ，不保证 原子性 （最能保证64位类型的写入的原子性）。 由于没有排他锁，不会像 `Synchronized`  引起线程上下文的切换 和 调度

**三大特性:**
- 内存可见性
- 不保证原子性
- 禁止重排序

## 内存可见性
可见性概念：当多线程访问同一个变量时，一个线程修改了变量的值，其他线程能立即看到改变后的变量值

::*什么原因产生的可见性问题*::

计算机CPU层面：
由于现代计算机的CPU 多层缓存，L1、L2、L3 之间的 缓存更新是同步进行的，但在 核心 与 L1 之间存在着 `Store buffer`   和 `Load buffer`  ，写入操作写写入 `Store buffer`  在异步刷入 L1 ，异步操作可能导致可见性问题：

<img :src="$withBase('/java/concurrent/volatile/volatile1.jpg')" alt="foo">


Java内存模型(JMM)：
JMM定义了：每个线程都有自己的工作内存，读取 和 写入 都需要 将变量 从 主内存读取到 自己的工作内存中进行操作，由于不同的线程之间是无法访问对方的工作内存，所以存在 线程 工作内存 与 主内存 同步的操作。由于同步时间，和线程执行的时间存在顺序问题，可能会导致可见性问题

<img :src="$withBase('/java/concurrent/volatile/volatile2.jpg')" alt="foo">

::解决方案::

通过对变量添加 `volatile`  关键字，保证其可见性，主要是通过：
- volatile 修饰的变量，JMM会把该线程本地内存中的变量强制刷新到主内存中
- 写操作会让其他线程中的 volatile 变量缓存无效 


::案例::

```java
public static int a = 0;

public static class Main {
    
    public static void main(String[] args) throws Exception {
        Thread t1 = new Thread(() -> {
            while (a == 0) {
                
            }
            System.out.println("T1得知a = 1");
        });

        Thread t2 = new Thread(() -> {
            try {
                Thread.sleep(1000);
                a = 1;
                System.out.println("T2修改a = 1");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        t1.start();
        t2.start();
    }

```
 
当 `a`  变量 不声明 `volatile`  关键字时，t1将永远在while循环中

<img :src="$withBase('/java/concurrent/volatile/volatile3.jpg')" alt="foo">

当 `a`  变量 声明 `volatile`  关键字时：

<img :src="$withBase('/java/concurrent/volatile/volatile4.jpg')" alt="foo">


## 不保证原子性
> volatile 对于常见的多线程对于i++ 方法是不能保证原子性的  

::案例::

```java
public static int nums = 0;

public static void main(String[] args) {
    for (int i = 0; i < 5; i++) {
        new Thread(() -> {
            for (int k = 0; k < 4000; k++) {
                nums++;
            }
        }).start();
    }

    System.out.println("nums: " + nums);
}
```

执行多次结果不一致:

```
nums: 14642
nums: 12505
nums: 6732
```

总结： 像 `Synchronized` 一样 对修饰的代码块，进行加锁，只有它执行完成之后，其他线程才能被执行，只有这样才能保证 原子性。 由于 `volatile`   并不使用锁，由于CPU按照时间片来进行线程调度的，只要是包含多个步骤的操作的执行，天然就是无法保证原子性的。

 即 当A线程修改数据，还没执行同步主内存前挂起，线程B完成了i++操作并写会主内存，则当A线程唤醒后会进行再次同步， 这样则会造成数据 少累加一次

## 禁止重排序
> 重排序不是必然会出现的，但是出现重排序会导致线程安全问题  
> ::单线程:不管怎么重排序，单线程情况下的程序执行结果时不能被改变::   

常见的重排序类型：
- 编译器重排序； 对没有先后依赖关系的语句，编译器可以进行重新调整语句的执行属性
- CPU重排序： 指令级别的重排序，对没有依赖关系的多条指令并行执行
- 内存重排序： CPU有自己的缓存，指令执行顺序 和 写入主内存顺序不一致

`volatile`  是通过编译器在生成字节码时，在指令序列中添加“内存屏障”来禁止指令重排序的

### 内存屏障

内存屏障作用：
- 阻止屏障两侧的指令重排序
- 强制把写缓冲区/高速缓存中的数据 写回主内存

基本的内存屏障类型：
- 硬件层面的 “内存屏障” 类型:
	- sfence：即写屏障(Store Barrier)
	- lfence：即读屏障(Load Barrier)
	- mfence：即全能屏障(modify/mix Barrier) 
	- lock 前缀：lock不是内存屏障
- JMM层面的“内存屏障”类型:
	- 	LoadLoad：禁止读和读的重排序
	- StoreStore：禁止写和写的重排序
	-  LoadStore：禁止读和写的重排序
	- StoreLoad：禁止写和读的重排序

###  双重检查锁 

```java
public class Singleton {
    
    private Singleton() {
    }

    private static Singleton instance = null;
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

 `instance = new Singleton()`   这行代码并不是一个原子指令, 可能会存在 指令重排的问题。当处于 多线程的情况下，会存在线程安全问题，导致某个线程创建了一个错误的单例对象

`instance = new Singleton()`  创建的对象的过程：
1.  分配对象的内存空间
2. 初始化对象
3. 设置instance指向刚分配的内存地址

创建对象的过程中，可能会存在2，3步骤的重排序，导致某些线程访问到未初始化的变量。 所以为了保证多线程情况下的 单例模式下的线程安全， 对检测对象 添加 `volatile `

## 底层实现原理

1、通过反编译，知道 会对 volatile 修饰的变量，追加 `ACC_VOLATILE`   标识 

<img :src="$withBase('/java/concurrent/volatile/volatile5.jpg')" alt="foo">

2、 更具静态变量元素的写入找到  文件:`bytecodeInterpreter.cpp`

<img :src="$withBase('/java/concurrent/volatile/volatile6.jpg')" alt="foo">

3、 用来判断访问标记是否为volatile修饰 文件：`accessFlags.hpp`

<img :src="$withBase('/java/concurrent/volatile/volatile7.jpg')" alt="foo">

4、具体使用的调动方法  文件： `accessFlags.hpp`

<img :src="$withBase('/java/concurrent/volatile/volatile8.jpg')" alt="foo">

5、对于不同的CPU架构有不同的实现机制： 这些目录下都会有一个 OrderAccess 类

<img :src="$withBase('/java/concurrent/volatile/volatile9.jpg')" alt="foo">

6、 具体底层 volatile 操作：

- 单线程情况下，不使用内存屏障
- 多线程线程下使用 C的 `volatile`   关键字修饰，对其 添加 `lock`  标识
 
<img :src="$withBase('/java/concurrent/volatile/volatile10.jpg')" alt="foo">

## 总结：
  `volatile` 可以保证线程的 可见性、有序性、但是无法保证有序性，底层是通过 `内存屏障`  来实现的。 通过反编译 我们可以知道每一个 `volatile`   变量都会打上 `ACC_VOLATILE`  ，执行时 会判断 是否有 volatile 关键字，有则会进行添加屏障。

屏障的核心作用：
1. 阻止屏障两侧的指令重排序
2. 强制把写缓冲区/高速缓存中的数据 写回主内存
3. 写操作会让其他线程中的 volatile 变量缓存无效


【相关资料】
- [Java并发编程实战](https://book.douban.com/subject/10484692/)
- [吃透Java并发：volatile是怎么保证可见性的 - 知乎](https://zhuanlan.zhihu.com/p/250657181)
- [volatile底层原理详解 - 知乎](https://zhuanlan.zhihu.com/p/133851347)
- [volatile为什么不能保证原子性](https://www.zhihu.com/question/329746124)
