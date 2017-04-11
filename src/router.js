const routers = {
    '/index': {
        component(resolve) {
            require(['./views/index.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'首页' }
    },
    '/login': {
        component(resolve) {
            require(['./views/login.vue'], resolve);
        },
        meta: { title:'登录' }
    },
    '/store': {
        component(resolve) {
            require(['./views/aysl/store.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'门店展示管理' }
    },
    '/news': {
        component(resolve) {
            require(['./views/aysl/news.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'艾臣资讯管理' }
    },
    '/product': {
        component(resolve) {
            require(['./views/aysl/product.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'产品介绍管理' }
    },
    '/feed/back': {
        component(resolve) {
            require(['./views/aysl/feed-back.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'会员反馈管理' }
    },
    '/help': {
        component(resolve) {
            require(['./views/aysl/help.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'常见问题管理' }
    },
    '/coupon': {
        component(resolve) {
            require(['./views/aysl/coupon.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'优惠券活动配置' }
    },
    '/coupon/details': {
        component(resolve) {
            require(['./views/aysl/coupon-details.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'优惠券明细配置' }
    },
    '/gift/send': {
        component(resolve) {
            require(['./views/aysl/gift-send.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'领取礼品管理' }
    }
    //
    ,
    '/partner/account': {
        component(resolve) {
            require(['./views/hhr/partner-account.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'合伙人账号管理' }
    }

};
export default routers;