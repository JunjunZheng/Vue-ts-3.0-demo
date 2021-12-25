import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

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
    },
    {
        path: '/product-list',
        name: 'product-list',
        component: () => import('@/views/ProductList/index.vue'),
        meta: {
            index: 2
        }
    },
    {
        path: '/create-order',
        name: 'create-order',
        component: () => import('@/views/CreateOrder/index.vue'),
        meta: {
            index: 2
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const whiteList: Array<string> = ['login', 'home', 'category']

router.beforeEach((to, from: IKeyValue, next) => {
    const token = store.state.token
    if (token) {
        if (to.name == 'login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.name as string)) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
