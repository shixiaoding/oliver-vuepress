---
isTimeLine: true
sidebar: true
isComment: false
title: String
date: 2021-01-01
tags:
- Java
--- 

## 创建字符串的方式

```java
# 1、直接赋值
  String str = "abc"
 
# 2、创建字符串对象  
  String str = new String("abc")
  
```



## 字符串的不可变性

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {

    @Stable
    private final byte[] value;
```

通过源码可知：

`String` 类 被 `final` 关键字修饰，表示不可继承 `String` 类

`String` 类的数据存储于 `byte[]` 数组，这个数组被 `final` 关键字修饰，表示 **`String` 对象不可被更改**

> JDK 1.9 之前是使用 char 数组保存， 1.9 之后开始使用 byte 数组保存



## 为什么 Java 要这样设计？

- 线程安全
  - 不可变的对象和值是线程安全的，可以实现多个线程中共享数据
  - 由于 String 天然的不可变，当一个线程”修改“了字符串的值，只会产生一个新的字符串对象，不会对其他线程的访问产生副作用，访问的都是同样的字符串数据，不需要任何同步操作
- String 对象安全性，避免String被篡改
  - 字符串用来创建存储敏感信息，如账号，密码，网络路径，文件处理等场景里，保证字符串 String 类的安全性就尤为重要了
- 可以实现字符串常量池
  - 直接赋值
    - 通过 `String str="abc"` 方式创建时，JVM 首先会检测该对象是否在字符串常量池中存在，如果存在，则返回对象引用，否则会在常量池中创建新的字符串，这样做减少了同一个值的字符串对象重复被创建，节约内存
- Hashcode 缓存：
  - 字符串的 `Hashcode` 属性不变，保证唯一性，使得类似 HashMap，HashSet 等容器才能实现相应的缓存功能，由于 String 的不可变，避免重复计算 `hashcode`，只有使用缓存的 `hashcode` 即可，这样一来大大提高了在散列集合中使用 String 对象的性能 (**暂时不是很理解**)



## replaceFirst 、replaceAll、replace 区别

- replaceFirst
  - 和  `replaceAll` 使用 正则 进行字符串的替换，区别在 只替换第一个匹配到的项
- replaceAll
  - 使用 正则 ，进行替换所有的字符串
- replace
  - 指定字符串，替换所有相对应的字符串



## 字符串拼接的集中方式和区别

### 1、字符串运算符 拼接

```java
# 1.1 两个字面量的拼接
String str = "a" + "b";
  
# 1.2 一个字符串变量 和 字面量 拼接
String stra = "stra";
String newStr = stra + "abc";
```

- 1.1:  两个字面量进行拼接时，编译器会进行常量折叠，进行自动拼接，即会变成 `String str = "ab"`
- 1.2:  字符串变量 和 字面量 进行拼接时， 是通过 StringBuilder 的 append() 方法进行字符串追加，最后在 调用 `toString()` 方法 转为字符串 （底层 就是一个new String()）

> 对一个字符串 大量的拼接，会大大的降低性能



### 2、**concat** 拼接函数

```java
String stra = "hello tom!";
String strb = "hello oliver!";
String newStr = stra.concat(stra).concat(strb)
```

- 创建一个字符串数组，长度是 已有字符串 和 待拼接字符串的长度，
- 会将两个字符串的值，复制到新的字符数组中
- 并使用这个数组 返回一个新的 `String`  对象



### 3、StringBuilder

```java
StringBuilder strBuilder = new StringBuilder("oliver");
strBuilder.append("这是是一次测试！");
```



### 4、StringBuffer

```java
StringBuffer strBuffer = new StringBuffer("oliver");
strBuffer.append("这是是一次测试！");
```



## String \ StringBuilder \ String Buffer 的区别

- String
  - 不可变字符序列
  - 初始化可以赋 `null`
- StringBuiler
  - 可变字符序列
  - 线程不安全
  - 效率高
  - 初始化可以赋 `null` 会报警，只允许是一个空的对象
- StringBuffer
  - 可变总府序列
  - 线程安全 （使用 `synchronized` 关键字修饰）
  - 效率低
  - 初始化可以赋 `null` 会报警，只允许是一个空的对象

## String 对 switch 的支持

#### 对字符型 char 类型的支持

char 类型的字符 反编译后，会变成 十进制的 `ascii码` , switch 实际还是比较的 Int 类型

####  对 字符串 String 类型的支持

```java
public class switchDemoString
{
    public switchDemoString()
    {
    }
    public static void main(String args[])
    {
        String str = "world";
        String s;
        switch((s = str).hashCode())
        {
        default:
            break;
        case 99162322:
            if(s.equals("hello"))
                System.out.println("hello");
            break;
        case 113318802:
            if(s.equals("world"))
                System.out.println("world");
            break;
        }
    }
}
```

通过反编译可以了解到  switch 支持 String ，是通过 String 的 `hashcode`  和 `equals` 来进行对比的

> **其实switch只支持一种数据类型，那就是整型，其他数据类型都是转换成整型之后再使用switch的** 

 

## String.intern

- `"a"`  字面量会在字符串 存储在字符串常量池里，如果存在，则返回对象引用，否则会在常量池中创建新的字符串，这样做减少了同一个值的字符串对象重复被创建
- `new String()`  会在堆中创建对象，并返回堆内存中的地址引用
- `intern()` 方法会从字符串常量池中查询当前字符串是否存在，若不存在就会将当前字符串放入常量池中



### 不同版本之间 intern 的区别

JDK6：

常量池还是存在于永久代中。

也就是说, **常量池和堆是两块不同的内存区域。**	因为两块内存区别不同，所以堆内的对象地址 和 常量池中对象地址是不相等的

当使用 `intern` 方法时：

​		如果存在： 则直接返回常量池的对象地址

​		如果不存在：则会将堆内的字符串对象 复制一份 到常量池中，返回的是常量池中的对象地址



JDK7 /JK8：

从 JDK7 之后  字符串常量池已经被移到了堆当中了

当使用 `intern` 方法时：

​		如果存在： 则直接返回常量池的对象地址

​		如果不存在：则会将堆内的字符串对象的引用地址 复制一份 到常量池中，返回的是常量池中的引用地址



## String 有没有长度限制

字符串是有有长度限

- 在编译期: 要求字符串常量池中的常量不能超过65535并且在javac执行过程中控制了最大值为65534。
  - 即 通过`使用String s= “”;` 会有长度限制
  - 在定义常量时，编译成源码时，会将字符串 长度设置为 `u2 length`   
  - u2表示两个字节的无符号数，那么1个字节有8位，2个字节就有16位。
  - 16位无符号数可表示的最大值位2^16 - 1 = 65535
  - 实际定义要小于 65535 即 最大值为 65534

- 在运行期，长度不能超过Int的范围，否则会抛异常
  - 即 通过`使用new String();` 会有该限制
  - 通过 `new String()` 源码 得到 长度定义为 int  所有不得超过 int的范围



## 字符串常量池

> 为什么会有字符串常量池:
>
> 字符串的分配，和其他的对象分配一样，耗费高昂的时间与空间代价，作为最基础的数据类型，大量频繁的创建字符串，极大程度地影响程序的性能.
>
> JVM为了提高性能和减少内存开销

 

### 字符串常量池的作用

- 为字符串开辟一个字符串常量池，类似于缓存区
- 创建字符串常量时，首先坚持字符串常量池是否存在该字符串
- 存在该字符串，返回引用实例，不存在，实例化该字符串并放入池中



### 字符串常量池存在什么地方：

- JDK6:  `永久代` 因此大小受到永久代的限制，默认1009大小，且不可更改，容易出现溢出问题
- JDK7:  转移到 `堆内存` 中 默认大小为60013， 此时可以通过`-XX:StringTableSize`参数进行控制大小
- JDk8:   转移到 `元空间` 中 ，直接使用的是本地内存



**相关好文：**

[几张图轻松理解String.intern()](https://blog.csdn.net/tyyking/article/details/82496901)

[深入解析String#intern](https://tech.meituan.com/2014/03/06/in-depth-understanding-string-intern.html)



