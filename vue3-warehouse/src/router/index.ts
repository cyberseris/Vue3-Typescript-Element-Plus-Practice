import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path: '/index',   // 首頁
        name: 'index',
        component: () => import('../view/index/index.vue')
    },
    {
        path: '/order',   // 訂單
        name: 'order',
        component: () => import('../view/order/index.vue')
    },
    {
        path: '/census',   // 統計
        name: 'census',
        component: () => import('../view/census/index.vue')
    },
    {
        path: '/manage',   // 管理
        name: 'manage',
        component: () => import('../view/manage/index.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;