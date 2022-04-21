---
isTimeLine: true
sidebar: true
isComment: false
title: mybatis
date: 2021-08-09
tags:
- Java
--- 

## 什么是ORM？
ORM 全称 Object Relation Mapping: 对象 - 关系映射 的缩写
ORM主要是完成面向对象的编程语言到关系型数据库的映射

## Mybatis 是什么？
Mybatis 是基于 ORM 的 半自动的持久层框架。
- 优点：
	- 不需要去处理JDBC的连接、手动设置参数、以及获取结果集
	- 开发  只要关注 核心的 SQL 语句，sql 和 java编码分开，功能边界清洗
	- 可以使用 XML 和 注解的方式使用
	- XML 支持 动态标签 SQL
- 缺点：
	- SQL语句依赖于数据库，导致数据库移植性差


##  `#{}`和 `${}` 的区别是什么
 - `#{}` :  是预编译处理
	 - Mybatis 处理时，会将sql 中  `#{}`  替换 成 `?` ,  调用 preparedStatement 的 `set` 方法进行赋值
	 - 可以有效的防止 SQL 注入 ::sdasda::
  - `${}`:  是字符串替换
	 - Mybatis执行时，直接将字符串替换，没有预编译处

## 如何获取⾃动⽣成的(主)键值?
方法1： 使用 useGeneratedKeys + keyProperty 属性
方法2：通过LAST_INSERT_ID()获取刚插⼊记录的⾃增主键值，在insert语句执⾏后，执⾏select （`<selectKey />`）LAST_INSERT_ID()就可以获取⾃增主键

## 在mapper中如何传递多个参数?
- 在映射⽂件中使⽤`#{0}`, `#{1}` 代表传递进来的第⼏个参数

```
> #{0}: 代表第一个传入的参数   #{1}: 代表第二个传入的参数
<select id="selectUser"resultMap="BaseResultMap">
select * fromuser_user_t whereuser_name = #{0} anduser_area=#{1} 
</select>
```

- 使⽤@param注解:来命名参数

```
## Dao 层 使用 param 指定变量名

public interface userMapper {
user selectuser(@param(“username”) string username,
@param(“hashedpassword”) string hashedpassword);
}

## XML 层
<select id=”selectuser” resulttype=”user”>
select id, username, hashedpassword
from some_table
where username = #{username}
and hashedpassword = #{hashedpassword}
</select>

```

- 使用 Map 集合作为参数来装载

## Mybatis动态sql是做什么的？都有哪些动态sql？能简单简单阐述一下动态sql的执行原理
- Mybatis动态sql可以让我们在Xml映射⽂件内，以标签的形式编写动态sql，完成逻辑判断和动态
拼接sql的功能。
- Mybatis提供了9种动态sql标签：trim|where|set|foreach|if|choose|when|otherwise|bind。
- 其执⾏原理为，使⽤OGNL从sql参数对象中计算表达式的值，根据表达式的值动态拼接sql，以此来完成动态sql的功能。

## Mybatis的Xml映射⽂件中，不同的Xml映射⽂件，id 是否可以重复
在 同一个Xml 映射文件是不可以重复的，因为我们与Mapper 映射时，使用： `namespace+id` 做关联的，并存放在 一个 `hashMap` 中，所以同一个文件时，导致会对应错误，因为映射关系会被覆盖

但是在不同的xml隐映射文件 中 id相同，是可以重复的


## MyBatis 架构层级 和 基本的执行流程
MyBatis分为 三层：
- API 接口层：
	- 提供的给外部使用的接口API层, 使用API层来操作数据库
	- MyBatis  与 数据库的交互方式
		- 传统的 MyBatis 提供的API
		- 使用 Mapper代理方式
- 数据处理层
	- 参数映射 (ParameterHandler)
	- SQL解析 (SqlSource)
	- SQL执行 (Executor)
	- 结果处理 和 映射 (ResultSetHandler)
- 基础支持层
	- 连接管理
	- 事务管理
	- 配置加载
	- 缓存处理

### 总体执行流程

- 加载配置文件并初始化
- 接收调用请求
- 处理操作请求
- 返回处理结果
  
