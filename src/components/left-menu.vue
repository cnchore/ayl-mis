<style scoped lang="less">
	
	
</style>
<template>
    <Menu :active-key="selKey" :id="Math.random()" class="q-menu q-lg-icon"
     width="auto" @on-select="leftMenuSelect">
        
        <Menu-item :key="item.id" v-show="item.iconUrl" v-for="item in menuList | filterBy '1' in 'type'">
            <i class="iconfont" :class="item.iconUrl"></i>
            <span>{{item.menuName}}</span>
        </Menu-item>
       
    </Menu>
	
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
                default:'39'
            },
            activeMenu:{
                type:String,
                default:'50'
            },
            topMenu:{
                type:Number,
                default:1
            },
            pageSrc:{
                type:String,
                default:''
            },
            leftMenuAct:{
                type:String,
                default:''
            }
	  	},
        data(){
            return {
                userInfo:env==='development'?{userName:'TestName',type:1}:storage.session.get('userInfo'),
                menuList:[]
            }
        },
		ready(){
            //console.log('keys',this.topMenu,this.selKey);
            let _list=storage.session.get('menuList');
            //console.log(this.pageSrc);
            //顶部菜单，左侧菜单选择获取
            let keys=server.getForChild(_list,this.pageSrc);
            if(keys.topKey>0){
                this.topMenu=keys.topKey;
            }
            if(keys.leftKey>0){
                this.selKey=keys.leftKey;
            }
            //第三级页面，左侧菜单选中获取
            /*
            let leftKeys=server.getMenuKeyBySrc(_list,this.leftMenuAct);
            if(leftKeys.leftKey>0){
                this.selKey=leftKeys.leftKey;
            }
            */
            this.setMenuList(_list);
		},
		methods:{
            setMenuList(_list){
                if(_list.length>0){
                    let _menuList=[];
                    //console.log('11111',_list,this.topMenu);
                    _menuList=this.getBrother(_list,this.topMenu);
                    //console.log('2222',_menuList,this.topMenu);
                    this.menuList=_menuList;
                }
            },
            getBrother(list=[],parentKey=0){
               let retList=[]
               for(var i=0;i<list.length;i++){
                    if(parseInt(list[i].id)===parseInt(parentKey)){
                        if(list[i].children){
                            retList=list[i].children;
                        }else{
                            retList=[]
                        }
                        return retList;
                    }else if(list[i].children){
                       retList= this.getBrother(list[i].children,parentKey);
                    } 
               }
                return retList;
            },
            leftMenuSelect(key){
                //console.log(key);
                let _src=this.getMenuSrcById(this.menuList,key);
                if(this.userInfo.type===2){
                    switch(_src){
                        case '/waiting':
                            _src='/owner/waiting';
                            break;
                        case '/complete':
                            _src='/owner/complete';
                            break;
                        case '/order/list':
                            _src='/owner/order/list';
                            break;
                        case '/order/hq/ownerInfo':
                            _src='/order/ownerInfo';
                            break;
                    }
                }
                if(_src){
                    this.$router.go(_src);
                }
            },
            getMenuSrcById(list,key){
                let _src=null;
                list.forEach((item)=>{
                    if(parseInt(key)===parseInt(item.id)){
                        _src=item.src;
                    }
                })
                return _src;
            }
		}
	}
</script>