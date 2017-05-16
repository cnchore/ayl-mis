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
    <l-header page-src="/user"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/info"></left-menu>
            </i-col>
            <i-col :span="spanRight">

                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
               	<br/>
                <div class="layout-content">
                	<i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="150">
                		<Form-item v-if="getAction('编辑')">
							 <div class="q-right q-lg-btn">
							 	<i class="iconfont icon-bianji btn" title="编辑" @click="edit"></i>
							 </div>       
						</Form-item>
						<Row v-if="userInfo.type==1">
							<i-col span="12" >
								<Form-item label="用户名：">
							           {{userInfo.userName}} 
						        </Form-item>
						        <Form-item label="性别：">
							           {{loginerInfo.sex?'男':'女'}} 
						        </Form-item>
						        <Form-item label="组织部门：">
							           {{loginerInfo.orgName}} 
						        </Form-item>
						        <Form-item label="固定电话：">
							           {{loginerInfo.fixedPhone}} 
						        </Form-item>
						        <Form-item label="QQ号码：">
							           {{loginerInfo.qq}} 
						        </Form-item>
							</i-col>
							<i-col span="12" >
								<Form-item label="姓名：">
							           {{loginerInfo.realName}} 
						        </Form-item>
						        <Form-item label="出生日期：">
							           {{loginerInfo.birthdayStr}} 
						        </Form-item>
						        
						        <Form-item label="移动电话：">
							           {{loginerInfo.mobilePhone}} 
						        </Form-item>
						        <Form-item label="电子邮箱：">
							           {{loginerInfo.email}} 
						        </Form-item>
							</i-col>
						</Row>
	                	<Row v-show="userInfo.type==2">
	                		<i-col span="12" >
	 							<Form-item label="门店名称：">
							           {{loginerInfo.agentName}} 
						        </Form-item>
						        <Form-item label="账号：">
						        		{{userInfo.userName}}
						        </Form-item>
						        <Form-item label="门店类型：">
						            	{{loginerInfo.isAgent?'非直营':'直营'}}
						        </Form-item>
			                   <Form-item label="是否开业：">
						            	{{loginerInfo.status==1?'已开业':'未开业'}}
						        </Form-item>
						        <Form-item label="代理产品：">
							            {{loginerInfo.products}}
						        </Form-item>
						        <Form-item label="所属地区：">
						        		{{loginerInfo.province}}{{loginerInfo.city}}{{loginerInfo.area}}
						        </Form-item>
						        <Form-item label="门店地址：">
						            	{{loginerInfo.address}}
						        </Form-item>
						     </i-col>
	                		<i-col span="12">
		                    	<Form-item label="联系人：">
							            {{loginerInfo.contacter}}
						        </Form-item>
						        <Form-item label="手机号码：">
						        	{{loginerInfo.contactPhone}}
						        </Form-item>
						        <Form-item label="性别：">
						            {{loginerInfo.sex?'男':'女'}}
						        </Form-item>
			                   <Form-item label="证件号：">
						            {{loginerInfo.certificateNo}}
						        </Form-item>
	                		</i-col>
	                	</Row>
                     </i-form>
                </div>
                <div class="layout-copy">
                    版权所有 &copy; 2017.艾臣家居科技有限公司.
                </div>
            </i-col>
        </Row>
        
    </div>
</template>
<script>
import server,{ storage }  from '../../libs/server'
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
                menuActList:server.getMenuActionList('/info'),
                userInfo:storage.session.get('userInfo'),
                loginerInfo:{}
			}
		},
		ready(){
			this.getList();
		},
		methods:{
			getAction(name=''){
				var	l=this.menuActList.filter((item)=>item.menuName===name).length;
				if(l>0){
					return true;
				}
				return false;
			},
			getList(){
				let self=this;
				self.$Loading.start();
				server.getLoginerInfo().then((res)=>{
					self.$Loading.finish();
					if(!res.data){
						self.loginerInfo={}
					}else{
						self.loginerInfo=res.data;
					}
				})
			},
			edit(){
				this.$router.go('/info/edit')
			}
		}
	}
</script>