const routes = [
    {
        path: '/',
        name: '首页',
        title: '首页',
        component: () => import('@/pages/HomePage.vue')
    },
    {
        path: '/login',
        name: '登录',
        title: '登录',
        component: () => import('@/pages/LoginPage.vue')
    },
    {
        path: '/register',
        name: '注册',
        title: '注册',
        component: () => import('@/pages/RegisterPage.vue')
    },
    {
        path: '/profile',
        name: '个人主页',
        title: '个人主页',
        component: () => import('@/pages/profile/ProfilePage.vue')
    },
    {
        path: '/detail/:file_uuid',
        name: '书本详情',
        title: '书本详情',
        component: () => import('@/pages/detail/detailPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/EmptyPage.vue'),
        meta: { title: '404 Not Found' }
    }
]
export default routes