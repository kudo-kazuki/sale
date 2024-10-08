import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

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

export default router
