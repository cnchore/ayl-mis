<style scoped lang="less">
	
	
</style>
<template>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='0'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="0-1">
                <i class="iconfont icon-zhanghaoxinxi"></i>
                <span>基本信息</span>
            </Menu-item>
            <Menu-item key="0-2">
                <i class="iconfont icon-xiugaimima"></i>
                修改密码
            </Menu-item>
            <Menu-item key="0-3" v-if="userInfo.roleName!='自助学习'">
                <i class="iconfont icon-beiwanglu"></i>
                备忘录
            </Menu-item>
       
    </Menu>
	<Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='1'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="1-1" v-if="userInfo.type===1">
                <i class="iconfont icon-mendianzhanshiguanli"></i>
                <span>门店展示管理</span>
            </Menu-item>
            <Menu-item key="1-2" v-if="userInfo.type===1">
                <i class="iconfont icon-zixunguanli-tishi"></i>
                艾臣资讯管理
            </Menu-item>
            <Menu-item key="1-3" v-if="userInfo.type===1">
                <i class="iconfont icon-chanpinjieshao"></i>
                产品介绍
            </Menu-item>
            <Menu-item key="1-4" v-if="userInfo.type===1">
                <i class="iconfont icon-yijianfankuiguanli"></i>
                意见反馈管理
            </Menu-item>
       
            <Menu-item key="1-5" v-if="userInfo.type===1">
                <i class="iconfont icon-changjianwentiguanli"></i>
                常见问题管理
            </Menu-item>
            <Menu-item key="1-6">
                <i class="iconfont icon-youhuihuodongfabu"></i>
                优惠活动发布
            </Menu-item>
            <Menu-item key="1-7" v-if="userInfo.type===1">
                <i class="iconfont icon-youhuiquanmingxipeizhi"></i>
                优惠券明细配置
            </Menu-item>
            <Menu-item key="1-8" v-if="userInfo.type===1">
                <i class="iconfont icon-lingqulipinguanli"></i>
                领取礼品管理
            </Menu-item>
       
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon" 
    v-if="activeMenu==='2'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="2-1" v-if="userInfo.type===1">
                <i class="iconfont icon-hehuorenzhanghaoguanli1"></i>
                合伙人账号管理
            </Menu-item>
            <Menu-item key="2-2" v-if="userInfo.type===1">
                <i class="iconfont icon-xianjinquanpeizhi"></i>
                现金券配置
            </Menu-item>
            <Menu-item key="2-3" v-if="userInfo.type===1">
                <i class="iconfont icon-xianjinquanshenqingguanli"></i>
                现金券申请
            </Menu-item>
            <Menu-item key="2-4" v-if="userInfo.type===1">
                <i class="iconfont icon-xianjinquanshiyongqingkuang"></i>
                现金券使用情况
            </Menu-item>
       
            <Menu-item key="2-5" v-if="userInfo.type===1">
                <i class="iconfont icon-gonggaofabuguanli1"></i>
                公告发布管理
            </Menu-item>
            <Menu-item key="2-6" v-if="userInfo.type===1">
                <i class="iconfont icon-shensuguanli_icon"></i>
                申诉管理
            </Menu-item>
            <Menu-item key="2-7">
                <i class="iconfont icon-fenhongguanli1"></i>
                分红管理
            </Menu-item>
            
       
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='3'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="3-1">
                <i class="iconfont icon-daiban"></i>
                <span>待办事项</span>
            </Menu-item>
            <Menu-item key="3-2">
                <i class="iconfont icon-mendian"></i>
                已办事项
            </Menu-item>
            <Menu-item key="3-3">
                <i class="iconfont icon-shanchu"></i>
                预约废弃箱
            </Menu-item>
       
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='10'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="10-1">
                <i class="iconfont icon-daiban"></i>
                <span>待办事项</span>
            </Menu-item>
            <Menu-item key="10-2">
                <i class="iconfont icon-mendian"></i>
                已办事项
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='4'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="4-1">
                <i class="iconfont icon-dingdanguanli"></i>
                <span>订单管理</span>
            </Menu-item>
            <Menu-item key="4-2">
                <i class="iconfont icon-kehuguanli"></i>
                客户管理
            </Menu-item>
            <Menu-item key="4-3">
                <i class="iconfont icon-dingdan1"></i>
                订单状态修改
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='11'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="11-1">
                <i class="iconfont icon-dingdanguanli"></i>
                <span>订单管理</span>
            </Menu-item>
            <Menu-item key="11-2">
                <i class="iconfont icon-kehuguanli"></i>
                客户管理
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='5'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="5-1">
                <i class="iconfont icon-mendian"></i>
                <span>经销商管理</span>
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='9'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="9-1">
                <i class="iconfont icon-kehu"></i>
                <span>人员管理</span>
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-if="activeMenu==='12'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="12-1">
                <i class="iconfont icon-chanpinmaidian"></i>
                <span>产品卖点</span>
            </Menu-item>
            <Menu-item key="12-2">
                <i class="iconfont icon-xitongjieshao"></i>
                <span>系统介绍</span>
            </Menu-item>
            <Menu-item key="12-3">
                <i class="iconfont icon-anzhuangshouhou"></i>
                <span>安装售后</span>
            </Menu-item>
            <Menu-item key="12-4">
                <i class="iconfont icon-yunyingtixi"></i>
                <span>运营体系</span>
            </Menu-item>
            
    </Menu>
