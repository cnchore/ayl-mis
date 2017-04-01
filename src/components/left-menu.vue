<style scoped lang="less">
	
	
</style>
<template>
	<Menu :active-key="activeKey" theme="dark" width="auto" @on-select="handleSelect">
        <div class="layout-logo-left"></div>
        <Menu-group title="安居艾臣">
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
                优惠券活动配置
            </Menu-item>
        </Menu-group>
        <Menu-group title="统计分析">
            <Menu-item key="2-1">
                <Icon type="heart"></Icon>
                用户留存
            </Menu-item>
            <Menu-item key="2-2">
                <Icon type="heart-broken"></Icon>
                流失用户
            </Menu-item>
        </Menu-group>
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
                        this.$router.go('/index');
                        break;
                    case '1-2':
                        this.$router.go('/news');
                        break;
                    case '1-3':
                        this.$router.go('/product');
                        break;
                }
            }
		}
	}
</script>