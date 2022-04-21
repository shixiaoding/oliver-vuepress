module.exports = {
    theme: 'reco',
    title: 'Oliver知识收集站',// 设置网站标题
    description: '享受着互联网广泛知识，并加以记录，日积月累让它成为一个档案处！',
    base: '/oliver-vuepress/',// 设置站点根路径
    dest: './ROOT',  // 设置输出目录
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    plugins: [
        ["@vuepress-reco/back-to-top", true] // disabled.
      ],
    themeConfig: {
        mode: 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        author: 'oliver.shi',
        lastUpdated: "上次更新",
        noFoundPageByTencent: false,
        searchMaxSuggestions: 20,
        subSidebar: 'auto',
        sidebarDepth: 1,
        displayAllHeaders: false,
        nav: [
            { text: '主页', link: '/' },
            { text: 'Java', items: [
                {text: '基础', link: "/articles/java/basics/"},
                {text: '并发', link: "/articles/java/concurrent/"},
                {text: 'JVM', link: "/articles/java/jvm/jvm"},
                {text: '杂', link: "/articles/java/other/"},
            ]},
            { text: 'Spring', link: '/articles/spring/first'},
            { text: '中间件', items: [
                {text: 'Redis', link: "/articles/middleware/redis/redis"},
                {text: 'Kafka', link: "/articles/middleware/kafka/"},
                {text: 'Zookeeper', link: "/articles/middleware/zookeeper"},
            ]},
            { text: '算法', link: '/articles/algorithm/'},
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: '个人简介', link: '/articles/me'},
            { text: '收集站',
                items: [
                    { text: '技术好文', link: '/articles/collect/article/first' },
                    { text: '书籍', link: '/articles/collect/book/first'},
                    { text: '优秀开发组件', link: '/articles/collect/assembly/first' },
                    { text: '软件', link: '/articles/collect/software/first' },
                    { text: '插件', link: '/articles/collect/plugin/first' },
                ]
            },
        ],
        // 为以下路由添加左侧边栏
        sidebar: {
            '/articles/java/basics/' : [
                {
                    title: '基础篇',
                    sidebarDepth: 1,
                    children: [
                        {title: '面向对象',path: 'oop'},
                        {title: '枚举',path: 'enum'},
                        {title: '数据类型',path: 'datatype'},
                        {title: '字符串',path: 'string'},
                    ]
                }
            ],
            '/articles/java/concurrent/' : [
                {
                    title: '并发',
                    sidebarDepth: 1,
                    children: [
                        {title: 'volatile',path: 'volatile'},
                        {title: 'threadLocal',path: 'threadlocal'},
                        {title: 'reentrantLock',path: 'reentrantLock'},
                        {title: 'synchronized',path: 'synchronized'},
                        {title: '线程池',path: 'executor'},
                    ]
                }
            ],
            '/articles/java/other/' : [
                {
                    title: 'java 杂',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: [
                        {title: 'JDBC',path: 'jdbc'},
                        {title: 'java-load',path: 'java-load'},
                        {title: 'MyBatis',path: 'mybatis'},
                    ]
                }
            ],
            '/articles/algorithm/': [
                {
                    title: '算法',
                    sidebarDepth: 2,
                    collapsable: true,
                    children: [
                        '933',
                        "1021"
                    ]
                }
            ],
            '/articles/question/': [
                {
                    title: '面试题',
                    sidebarDepth: 2,
                    collapsable: true,
                    children: [
                        'first'
                    ]
                }
            ],
            '/articles/middleware/kafka/': [
                {
                    title: 'Kafka',
                    sidebarDepth: 2,
                    collapsable: true,
                    children: [
                        {title: 'kafka 架构体系',path: 'framework'},
                        {title: 'kafka 生产者',path: 'producer'},
                        {title: 'kafka 消费者',path: 'consumer'},
                        {title: 'kafka 为什么快',path: 'why-fast'},
                        {title: 'kafka的优缺点& 应用场景', path: 'application'}
                    ]
                }
            ]
            // '/articles/middleware/redis/': [
            //     {
            //         title: 'Redis',
            //         sidebarDepth: 2,
            //         collapsable: true,
            //         children: [
            //             {title: 'Redis 缓存过期 和 淘汰策略',path: 'overdue'},
            //             {title: 'Redis持久化',path: 'persistence'},
            //         ]
            //     }
            // ]
        }
    } 
}