 <template>                  
    <header>
            <Row>
                <i-col :xs="0" :sm="0" :md="0" :lg="5" v-show="spanLeft>0">
                    <div class="logo"></div>
                </i-col>
                <i-col  :md="21" :lg="16">
                 <Menu mode="horizontal" theme="primary" class="q-menu" :active-key="activeKey" @on-select="handleSelect">
                    <Menu-item key="0">
                        <i class="iconfont icon-zhuye"></i>
                        <span>首页</span>
                    </Menu-item>
                    <Menu-item key="3" v-show="userInfo.type===1 && userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-yuyueguanli"></i>
                        <span>预约管理</span>
                    </Menu-item>
                    <Menu-item key="10" v-show="userInfo.type===2 && userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-yuyueguanli"></i>
                        <span>预约管理</span>
                    </Menu-item>
                    <Menu-item key="4" v-show="userInfo.type===1 && userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-dingdan"></i>
                        <span>客户订单管理</span>
                    </Menu-item>
                     <Menu-item key="11" v-show="userInfo.type===2 && userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-dingdan"></i>
                        <span>客户订单管理</span>
                    </Menu-item>
                    <Menu-item key="1" v-if="userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-qiye"></i>
                        <span>安居艾臣</span>
                    </Menu-item>
                    <Menu-item key="2" v-if="userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-hehuoren"></i>
                        <span>艾臣合伙人</span>
                    </Menu-item>
                    <Menu-item key="5" v-if="userInfo.type==1 && userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-mendian"></i>
                        <span>经销商管理</span>
                    </Menu-item>
                    <Menu-item key="9" v-if="userInfo.type==2 && userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-mendian"></i>
                        <span>门店管理</span>
                    </Menu-item>
                    <Menu-item key="6" v-if="userInfo.roleName!='自助学习'">
                        <i class="iconfont icon-tongji"></i>
                        <span>统计分析</span>
                    </Menu-item>
                    <Menu-item key="12">
                        <i class="iconfont icon-zizhuxuexi"></i>
                        <span>自助学习</span>
                    </Menu-item>
                </Menu>
                </i-col>
                <i-col  :md="3" :lg="3">
                    <Menu mode="horizontal" theme="primary" class="q-menu"  style="float: right;"
                    @on-select="handleSelect">
                        <Menu-item key="7" class="q-right q-inline" v-if="false && spanLeft>0">
                            <i class="iconfont icon-xiaoxi"></i>
                        </Menu-item>
                        <Submenu key="8" class="q-right">
                            <template slot="title">{{userInfo.userName}}</template>
                                <Menu-item key="8-1">
                                   <i class="iconfont icon-zhanghaoxinxi"></i>

                                    <span>账号信息</span>
                                </Menu-item>
                                <Menu-item key="8-2">
                                    <i class="iconfont icon-xiugaimima"></i>
                                    <span>修改密码</span>
                                </Menu-item>
                                <Menu-item key="8-3">
                                    <i class="iconfont icon-tuichu"></i>
                                    <span>退&nbsp;&nbsp;&nbsp;&nbsp;出</span>
                                </Menu-item>
                           
                        </Submenu>
                    </Menu>
                </i-col>
            </Row>
    </header>
</template> 
<script>
import server,{ storage } from '../libs/server'
import env from '../config/env';
    export default{
        props: {
            activeKey:{
                type:String,
                default:'1'
            },
            spanLeft:{
                type:Number,
                default:4
            },
            spanRight:{
                type:Number,
                default:20
            }
        },
        data(){
            return {
                userInfo:env==='development'?{userName:'TestName',type:1}:storage.session.get('userInfo')
            }
        },
        ready(){
            let w=window.document.body.clientWidth;

            
            if(w&&w<1136){
                this.spanLeft=0;
                this.spanRight = 24;
            }
            else if(w&&w>=1440){
                this.spanLeft=3;
                this.spanRight = 21-4;
            }else if(w&&w>=2160){
                this.spanLeft=2;
                this.spanRight = 22-4;
            }else{
                this.spanLeft=4;
                this.spanRight = 20-4;
            }
        },
        methods:{
            handleSelect(key){
                //this.$Message.info(key);
                switch(key){
                    case '0':
                        if(this.userInfo.roleName!='自助学习'){
                            this.$router.go('/study/product/point');
                        }else{
                            this.$router.go('/index');
                        }
                        break;
                    case '1':
                        if(this.userInfo.type===1){
                            this.$router.go('/store');
                        }else{
                            this.$router.go('/coupon');
                        }
                        
                        break;
                    case '2':
                        if(this.userInfo.type===1){
                            this.$router.go('/partner/account');
                        }else{
                            this.$router.go('/partner/bonus');
                        }   
                        break;
                    case '3':
                        this.$router.go('/waiting');
                        break;
                    case '10':
                        this.$router.go('/owner/waiting');
                        break;
                    case '5':
                         this.$router.go('/agent/index');
                        break;
                    case '4':
                        this.$router.go('/order/list')
                        break;
                    case '11':
                         this.$router.go('/owner/order/list')
                        break;
                    case '6':
                    case '7':
                        this.$Notice.info({
                                title:'提示',
                                desc:'开发中,敬请期待...'
                            });
                        break;
                    case '8-1':
                        this.$router.go('/info');
                        break;
                    case '8-2':
                        this.$router.go('/pwd/update');
                        break;
                    case '8-3':
                        this.loginOut();
                        break;
                    case '9':
                        this.$router.go('/staff');
                        break;
                    case '12'://自助学习
                        this.$router.go('/study/product/point');
                        break;
                        
                }
            },
            loginOut(){
                let self=this;
                self.$Loading.start();
                server.loginOut().then((res)=>{
                    self.$Loading.finish();
                    if(res.success){
                        storage.session.remove('userInfo');
                        self.$router.go('login')
                        
                    }else{
                        self.$Message.error(res.message);
                    }
                })
            }
        }
    }
</script>