import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { useAuthStore } from '@/stores/auth'

console.log('routes', routes)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routes,
        {
            path: '/detail/:id',
            name: 'Detail',
            component: () => import('@/pages/detail/index.vue'),
        },
        {
            path: '/category/:id',
            name: 'Category',
            component: () => import('@/pages/category/index.vue'),
        },
    ],
})

// 認証が必要なページのガードを設定
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // 認証を確認
    authStore.checkAuth()

    // 認証が必要なページ（/admin/以下）で、未認証の場合は/loginにリダイレクト
    if (
        to.path.startsWith('/admin') &&
        to.path !== '/admin/login' &&
        !authStore.isAuthenticated
    ) {
        next('/admin/login')
    } else {
        next()
    }
})

export default router
