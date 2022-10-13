---
isTimeLine: true
sidebar: true
isComment: false
title: Redis 分布式锁
date: 2022-4-20
tags:
- Redis
---

## 锁 和 分布式锁

### 锁

> `资源 `通常是共享的，在并发情况下，通常会发送竞争。而锁是 资源竞争时的钥匙，避免 `共享资源` 被多个持有



**Java中的锁**

Java为了保护共享资源，在多线程情况下的，原子性操作，使用 `Synchronized` 、`Lock` 去声明使用锁。

Lock 相对与 `Synchronized` 更公平、更灵活、可以设置超时时间



### 分布式锁

无论 `Synchronized` 、`Lock`  都是单体应用时 对多线程操作共享资源时的，锁操作。

但是 在多机集群部署的情况下，A 机器中的`Synchronized` 关键字，并不能控制 B,C 中的内容。

所以 需要 `分布式锁` 来 协调多节点。



**锁的性能优化点**

- 减少持有锁的时间：避免锁的流程太长
- 减少锁的颗粒度：避免锁的资源太大
- 锁分离：大多数情况，读可以不加锁，所以我们可以将锁分离，读写各一把锁



**需要注意那些点**

- 互斥性: 任一时刻，只允许一个客户端获取锁
- 防死锁：防止程序崩溃，或网络异常，导致没有释放锁，而造成死锁
- 持有人解锁：加锁和解锁 必须是同一个人
- 可重入：当一个客户端获取对象锁之后，这个客户端可以再次获取这个对象上的锁。
- 任务执行超时：执行过程中，遇到查库sql慢，并发导致服务响应问题等等原因，导致程序还没执行完成，即解锁

## 锁的实现方式

### 加锁

**加锁1 - `setnx ` 命令加锁**

> `setnx ` 命令加锁，这种情况最简单方法，但是由于单个节点程序崩溃等情况，锁还存在，其他节点无法获取锁，会导致死锁问题

```Java

    @Test
    void lock1SetLock() {

        /**
         * 获取锁的方式：通过 setNx 进行获取锁
         * 问题：如果程序崩溃 或  del 指令没有被调用, 可能会先入 死锁的问题
         */
        Jedis jedis = jedisPool.getResource();
        Long isLock = jedis.setnx("SD_test", UUID.randomUUID().toString());
        if (isLock > 0L) {
            System.out.println("获取到锁,执行解锁");
        } else {
            System.out.println("未获取到锁！！");
        }
        jedis.del("SD_test");
    }
```



**加锁2 - `setnx` + `expire`**

> 加锁的同时，进行设置 过期时间，就算程序崩溃，到了指定时间，会自动释放锁

存在的问题: `setnx` + `expire` 非原子性操作，sentx 执行完成后，程序崩溃 或 网络请求丢失，出现过期时间未设置成功

```Java
 @Test
    void lock2SetLock() {
        /**
         * 优化方式：锁的基础上 新增了过期时间，及时程序中间崩溃，也可以在 10S 后 自动解锁
         * 问题：setnx 和  expire  操作不是原子性操作，可能是因为机器掉电或者是被人为杀掉的,就会导致 expire 得不到执行,也会造成死锁
         */
        Jedis jedis = jedisPool.getResource();
        Long isLock = jedis.setnx("SD_test2", UUID.randomUUID().toString());
        jedis.expire("SD_test2", 10);
        if (isLock > 0L) {
            System.out.println("获取到锁,执行解锁");
        } else {
            System.out.println("未获取到锁！！");
        }
    }
```



**加锁3 - 原子性加锁**

> Redis 2.8之后 提供 nx 、expire 两个命令同事执行的 原子性操作

```java

    @Test
    void lock3SetLock() {
        /**
         * 优化方式：Redis 2.8之后 提供 nx 、expire 两个命令同事执行的 原子性操作
         * Redis指令 set(key,value,NX,EX,timeout) 指令
         * 问题：
         */
        Jedis jedis = jedisPool.getResource();

        String result = jedis.set("SD_test3", UUID.randomUUID().toString(), new SetParams().nx().ex(10));
        System.out.println(result);
        if ("OK".equals(result)) {
            System.out.println("获取到锁,执行解锁");
        } else {
            System.out.println("未获取到锁！！");
        }
    }
```



**加锁4 - Lua**

> 除了 Redis的 提供的原子性命令，还可以使用 Lua 脚本，一个lua 脚本的命令，可以实现原子性

