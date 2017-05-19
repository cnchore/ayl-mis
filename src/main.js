import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app.vue';
import Routers from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './my-theme/index.less';
import './global.less'

import VueLazyload from 'vue-lazyload'
import { storage } from './libs/server'
import env from './config/env';
//import VueResource from 'vue-resource'

Vue.use(VueLazyload,{	
	preLoad:1.3,
	loading:require('./imgs/bg.png'),
	attempt:1
})
Vue.use(VueRouter);
Vue.use(iView);
//Vue.use(VueResource);
iView.LoadingBar.config({
    color: '#ff6600',
    height:5
});
iView.Notice.config({
    top: 80,
    duration:10
});
// 开启debug模式
Vue.config.debug = true;


// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由, 如果生产环境的服务端没有进行相关配置,请慎用
    history: false
});

router.map(Routers);


router.beforeEach((transition) => {
    //loading=Loading.service({ fullscreen: true })
    window.scrollTo(0, 0);
    iView.LoadingBar.start();
    if(transition.to.meta &&transition.to.meta.requiresAuth) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        let userInfo=storage.session.get('userInfo');
        //console.log('transition',transition);
        //console.log(userInfo)
        if(env!='development' && !(userInfo && userInfo.userName) ){
            //let lc=window.document.location;
            //window.document.location.href=lc.origin+lc.pathname+'#!/login?redirect='+transition.to.path;
            //transition.abort();
            transition.redirect({
                path: '/login',
                query: { redirect: transition.to.fullPath }
            })
        }else {
            if(userInfo&&userInfo.roleName==='自助学习'&&transition.to.path==='/index'){
                transition.redirect({
                    path: '/info',
                    query: { redirect: transition.to.fullPath }
                })
            }else{
                console.log('transition.next',transition.to.path);
                transition.next();
            }
        }
    } else {
        transition.next() // 确保一定要调用 next()
    }
})


router.afterEach((transition) => {
    iView.LoadingBar.finish();
    if(transition.to.meta &&transition.to.meta.title){
        window.document.title=transition.to.meta.title;
    }
});
router.redirect({
    '*': "/login"
});
router.start(App, '#app');