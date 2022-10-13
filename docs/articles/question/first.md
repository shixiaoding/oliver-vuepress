# 面试题


## 请说说MyBatis的工作原理？

1. 读取 MyBatis 配置文件：mybatis-config.xml 为 MyBatis 的全局配置文件，配置了 MyBatis 的运行环境等信息，例如数据库连接信息。
2. 加载映射文件。映射文件即 SQL 映射文件，该文件中配置了操作数据库的 SQL 语句，需要在 MyBatis 配置文件 mybatis-config.xml 中加载。mybatis-config.xml 文件可以加载多个映射文件，每个文件对应数据库中的一张表。
3. 构造会话工厂：通过 MyBatis 的环境等配置信息构建会话工厂 SqlSessionFactory。
4. 创建会话对象：由会话工厂创建 SqlSession 对象，该对象中包含了执行 SQL 语句的所有方法。
5. Executor 执行器：MyBatis 底层定义了一个 Executor 接口来操作数据库，它将根据 SqlSession 传递的参数动态地生成需要执行的 SQL 语句，同时负责查询缓存的维护。
6. MappedStatement 对象：在 Executor 接口的执行方法中有一个 MappedStatement 类型的参数，该参数是对映射信息的封装，用于存储要映射的 SQL 语句的 id、参数等信息。
7. 输入参数映射：输入参数类型可以是 Map、List 等集合类型，也可以是基本数据类型和 POJO 类型。输入参数映射过程类似于 JDBC 对 preparedStatement 对象设置参数的过程。
8. 出结果映射：输出结果类型可以是 Map、 List 等集合类型，也可以是基本数据类型和 POJO 类型。输出结果映射过程类似于 JDBC 对结果集的解析过程。



 ## HashMap存储原理，有啥问题，如何避免？

- 存储原理：
  - HashMap是一个键值对的集合，是非synchronized的，源码中每个节点用Node `<K,V>` 表示。 Node是一个内部类，这里的key为键，value为值，next指向下一个元素，可以看出HashMap中的元素不是一个单纯的键值对，还包含下一个元素的引用
  - HashMap的数据结构：数组+(链表或红黑树)，数组是HashMap的主体，链表则是主要为了解决哈希冲突而存在的。 在HashMap底层使用数组加（链表或红黑树）的结构完美的解决了数组和链表的问题，使得查询和插入，删除的效率都很高。因为链表中元素太多的时候会影响查找效率，所以当链表的元素个数达到8的时候使用链表存储就转变成了使用红黑树存储，原因就是红黑树是平衡二叉树，在查找性能方面比链表要高。
  - HashMap中有两个重要的参数：初始容量大小和加载因子，初始容量大小是创建时给数组分配的容量大小，默认值为16，用数组容量大小乘以加载因子得到一个值。一旦数组中存储的元素个数超过该值就会调用rehash方法将数组容量增加到原来的两倍，专业术语叫做扩容。 在做扩容的时候会生成一个新的数组，原来的所有数据需要重新计算哈希码值重新分配到新的数组，所以扩容的操作非常消耗性能。
- 问题：
  -  当重新调整HashMap大小的时候，存在条件竞争，如果两个线程都发现HashMap需要重新调整大小了，它们会同时试着调整大小。在调整大小的过程中，存储在LinkedList中的元素的次序会反过来，因为移动到新的bucket位置的时候，HashMap并不会将元素放在LinkedList的尾部，而是放在头部，这是为了避免尾部遍历(tail traversing)。如果条件竞争发生了，那么就死循环了。
- 避免方式
  -   添加了红黑树，当链表长度大于8时，还需要判断当前数组的长度,如果数组长度 < 64 时，此时并不会转换为红黑树，而是扩容, 只有当链表 中的元素个数 > 8，并且数组的长度 >= 64 时才会将链表转为红黑树。 扩容后，新数组中的链表顺序依然与旧数组中的链表顺序保持一致。具体JDK8是用 head 和 tail 来保证链表的顺序和之前一样，这样就不会产生循环引用，也就没有死循环了。 虽然修复了死循环的BUG，但是HashMap 还是非线程安全类，仍然会产生数据丢失等问题。
  - 可以使用HashTable和调用Collections工具类的synchronizedMap()方法达到线程安全的目的。但由于synchronized是串行执行，在访问量很大的情况下效率很低，不推荐使用

## 通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