```java
/**
     * lua 加锁 + lua 删除锁
     *
     * @throws InterruptedException
     */
    @Test
    void lock4SetLock() throws InterruptedException {
        Long lockReleaseOK = 1L;
        Jedis jedis = jedisPool.getResource();
        String luaLockscripts = "if redis.call('setnx',KEYS[1],ARGV[1]) == 1 then" +
                " redis.call('expire',KEYS[1],ARGV[2]) return 1 else return 0 end";
        String luaDelScript = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end";


        String lockValue = UUID.randomUUID().toString();
        Object result = jedis.eval(luaLockscripts,
                Collections.singletonList("SD_test4"), Arrays.asList(lockValue, "60000"));

        if (result.equals(1L)) {
            System.out.println("我获取到锁了！要睡一会");
            Thread.sleep(2000);
            System.out.println("我获取到锁了！我醒了");
        }
        Object delResult = jedis.eval(luaDelScript,
                Collections.singletonList("SD_test4"), List.of(lockValue));

        if (delResult != null && delResult.equals(lockReleaseOK)) {
            System.out.println("删除成功！");
        }
        System.out.println("执行完成！");
    }
```



**加锁5 - 可重入锁**

> 不是很好的实现方式，应该将相关线程信息记录在 Redis value中，进行验证

```java
 	// 线程持有的锁id
    private ThreadLocal<String> localContext = new ThreadLocal<String>();

    // 线程持有者
    private Thread ownerThread;

    //
    public Boolean redisReentrantLock() {
        Jedis jedis = jedisPool.getResource();
        String id = UUID.randomUUID().toString();
        Thread t = Thread.currentThread();
        if ("Ok".equals(jedis.set("lock", id, new SetParams().nx().ex(60)))) {
            localContext.set(id);
            this.ownerThread = t;
            return Boolean.TRUE;
        } else if (ownerThread == t) {
            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }
```



**加锁6 - 确保过期时间大于业务执行时间**

当遇到 业务执行时间   大于 设置过期时间的解决2中方案：

1. 预判型：进行压测，测试出一个压力最大值。 将 压力值 * 2  = 过期时间
2. 执行补救式： 用来标识是否开启定时刷新过期时间， 在增加一个scheduleExpirationRenewal方法用于开启刷新过期时间的线程



```java
 protected volatile boolean isOpenExpirationRenewal = true;

    /**
     * 开启定时刷新
     */
    protected void scheduleExpirationRenewal(){
        Thread renewalThread = new Thread(new ExpirationRenewal());
        renewalThread.start();
    }

    /**
     * 刷新key的过期时间
     */
    private class ExpirationRenewal implements Runnable{
        @Override
        public void run() {
            while (isOpenExpirationRenewal){
                System.out.println("执行延迟失效时间中...");

                String checkAndExpireScript = "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                        "return redis.call('expire',KEYS[1],ARGV[2]) " +
                        "else " +
                        "return 0 end";
                jedis.eval(checkAndExpireScript, 1, lockKey, lockValue, "30");

                //休眠10秒
                sleepBySencond(10);
            }
        }
    }
```



### 解锁

> Redis 解锁，需要注意，锁的持有人才能解锁

```java
		/**
     * lua 删除锁：验证是数据是否一致
     *
     * @throws InterruptedException
     */
    @Test
    void lock5SetLock() throws InterruptedException {
        Long lockReleaseOK = 1L;
        Jedis jedis = jedisPool.getResource();
       
        String luaDelScript = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end";

        Object delResult = jedis.eval(luaDelScript,
                Collections.singletonList("SD_test4"), List.of(lockValue));
        if (delResult != null && delResult.equals(lockReleaseOK)) {
            System.out.println("删除成功！");
        }
        System.out.println("执行完成！");
    }

```



### 分布式环集群加锁

**Redis锁真的靠谱吗？**

从上面的案例来看，及基本已经很完美的解决了我们想要的分布式锁的公共

但是 如果在 分布式 集群的情况下 可能存在：在主节点申请到了锁，这个时候 主节点挂了，主节点锁信息未同步到从节点。从节点变为主节点，新的请求来进行获取锁，会立马批准，这就会导致一个锁被两个客户端同时持有

为此：衍生出 RedLock 算法

**RedLock**

> `RedLock` 基于 大多数机制 基本原理是利用多个Redis集群，用多数的集群加锁成功，减少Redis某个集群出故障，造成分布式锁出现问题的概率


<img :src="$withBase('/middleware/redislearn/RedLock.png')" alt="foo">




**加锁过程**

