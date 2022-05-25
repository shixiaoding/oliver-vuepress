---
isTimeLine: true
sidebar: true
isComment: false
title: Redis数据结构-链表
date: 2022-4-20
tags:
- Redis
---

> 类似与 Java语言中的 LinkedList
>
> 增加和删除操作非常快 时间复杂度 O(1), 可以提供高效的 `节点排序能力` 以及 `顺序节点访问方式`

List的底层实现：

Redis 3.2 之前: 

- 双向链表 （adlist）
- 压缩链表 （ziplist）

Redis 3.2 之后：

- 快速链表 （quicklist）

## 基本结构

<img :src="$withBase('/middleware/redislearn/Reids链表.png')" alt="foo">

```C
typedef struct listNode { 
  // 前置节点    
  struct listNode * prev;    
  // 后置节点   
  struct listNode * next;   
  // 节点的值    
  void * value; 
} listNode
```

<img :src="$withBase('/middleware/redislearn/redisList.png')" alt="foo">

- dup:  复制节点函数
- free：释放节点函数
- match：比较节点函数

## 特点：

- 双端:  链表节点带有prev和next指针，获取某个节点的前置节点和后置节点的复杂度都是O(1)
- 无环：表头节点的prev指针和表尾节点的next指针都指向NULL，对链表的访问以NULL为终点
- 带链表长度计算器：list 存储 链表长度，获取节点数量的复杂度为 O(1)
- 多态： 使用void*指针来保存节点值， 并且可以通过list结构的dup、free、match三个属性为节点值设置
  类型特定函数，所以链表可以用于保存各种不同类型的值。