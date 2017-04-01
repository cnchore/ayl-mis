import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app.vue';
import Routers from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './global.less'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{	
	preLoad:1.3,
	loading:'src/imgs/bg.png',
	attempt:1
})
Vue.use(VueRouter);
Vue.use(iView);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由, 如果生产环境的服务端没有进行相关配置,请慎用
    history: false
});

router.map(Routers);


router.beforeEach((transition) => {
	window.scrollTo(0, 0);
    iView.LoadingBar.start();
    transition.next();
});

router.afterEach((transition) => {
    iView.LoadingBar.finish();
});
router.redirect({
    '*': "/index"
});
router.start(App, '#app');