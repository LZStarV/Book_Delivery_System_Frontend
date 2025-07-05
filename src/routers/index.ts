import { createRouter, createWebHistory } from 'vue-router';
import showLoginAlert from '@/utils/loginAlert';
import { useUserStore } from '@/store/user';
import { useAuthStore } from '@/store/auth';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),  // HTML5模式
    routes: routes
})

// 全局前置守卫
router.beforeEach((to, _from, next) => {
    const validPaths = routes.map(route => route.path)
    const publicPaths = ['登录', '注册', 'not-found']
    const authStore = useAuthStore()
    const userStore = useUserStore()
    const isAuthenticated = authStore.isAuthenticated

    if (validPaths.includes(to.path)) {
        if (!publicPaths.includes(to.name) && !isAuthenticated) {
            showLoginAlert(() => {
                authStore.clearToken();
                userStore.clearUser();
                next('/login');
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

// 全局后置钩子
router.afterEach((_to, _from) => {
})

export default router