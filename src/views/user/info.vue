<style scoped lang="less">
	.q-right{
		text-align: right;
	} 
	.q-lg-btn{
		padding: 10px;
		i{
			font-size: 38px;
		}
		
	}
	
</style>
<template>
    <l-header active-key="0"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="0" active-key="0-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">

                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
               	<br/>
                <div class="layout-content">
                	<i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="150">
                		<Form-item >
							 <div class="q-right q-lg-btn">
							 	<i class="iconfont icon-bianji btn" title="编辑" @click="edit"></i>
							 </div>       
						</Form-item>
	                	<Row>
	                		<i-col span="12" >
	 							<Form-item label="门店名称">
							            
						        </Form-item>
						        <Form-item label="账号">
						        </Form-item>
						        <Form-item label="门店类型">
						            
						        </Form-item>
			                   <Form-item label="是否开业">
						            
						        </Form-item>
						        <Form-item label="代理产品">
							            
						        </Form-item>
						        <Form-item label="所属地区">
						        </Form-item>
						        <Form-item label="门店地址">
						            
						        </Form-item>
						     </i-col>
	                		<i-col span="12">
		                    	<Form-item label="联系人">
							            
						        </Form-item>
						        <Form-item label="手机号码">
						        </Form-item>
						        <Form-item label="电话">
						            
						        </Form-item>
			                   <Form-item label="邮箱">
						            
						        </Form-item>
	                		</i-col>
	                	</Row>
                     </i-form>
                </div>
                <div class="layout-copy">
                    版权所有 &copy; 2017.艾臣智能门窗科技有限公司.
                </div>
            </i-col>
        </Row>
        
    </div>
</template>
<script>
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
	
	
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				breads:[{text:'首页',href:'/index#!/index'},{text:'基本信息',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                
			}
		},
		ready(){
			
		},
		methods:{
			edit(){
				this.$router.go('/info/edit')
			}
		}
	}
</script>