<style scoped lang="less">
	
	
</style>
<template>
    <l-header page-src="/user"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/pwd/update"></left-menu>
            </i-col>
            <i-col :span="spanRight">

                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
               	<br/>
                <div class="layout-content">
                	<i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="150">
                		<Form-item>
		            				
						        </Form-item>
	                	<Row>
	                		<i-col span="5">
		                    	
	                		</i-col>
	                		<i-col span="14" >
	 							
						        <Form-item label="旧密码" prop="oldPassWord">
		            				<i-input :value.sync="modelForm.oldPassWord" type="password" placeholder="请输入旧密码"></i-input>
							            
						        </Form-item>
						        <Form-item label="新密码" prop="newPassWord">
		            				<i-input :value.sync="modelForm.newPassWord" type="password" placeholder="请输入新密码"></i-input>
						        </Form-item>
						        <Form-item label="确定密码" prop="secondPassWord">
		            				<i-input :value.sync="modelForm.secondPassWord" type="password" placeholder="请再次输入新密码"></i-input>
						            
						        </Form-item>
						     </i-col>
	                		<i-col span="5">
		                    	
	                		</i-col>
	                	</Row>
	                	<Form-item>
						        	<div class="q-form-btn">
						            <i-button type="primary" size="large" @click="submit">保存</i-button>
						            <i-button type="ghost" size="large" @click="cancel">取消</i-button>
						            </div>
				        </Form-item>
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
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
	
	
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				breads:[{text:'首页',href:'/index#!/index'},{text:'修改密码',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{
					oldPassWord:'',//旧密码
					newPassWord:'',//新密码
					secondPassWord:''//确认密码
                },
                ruleValidate: {
                    oldPassWord: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' }
                    ],
                    newPassWord: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                    secondPassWord: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' }
                    ]
                }
			}
		},
		ready(){
			
		},
		methods:{
			submit(){
				let self=this;
				self.$Loading.start();
				server.updateMyPwd(self.modelForm).then((res)=>{
					self.$Loading.finish();
					if(res.success){
                        self.$Notice.success({
                            title:'密码修改成功',
                            desc:res.message
                        });
                        self.$router.go('/login')
                    }else{
                        self.$Notice.error({
                            title:'密码修改失败',
                            desc:res.message
                        });
                    }
				})
			},	
			cancel(){
				this.$router.go('/index');
				/*
				for (var item in this.modelForm) {
					this.modelForm[item]=''
				}
				*/
			}
		}
	}
</script>