<img :src="$withBase('/java/other/mybatis/mybatis-1.jpg')" alt="foo">

处理过程：
1. 根据 SQL 的 ID查找对应的 MappedStatment对象
2. 根据传入参数对象解析 MappedStatmentd对象，得到最终要执行的 SQL 和 执行传入参数
3. 获取数据库连接，并执行数据库操作，并得到结果
4. 根据 MapperdStatement对象的结果映射配置，对返回结果进行转换处理，并得到最终的处理结果
5. 释放连接资源
6. 返回处理结果


## MyBatis 缓存

> Mybatis 提供了对象缓存的支持，分为一级缓存 和二级缓存   

相关概念点：

### 一级缓存

>  一级缓存：`SqlSession`  级别的缓存。在操作数据库时需要构造 `SqlSession`  对象，在对象中有一个数据结构（HashMap）用于存储缓存数据。不同的 `SqlSession`   之间的缓存数据区域（HashMap）不影响。  
>  一级缓存具体返回的是：缓存的对象  

#### 一级缓存的底层数据结构：

> 底层使用 `HashMap` 来存储 一级缓存  

HashMap 存储的 `cacheKey`   和 `value` :
- cacheKey :
	- statementid (namespace 和 方法名 )
	- params （参数）
	- boundSql （mybatis的底层对象，对象中封装这执行的sql对象）
	- rowBounds （mybatis分页对象）
- value :
	- 即查询出的结果

::注：通过SqlCache中的clearCache 找到其底层存储的结果::

clearCache 的调用链路：

<img :src="$withBase('/java/other/mybatis/mybatis-2.jpg')" alt="foo">

#### 一级缓存是什么时候被创建的 和 一级缓存的执行流程：

一级缓存是在执行query 查询时 被创建的：
- 执行查询时，先会调用  `createCacheKey`  方法获取 cacheKey 
	- 具体实现 在BaseExecutor sql执行器中创建的
- 优先去一级缓存中去查询，直接返回，无：查询数据库，同时将查询出来的结果存到一级缓存中
- 返回具体数据


#### 一级缓存被清除的时机有那些：

- 做增删改操作，并进行了事务，就会刷新一级缓存
- sqlSeesion.clearCache(): 手动刷新一级缓存
- sqlSeesion 被 `close`  时候


### 二级缓存

> 二级缓存：是mapper(namespace)级别的缓存 即：mapper映射层，多个 `SqlSession` 去操作同一个Mapper的sql语句，多个SqlSession可以共用二级缓存，二级缓存是跨 `SqlSession` 的，默认是不开启的  
> 二级缓考 ：它返回时 会将数据重新创建一个对象之后返回 , 而不是直接返回一个对象  
> 二级缓存的基本原理 和 一级缓存基本一致  

::注意事项::

开启后二级缓存后，所有的mybaits 的pojo 都需要继承 Serializabl序列化接口
因为二级缓存可能存在 内存 或者硬盘 等地方 ，需要进行 序列化 和 反序列化

#### 二级缓存的开启方式

1. XML 形式
sqlMapConfig.xml 配置文件
```
<settings>
    <setting name=“cacheEnable” value=“true”/>
</settings>
```
mapper.xml 文件
```
<cache></cache>
```

2. 注解形式
在Mapper 类上 添加 `@CacheNamesapce` 注解

#### 二级缓存的实现分布式缓存的方式

> 自带的二级缓存 无法用于分布式缓存 因为不同不服务器内存 不通用，所以需要使用不同的第三方缓存组件来实现、redis、memcached 、ehcahce  

通过注解来指定使用缓存类 `@CacheNamesapce(implements:PerpetualCache.class)`


## Mybatis的插件运行原理，以及如何编写一个插件？
> 对 mybatis 来说插件就是拦截器，用来增强核心对象的功能，增强功能本质是借助于底层的动态代理实现的，换句话说 mybatis中的四大对象都是代理对象  
> Mybatis 四大核心组件 `Executor`、`StatementHandler`、`ParameterHandler`、`ResultSetHandler`  

### 运行原理

