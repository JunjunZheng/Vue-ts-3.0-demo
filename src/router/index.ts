import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
            index: 1
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            index: 1
        }
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('@/views/Category/index.vue'),
        meta: {
            index: 1
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart/index.vue'),
        meta: {
            index: 1
        }
    },
    {
        path: '/my',
        name: 'my',
        component: () => import('@/views/My/index.vue'),
        meta: {
            index: 1
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/Detail/index.vue'),
        meta: {
            index: 2
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
