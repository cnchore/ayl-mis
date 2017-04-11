 <template>                  
    <header>
            <Row>
                <i-col :span="spanLeft">
                    <div class="logo"></div>
                </i-col>
                <i-col :span="spanRight">
                 <Menu mode="horizontal" theme="primary" :active-key="activeKey" @on-select="handleSelect">
                    <Menu-item key="1">
                        <Icon type="ios-paper"></Icon>
                        安居艾臣
                    </Menu-item>
                    <Menu-item key="2">
                        <Icon type="ios-people"></Icon>
                        艾臣合伙人
                    </Menu-item>
                    <Submenu key="3">
                        <template slot="title">
                            <Icon type="stats-bars"></Icon>
                            统计分析
                        </template>
                        <Menu-group title="使用">
                            <Menu-item key="3-1">新增和启动</Menu-item>
                            <Menu-item key="3-2">活跃分析</Menu-item>
                            <Menu-item key="3-3">时段分析</Menu-item>
                        </Menu-group>
                        <Menu-group title="留存">
                            <Menu-item key="3-4">用户留存</Menu-item>
                            <Menu-item key="3-5">流失用户</Menu-item>
                        </Menu-group>
                    </Submenu>
                    <Menu-item key="4">
                        <Icon type="settings"></Icon>
                        综合设置
                    </Menu-item>
                    <Menu-item key="6" style="float:right">
                        <i-button shape="circle" icon="ios-bell"></i-button>
                    </Menu-item>
                    <Submenu key="5" style="float:right">
                        <template slot="title">
                            <Icon type="person"></Icon>
                            张得帅
                        </template>
                        
                            <Menu-item key="5-1">
                            <Icon type="information"></Icon>
                            账号信息</Menu-item>
                            <Menu-item key="5-2">
                            <Icon type="edit"></Icon>
                            修改密码</Menu-item>
                            <Menu-item key="5-3">
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
            if(w&&w>=1440){
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
                    case '5-3':
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