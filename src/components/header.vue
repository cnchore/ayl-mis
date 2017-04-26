 <template>                  
    <header>
            <Row>
                <i-col :xs="0" :sm="0" :md="0" :lg="5" v-show="spanLeft>0">
                    <div class="logo"></div>
                </i-col>
                <i-col  :md="18" :lg="15">
                 <Menu mode="horizontal" theme="primary" class="q-menu" :active-key="activeKey" @on-select="handleSelect">
                    <Menu-item key="0">
                        <i class="iconfont icon-zhuye"></i>
                        <span>首页</span>
                    </Menu-item>
                    <Menu-item key="3" v-show="userInfo.type===1">
                        <i class="iconfont icon-yuyueguanli"></i>
                        <span>预约管理</span>
                    </Menu-item>
                    <Menu-item key="10" v-show="userInfo.type===2">
                        <i class="iconfont icon-yuyueguanli"></i>
                        <span>预约管理</span>
                    </Menu-item>
                    <Menu-item key="4" v-show="userInfo.type===1">
                        <i class="iconfont icon-dingdan"></i>
                        <span>客户订单管理</span>
                    </Menu-item>
                     <Menu-item key="11" v-show="userInfo.type===2">
                        <i class="iconfont icon-dingdan"></i>
                        <span>客户订单管理</span>
                    </Menu-item>
                    <Menu-item key="1">
                        <i class="iconfont icon-qiye"></i>
                        <span>安居艾臣</span>
                    </Menu-item>
                    <Menu-item key="2">
                        <i class="iconfont icon-hehuoren"></i>
                        <span>艾臣合伙人</span>
                    </Menu-item>
                    <Menu-item key="5" v-show="userInfo.type==1">
                        <i class="iconfont icon-mendian"></i>
                        <span>经销商管理</span>
                    </Menu-item>
                    <Menu-item key="9" v-show="userInfo.type==2">
                        <i class="iconfont icon-mendian"></i>
                        <span>门店管理</span>
                    </Menu-item>
                    <Menu-item key="6">
                        <i class="iconfont icon-tongji"></i>
                        <span>统计分析</span>
                    </Menu-item>
                    
                    </Menu>
                </i-col>
                <i-col  :md="6" :lg="4">
                    <Menu mode="horizontal" theme="primary" class="q-menu"  style="float: right;"
                    @on-select="handleSelect">
                        <Menu-item key="7" class="q-right q-inline" v-show="false && spanLeft>0">
                            <i class="iconfont icon-xiaoxi"></i>
                        </Menu-item>
                        <Submenu key="8" class="q-right">
                            <template slot="title">{{userInfo.userName}}</template>
                                <Menu-item key="8-1">
                                    <Icon type="information"></Icon>

                                    <span>账号信息</span>
                                </Menu-item>
                                <Menu-item key="8-2">
                                    <Icon type="edit"></Icon>
                                    <span>修改密码</span>
                                </Menu-item>
                                <Menu-item key="8-3">
                                    <Icon type="android-exit"></Icon>
                                    <span>退出</span>
                                </Menu-item>
                           
                        </Submenu>
                    </Menu>
                </i-col>
            </Row>
    </header>
</template> 
<script>
import server,{ storage } from '../libs/server'
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
                userInfo:storage.session.get('userInfo')
            }
        },
        ready(){
            let w=window.document.body.clientWidth;
            if(w&&w<1136){
                this.spanLeft=0;
                this.spanRight = 24-4;
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
                        this.$router.go('/index');
                        break;
                    case '1':
                        this.$router.go('/store');
                        break;
                    case '2':
                        this.$router.go('/partner/account');
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