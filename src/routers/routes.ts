const routes = [
    {
        path: '/',
        name: 'index',
        title: '首页',
        component: () => import('@/pages/HomePage.vue')
    },
    {
        path: '/login',
        name: 'login',
        title: '登录',
        component: () => import('@/pages/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'register',
        title: '注册',
        component: () => import('@/pages/RegisterPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/EmptyPage.vue'),
        meta: { title: '404 Not Found' }
    }
]
export default routes