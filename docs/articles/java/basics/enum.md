---
isTimeLine: true
sidebar: true
isComment: false
title: 枚举
date: 2020-11-07
tags:
- Java
---  


`enum` 全称 enumeration, 是JDK5中引入的特性
枚举的好处： 可以将常量组织起来，统一管理  
枚举的典型应用场景：错误码、状态机等。

## 枚举的本质
通过反编译后代码我们可以看到，public final class T extends Enum，
说明: 该类是继承了Enum类的，同时final关键字告诉我们，这个类也是不能被继承的


枚举的本质是:  一个特殊的，受限制的类，它继承了`java.lang.Enum`类  
枚举这种特殊的类会被加上 `final` 修饰符  
定义的枚举值，会被默认修改 `public static final`, 枚举值本质上是静态常量

枚举代码：
```
public enum t {
    SPRING,SUMMER;
}
```

枚举反编译后：
```Java
public final class T extends Enum
{
    private T(String s, int i)
    {
        super(s, i);
    }
    public static T[] values()
    {
        T at[];
        int i;
        T at1[];
        System.arraycopy(at = ENUM$VALUES, 0, at1 = new T[i = at.length], 0, i);
        return at1;
    }

    public static T valueOf(String s)
    {
        return (T)Enum.valueOf(demo/T, s);
    }

    public static final T SPRING;
    public static final T SUMMER;
    private static final T ENUM$VALUES[];
    static
    {
        SPRING = new T("SPRING", 0);
        SUMMER = new T("SUMMER", 1);
        ENUM$VALUES = (new T[] {
            SPRING, SUMMER
        });
    }
}
```

## 枚举中的方法

<br>

<img :src="$withBase('/java/enum/method.png')" alt="foo">


枚举类型的父类：

```Java
public abstract class Enum<E extends Enum<E>>
        implements Comparable<E>, Serializable {

//枚举成员的名称
private final String name;
//枚举成员的顺序，是按照定义的顺序，从0开始
private final int ordinal;

//构造方法
protected Enum(String name, int ordinal) {
        this.name = name;
        this.ordinal = ordinal;
    }


 public final int ordinal() {//返回枚举常量的序数
        return ordinal;
    }
 }

 public final String name() {//返回此枚举常量的名称，在其枚举声明中对其进行声明。
        return name;
    }

 public final boolean equals(Object other) {
        return this==other;//比较地址
    }

public final int hashCode() {
        return super.hashCode();
 }

public final int compareTo(E o) {//返回枚举常量的序数
    //是按照次序 ordinal来比较的
}

 public static <T extends Enum<T>> T valueOf(Class<T> enumType,  String name) { }

 public String toString() {
        return name;
    }

```

## 枚举的特性

- 基本特性
    - 枚举默认是 从 0 开始的有序数值
    - 当没有定义方法时， 枚举实例可以使用 逗号、分号、或者什么都不加

- 赋值相关特性
    - java 中不允许 使用 `=` 为枚举常量赋
    - java 中可以添加 普通、静态、抽象、构造 方法
        - java中虽然不能直接赋值，但是可以使用添加方法来间接赋值

- 继承相关
    - `enum` 可以像一般类一样实现接口
    - 枚举是不可被继承的
        - 因为 jvm 会给改类 加上 `final` 修饰符
        - 实际上 枚举类都是继承自 `java.lang.Enum` 类 ，而Java不支持多重继承
- 枚举可以添加方法：
    - 普通方法
    - 静态方法
    - 抽象方法
    - 构造方法
- 枚举可以实现接口


## 枚举的应用
- 组织常量
- switch 状态机
- 错误码
- 组织枚举 （由于枚举无法被类继承扩展）
    - 希望扩展原来的枚举类型中的元素；
    - 希望使用子类对枚举类型中的元素进行分组；
  
```Java
public interface Food {
    
    enum Appetizer implements Food {
        SALAD, SOUP, SPRING_ROLLS
    }

    enum Coffee implements Food {
        BLACK_COFFEE, DECAF_COFFEE, ESPERSSO, TEA;
    }

    enum Dessert implements Food {
        FRUIT, GELATO, TIRAMISU;
    }   
}

// 调用
Food food = Food.Coffee.ESPERSSO;//ESPERSSO不仅是coffee,也属于大类Food，达到分类的效果

```
- 枚举单例


## 枚举的两大工具

#### 1、EnumSet
EnumSet是一个抽象类，继承AbstractSet，本质上是个Set 实现。枚举set中所有键必须来自单个枚举类型。  
EnumSet 是个高性能的set  
EnumSet 不支持同步访问, 实现线程安全的方式：
```
Set<MyEnum> s = Collections.synchronizedSet(EnumSet.noneOf(MyEnum.class));
```

主要接口：
- noneOf - 创建一个具有指定元素类型的空 EnumSet
- allOf - 创建一个指定元素类型并包含所有枚举值的 EnumSet
- range - 创建一个包括枚举值中指定范围元素的 EnumSet
- complementOf - 初始集合包括指定集合的补集
- of - 创建一个包括参数中所有元素的 EnumSet
- copyOf - 创建一个包含参数容器中的所有元素的 EnumSet

#### 2、EnumMap
EnumMap是一个类，同样也是与枚举类型键一起使用的专用 Map 实现。枚举映射中所有键都必须来自单个枚举类型，该枚举类型在创建映射时显式或隐式地指定。枚举映射在内部表示为数组。此表示形式非常紧凑且高效。

主要接口：

- size - 返回键值对数
- containsValue - 是否存在指定的 value
- containsKey - 是否存在指定的 key
- get - 根据指定 key 获取 value
- put - 取出指定的键值对
- remove - 删除指定 key
- putAll - 批量取出键值对
- clear - 清除数据
- keySet - 获取 key 集合
- values - 返回所有

防止线程安全：
```
     Map<EnumKey, V> m
         = Collections.synchronizedMap(new EnumMap<EnumKey, V>(...));

```

## 思维导图

<br>

<img :src="$withBase('/java/enum/enum.png')" alt="foo">