- Dao接口，就是人们常说的Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。
- Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement，举例：com.mybatis3.mappers.StudentDao.findStudentById，可以唯一找到namespace为com.mybatis3.mappers.StudentDao下面id = findStudentById的MappedStatement。在Mybatis中，每一个 `<select>`、`<insert>`、`<update>`、`<delete>`标签，都会被解析为一个MappedStatement对象。
- Dao接口里的方法，是不能重载的，因为是全限名+方法名的保存和寻找策略。
- Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象（如使用spring会注入到容器中），代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。


## JVM中类加载的过程? 什么是双亲委派？ 类加载器有哪些?

- 在加载阶段，虚拟机需要完成以下三件事情：
  - 通过一个类的全限定名来获取定义此类的二进制字节流(并没有指明要从一个Class文件中获取，可以从其他渠道，如：网络、动态生成、数据库等)；
  - 将这个字节流所代表的的静态存储结构转化为方法区的运行时数据结构；
  - 在内存中(对于HotSpot虚拟机而言就是方法区)生成一个代表这个类的java.lang.Class对象，作为方法区这个类的各种数据访问入口
- 双亲委派:
  - 类加载器收到类加载请求，自己不加载，向上委托给父类加载，父类加载不了，再自己加载, 就是避免Java核心API篡改。
- 类加载器有哪些:
  - Bootstrap ClassLoader启动类 | 根加载器）::它用来加载 Java 的核心类，是用原生代码来实现的，并不继承自 java.lang.ClassLoader（负责加载$JAVA_HOME中jre/lib/rt.jar里所有的class，由C++实现，不是ClassLoader子类）。由于引导类加载器涉及到虚拟机本地实现细节，开发者无法直接获取到启动类加载器的引用，所以不允许直接通过引用进行操作。-- 
  - ExtClassLoader(扩展类加载器)：它负责加载JRE的扩展目录，lib/ext或者由java.ext.dirs系统属性指定的目录中的JAR包的类。由Java语言实现，开发者可以直接使用扩展类加载器。
  - AppClassLoader:被称为系统（也称为应用）类加载器，它负责在JVM启动时加载来自Java命令的-classpath选项、java.class.path系统属性，或者CLASSPATH换将变量所指定的JAR包和类路径。程序可以通过ClassLoader的静态方法getSystemClassLoader()来获取系统类加载器。如果没有特别指定，则用户自定义的类加载器都以此类加载器作为父加载器。由Java语言实现，父类加载器为ExtClassLoader。




## @Component和@Bean的区别是什么

>  作用对象不同。

- @Component注解作用于类，而@Bean注解作用于方法。
- @Component注解通常是通过类路径扫描来自动侦测以及自动装配到Spring容器中（我们可以使用@ComponentScan注解定义要扫描的路径）。

- @Bean注解通常是在标有该注解的方法中定义产生这个bean，告诉Spring这是某个类的实例，当我需要用它的时候还给我。
- @Bean注解比@Component注解的自定义性更强，而且很多地方只能通过@Bean注解来注册bean。



## FileSystemResource和ClassPathResource之间的区别是什么？

- 在FileSystemResource中你需要给出spring-config.xml(Spring配置)文件相对于您的项目的相对路径或文件的绝对位置。

- 在ClassPathResource中Sping查找文件使用ClassPath，因此spring-config.xml应该包含在类路径下。

- 一句话,ClassPathResource在类路径下搜索和FileSystemResource在文件系统下搜索。



## 构造方法注入和setter注入之间的区别

1. 在Setter注入,可以将依赖项部分注入,构造方法注入不能部分注入，因为调用构造方法如果传入所有的参数就会报错。
2. 如果我们为同一属性提供Setter和构造方法注入，Setter注入将覆盖构造方法注入。但是构造方法注入不能覆盖setter注入值。显然，构造方法注入被称为创建实例的第一选项。
3. 使用setter注入你不能保证所有的依赖都被注入,这意味着你可以有一个对象依赖没有被注入。在另一方面构造方法注入直到你所有的依赖都注入后才开始创建实例。
4. 在构造函数注入,如果A和B对象相互依赖：A依赖于B,B也依赖于A,此时在创建对象的A或者B时，Spring抛出ObjectCurrentlyInCreationException。所以Spring可以通过setter注入,从而解决循环依赖的问题。



## ApplicationContext通常的实现是什么?

