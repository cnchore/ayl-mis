 <template>                  
    <header>
            <Row>
                <i-col :xs="0" :sm="0" :md="0" :lg="5" v-if="spanLeft>0">
                    <div class="logo"></div>
                </i-col>
                <i-col  :md="20" :lg="16">
                 <Menu mode="horizontal" :id="Math.random()" theme="primary" class="q-menu" :active-key="topMenuAct" @on-select="MenuSelect">
                    <Menu-item :key="item.id"  v-for="item in menuList | filterBy 'icon' in 'iconUrl'">
                        <i class="iconfont" :class="item.iconUrl"></i>
                        <span>{{item.menuName}}</span>
                    </Menu-item>
                    
                </Menu>
                </i-col>
                <i-col  :md="4" :lg="3">
                    <Menu mode="horizontal" :active-key="topMenuAct" :id="Math.random()" theme="primary" class="q-menu"  style="float: right;"
                    @on-select="MenuSelect">
                        
                        <Submenu :key="item.id" class="q-right" v-for="item in menuList | filterBy '/user' in 'src'">
                            <template slot="title">{{userInfo.userName}}</template>
                                
                                <Menu-item :key="child.id" v-for="child in item.children">
                                    <i class="iconfont" :class="child.iconUrl"></i>
                                    <span>{{child.menuName}}</span>
                                </Menu-item>
                                <Menu-item :key="9999">
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
            selKey:{
                type:Number,
                default:1
            },
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
            },
            pageSrc:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                userInfo:env==='development'?{userName:'TestName',type:2}:storage.session.get('userInfo'),
                menuList:storage.session.get('menuList'),
                topMenuAct:0
            }
        },

        ready(){
            let w=window.document.body.clientWidth;
            if(this.pageSrc==='/index'){
                this.getIndexMenuId();
            }else{
                let keys=server.getForChild(this.menuList,this.pageSrc)
                this.topMenuAct=keys.topKey;
            }
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
            MenuSelect(key){
                if(key===9999){
                    var t;
                    clearTimeout(t);
                    t = setTimeout(() => {
                        this.loginOut();
                        
                    }, 600);
                    return;
                }
                let _src=this.getMenuSrcById(this.menuList,key);
                if(this.userInfo.type===2){
                    switch(_src){
                        case '/waiting':
                            _src='/owner/waiting';
                            break;
                        case '/order/list':
                            _src='/owner/order/list';
                            break;
                    }
                }
                if(_src){
                    var t;
                    clearTimeout(t);
                    t = setTimeout(() => {
                        this.$router.go(_src);
                    }, 600);
                }else{
                    this.$Notice.info({
                        title:'提示',
                        desc:'开发中,敬请期待...'
                    });
                }
            },
            getIndexMenuId(){
                let self=this;
                self.menuList.every((item)=>{
                    if(item.src==='/index'){
                        self.topMenuAct=item.id;
                        return false;
                    }
                })
            },
            getMenuSrcById(list,key){
                let _src=null;
                list.forEach((item)=>{
                    if(parseInt(key)===parseInt(item.id)){
                        if(item.children && item.children[0]){
                            _src=item.children[0].src;
                        }else{
                          _src=item.src;  
                        }
                        
                    }else if(item.children && item.children.length>0){
                        item.children.forEach((child)=>{
                            if(parseInt(child.id)===parseInt(key)){
                                _src=child.src;
                            }
                        })
                    }
                })
                return _src;
            },

            loginOut(){
                let self=this;
                self.$Loading.start();
                server.loginOut().then((res)=>{
                    self.$Loading.finish();
                    if(res.success){
                        storage.session.remove('userInfo');
                        storage.session.remove('menuList');
                        self.$router.go('/login')
                        
                    }else{
                        self.$Message.error(res.message);
                    }
                })
            }
        }
    }
</script>