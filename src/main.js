import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app.vue';
import Routers from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './global.less'
import VueLazyload from 'vue-lazyload'
import { storage } from './libs/server'


Vue.use(VueLazyload,{	
	preLoad:1.3,
	loading:'src/imgs/bg.png',
	attempt:1
})
Vue.use(VueRouter);
Vue.use(iView);
iView.LoadingBar.config({
    color: '#ff6600',
    height:5
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
    //console.log(userInfo)
    if( !(userInfo && userInfo.name) ){
        //let lc=window.document.location;
        //window.document.location.href=lc.origin+lc.pathname+'#!/login?redirect='+transition.to.path;
        //transition.abort();
        transition.redirect({
            path: '/login',
            query: { redirect: transition.to.fullPath }
          })
    } else {
      transition.next()
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
    '*': "/index"
});
router.start(App, '#app');