1. 每个创建出来的对象不是直接返回的，而是interceptorChain.pluginAll(parameterHandler)；
2. 获取到所有的Interceptor(拦截器)（插件需要实现的接口）；调用interceptor.plugin(target);返回target包装后的对象
3. 插件机制，我们可以使用插件为目标对象创建一个代理对象；aop（面向切面）我们的插件可以以为四大对象创建出代理对象，代理对象就可以拦截到四大对象的每一个执行；

### 如何编写一个插件

- 我们需要实现 实现MyBatis的Interceptor  (拦截器)接⼝并复写intercept()⽅法
	- intercept() :  插件核心方法
	- plugin(): 生成target的代理对象
	- setProperties(): 传递插件所需要的参数
- 需要给插件使用注解 `@Intercepts`  、`@Signature` ，指定相关参数
	- type: 需要拦截的类
	- method:  需要拦截的方法
	- args:  方法入参 
- 在配置⽂件中配置你编写的插件 `sqlMapConfig.xml`

## Mybatis是如何进⾏分⻚的？分⻚插件的原理是什么
- Mybatis使⽤RowBounds对象进⾏分⻚，它是针对ResultSet结果集执⾏的内存分⻚，
- 如果需要物理分页的话
	- 在sql内直接书写带有物理分⻚的参数来完成物理分⻚功能
	- 使用分页插件来实现物理分页

> 分页插件 同前的插件解释的一样：使⽤JDK的动态代理，为需要拦截的接⼝⽣成代理对象以实现接⼝⽅法拦截功能，（具体可以查看插件相关知识）  


## Mybatis是否⽀持延迟加载？如果⽀持，它的实现原理

> 延迟加载：即需要用到数据的时候才进行加载，不需要的时候不进行加载，延迟加载，也叫懒加载  

<img :src="$withBase('/java/other/mybatis/mybatis-3.jpg')" alt="foo">

::注：:: MyBatis 使用 `CGLIB` 或 `javassist`（默认）创建目标对象的代理对象

 Mybatis  是 支持延时加载的

- 可以配置文件中配置： lazyLoadingEnabled ： true 进行全局开启
- 也可以 `<collection>` 标签中 使用 `fetchType="lazy` 属性 进行局部开启

### 原理：

- Mysql 开启 延时加载后
- MyBatis 返回查询结构对象时，会对ResultMap 中的属性进行判断， 是否有 `Lazy` 属性 ，有则会使用 `CGLIB` 或 `javassist`（默认）创建目标对象的代理对象
- 当调用目标方法时，会进入拦截器 调用 `invoke()` 方法
- 会判断 你当前获取的属性，是不是延时加载属性，如果是，那么就会单独发送事先保存好的查询关联B对象的sql，进行延时加载

### 详细源码：

1.  DefaultResultSetHandler.class
```java
// 创建结构对象
private Object createResultObject(ResultSetWrapper rsw, ResultMap resultMap, ResultLoaderMap lazyLoader, String columnPrefix) throws SQLException {
  this.useConstructorMappings = false; // reset previous mapping result
  final List<Class<?>> constructorArgTypes = new ArrayList<>();
  final List<Object> constructorArgs = new ArrayList<>();
  // 创建返回的结果映射的真实对象
  Object resultObject = createResultObject(rsw, resultMap, constructorArgTypes, constructorArgs, columnPrefix);
  if (resultObject != null && !hasTypeHandlerForResultObject(rsw, resultMap.getType())) {
    final List<ResultMapping> propertyMappings = resultMap.getPropertyResultMappings();
    for (ResultMapping propertyMapping : propertyMappings) {
      // issue gcode #109 && issue #149
		// 判断属性有没配置嵌套查询，如果有就创建代理对象 (resultMap 中的属性)
      if (propertyMapping.getNestedQueryId() != null && propertyMapping.isLazy()) {
        resultObject = configuration.getProxyFactory().createProxy(resultObject, lazyLoader, configuration, objectFactory, constructorArgTypes, constructorArgs);
        break;
      }
    }
  }
  this.useConstructorMappings = resultObject != null && !constructorArgTypes.isEmpty(); // set current mapping result
  return resultObject;
}
```

2. JavassistProxyFactory.class  内部类 EnhancedResultObjectProxyImpl