1. 创建多个集群的lock
2. 循环执行加锁操作
3. 加锁失败，验证是否大于最小失败数  (3个节点 最多只能1个失败，5个的话最多只能2个失败。公式：（n / 2 +1）
4. 加锁 验证 加锁超时失败
5. 出现 3，4 情况的话，那么就会进行解锁操作，解锁所有已经加完锁的机器



- RedLock的缺点：

  - 需要维护更多的集群 (由于时基于多机器的，所以最少需要3台)
  - 多节点读写，意味着Redis 性能下降

  

### 分布式锁的安全问题

> 一下是分布式不可避免的一些问题

- GC问题
- 长时间网络I/O

## Redisson

> Redisson是一个在Redis的基础上实现的Java驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的Java常用对象，还提供了许多分布式服务。
>
> Redisson提供了使用Redis的最简单和最便捷的方法

### 如何实现的锁


<img :src="$withBase('/middleware/redislearn/image-20220420144958197.png')" alt="foo">



### 加锁&解锁过程分析



**使用的锁的案例**

```Java
    @Test
    void testRedission() throws InterruptedException {
        RLock rLock = redissonClient.getLock("sd_test1");
        // 进行加锁
        if (rLock.tryLock(100, 20, TimeUnit.SECONDS)) {
            System.out.println("获取锁成功");
        }
        // 进行释放锁
        rLock.unlock();
    }

```



**查看加锁逻辑**

向下查看 `tryLock`的实现细节

> RedissonLock.tryLock()  ----->  RedissonLock.tryAcquire() -----> RedissonLock.tryAcquireAsync() ----->  RedissonLock.tryLockInnerAsync()  方法， 可以看到最终是通过执行 Lua 脚本实现的加锁操作

```lua
// 加锁 Lua 脚本
// KEYS[1] 锁名称
// ARGV[1] 过期时间
// ARGV[2] 线程名称

if (redis.call('exists', KEYS[1]) == 0) then       -- 查看 锁名称是否存在
    redis.call('hincrby', KEYS[1], ARGV[2], 1);    -- 无锁，创建一个 hash,key=锁名称 field=线程名称，value = 1
    redis.call('pexpire', KEYS[1], ARGV[1]);       -- 设置 hash 的过期时间
    return nil; end; 
if (redis.call('hexists', KEYS[1], ARGV[2]) == 1)     -- 有锁，并且 是当前线程 持有的锁
    then redis.call('hincrby', KEYS[1], ARGV[2], 1);  -- 重入锁 value+1
    redis.call('pexpire', KEYS[1], ARGV[1]);          -- 重新设置过期时间
 return nil; end; 
 return redis.call('pttl', KEYS[1]);                 -- 未加锁成功，返回锁的时间
```



**查看解锁逻辑**

向下查看 `unLock`的实现细节

>  RedissonLock.unlock()  ----->  RedissonLock.unlockAsync() -----> RedissonLock.unlockInnerAsync() 方法， 可以看到最终是通过执行 Lua 脚本实现的释放锁操作

```lua
// 释放锁 Lua 脚本
// KEYS[1] 锁的名称
// KEYS[2] 频道名称  redisson_lock__channel:锁名称
// ARGV[1] 释放锁消息内容
// ARGV[2] 过期时间
// ARGV[3] 线程名称
 if (redis.call('hexists', KEYS[1], ARGV[3]) == 0) then             -- 锁存在，但是不是当前线程加的锁 直接放回
    return nil;end;
 local counter = redis.call('hincrby', KEYS[1], ARGV[3], -1);       -- 可重入锁，value 进行-1
 if (counter > 0) then                                              -- 可重入次数 0, 说明存在重入锁的操作，不能删除key
     redis.call('pexpire', KEYS[1], ARGV[2]);                       -- 延长 锁 过期的时间
     return 0; 
	else redis.call('del', KEYS[1]);                                    -- 删除key, 并发布释放锁的消息
  redis.call('publish', KEYS[2], ARGV[1]); return 1; end;
 return nil;
```



**这个加解锁的过程总结**

> Redisson 封装 提供了一个简单的加锁、解锁的方法，基本实现了 `互斥性`、`防死锁`、`持有人解锁`、`可重入锁`、`自定延时机制`



自动延时机制：**客户端A** 一旦加锁成功后，会启动一个 `wacth dog` 看门狗。**他是一个后台线程，默认每隔 10秒 检查一下**  **客户端A**  是否还持有锁，那么久会不断的去延长锁的生存时间



可重入性：通过 hash 结构存储 锁， key: 客户端信息   value: 为加锁次数。当 当前客户端进行多次加锁时，会将值累加1  （结束时，需要为0时，才能进行解锁）



### watch dog

> Redis 通过 `watch dog` 来实现 锁的 自动延期机制。那为什么需要自动延时机制呢？？

由于可能存在 客户端拿到锁后，由于服务节点崩溃、网络请求丢失 或 程序崩溃等问题 导致死锁的情况。 为了解决该类问题 通过给锁 设置一个 过期时间。这样引入了新的问题：在指定的 过期时间内，线程的操作还未执行完成。锁就被释放了。

**所以需要自动延迟机制**



**Redisson核心实现方式**

> 默认：`每10秒` 检测一下，如果还持有锁，会进行续约 `30秒`
>
> 也可以通过修改 `Config.lockWatchdogTimeout` 来另行指定



**源码分析**

> 在调用lock方法的 链路中 RedissonLock.tryLock()  ----->  RedissonLock.tryAcquire() -----> RedissonLock.tryAcquireAsync()  进行了 相关操作

- 当 leaseTime 未进行显示设置时 watch dog 才生效
  -  则 leaseTime = -1



```java
private <T> RFuture<Long> tryAcquireAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId) {
        RFuture<Long> ttlRemainingFuture;
        //如果指定了加锁时间，会直接去加锁
        if (leaseTime != -1) {
            ttlRemainingFuture = tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_LONG);
        } else {
            //没有指定加锁时间 会先进行加锁，并且默认时间就是 LockWatchdogTimeout的时间
            //这个是异步操作 返回RFuture 类似netty中的future
            ttlRemainingFuture = tryLockInnerAsync(waitTime, internalLockLeaseTime,
                    TimeUnit.MILLISECONDS, threadId, RedisCommands.EVAL_LONG);
        }

        //这里也是类似netty Future 的addListener，在future内容执行完成后执行
        ttlRemainingFuture.onComplete((ttlRemaining, e) -> {
            if (e != null) {
                return;
            }

            // lock acquired
            if (ttlRemaining == null) {
                // leaseTime不为-1时，不会自动延期
                if (leaseTime != -1) {
                    internalLockLeaseTime = unit.toMillis(leaseTime);
                } else {
                    //这里是定时执行 当前锁自动延期的动作,leaseTime为-1时，才会自动延期
                    scheduleExpirationRenewal(threadId);
                }
            }
        });
        return ttlRemainingFuture;
    }
```

> scheduleExpirationRenewal 中会调用renewExpiration 这里我们可以看到是,启用了一个timeout定时，去执行延期动作

```java
private void renewExpiration() {
        ExpirationEntry ee = EXPIRATION_RENEWAL_MAP.get(getEntryName());
        if (ee == null) {
            return;
        }

        Timeout task = commandExecutor.getConnectionManager().newTimeout(new TimerTask() {
            @Override
            public void run(Timeout timeout) throws Exception {
                ExpirationEntry ent = EXPIRATION_RENEWAL_MAP.get(getEntryName());
                if (ent == null) {
                    return;
                }
                Long threadId = ent.getFirstThreadId();
                if (threadId == null) {
                    return;
                }

                RFuture<Boolean> future = renewExpirationAsync(threadId);
                future.onComplete((res, e) -> {
                    if (e != null) {
                        log.error("Can't update lock " + getRawName() + " expiration", e);
                        EXPIRATION_RENEWAL_MAP.remove(getEntryName());
                        return;
                    }

                    if (res) {
                        //如果 没有报错，就再次定时延期
                        // reschedule itself
                        renewExpiration();
                    } else {
                        cancelExpirationRenewal(null);
                    }
                });
            }
            // 这里我们可以看到定时任务 是 lockWatchdogTimeout 的1/3时间去执行 renewExpirationAsync
        }, internalLockLeaseTime / 3, TimeUnit.MILLISECONDS);

        ee.setTimeout(task);
    }
```



**最终通过Lua脚本实现延期**

```lua
// 延期锁的过期时间
// KEYS[1] 锁的名称
// ARGV[1] 线程名称
// ARGV[2] 过期时间
if (redis.call('hexists', KEYS[1], ARGV[2]) == 1)
  then redis.call('pexpire', KEYS[1], ARGV[1]);
 return 1; end; return 0;
```



**总结**

- **watch dog** 在当前节点存活时每10s给分布式锁的key续期 30s
- **watch dog** 会每 `internalLockLeaseTime / 3` 时间，去延时, 所以可以通过 修改 `internalLockLeaseTime`  来实现延期策略
- 要使用 **watch dog** 则 不要声明 过期时间
- **watch dog** 机制启动，且代码中没有释放锁操作时，watch dog 会不断的给锁续期；
- 建议还是将释放锁操作放在 `finally` 中

## 相关文章

- [Lua脚本在redis分布式锁场景的运用](https://www.cnblogs.com/demingblog/p/9542124.html)
- [Redis实现分布式锁的7种方案，及正确使用姿势！](https://juejin.cn/post/6844903688088059912#heading-24)
- [Redis——由分布式锁造成的重大事故](https://juejin.cn/post/6854573212831842311)
- [介绍几种常见的分布式锁写法](https://juejin.cn/post/6844904191337431047#heading-3)
- [Redisson wiki](https://github.com/redisson/redisson/wiki/8.-%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81%E5%92%8C%E5%90%8C%E6%AD%A5%E5%99%A8#85-%E8%AF%BB%E5%86%99%E9%94%81readwritelock)
