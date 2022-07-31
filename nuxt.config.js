/*
    Nuxt.js 配置文件
*/
module.exports = {
    router: {
        linkActiveClass: 'active', // nuxt-link跳转到对应路由自动添加的class类名
        // middleware: ['authenticated'],
        // 自定义路由表规则
        extendRoutes(routes, resolve) {
            // 清除 Nuxt.js 基于pages目录默认生成的路由表规则
            routes.length = 0

            routes.push(
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        {
                            path: '', // 留空则是默认子路由
                            name: 'home',
                            component: resolve(__dirname, 'pages/home')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article')
                        }
                    ]
                }
            )
        }
    },
    // 注册插件
    plugins: ['~/plugins/request.js', '~/plugins/formatTime.js'],
    // 运行服务相关配置
    server: {
        // 代表监听所有的网卡地址，如果是本地则当前所有局域网的人都可以访问，生产服务器则代表对外都可以访问
        host: '0.0.0.0', // 如果是localhost仅仅是本地的，发布到服务器是无效
        port: '3000'
    }
}