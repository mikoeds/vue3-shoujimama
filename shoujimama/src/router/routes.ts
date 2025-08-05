import type { RouteRecordRaw } from "vue-router";

// 路由管理
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        name: '',
        redirect: "/home",
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('../views/home.vue'),
            meta: {
                title: '主页'
            },
            children: []
        },
        ]
    },
    {
        path: "/notFound",
        name: "notFound",
        component: () => import("../views/404.vue"),
        meta: {
            title: "NotFound"
        }
    },
    {
        path: "/:pathMatch(.*)*", // 修改此处
        redirect: "/notFound"
    }
]