- FileSystemXmlApplicationContext ：此容器从一个XML文件中加载beans的定义，XML Bean 配置文件的全路径名必须提供给它的构造函数。
- ClassPathXmlApplicationContext：此容器也从一个XML文件中加载beans的定义，这里，你需要正确设置classpath因为这个容器将在classpath里找bean配置。
- WebXmlApplicationContext：此容器加载一个XML文件，此文件定义了一个WEB应用的所有bean。



##  spring自动装配有哪些方式？

- 自动装配的不同模式：
  - no - 这是默认设置，表示没有自动装配。应使用显式 bean 引用进行装配。
  - byName - 它根据 bean 的名称注入对象依赖项。它匹配并装配其属性与 XML 文件中由相同名称定义的 bean。
  - byType - 它根据类型注入对象依赖项。如果属性的类型与 XML 文件中的一个 bean 名称匹配，则匹配并装配属性。
  - 构造函数 - 它通过调用类的构造函数来注入依赖项。它有大量的参数。
  - autodetect - 首先容器尝试通过构造函数使用 autowire 装配，如果不能，则尝试通过 byType 自动装配。


## spring 支持几中 bean scope?

- Spring bean 支持 5 种 scope：
  - Singleton - 每个 Spring IoC 容器仅有一个单实例。
  - Prototype - 每次请求都会产生一个新的实例。
  - Request - 每一次 HTTP 请求都会产生一个新的实例，并且该 bean 仅在当前 HTTP 请求内有效。
  - Session - 每一次 HTTP 请求都会产生一个新的 bean，同时该 bean 仅在当前 HTTP session 内有效。
  - Global-session - 类似于标准的 HTTP Session 作用域，不过它仅仅在基于 portlet 的 web 应用中才有意义。Portlet 规范定义了全局 Session 的概念，它被所有构成某个 portlet web 应用的各种不同的 portlet 所共享。在 global session 作用域中定义的 bean 被限定于全局 portlet Session 的生命周期范围内。如果你在 web 中使用 global session 作用域来标识 bean，那么 web 会自动当成 session 类型来使用。

> 仅当用户使用支持 Web 的 ApplicationContext 时，最后三个才可用。	

- Spring 中支持定义Bean的Scope种类有以下6种：
  -  Singletone: 每个Spring容器中唯一（单例子，默认容器初始化时预创建） 
  - Prototype： 每次向容器请求bean对象时，创建一个新的实例； 
  - Request： 只针对Web应用有效： 每次Http请求，创建一个Bean的实例；
  -  Session： 只在Web应用中有效，每个Session会话过程中有效， 
  - Application：只Web应用有效，整个Web应用中唯一； 
  -  websocket： 只Web应用有效，WebSocket声明周期内唯一； -->



##   描述Spring和SpringMVC父子容器关系, 父子容器重复扫描会出现什么样的问题, 子容器是否可以使用父容器中的bean, 如果可以如何配置?

1. Spring和SpringMVC父子容器关系？

   1. Spring是父容器，SpringMVC是其子容器，并且在Spring父容器中注册的Bean对于SpringMVC容器中是可见的，而在SpringMVC容器中注册的Bean对于Spring父容器中是不可见的，也就是子容器可以看见父容器中的注册的Bean，反之就不行。

2. 父子容器重复扫描会出现什么样的问题？

   1. 父容器是使用了ContextLoaderListener加载并实例化的ioc容器为父容器
   2. 子容器是使用了DispatcherServerlet加载并实例化的ioc容器为子容器
   3. 父容器不能调用子容器中任何的组件,子容器可以调用除了controller以外的组件.

3. 子容器是否可以使用父容器中的bean, 如果可以如何配置?

   1. 可以

   ```xml
    <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping">
           <property name="detectHandlerMethodsInAncestorContexts">
               <value>true</value>
           </property>
       </bean>
   ```

   

## 简述 什么是死锁, 活锁, 饥饿 以及产生的原因？

- 死锁: 指两个或两个以上的进程(或线程)在执行过程中, 因争夺资源造成的一种相互等待的现象, 若无外力作用, 他们将无法推进下去产生死锁的原因?
  - 互斥条件: 所谓互斥就是进程在某一时间内独占资源.
  - 请求与保持条件: 一个进程因请求资源而阻塞时, 对已获得的资源保持不放
  - 不剥夺条件: 进程已获得资源, 在未使用前, 不能强行剥夺.
  - 循环等待条件: 若干进程之间形成一种头尾相接的循环等待资源关系.
