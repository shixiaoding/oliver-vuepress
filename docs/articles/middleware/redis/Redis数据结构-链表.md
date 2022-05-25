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
