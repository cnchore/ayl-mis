<style scoped lang="less">
	
	
</style>
<template>
	<Menu :active-key="activeKey"  width="auto" @on-select="handleSelect">
        
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
                产品介绍管理
            </Menu-item>
            <Menu-item key="1-4">
                <Icon type="document"></Icon>
                会员反馈管理
            </Menu-item>
       
            <Menu-item key="1-5">
                <Icon type="heart"></Icon>
                常见问题管理
            </Menu-item>
            <Menu-item key="1-6">
                <Icon type="heart-broken"></Icon>
                优惠券活动配置
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
</template>
<script>
	export default{
		props: {
	      activeKey:{
	        type:String,
	        default:'1-1'
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
                        this.$router.go('/feed/back');
                        break;
                    case '1-5':
                        this.$router.go('/help');
                        break;
                }
            }
		}
	}
</script>