- 活锁:
  -  任务或者执行者没有被阻塞, 由于某些条件没有满足, 导致一直重复尝试, 失败, 尝试, 失败.
  - 活锁和思索的区别在于, 处于活锁的实体是在不断的改变状态, 所谓的"活", 而处于死锁的实体表现为等待, 活锁有可能自行解开,死锁则不能
- 饥饿: 一个或多个线程因为种种原因无法获得所需要的资源, 导致一直无法执行的状态
- java中导致饥饿的原因?
  - 高优先级线程吞噬所有的低优先级线程cpu时间
  - .线程被永久堵塞在一个等待进入同步块的状态, 因为其他线程总是能在它之前持续的对该同步块进行访问
  - 线程在等待一个本身也处于永久等待完成的对象(比如调用这个对象的wait方法), 因为其他线程总是被持续的获得唤醒



## SpringMVC中的拦截器和Servlet中的filter有什么区别?

- 首先最核心的一点他们的拦截侧重点是不同的，SpringMVC中的拦截器是依赖JDK的反射实现的，SpringMVC的拦截器主要是进行拦截请求，通过对Handler进行处理的时候进行拦截，先声明的拦截器中的preHandle方法会先执行，然而它的postHandle方法（他是介于处理完业务之后和返回结果之前）和afterCompletion方法却会后执行。并且Spring的拦截器是按照配置的先后顺序进行拦截的。
- Servlet的filter是基于函数回调实现的过滤器，Filter主要是针对URL地址做一个编码的事情、而过滤掉没用的参数、安全校验（比较泛的，比如登录不登录之类



## 讲一下 oom 以及遇到这种情况怎么处理的，是否使用过日志分析工具 ?

OOM，全称“OutOfMemory”，翻译成中文就是“内存用完了”，当 JVM 因为没有足够的 内存来为对象分配空间并且垃圾回收器也已经没有空间可回收时，就会抛出这个 error。 处理过程：首先通过内存映射分析工具 如 EclipseMemoryAnalyzer 堆 dump 出的异常 堆转储进行快照解析确认内存中的对象是否是必要的， 也就是先分清楚是 内存泄漏 MemoryLeak 还是 MemoryOverflow 如果是内存泄漏 可 通过工具进一步查看泄露的对象到 GCRoots 的引用链， 就能找到泄露对象是怎么通过路径与 GCRoots 相关联导致垃圾收集器无法回收他们如果不存在泄露 就检查堆参数 -Xmx 与 -Xms 与机器物理 内存对比是否还可以调大 从代码上检测 是否是某些对象的生命周期过长持有状态时间 过长 尝试减少代码运行期间的内存消耗



## Spring Boot 中 “约定优于配置“的具体产品体现在哪里。

- Spring Boot Starter、Spring Boot Jpa 都是“约定优于配置“的一种体现。都是通过“约定优于配置“的设计思路来设计的，Spring Boot Starter 在启动的过程中会根据约定的信息对资源进行初始化；Spring Boot Jpa 通过约定的方式来自动生成 Sql ，避免大量无效代码编写。



## Spring Boot 中如何实现定时任务 ?
> 定时任务也是一个常见的需求，Spring Boot 中对于定时任务的支持主要还是来自 Spring 框架。

- 在 Spring Boot 中使用定时任务主要有两种不同的方式，一个就是使用 Spring 中的 @Scheduled 注解，另一个则是使用第三方框架 Quartz。
  - 使用 Spring 中的 @Scheduled 的方式主要通过 @Scheduled 注解来实现。
  - 使用 Quartz ，则按照 Quartz 的方式，定义 Job 和 Trigger 即可。



## wait 和 sleep 的区别

