<style scoped lang="less">
.layout .l-row .ivu-form .ivu-col
{
	
	min-height: 530px;
	
}
</style>
<template>
    <l-header active-key="5"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="5" active-key="5-1"></left-menu>
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
	                	<Row v-show="userInfo.type==1" class="q-info-row">
	                		<i-col span="12" >
	 							<Form-item label="门店名称：">
                          			<i-input :value.sync="modelForm.agentName" placeholder="请输入门店名称"></i-input>
						        </Form-item>
						        <Form-item label="账号：">
						        	<i-input :value.sync="modelForm.userName" placeholder="请输入账号"></i-input>
						        </Form-item>
						        <Form-item label="门店类型：">
						            	
						            	<Radio-group :model.sync="modelForm.isAgent">
						                <Radio value="true">
						                	<span>非直营</span>
						                </Radio>
						                <Radio value="false">
						                	<span>直营</span>
						                </Radio>
						            </Radio-group>
						        </Form-item>
			                   <Form-item label="是否开业：">
						            <Radio-group :model.sync="modelForm.status">
						                <Radio value="1">
						                	<span>已开业</span>
						                </Radio>
						                <Radio value="0">
						                	<span>未开业</span>
						                </Radio>
						            </Radio-group>
						        </Form-item>
						        <Form-item label="代理产品：">
						        	<Checkbox-group :model.sync="checkGroup">
								        <Checkbox :value="item.id" v-for="item in modelForm.productTypesList">
								        	<span>{{item.dicName}}</span>
								        </Checkbox>
								    </Checkbox-group>
						        </Form-item>
						        <Form-item label="所属地区：">
						        	<Cascader :data="addressData" @on-change="addrSelected" :value.sync="addressValue" trigger="hover"></Cascader>
						        </Form-item>
						        <Form-item label="门店地址：">
                          			<i-input :value.sync="modelForm.address" placeholder="请输入门店地址"></i-input>
						        </Form-item>
						     </i-col>
	                		<i-col span="12">
	                		
	                			<Form-item label="门店编号：">
                          			<i-input :value.sync="modelForm.agentCode" placeholder="请输入门店编号"></i-input>
						        </Form-item>
		                    	<Form-item label="联系人：">
                          			<i-input :value.sync="modelForm.contacter" placeholder="请输入联系人"></i-input>
						        </Form-item>
						        <Form-item label="手机号码：">
                          			<i-input :value.sync="modelForm.contactPhone" placeholder="请输入手机号码"></i-input>
						        </Form-item>
						        <Form-item label="性别：">
						            <Radio-group :model.sync="modelForm.sex">
						                <Radio value="true">
						                	<span>男</span>
						                </Radio>
						                <Radio value="false">
						                	<span>女</span>
						                </Radio>
						            </Radio-group>
						        </Form-item>
			                   <Form-item label="证件号：">
                          			<i-input :value.sync="modelForm.certificateNo" placeholder="请输入证件号"></i-input>
						        </Form-item>
						        <Form-item label="密码：">
                          			<i-input :value.sync="modelForm.pwd" type="password" placeholder="请输入密码"></i-input>
						        </Form-item>
						        <Form-item label="确认密码：">
                          			<i-input :value.sync="modelForm.confirmPwd" type="password" placeholder="请再次输入密码"></i-input>
						        </Form-item>
	                		</i-col>
	                	</Row>
	                	<Form-item>
				        	<div class="q-form-btn">
				            <i-button type="primary" :loading="subLoading" size="large" @click="submit">保存</i-button>
				            <i-button type="ghost" size="large" >取消</i-button>
				            </div>
				        </Form-item>
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
import server,{ storage }  from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
import chinaAddress from '../../components/china-address-0408'
	
	
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				breads:[{text:'首页',href:'/index'},{text:'经销商列表',href:'/agent/index'},{text:'编辑',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{productTypesList:[]},
                subLoading:false,
                addressData:chinaAddress,
                addressValue:[],
                checkGroup:[],
                userInfo:storage.session.get('userInfo'),
                id:null,

			}
		},
		route:{
            data:function(transition){
                if(transition.to.query &&transition.to.query.id){
                    let t=transition.to.query.id;
                    this.id=t;
                    
                }
            }
        },
		ready(){
			if(this.userInfo.type==2){
				this.$router.go('/index');
				return;
			}
			if(this.id){
				this.getList();

			}else{
				this.getDict();
			}
			
		},
		methods:{
			addrSelected(value,selectedData){
                //console.log(selectedData);
                if(selectedData.length>0){
                    this.modelForm.provinceId=selectedData[0].value;
                    this.modelForm.province=selectedData[0].label;
                    this.modelForm.cityId=selectedData[1].value;
                    this.modelForm.city=selectedData[1].label;
                    this.modelForm.areaId=selectedData[2].value;
                    this.modelForm.area=selectedData[2].label;
                }else{
                    this.modelForm.provinceId='';
                    this.modelForm.province='';
                    this.modelForm.cityId='';
                    this.modelForm.city='';
                    this.modelForm.areaId='';
                    this.modelForm.area='';
                }

            },
            getDict(){
            	//ProductCategory_bigType
            	let self=this;
				server.getDict('ProductCategory_bigType').then((res)=>{
					self.modelForm.productTypesList=[];
                    if(res.data.length>0){
                        res.data.forEach((item)=>{
                             self.modelForm.productTypesList.push({
                                id:item.id,
                                dicName:item.dicName
                            })
                        })
                        
                    }
                }) 
            },
			getList(){
				let self=this;
				self.$Loading.start();
				server.getAgentByid(self.id).then((res)=>{
					self.$Loading.finish();
					if(res.data){
						return server.jsonParse(res.data);
					}else{
						return null;
					}
                }).then((list)=>{
                	if(!list){
                		return;
                	}
					self.modelForm=list;
					self.addressValue=[];
					if(self.modelForm.provinceId){
                        self.addressValue.push(self.modelForm.provinceId);
                    }
                    if(self.modelForm.cityId){
                        self.addressValue.push(self.modelForm.cityId);
                    }
                    if(self.modelForm.areaId){
                        self.addressValue.push(self.modelForm.areaId);
                    }
                    if(self.modelForm.productTypesList){
                    	self.checkGroup=[];
                    	self.modelForm.productTypesList.forEach((item)=>{
                    		if(item.ck){
                    			self.checkGroup.push(item.id)
                    		}
                    	})
                    }
                   	self.modelForm.pwd='';
                   	self.modelForm.confirmPwd='';
                    if(self.modelForm.sex!=undefined){
                    	self.modelForm.sex=self.modelForm.sex.toString();
                    }
                    if(self.modelForm.isAgent!=undefined){
                    	self.modelForm.isAgent=self.modelForm.isAgent.toString();
                    }
                	
				})
			},
			
            submit(){
            	let self=this;
				self.subLoading=true;
            	if(self.checkGroup&&self.checkGroup.length>0&&self.modelForm.productTypesList){
            		self.modelForm.products='';
            		self.modelForm.productIds=self.checkGroup.join(',');
            		self.modelForm.productTypesList.forEach((item)=>{
            			self.checkGroup.forEach((ck)=>{
            				if(ck==item.id){
            					self.modelForm.products+=item.dicName+','
            				}
            			})
            		})

            	}
            	
				self.$Loading.start();
				if(self.id){
					//self.modelForm.userId=userInfo.id;
					server.updateAgent(self.modelForm).then((res)=>{
						self.$Loading.finish();
						if(res.success){
	                        self.$Notice.success({
	                            title:'修改成功',
	                            desc:res.message
	                        });
	                    }else{
	                        self.$Notice.error({
	                            title:'修改失败',
	                            desc:res.message
	                        });
	                    }
	                    self.subLoading=false;
					})
				}else{
					server.addAgent(self.modelForm).then((res)=>{
						self.$Loading.finish();
						if(res.success){
	                        self.$Notice.success({
	                            title:'新增成功',
	                            desc:res.message
	                        });
	                    }else{
	                        self.$Notice.error({
	                            title:'新增失败',
	                            desc:res.message
	                        });
	                    }
	                    self.subLoading=false;
					})
				}
				
            },
			
		}
	}
</script>