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

<!-- <img :src="$withBase('/middleware/redislearn/Reids链表.png')" alt="foo"> -->

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

```C
typedef struct list {    
  // 表头节点    
  listNode * head;    
  // 表尾节点    
  listNode * tail;     
  // 链表所包含的节点数量   
  unsigned long len;    
  // 节点值复制函数   
  void *(*dup)(void *ptr);   
  // 节点值释放函数   
  void (*free)(void *ptr);   
  // 节点值对比函数   
  int (*match)(void *ptr,void *key);
} list
```
