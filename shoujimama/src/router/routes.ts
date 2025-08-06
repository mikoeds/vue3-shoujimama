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
        component: () => import('../views/home.vue'),
        redirect: "/dashboard",
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('../views/dashBoard.vue'),
            meta: {
                title: '主页'
            },
        },
        {
            path: 'categoriesInfo',
            name: 'categoriesInfo',
            component: () => import('../views/home.vue'),
            meta: {
                title: '分类管理'
            },
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