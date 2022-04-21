---
isTimeLine: true
sidebar: true
isComment: false
title: Redis数据结构-字典
date: 2022-4-20
tags:
- Redis
---

> 字典,又称为 `符号表(symbol table)`、`关联数组(associative array)`或 `映射(map)`,是一种用于保存键值对`(key-value pair)` 的抽象数据结构。当一个哈希键包含的键值对比较多,又或者键值对中的元素都是比较长的字符串时,Redis就会使用字典作为哈希键的底层实现

## 基本数据结构


<img :src="$withBase('/middleware/redislearn/redis字典.png')" alt="foo">

```C
dict.h/dict
typedef struct dict{
  //  类型特定函数
  dictType *type;
  //  私有数据，提供给 dictType 中函数的参数
  void *privdata;
  //  哈希表
  dictht ht[2]
  // rehash 索引，当 rehash 不在进行时，值为 ‑ 1
  int trehashidx;
} dict

# dict的两个哈希表
dict.h/dictht
typedef struct dictht{
  //  哈希表数组
  dictEntry **table;
  //  哈希表大小
  unsigned long size;
  //  哈希表大小掩码，用于计算索引值，总是等于 size ‑ 1
  unsigned long sizemark;
  //  该哈希表已有节点的数量
  unsigned long used;
} dictht
  
# 对应 dict 中的 type 值
typedef struct dictType{
  //  计算哈希值的函数
  unsigned int (*hashFunction)(const void *key);
  //  复制键的函数
  void *(*keyDup)(void *privdata, const void *key)  
  //  复制值的函数
  void *(*valDup)(void *privdata, const void *obj)  
  //  对比键的函数
  //  销毁键的函数
  //  销毁值的函数
} dictType

 # hash 表中的元素节点
typedef struct dictEntry{
  //  键
  void *key;
  //  值
  union {
    void *val;
    uint64_u64;
    int64_t s64;
  } v;
  //  指向下个哈希表节点，形成链表
  struct dictEntry *next;
}  dictEntry
```



**为什么字典中的 哈希表定义2个**？

一般情况下,字典只使用ht[0]哈希表,ht[1]哈希表只会在对ht[0] 哈希表进行rehash时使用



**字典中 `rehashidx`  属性的作用**

- -1：没有 rehash
- 0： 开始 rehash
  - 每执行完一个 rehashidx+1
- -1:    完成 rehash



## 哈希算法

**如何计算索引位**：

1 . 计 算 key 的 `哈希值` ；
2 . 使 用 `哈希表` 的 sizemask + `哈希值` ，计算出 `索引位置` ;
3 . 如果出现 Hash 冲突， Redis 是使用`拉链法来` 解决的，新的值会成为`链表头节点`。

> Redis 使用的是 MurmuHash2 的算法来计算哈希值的，该算法的优点在于，即使输入的键是有规律的，算法仍能给出一个很好的随机分布性，并且算法
> 的计算速度也非常快

## Rehash

> 由于 哈希表 保存的数量 太多 或者 太少时，需要对哈希表 进行 扩展 或 收缩，这个时候需要rehash

**Rehash的步骤**

- 为字典的ht[1]哈希表分配空间；
- 将保存在ht[0]中的所有键值对rehash到ht[1]上面：rehash指的是重新计算键的哈希值和索引值，然后将键值对放置到ht[1]哈希表的指定位置上；
- 当ht[0]包含的所有键值对放置到ht[1]之后（ht[0]变为空表），释放ht[0]，将ht[1]设置为ht[0]，并在ht[1]新创建一个空白哈希表，为下一次rehash做准备



**哈希表的扩展与收缩（即触发Rehash操作的时机）**

**核心是通过负载因子来判断触发的时机**计算负载因子的公式： ht[0].used / ht[0]size

- 当一下条件任意一个被满足时，开始对哈希表执行扩展操作

  - 服务器目前没有在执行BGSAVE命令或者BGREWRITEAOF命令，并且哈希表的负载因子大于1；

  - 服务器目前在执行BGSAVE命令或者BGREWRITEAOF命令，并且哈希表的负载因子大5；

- 当哈希表的负载因子小于0.1时，程序自动开始对哈希表执行收缩操作。



### 渐进试Rehash

> 如果哈希表里保存的键值对数量不是四个,而是四百万、四千万甚至四亿个键值对,那么要一次性将这些键值对全部rehash到ht[1]的话,庞大的计算量可能会导致服务器在一段时间内停止服务.
>
> **这个rehash动作并不是一次性、集中式地完成的,而是分多次、渐进式地完成的**

步骤：

- 为ht[1]分配空间,让字典同时持有ht[0]和ht[1]两个哈希表。
- rehash 开始时，将 rehashidx 设置为 0 
- 在rehash 进行期间
  - 对字典执行添加、删除、查找或者更新操作时 都将写入 ht[1] 
  -  将 ht[0] 键 移动到 ht[1]，每次执行 rehashidx状态位+1
  - 当 ht[0]全部移动到ht[1]后，rehashidx回到‑1；

- 当出现读写时，如果发现rehashidx不为‑1，则将当前被读写的元素进行rehash。

