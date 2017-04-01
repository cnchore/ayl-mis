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
        }
    },
    '/store': {
        component(resolve) {
            require(['./views/store.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'首页' }
    },
    '/news': {
        component(resolve) {
            require(['./views/news.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'首页' }
    },
    '/product': {
        component(resolve) {
            require(['./views/product.vue'], resolve);
        },
        meta: { requiresAuth: true,title:'首页' }
    }
};
export default routers;