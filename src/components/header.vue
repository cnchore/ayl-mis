 <template>                  
    <header>
            <Row>
                <i-col :span="spanLeft" v-show="spanLeft>0">
                    <div class="logo"></div>
                </i-col>
                <i-col :span="spanRight">
                 <Menu mode="horizontal" theme="primary" :active-key="activeKey" @on-select="handleSelect">
                    <Menu-item key="0">
                        <Icon type="home"></Icon>
                        首页
                    </Menu-item>
                    <Menu-item key="3">
                        <Icon type="settings"></Icon>
                        预约管理
                    </Menu-item>

                    <Menu-item key="4">
                        <Icon type="settings"></Icon>
                        客户订单管理
                    </Menu-item>
                    <Menu-item key="1">
                        <Icon type="ios-paper"></Icon>
                        安居艾臣
                    </Menu-item>
                    <Menu-item key="2">
                        <Icon type="ios-people"></Icon>
                        艾臣合伙人
                    </Menu-item>
                    <Menu-item key="5">
                        <Icon type="settings"></Icon>
                        经销商管理
                    </Menu-item>
                    <Menu-item key="6">
                        <Icon type="stats-bars"></Icon>
                        统计分析
                    </Menu-item>
                    <Menu-item key="7" style="float:right" v-show="spanLeft>0">
                        <i-button shape="circle" icon="ios-bell"></i-button>
                    </Menu-item>
                    <Submenu key="8" style="float:right">
                        <template slot="title">
                            <Icon type="person"></Icon>
                            张得帅
                        </template>
                        
                            <Menu-item key="8-1">
                            <Icon type="information"></Icon>
                            账号信息</Menu-item>
                            <Menu-item key="8-2">
                            <Icon type="edit"></Icon>
                            修改密码</Menu-item>
                            <Menu-item key="8-3">
                            <Icon type="android-exit"></Icon>
                            退出</Menu-item>
                       
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
        ready(){
            let w=window.document.body.clientWidth;
            if(w&&w<=1024){
                this.spanLeft=0;
                this.spanRight = 24;
            }
            else if(w&&w>=1440){
                this.spanLeft=3;
                this.spanRight = 21;
            }else if(w&&w>=2160){
                this.spanLeft=2;
                this.spanRight = 22;
            }else{
                this.spanLeft=4;
                this.spanRight = 20;
            }
        },
        methods:{
            handleSelect(key){
                //this.$Message.info(key);
                switch(key){
                    case '1':
                        this.$router.go('/store');
                        break;
                    case '2':
                        this.$router.go('/partner/account');
                        
                        break;
                    case '8-3':
                        this.loginOut();
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