- sleep 来自 Thread 类，和 wait 来自 Object 类。
- 主要是sleep方法没有释放锁，而wait方法释放了 锁，使得其他线程可以使用同步控制块或者方法。
- wait，notify和 notifyAll 只能在同步控制方法或者同步控制块里面使用，而 sleep 可以在任何地方使用(使 用范围)
- sleep 必须捕获异常，而 wait ， notify 和 notifyAll 不需要捕获异常
  - sleep 方法属于 Thread 类中方法，表示让一个线程进入睡眠状态，等待一定的时间之后，自动醒来进入到可 运行状态，不会马上进入运行状态，因为线程调度机制恢复线程的运行也需要时间，一个线程对象调用了 sleep 方法之后，并不会释放他所持有的所有对象锁，所以也就不会影响其他进程对象的运行。但在 sleep 的过程中过 程中有可能被其他对象调用它的 interrupt() ,产生 InterruptedException 异常，如果你的程序不捕获这个异 常，线程就会异常终止，进入 TERMINATED 状态，如果你的程序捕获了这个异常，那么程序就会继续执行catch语 句块(可能还有 finally 语句块)以及以后的代码。
  - 注意 sleep() 方法是一个静态方法，也就是说他只对当前对象有效，通过 t.sleep() 让t对象进入 sleep ，这样 的做法是错误的，它只会是使当前线程被 sleep 而不是 t 线程
  - wait 属于 Object 的成员方法，一旦一个对象调用了wait方法，必须要采用 notify() 和 notifyAll() 方法 唤醒该进程;如果线程拥有某个或某些对象的同步锁，那么在调用了 wait() 后，这个线程就会释放它持有的所有 同步资源，而不限于这个被调用了 wait() 方法的对象。 wait() 方法也同样会在 wait 的过程中有可能被其他对 象调用 interrupt() 方法而产生 。



## spring-boot-starter-parent 有什么用 ?

1. 定义了 Java 编译版本为 1.8
2. 使用 UTF-8 格式编码。
3. 继承自 spring-boot-dependencies，这个里边定义了依赖的版本，也正是因为继承了这个依赖，所以我们在写依赖时才不需要写版本号。
4. 执行打包操作的配置。
5. 自动化的资源过滤。
6. 自动化的插件配置。
7. 针对 application.properties 和 application.yml 的资源过滤，包括通过 profile 定义的不同环境的配置文件，例如 application-dev.properties 和 application-dev.yml。



## Spring Boot 是否可以使用 XML 配置 ?

Spring Boot 推荐使用 Java 配置而非 XML 配置，但是 Spring Boot 中也可以使用 XML 配置，通过 @ImportResource 注解可以引入一个 XML 配置。



## Spring Boot 打成的 jar 和普通的 jar 有什么区别 ?

- Spring Boot 项目最终打包成的 jar 是可执行 jar ，这种 jar 可以直接通过 java -jar xxx.jar 命令来运行，这种 jar 不可以作为普通的 jar 被其他项目依赖，即使依赖了也无法使用其中的类。
- Spring Boot 的 jar 无法被其他项目依赖，主要还是他和普通 jar 的结构不同。普通的 jar 包，解压后直接就是包名，包里就是我们的代码，而 Spring Boot 打包成的可执行 jar 解压后，在 \BOOT-INF\classes 目录下才是我们的代码，因此无法被直接引用。如果非要引用，可以在 pom.xml 文件中增加配置，将 Spring Boot 项目打包成两个 jar ，一个可执行，一个可引用。



> 2020-09-08

## Nginx是如何实现高并发的？

一个主进程，多个工作进程，每个工作进程可以处理多个请求，每进来一个request，会有一个worker进程去处理。但不是全程的处理，处理到可能发生阻塞的地方，比如向上游（后端）服务器转发request，并等待请求返回。那么，这个处理的worker继续处理其他请求，而一旦上游服务器返回了，就会触发这个事件，worker才会来接手，这个request才会接着往下走。

由于web server的工作性质决定了每个request的大部份生命都是在网络传输中，实际上花费在server机器上的时间片不多。

这是几个进程就解决高并发的秘密所在。即@skoo所说的webserver刚好属于网络io密集型应用，不算是计算密集型。



## Tomcat Servlet容器处理流程

  当⽤户请求某个URL资源时

1. HTTP服务器会把请求信息使⽤ServletRequest对象封装起来
2. 进⼀步去调⽤Servlet容器中某个具体的Servlet
3. 在 2 中，Servlet容器拿到请求后，根据URL和Servlet的映射关系，找到相应的Servlet
4. 如果Servlet还没有被加载，就⽤反射机制创建这个Servlet，并调⽤Servlet的init⽅法来完成初始化
5. 接着调⽤这个具体Servlet的service⽅法来处理请求，请求处理结果使⽤ServletResponse对象封装
6. 把ServletResponse对象返回给HTTP服务器，HTTP服务器会把响应发送给客户端

