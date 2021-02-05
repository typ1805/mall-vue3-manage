import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout/Layout"

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/login',
        name: '登录',
        meta: {title: "登录", requireAuth: false},
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/main',
        component: Layout,
        icon: "el-icon-s-home",
        meta: {title: "工作台", requireAuth: true},
        redirect: '/home',
        children: [
            {
                path: "/home",
                name: "工作台",
                icon: "el-icon-s-home",
                meta: {title: "工作台", requireAuth: true},
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: "/goods",
        name: "商品管理",
        component: Layout,
        icon: "el-icon-s-shop",
        meta: {title: "商品管理", requireAuth: true},
        children: [
            {
                path: "/goods-list",
                name: "商品列表",
                icon: "el-icon-s-data",
                meta: {title: "商品列表", requireAuth: true},
                component: () => import("@/views/GoodsList.vue")
            },
            {
                path: "/goods-add",
                name: "添加商品",
                icon: "el-icon-document-add",
                meta: {title: "添加商品", requireAuth: true},
                component: () => import("@/views/GoodsAdd.vue")
            }
        ]
    },
    {
        path: "/order",
        name: "订单管理",
        component: Layout,
        icon: "el-icon-s-order",
        meta: {title: "订单管理", requireAuth: true},
        children: [
            {
                path: "/order-list",
                name: "订单列表",
                icon: "el-icon-s-data",
                meta: {title: "订单列表", requireAuth: true},
                component: () => import("@/views/OrderList.vue")
            },
            {
                path: "/order-goods-list",
                name: "商品订单列表",
                icon: "el-icon-document-copy",
                meta: {title: "商品订单列表", requireAuth: true},
                component: () => import("@/views/OrderGoodsList.vue")
            },
            {
                path: "/order-detail",
                name: "账单详情",
                icon: "el-icon-tickets",
                meta: {title: "账单详情", requireAuth: true},
                component: () => import("@/views/OrderDetail.vue")
            }
        ]
    },
    {
        path: "/merchant",
        name: "商户管理",
        component: Layout,
        icon: "el-icon-s-custom",
        meta: {title: "商户管理", requireAuth: true},
        children: [
            {
                path: "/merchant-list",
                name: "商户列表",
                icon: "el-icon-s-data",
                meta: {title: "商户列表", requireAuth: true},
                component: () => import("@/views/MerchantList.vue")
            },
            {
                path: "/merchant-analysis",
                name: "商户分析",
                icon: "el-icon-pie-chart",
                meta: {title: "商户分析", requireAuth: true},
                component: () => import("@/views/MerchantAnalysis.vue")
            }
        ]
    },
    {
        path: "/user",
        name: "用户管理",
        component: Layout,
        icon: "el-icon-user",
        meta: {title: "用户管理", requireAuth: true},
        children: [
            {
                path: "/user-list",
                name: "用户列表",
                icon: "el-icon-s-data",
                meta: {title: "用户列表", requireAuth: true},
                component: () => import("@/views/UserList.vue")
            },
            {
                path: "/user-setting",
                name: "个人设置",
                icon: "el-icon-setting",
                meta: {title: "个人设置", requireAuth: true},
                component: () => import("@/views/UserSetting.vue")
            },
            {
                path: "/user-password",
                name: "修改密码",
                icon: "el-icon-unlock",
                meta: {title: "修改密码", requireAuth: true},
                component: () => import("@/views/UserPassword.vue")
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        meta: {title: "404", requireAuth: false},
        component: () => import('@/views/404.vue')
    },
    {
        path: '/500',
        name: '500',
        meta: {title: "500", requireAuth: false},
        component: () => import('@/views/500.vue')
    },
]

// createRouter 创建路由实例
const router = createRouter({
    /**
     * hash模式：createWebHashHistory，
     * history模式：createWebHistory
     */
    history: createWebHashHistory(),
    routes
})

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// 设置title
router.beforeEach((to, from, next) => {
    // 启动进度条
    NProgress.start()

    // 设置头部
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "默存"
    }
    next()
})

router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})

// 抛出路由实例, 在 main.js 中引用
export default router