</template>
<script>
import server,{ storage } from '../libs/server'
import env from '../config/env';
    export default{
		props: {
	      activeKey:{
	        type:String,
	        default:'1-1'
	      },
          activeMenu:{
            type:String,
            default:'1'
          }
	  	},
        data(){
            return {
                userInfo:env==='development'?{userName:'TestName',type:1}:storage.session.get('userInfo')

            }
        },
		ready(){

		},
		methods:{
			handleSelect(key){
                //this.$Message.info(key);
                switch(key){
                    case '0-1':
                        this.$router.go('/info');
                        break;
                    case '0-2':
                        this.$router.go('/pwd/update');
                        break;
                    case '0-3':
                        this.$router.go('/memo');
                        break;
                	case '1-1':
                        this.$router.go('/store');
                        break;
                    case '1-2':
                        this.$router.go('/news');
                        break;
                    case '1-3':
                        this.$router.go('/product');
                        break;
                    case '1-4':
                        this.$router.go('/feed/back?t=4');
                        break;
                    case '1-5':
                        this.$router.go('/help');
                        break;
                    case '1-6':
                        this.$router.go('/coupon');
                        break;
                    case '1-7':
                        this.$router.go('/coupon/details');
                        break;
                    case '1-8':
                        this.$router.go('/gift/send');
                        break;

                    case '2-1':
                        this.$router.go('/partner/account');
                        break;
                    case '2-2':
                        this.$router.go('/coupon/config');
                        break;
                    case '2-3':
                        this.$router.go('/coupon/apply');
                        break;
                    case '2-4':
                        this.$router.go('/partner/coupon');
                        break;
                    case '2-5':
                        this.$router.go('/notice');
                        break;
                    case '2-6':
                        this.$router.go('/feed/back?t=5');
                        break;
                    case '2-7':
                        this.$router.go('/partner/bonus');
                        break;

                    case '3-1':
                        this.$router.go('/waiting');
                        break;
                    case '3-2':
                        this.$router.go('/complete');
                        break;
                    case '3-3':
                        this.$router.go('/trash');
                        break;
                    case '10-1':
                        this.$router.go('/owner/waiting');
                        break;
                    case '10-2':
                        this.$router.go('/owner/complete');
                        break;

                    case '4-1':
                        this.$router.go('/order/list');
                        break;
                    case '4-2':
                        this.$router.go('/order/hq/ownerInfo');
                        break;
                    case '4-3':
                        this.$router.go('/order/state/change');
                        break;
                    case '11-1':
                        this.$router.go('/owner/order/list');

                        break;
                    case '11-2':
                        this.$router.go('/order/ownerInfo');
                        break;

                    case '5-1':
                        this.$router.go('/agent/index');
                        break;

                    case '9-1':
                        this.$router.go('/staff');
                        break;
                    //自助学习
                    case '12-1':
                        this.$router.go('/study/product/point');
                        break;
                    case '12-2':
                        this.$router.go('/study/sys/introduce');
                        break;
                    case '12-3':
                        this.$router.go('/study/customer/service');
                        break;
                    case '12-4':
                        this.$router.go('/study/operating/system');
                        break;

                }
            }
		}
	}
</script>