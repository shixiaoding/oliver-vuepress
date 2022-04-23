---
isTimeLine: true
sidebar: true
isComment: false
title: Redis数据结构-快速链表(quicklist)
date: 2022-4-20
tags:
- Redis
---

>快速链表 是 `Redis 3.2 `  之后结合 adlist(普通链表) 和 ziplist (压缩链表)的 产物
>
>它将 普通双向链表 按段切分，每一段都是用 ziplist来紧凑存储，多个 ziplist 之间是用双向指针连接起来


<img :src="$withBase('/middleware/redislearn/redis快速链表.png')" alt="foo">



```C
struct quicklistNode {   
  quicklistNode* prev;     
  quicklistNode* next;     
  ziplist* zl; // 指向压缩列表   
  int32 size; // ziplist 的字节总数    
  int16 count; // ziplist 中的元素数量     
  int2 encoding; // 存储形式 2bit,原生字节数组还是 LZF 压缩存储   
  unsigned int container : 2; // 预留字段，存放数据的方式，1--NONE，2--ziplist
  unsigned int recompress; // 解压标记，当查看一个被压缩的数据时，需要暂时解压，标记此参数为 1，之后再重新进行压缩
 unsigned int attempted_compress : 1; // 测试相关
 unsigned int extra : 10; // 扩展字段，暂时没用
}

struct quicklist {    
  quicklistNode* head;     
  quicklistNode* tail;    
  long count; // 元素总数    
  int nodes; // ziplist 节点的个数     
  int compressDepth; // LZF 算法压缩深度     ... 
}
```







## 相关核心配置

 **每个ziplist存多少元素**

quicklist 默认 单个 ziplist 长度 为 8k字节，超过则会重写起一个 ziplist (可以修改 `list-max-ziplist-size`  参数)



**压缩深度**

Quicklist  还可以对 ziplist 进行在压缩，通过选择压缩深度

配置参数：`list- compress-depth`

默认：0 不进行任何压缩

设置为：1 （即 首尾的 第一个元素进行压缩）

设置为：2 （即 首尾的 头2个元素进行压缩）





