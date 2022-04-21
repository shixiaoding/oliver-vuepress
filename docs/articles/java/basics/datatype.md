---
isTimeLine: true
sidebar: true
isComment: false
title: 数据类型
date: 2020-11-07
tags:
- Java
---  

## 数据类型分类

 - 值类型

 - 引用类型 （简单地讲，“引用”是存储在有序的内存栈上的，而对象本身的值存储在内存堆上的；）

   

### 值类型 

Java 提供了8中基本类型，4大类类型
- 整形
    - byte (存储为8位，取值范围[2^7, 2^7-1],即[-128, 127])
    - short (存储单位16位)
    - int (存储单位为32位)
    - long (存储单位为64位,赋值时一般在数字后加上 l 或 L)
- 浮点型
    - float (存储单位为32位, 赋值时必须在数字后加上 f 或 F)
    - double (存储单位为64位,赋值时一般在数字后加 d 或 D)
- 布尔型
    - boolean  (存储单位为1位)
- 字符型
    - char (存储单位为16位)



### 值类型 和 引用类型

- 从概念来说
    - 基本类型：变量名指向具体数值
    - 引用类型：变量名指向数据对象的内存地址
- 从内存方面来说
    - 基本类型：变量在声明之后，Java 就会立刻分配给他内存空间。
    - 引用类型：它以特殊的方式（类似 C 指针）向对象实体（具体的值），这类变量声明时不会分配内存，只是存储了一个内存地址。
- 从使用方面来说
    - 基本类型：使用时需要赋具体值,判断时使用 == 号。
    - 引用类型：使用时可以赋 null，判断时使用 equals 方法。



### 引用类型分为四类

**强引用**

垃圾回收器：

内存充足时，不会回收 

当内存不足时，也不会回收，Java虚拟机会抛出 `OutOfMemoryError`

当对 强以引用赋 null 时，jvm 会在适当的时间进行回收

**软引用**

- 当内存足够时，不会回收
- 当内容不足时，会进行回收
- 用java.lang.ref.SoftReference类来表示软引用。



**弱引用**

- 无论内存是否足够，只要JVM开始进行垃圾回收，都会被回收
- 用 java.lang.ref.WeakReference 来表示弱引用
- 经典案例  ThreadLocal 是个虚引用




**引虚用**

- 一个对象仅持有虚引用，那么它就和没有任何引用一样，它随时可能会被回收
- 用 PhantomReference类表示虚引用
- 类中只有一个 构造方法 和 get() 方法 且仅仅返回一个null 
- 虚引用 必须 要和 ReferenceQueue 引用队列一起使用。



## 数据类型转换

java 中有两种数据转换方式
- 自动转换
- 强制转换

### 自动转换

- 由小数据转为大数据 （比如数据计算）
- 转换前后数据类型需要兼容
- 整型类型和浮点型进行计算后，结果会转为浮点型

### 强制转换

有些时候不满足，自动转换的标准时，会进行一些手动转换  
强制转换使用括号()  
强制转转换 可能会丢失进度


```
float f = 3.55f
int x = (int) f
```



## 装箱、拆箱

### 基本数据类型 与 包装类关系 

包装类：都是对象

java中为每一种基本数据类型提供了相应的包装类，如下：

| 基本数据类型 | 包装类    |
| ------------ | --------- |
| byte         | Byte      |
| short        | Short     |
| int          | Integer   |
| long         | Long      |
| float        | Float     |
| double       | Double    |
| boolean      | Boolean   |
| char         | Character |



### 装箱、拆箱

- 装箱（boxing）是将值类型转换为引用类型。例如：int 转 Integer
    - 装箱过程是通过调用包装类的 valueOf 方法实现的。
- 拆箱（unboxing）是将引用类型转换为值类型。例如：Integer 转 int
    - 拆箱过程是通过调用包装类的 xxxValue 方法实现的。（xxx 代表对应的基本数据类型）。



### 自动装箱、自动拆箱

自在JDK5开始提供了 自动装箱，拆箱；
自动装箱与拆箱机制，是为了我们在赋值或者方法调用的时候使用基本数据类型和对象类型更加简单直接



**那些场景会自动拆装箱**

- 基本类型放入集合类
- 包装类 与 基本类型大小比较
- 包装类的数值运算
- 三目运算
- 函数的参数 和 返回值



### 自动拆装箱 提一部分的缓存机制

>  java 5 中，在 Integer 的操作上引入了一个新功能来节省内存和提高性能。整型对象通过使用相同的对象引用实现缓存和重用。

- 适用于整数值区间 -128 至 +127。
- 最大值 127 可以通过 -XX:AutoBoxCacheMax=size 修改
- 在 Java 6 中，可以通过 java.lang.Integer.IntegerCache.high 设置最大值


 通过valueOf 方法 我们可以直接  整数值区间 -128 至 +127 会通过 `IntegerCache` 获取 


```java
    /**
     * Returns an {@code Integer} instance representing the specified
     * {@code int} value.  If a new {@code Integer} instance is not
     * required, this method should generally be used in preference to
     * the constructor {@link #Integer(int)}, as this method is likely
     * to yield significantly better space and time performance by
     * caching frequently requested values.
     *
     * This method will always cache values in the range -128 to 127,
     * inclusive, and may cache other values outside of this range.
     *
     * @param  i an {@code int} value.
     * @return an {@code Integer} instance representing {@code i}.
     * @since  1.5
     */
    public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }

```

**所以在这个范围内可以通过  == 进行判断，超过则不不行， 所有我们建议都 equals 进行相等判断**

其他的缓存对象：

- 有ByteCache用于缓存Byte对象
- 有ShortCache用于缓存Short对象
- 有LongCache用于缓存Long对象
- 有CharacterCache用于缓存Character对象

其中：
- `Byte`, `Short`, `Long` 有固定范围: -128 到 127。
- 对于 `Character`, 范围是 0 到 127

> 除了 `Integer` 以外，这个范围都不能改变。



## 数值计算

- 浮点数无法紧缺表达和运算的场景，一定要使用 `BigDecimal` 类型
- 浮点数的字符串格式化也要通过 BigDecimal 进行
- BigDecimal 可以使用 `compareTo` 方法比较大小
- 数值溢出，当数值计算-或转换溢出，是默默地溢出，并不会抛出任何异常


> 可以参考一下文章：
> - https://juejin.im/post/6844903501256998926
> - https://juejin.im/post/6844903545464946695
> - https://www.hollischuang.com/archives/1174