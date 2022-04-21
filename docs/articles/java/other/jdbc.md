---
isTimeLine: true
sidebar: true
isComment: false
title: JDBC
date: 2020-10-09
tags:
- Java
--- 
## 什么是JDBC

> JDBC 全称：Java DataBase Connectivity, JDBC是 sun 公司制定的 用于统一规范访问不同数据库的应用API, 提供了连接、查询、更新相关的操作方式


## JDBC 基本的操作步骤

1. 加载数据驱库驱动
2. 通过驱动管理建立数据库连接
3. 创建预处理 statement (包含构建sql语句，以及传参)
4. 执行sql,得到返回值ResultSet 
5. 遍历结果集 
6. 释放资源 


## 基本的使用代码

```java
@Test
public static void main(String[] args) throws Exception {

    // 1、加载启动器
    Class.forName("com.mysql.jdbc.Driver");

    // 2、通过驱动管理建立数据库连接
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:8889/mybatis?characterEncoding=utf-8",
            "root", "root");

    // 3、创建预处理 statement (包含构建sql语句，以及传参)
    String sql = "select * from user where username = ?";
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    preparedStatement.setString(1, "tom");

    // 4、执行sql,得到返回值ResultSet
    ResultSet resultSet = preparedStatement.executeQuery();

    // 5、遍历结果集 进行对象封装
    while (resultSet.next()) {
        User user = new User();
        user.setId(resultSet.getInt("id"));
        user.setUsername(resultSet.getString("username"));
        System.out.println(user);
    }

    // 6、释放资源
    connection.close();
}
```

## JDBC下的四个接口和类（四个核心对象）

- DriverManager: 该类管理数据库驱动的服务类
- Connenction: 代表数据库建立连接对对象，管理数据库的连接，每一个Connection代表一个物理连接对话
- Statement: 用于在已经建立连接的基础上向数据库发送 SQL 语句，在JDBC中有3种Statement对象
    - Statement 对象用于执行 不带参数的简单 SQL 语句
    - PreparedStatement 继承了 Statement, 用来执行动态 SQL 语句
    - CallableStatement 继承了 PreparedStatement， 用于执行对数据的存储过程的调用
- ResultSet: 执行sql查询语句返回的结果集

## DiverManager 三种连接方式

```java
// 1、url设置账户密码 方式读取连接
Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:8889/mybatis?user=root&password=root");

// 2、单独设置账户密码 方式读取连接
Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:8889/mybatis?characterEncoding=utf-8",
                "root", "root");
        
/**
 * 3、URL + Properties 方式读取连接
 *
 * 01、常见配置类
 * 02、读取配置参数
 * 03、建立数据库连接
 */

Properties pps = new Properties();
pps.load(this.getClass().getResourceAsStream("/Jdbc.properties"));
Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:8889/mybatis?characterEncoding=utf-8", pps);
    
```

方法三：需要在resources 目录下 新增 jdbc.properties 配置文件

```java
user=root
password=root
```

## Connenction 接口常用方法

- createStatement() : 创建Statement 对象 (接口类中还有多个重载方法)
- prepareStatement() : 创建预处理对象 prepareStatement (接口类中还有多个重载方法)
- setAutoCommit() ：设置事务，在JDBC中，事务是默认自动提交的，如果需要手动执行，则需要 传 `false` 关闭事务
- commit() : 提交所有上一次执行的sql
- rollback() : 回滚操作，回滚后进行的更改为持久更改，并释放此Connection对象当前持有的所有数据库锁

### Statement 接口 和 PreparedStatement 接口

#### Statement类 与 PreparedStatement 比较

> 虽然说：PreparedStatement 接口继承了Statement接口，但是缺有很大的不同
1. 使用PreparedStatement，代码的可读性和可维护性比Statement高。
2. PreparedStatement对象是经过预编译的，所以执行速度比Statement快很多。
3. PreparedStatement能保证安全性，但 Statement有sql注入等安全问题。

#### Statement 接口常用方法