```java

  @Override
  public Object invoke(Object enhanced, Method method, Method methodProxy, Object[] args) throws Throwable {
    final String methodName = method.getName();
    try {
      synchronized (lazyLoader) {
        if (WRITE_REPLACE_METHOD.equals(methodName)) {
          Object original;
          if (constructorArgTypes.isEmpty()) {
            original = objectFactory.create(type);
          } else {
            original = objectFactory.create(type, constructorArgTypes, constructorArgs);
          }
          PropertyCopier.copyBeanProperties(type, enhanced, original);
          if (lazyLoader.size() > 0) {
            return new JavassistSerialStateHolder(original, lazyLoader.getProperties(), objectFactory, constructorArgTypes, constructorArgs);
          } else {
            return original;
          }
        } else {
				//延迟加载数量⼤于0
          if (lazyLoader.size() > 0 && !FINALIZE_METHOD.equals(methodName)) {
				// ⼀次加载性所有需要要延迟加载属性或者包含触发延迟加载⽅法

            if (aggressive || lazyLoadTriggerMethods.contains(methodName)) {
              lazyLoader.loadAll();
				//判断是否为set⽅法，set⽅法不需要延迟加载
            } else if (PropertyNamer.isSetter(methodName)) {
              final String property = PropertyNamer.methodToProperty(methodName);
              lazyLoader.remove(property);
				//判断是否为get⽅法，get的属性是不是个需要延时加载的属性
            } else if (PropertyNamer.isGetter(methodName)) {
              final String property = PropertyNamer.methodToProperty(methodName);
				//延迟加载单个属性
              if (lazyLoader.hasLoader(property)) {
                lazyLoader.load(property);
              }
            }
          }
        }
      }
      return methodProxy.invoke(enhanced, args);
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
  }
}

```

> 总结来说：就是 代理对象，调用延时加载属性的 方法时，就会进入拦截器方法的 invoke() 方法，判断属性是否是个延时加载属性，如果时则执行对应的sql，进行返回结果  


## Mybatis都有哪些Executor执⾏器？它们之间的区别

Executor：执行器是一个接口，他有三个常用的实现类：
* SimpleExecutor: 普通的执行器
	* SimpleExecutor是执行器的默认实现，主要完成了“执行”功能，在利用StatementHandler 完成。每次调用执行方法 都会构建一个StatementHandler，并预设参数
	* 即：每执⾏⼀次update或select，就开启⼀个Statement对象，⽤完⽴刻关闭Statement对象。
- ReuseExecutor: 可重用执行器
	- 可重复使用JDBC中Statement，减少预编译次数。该执行器在执行SQL时会把Statement缓存起来，如果下次碰到相同的SQL，就会取出来使用。
* BatchExecutor: 批量操作的执行器
	* 每次的执行操作 不会立即执行，而是把对应的Statement 填充好参数之后暂存起来。当调用 flushStatements 的时候一次性提交到数据库。它可用于批处理插入的场景。效果等同于SQL语句的拼装。

> 三个实现类，还有一个父类：`BaseExecutor`  

<img :src="$withBase('/java/other/mybatis/mybatis-4.jpg')" alt="foo">


## Mybatis 的 Dao接口的工作原理？Dao接口里的方法是否支持重载?
- Dao接⼝，就是⼈们常说的Mapper接⼝，接⼝的全限名，就是映射xml⽂件中的namespace的值， 接⼝的⽅法名，就是映射⽂件中MappedStatement的id值，接⼝⽅法内的参数，就是传递给sql的参数。
- Mapper接⼝是没有实现类的，当调⽤接⼝⽅法时，接⼝全限名+⽅法名拼接字符串作为key值，可唯⼀定位⼀个MappedStatement

> Dao接⼝的⼯作原理是JDK动态代理，Mybatis运⾏时会使⽤JDK动态代理为Dao接⼝⽣成代理proxy对象，代理对象proxy会拦截接⼝⽅法，从⽽执⾏MappedStatement所代表的sql，然后将sql执⾏结果返回。  

###  Dao接口里的方法是否支持重载?

> Dao接⼝⾥的⽅法，是不能重载的，因为是全限名+⽅法名的保存和寻找策略。  


#草稿箱/待整理的学习资料

