const routers = {
    '/index': {
        component(resolve) {
            require(['./views/index.vue'], resolve);
        }
    },
    '/login': {
        component(resolve) {
            require(['./views/login.vue'], resolve);
        }
    },
    '/store': {
        component(resolve) {
            require(['./views/store.vue'], resolve);
        }
    },
    '/news': {
        component(resolve) {
            require(['./views/news.vue'], resolve);
        }
    },
    '/product': {
        component(resolve) {
            require(['./views/product.vue'], resolve);
        }
    }
};
export default routers;