- execute() : 执行静态的SELECT语句，该语句可能返回多个结果集
- executeQuery() : 执行给定的SQL语句，该语句返回单个 ResultSet 对象
- clearBatch() : 清空此 Statement 对象的当前 SQl命令列表
- executeBatch() : 将一批命令提交给数据库执行
- addBatch() ：将给定的SQL语句 添加到此 Statemnet 对象的列表中，如果驱动不支持批量操作，将抛出异常
- close() ：释放Statement实例占用的数据库和JDBC资源

#### PreparedStatement 接口常用方法

- setXXXX() : `XXXX` 指各种数据类型 (int 、float、long、string 等等 ）用于赋值操作
- executeUpdate() : 执行前面包含的参数动态 INSERT 、 UPDATE 、DELETE 语句
- clearParameters() : 清楚当前所有参数的值

#### ResultSet 接口常用方法

- getXXXX() : `XXXX` 指各种数据类型 (int 、float、long、string 等等 ）用于取值操作
- first() : 将指针移动到当前记录的第一行
- last() : 将指针移动到当前记录的最后一行
- next() : 将指针向下移一行
- absolute(int index) : 将指针移到 指定的编号行
- isFirst() : 判断指针是否位于集合的第一行 ，返回 true,false
- isLast() : 判断指针是否位于集合的最后一行 ，返回 true,false


## JDBC 基本数据类型
<br>

<img :src="$withBase('/java/jdbc-type.png')" alt="foo">

## JDBC 简单的CURD

> 这里使用的 Statement 接口操作

```java
@Test
public void curdTest() throws Exception {
    // 1、加载启动器
    Class.forName("com.mysql.jdbc.Driver");

    // 2、通过驱动管理建立数据库连接
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:8889/mybatis?characterEncoding=utf-8",
            "root", "root");

    Statement statement = connection.createStatement();

    // 查
    ResultSet resultSet = statement.executeQuery("select * from user where username = 'tom'");
    while (resultSet.next()) {
        User user = new User();
        user.setId(resultSet.getInt("id"));
        user.setUsername(resultSet.getString("username"));
        System.out.println(user);
    }

    // 增
    int insertResult = statement.executeUpdate("INSERT INTO user values (2, 'oliver')");
    System.out.println(insertResult);
    // 改
    int updateResult = statement.executeUpdate("UPDATE user set username = 'jack' where id = 2");
    System.out.println(updateResult);
    // 删
    int deleteResult = statement.executeUpdate("DELETE FROM user where id = 2");
    System.out.println(deleteResult);

    // 6、释放资源
    connection.close();
}
```

## 批量擦操作

```java
@Test
public void batchTest() throws Exception {
    // 1、加载启动器
    Class.forName("com.mysql.jdbc.Driver");

    // 2、通过驱动管理建立数据库连接
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:8889/mybatis?characterEncoding=utf-8",
            "root", "root");
    
    // statement 批量操作
    Statement statement = connection.createStatement();
    String sql1 = "INSERT INTO user values (2, 'oliver')";
    String sql2 = "INSERT INTO user values (3, 'oliver3')";
    statement.addBatch(sql1);
    statement.addBatch(sql2);
    //批量处理
    statement.executeBatch();
    // 清除statement 中积攒的参数列表
    statement.clearBatch();

    // PreparedStatement 批量操作
    PreparedStatement ps = connection.prepareStatement("INSERT INTO user values (?, ? )");
    for(int i=1;i<6;i++){
        ps.setInt(1, 3+i);
        ps.setString(2, "name"+i);
        ps.addBatch();
        if((i+1)%6==0){
            //批量处理
            ps.executeBatch();
            //清空ps中积攒的sql
            ps.clearBatch();    
        }
    }
}
```

## JDBC 使用时有哪些问题
1. 数据库配置存在硬编码
2. 频繁创建释放数据库连接，造成系统资源浪费，从而影响性能
3. sql语句 、设置参数、获取结果参数存在硬编码
4. 结果集解析需要硬编码，sql变化导致解析代码发送变化，不容易维护，

## 引申

通过上述案例发现的与很多不足的，
所以大家会在项目中使用更方便的 Mybatis 、Jpa 等ORM的存在，它们的底层其实也是对 JDBC代码操作的封装，
哪它们又是怎么实现的呢 ，希望大家能一起思考一下！



