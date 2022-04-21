---
isTimeLine: true
sidebar: true
isComment: false
title: Redis数据结构-跳跃表
date: 2022-4-20
tags:
- Redis
---


> 单链表的查询效率是 `O(n)`, 通过在单链表的基础上增加层级，形成多级链表，是一种 `空间 换 时间` 的做法，提高了查询效率到 `logN`，可以做到类似 二分法的效果,但并没有完全 二分法。

> `跳跃表`是一种有序的数据结构 ，它通过在每个节点中维持多个指向其他节点的指针，从而达到快速访问节点的目的

## 基本结构

<img :src="$withBase('/middleware/redislearn/redis跳跃表.png')" alt="foo">



```C
# 跳跃表
struct zskiplist {   
  zskiplistNode* header;  // 跳跃列表头指针 （指向头节点）
	zskiplistNode* tail;    // 跳跃列表尾指针 （指向尾节点）
  int level;  					  // 跳跃列表当前的最高层  
  long length             // 节点的数量
}

# 跳跃表节点
struct zskiplistNode {   
  robj *obj;      		// 成员对象
  double score;  			// 分值
  struct zskiplistLevel {    // 跳跃表层级信息    
    unsigned int span;   		// 跨度，记录两个节点之间的距离，即 记录 本节点 到 下一个节点之间距离
  } level[];   
  struct zskiplistNode *backward;   //后退指针，从表尾向表头方向访问节点，每个节点只有一个后退指针，以每次只能后退至前一个节点
} 

```

**注**

- head 节点不存储任何元素, 虽然head节点，已经存在了最高层级，但实际上访问时，会更具 `level` 存储的当前跳表的最高层级进行访问

## 最高层数&随机层数策略

**最高层数**： 

- Redis 3.2:  `32层`
- Redis5.0：`64层`

随机层数的策略

网上常说的每一层的晋升概率是 50%  实际源码中 `redis 源码中晋升概率只有 25%`  

```C
int zslRandomLevel(void) {     
	int level = 1;     
  while ((random()&0xFFFF) < (ZSKIPLIST_P * 0xFFFF))         
    level += 1;    
  return (level<ZSKIPLIST_MAXLEVEL) ? level : ZSKIPLIST_MAXLEVEL; 
}
```

## 查找元素

查找元素：

- 从 header 执行的最高处开始遍历
- 中间经过的一系列节点称之为「搜索路径」： 它是从最高层一直到最底层的每一层最后一个比「我」小的元素节点列表

**通过** `maxLevel` 当前最高层数，避免从最高的32层 开始遍历，而是从 `maxLevel` 开始遍历性能就会提高很多


<img :src="$withBase('/middleware/redislearn/redis跳跃表level.png')" alt="foo">



## 插入元素

- 通过 `maxLevel` 最高层级，开始从最高层级逐步寻找目标节点，得到 [搜索路径] （即节点需要到达目标地点的路径）
- 获取随机层级
- 填充跨度
- 更新跳跃表的层高
- 创建新节点
  - 重排向前指针
  - 重排向后指针

## 删除元素

**与插入类似**

## 更新元素

删除过程： 与插入过程类似

更新过程：

- 如果value 不存在：则执行 插入过程
- 存在
  - 修改 score值，不发生排序位置改变：直接更新
  - 修改 score值，发生排序位置改变：直接删除后，在插入



## 排序策略&排序值如何计算

**排序策略**

- 优先score排序
- score 相同 则 比较 value 值(字符串排序）



**元素排序如何计算**

通过 `span ` 跨度，遍历操作只使用前进指针就可以完成了。跨度实际上是用来 `计算排位(rank)`的



## 跳跃表优势

- header和tail指针分别指向跳跃表的表头和表尾节点,通过这两个指针,程序定位表头节点和表尾节点的复杂度为O(1)
- 通过使用length属性来记录节点的数量,程序可以在O(1)复杂度内返回跳跃表的长度。
- level属性则用于在O(1)复杂度内获取跳跃表中层高最大的那个节点的层数量

