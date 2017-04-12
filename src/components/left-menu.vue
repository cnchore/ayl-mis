<style scoped lang="less">
	
	
</style>
<template>
	<Menu :active-key="activeKey" v-show="activeMenu==='1'" width="auto" @on-select="handleSelect">
        
            <Menu-item key="1-1">
                <Icon type="document-text"></Icon>
                门店展示管理
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
    <Menu :active-key="activeKey" v-show="activeMenu==='2'" width="auto" @on-select="handleSelect">
        
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
                公共发布管理
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
                }
            }
		}
	}
</script>