<style scoped lang="less">
	
	
</style>
<template>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='0'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="0-1">
                <Icon type="document-text"></Icon>
                <span>基本信息</span>
            </Menu-item>
            <Menu-item key="0-2">
                <Icon type="document"></Icon>
                修改密码
            </Menu-item>
            <Menu-item key="0-3">
                <Icon type="document"></Icon>
                备忘录
            </Menu-item>
       
    </Menu>
	<Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='1'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="1-1">
                <Icon type="document-text"></Icon>
                <span>门店展示管理</span>
            </Menu-item>
            <Menu-item key="1-2">
                <Icon type="document"></Icon>
                艾臣资讯管理
            </Menu-item>
            <Menu-item key="1-3">
                <Icon type="document"></Icon>
                产品介绍
            </Menu-item>
            <Menu-item key="1-4">
                <Icon type="document"></Icon>
                意见反馈管理
            </Menu-item>
       
            <Menu-item key="1-5">
                <Icon type="heart"></Icon>
                常见问题管理
            </Menu-item>
            <Menu-item key="1-6">
                <Icon type="heart-broken"></Icon>
                优惠活动发布
            </Menu-item>
            <Menu-item key="1-7">
                <Icon type="heart-broken"></Icon>
                优惠券明细配置
            </Menu-item>
            <Menu-item key="1-8">
                <Icon type="heart-broken"></Icon>
                领取礼品管理
            </Menu-item>
       
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon" 
    v-show="activeMenu==='2'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="2-1">
                <Icon type="document-text"></Icon>
                合伙人账号管理
            </Menu-item>
            <Menu-item key="2-2">
                <Icon type="document"></Icon>
                现金券配置管理
            </Menu-item>
            <Menu-item key="2-3">
                <Icon type="document"></Icon>
                现金券申请管理
            </Menu-item>
            <Menu-item key="2-4">
                <Icon type="document"></Icon>
                现金券使用情况管理
            </Menu-item>
       
            <Menu-item key="2-5">
                <Icon type="heart"></Icon>
                公告发布管理
            </Menu-item>
            <Menu-item key="2-6">
                <Icon type="heart-broken"></Icon>
                申诉管理
            </Menu-item>
            <Menu-item key="2-7">
                <Icon type="heart-broken"></Icon>
                分红管理
            </Menu-item>
            
       
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='3'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="3-1">
                <Icon type="document-text"></Icon>
                <span>待办事项</span>
            </Menu-item>
            <Menu-item key="3-2">
                <Icon type="document"></Icon>
                已办事项
            </Menu-item>
            <Menu-item key="3-3">
                <Icon type="document"></Icon>
                预约废弃箱
            </Menu-item>
       
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='10'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="10-1">
                <Icon type="document-text"></Icon>
                <span>待办事项</span>
            </Menu-item>
            <Menu-item key="10-2">
                <Icon type="document"></Icon>
                已办事项
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='4'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="4-1">
                <Icon type="document-text"></Icon>
                <span>订单管理</span>
            </Menu-item>
            <Menu-item key="4-2">
                <Icon type="document"></Icon>
                客户管理
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='11'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="11-1">
                <Icon type="document-text"></Icon>
                <span>订单管理</span>
            </Menu-item>
            <Menu-item key="11-2">
                <Icon type="document"></Icon>
                客户管理
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='5'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="5-1">
                <Icon type="document-text"></Icon>
                <span>经销商管理</span>
            </Menu-item>
            
    </Menu>
    <Menu :active-key="activeKey" class="q-menu q-lg-icon"
    v-show="activeMenu==='9'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="9-1">
                <Icon type="document-text"></Icon>
                <span>人员管理</span>
            </Menu-item>
            
    </Menu>
</template>
<script>
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

                }
            }
		}
	}
</script>