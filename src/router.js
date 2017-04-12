const routers = {
    '/index': {
        component(resolve) {
            require(['./views/index.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－首页' }
    },
    '/login': {
        component(resolve) {
            require(['./views/login.vue'], resolve);
        },
        meta: { title:'艾臣营销管理平台－登录' }
    },
    '/store': {
        component(resolve) {
            require(['./views/aysl/store.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－门店展示管理' }
    },
    '/news': {
        component(resolve) {
            require(['./views/aysl/news.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－艾臣资讯管理' }
    },
    '/product': {
        component(resolve) {
            require(['./views/aysl/product.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－产品介绍' }
    },
    '/feed/back': {
        component(resolve) {
            require(['./views/aysl/feed-back.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－意见反馈管理' }
    },
    '/help': {
        component(resolve) {
            require(['./views/aysl/help.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－常见问题管理' }
    },
    '/coupon': {
        component(resolve) {
            require(['./views/aysl/coupon.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－优惠活动发布' }
    },
    '/coupon/details': {
        component(resolve) {
            require(['./views/aysl/coupon-details.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－优惠券明细配置' }
    },
    '/gift/send': {
        component(resolve) {
            require(['./views/aysl/gift-send.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－领取礼品管理' }
    }
    //艾臣合伙人
    ,
    '/partner/account': {
        component(resolve) {
            require(['./views/hhr/partner-account.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－合伙人账号管理' }
    },
    '/coupon/config': {
        component(resolve) {
            require(['./views/hhr/coupon-config.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－现金券配置管理' }
    },
    '/coupon/apply': {
        component(resolve) {
            require(['./views/hhr/coupon-apply.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－现金券申请管理' }
    },
    '/partner/coupon': {
        component(resolve) {
            require(['./views/hhr/partner-coupon.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－现金券使用情况管理' }
    },
    '/notice': {
        component(resolve) {
            require(['./views/hhr/notice.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣营销管理平台－公告发布管理' }
    }

};
export default routers;