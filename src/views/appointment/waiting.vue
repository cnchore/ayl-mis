<style scoped lang="less">
	
</style>
<template>
    <l-header active-key="3"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="3" active-key="3-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="modelShow" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">名称/电话</span>
                                <i-input :value.sync="seachForm.nameOrPhoneLike"  placeholder="请输入名称或电话" ></i-input>
                            </div>
                        </Form-item>
                        
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">区域</span>
                                <i-input :value.sync="seachForm.addressLike"  placeholder="请输入区域" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item>
                            <i-button type="ghost" icon="search" @click="search('formInline')">搜索</i-button>
                        </Form-item>
                        
                    </i-form>
                </div>
                <div class="layout-content" >
                    <i-table :content="self" :columns="tableCol" :data="tableData"></i-table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="rowsTotal" show-total show-elevator :current.sync="pageIndex" @on-change="changePage"></Page>
                        </div>
                    </div>
                </div>
                <div class="layout-copy">
                    版权所有 &copy; 2017.艾臣家居科技有限公司.
                </div>
            </i-col>
        </Row>
        <Modal
	        :visible.sync="modalVisible"
	        title="新增／修改"
	        @on-ok="modelSubmit"
	        width=800
	        
			:mask-closable="false"
	        >
	        <i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="130">
		        <Row>
		        <i-col span="24">
		        	 <Form-item label="流水单号">
		            {{modelForm.billCode}}
		        </Form-item>
		        </i-col>
		        <i-col span="12">
		       
		        <Form-item label="预约人姓名" prop="name">
		            <i-input :value.sync="modelForm.name" placeholder="请输入姓名"></i-input>
		        </Form-item>
		        <Form-item label="上门量尺时间" prop="">
		           <Date-picker type="datetime" :value="modelForm.homeTime" format="yyyy-MM-dd HH:mm:ss" @on-change="homeTimeDateChange"  placeholder="选择时间"></Date-picker>
		        </Form-item>
		        <Form-item label="上门设计师" prop="">
		            <i-input :value.sync="modelForm.designer" placeholder="请输入上门设计师"></i-input>
		        </Form-item>
		        <Form-item label="装修项目" prop="">
		            <Checkbox-group :model.sync="decorateCkList">
				        <Checkbox :value="item.id" v-for="item in decorateList">
				        	<span>{{item.dicName}}</span>
				        </Checkbox>
				    </Checkbox-group>
		        </Form-item>
		        <Form-item label="所属代理商" prop="byAgent">
		            <i-select :model.sync="agentListCk">
				        <i-option v-for="item in agentList" :value="item.id">{{ item.agentName }}</i-option>
				    </i-select>
		        </Form-item>
				</i-col>
				<i-col span="12">
				
		        <Form-item label="预约人手机" prop="mobilePhone">
		            <i-input :value.sync="modelForm.mobilePhone" placeholder="请输入手机号码"></i-input>
		        </Form-item>
		        <Form-item label="预计装修时间" prop="">
		           <Date-picker type="date" :value="modelForm.decoratingTime" format="yyyy-MM-dd" @on-change="decoratingDateChange"  placeholder="选择时间"></Date-picker>
		        </Form-item>
		        <Form-item label="上门设计师电话">
		            <i-input :value.sync="modelForm.designerPhone" placeholder="请输入电话"></i-input>
		        </Form-item>
		        <Form-item label="工程预算" >
		        	 <i-select :model.sync="modelForm.budgetRange">
				        <i-option v-for="item in budgetRangeList" :value="item.dicName">{{ item.dicName }}</i-option>
				    </i-select>
		        </Form-item>
		        <Form-item label="所在城市" prop="addressValue">
		            <Cascader :data="addressData" @on-change="addrSelected" :value.sync="addressValue" trigger="hover"></Cascader>
		        </Form-item>
				</i-col>
				</Row>
		        <Form-item label="装修地址" prop="address">
		            <i-input :value.sync="modelForm.address" placeholder="请输入地址"></i-input>
		        </Form-item>
		        <Form-item label="说明">
		            <i-input :value.sync="modelForm.remark" type="textarea" :rows="3" placeholder="请输入说明"></i-input>
		        </Form-item>
		    </i-form>
		    <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">取消</i-button>
                <i-button type="primary" size="large" :loading="modelLoading" @click="modelSubmit">保存</i-button>
                <i-button type="primary" size="large" :loading="modelLoading" @click="modelSave" >提交</i-button>
            </div>
	    </Modal>
    </div>
</template>
<script>
import server,{storage} from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
import chinaAddress from '../../components/china-address-0408'

	Array.prototype.unique = function () {
		var newArr = [];
		for (var i = 0; i < this.length; i++) {
			if (newArr.indexOf(this[i]) == -1) {
				newArr.push(this[i]);
			}
		}
		return newArr;
	}

	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				breads:[{text:'首页',href:'/index'},{text:'预约管理',href:'/waiting'},{text:'待办事项',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				modalVisible:false,
				seachForm:{
					stateType:1
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{
         
                },
                addressData:chinaAddress,
                addressValue:[],
                decorateCkList:[],
                decorateList:[],
                agentListCk:[],
                agentList:[],
                budgetRangeList:[],
                modeRule:{
                	title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                    ]
                },
                modelLoading:false,
				tableCol: [
				{	
					key:'billCode',title:'预约单号',width:200
				},
				{
					key:'name',title:'客户名称',width:95
				},
				{
					key:'mobilePhone',title:'客户电话',width:125
				},
				{
					title:'客户地址',width:400,
					render(row){
						return `${row.province}${row.city}${row.area}${row.address?row.address:''}`;
					}
				},
				{
					width:140,key:'state',title:'当前阶段',

					render(row,column,index){
						return `{{getStatusName(${row.state})}}`;
					}
				},
				{
					key:'dealer',title:'发送人',width:95
				},
				
				{
					key:'appointDate',title:'预约时间',width:170
				},
				{
					key:'updateTime',title:'接收时间',width:170
				},
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:135,
					align: 'center',
					render (row, column, index) {
					return `
                        <i class="iconfont icon-bianji btn" title="编辑" @click="modelShow(${row.id})"></i>
                        <i class="iconfont icon-fasong btn" title="提交" @click="nextAppoint(${row.id})"></i>
                        <i class="iconfont icon-shanchu btn" title="删除" @click="del(${row.id})"></i>
					`;
					}   
				}],
				id:null
			}
		},
		ready(){
			let userInfo=storage.session.get('userInfo');
			if(userInfo&&userInfo.type!=1){
				this.$router.go('/index');
				return;
			}
			this.getList();
			this.getDict();
			this.getAgentList();
			if(this.id){
				this.modelShow(this.id);
			}
		},
		route:{
            data:function(transition){
                if(transition.to.query &&transition.to.query.id){
                    this.id=transition.to.query.id;
                }
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
                    this.modelForm.cityCode=selectedData[2].code;
                }else{
                    this.modelForm.provinceId='';
                    this.modelForm.province='';
                    this.modelForm.cityId='';
                    this.modelForm.city='';
                    this.modelForm.areaId='';
                    this.modelForm.area='';
                    this.modelForm.cityCode='';
                }

            },
            getStatusName(v){
            	
                switch(v){
                	case 0:
                	return "取消作废";
                    case 1:
                    return "预约处理";
                    case 2:
                    return "待设计报价";
                    case 3:
                    return "待确认";
                    case 31:
                	return "待重新设计报价";
                    case 4:
                    return "待下单";
                    case 5:
                    return "待总部确认";
                    case 6:
                    return "总部确认";
                }
            },
            getAgentList(){
            	let self=this;
            	server.getAgentAll({}).then((res)=>{
            		self.agentList=[];
                    if(res.data&&res.data.length>0){
                        res.data.forEach((item)=>{
                             self.agentList.push({
                             	id:item.userId,
                                agentName:item.agentName
                            })
                        })
                        
                    }
            	})
            },
            getDict(){
            	//ProductCategory_bigType
            	let self=this;
				server.getDict('ProductIntroduceCategory_Item').then((res)=>{
					self.decorateList=[];
                    if(res.data&&res.data.length>0){
                        res.data.forEach((item)=>{
                             self.decorateList.push({
                             	id:item.id,
                                dicName:item.dicName
                            })
                        })
                        
                    }
                })
                server.getDict('budgetRange_item').then((res)=>{
                	self.budgetRangeList=[];
                	if(res.data&&res.data.length>0){
                        res.data.forEach((item)=>{
                             self.budgetRangeList.push({
                                dicName:item.dicName
                            })
                        })
                        
                    }
                }) 
            },
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                
                _list.page=page;
                _list.rows=rows;
                server.getAppointmentList(_list).then((res)=>{
                    self.$Loading.finish();
                    if(res.data&&res.data.rowsObject){
	                    self.tableData=res.data.rowsObject;
	                    self.rowsTotal=res.data.total;
	                }
                })
            },
			
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,10);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,10);
			},

			modelShow(id=null){
				let self=this;
				self.agentListCk='';
            	self.decorateCkList=[];
            	self.addressValue=[];
				if(id){
					self.$Loading.start();
	                server.getAppointByid(id).then((res)=>{
	                	self.$Loading.finish();
	                    if(res.success){
	                        self.modelForm=res.data.appointmentVo;
	                        if(self.modelForm.provinceId){
		                        self.addressValue.push(self.modelForm.provinceId);
		                    }
		                    if(self.modelForm.cityId){
		                        self.addressValue.push(self.modelForm.cityId);
		                    }
		                    if(self.modelForm.areaId){
		                        self.addressValue.push(self.modelForm.areaId);
		                    }
		                    if(self.modelForm.decorateProjectTypes){

		                    	let ckList=self.modelForm.decorateProjectTypes.split(',');
		                    	ckList.forEach((item)=>{
		                    		self.decorateCkList.push(parseInt(item));
		                    	})

		                    }
		                    if(self.modelForm.byAgentUserId){
		                    	self.agentListCk=self.modelForm.byAgentUserId;
		                    }
	                        self.modalVisible=true;
	                    }else{
	                        self.modelForm={};
	                    }
	                })
            	}else{
            		self.modelForm={};
            		
            		self.modalVisible=true;
            	}
			},
			modelSubmit(){
				let self=this;
				self.modelLoading=true;
				if(self.agentListCk){
					self.modelForm.byAgentUserId=self.agentListCk;
					self.agentList.forEach((item)=>{
						if(self.agentListCk==item.id){
							self.modelForm.byAgent=item.agentName;
						}

					})
				}
				if(self.decorateCkList.length>0){
					self.modelForm.decorateProjectTypes=self.decorateCkList.unique().join(',');

					self.modelForm.decorateProject='';
					self.decorateList.forEach((item)=>{
						self.decorateCkList.forEach((ck)=>{
							if(ck===item.id){
								self.modelForm.decorateProject+=item.dicName+',';
							}
						})
						
					})
				}
				if(self.modelForm.id){
					server.saveAppoint(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'保存成功',
	                            desc:res.message
	                        });
	                        self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'保存失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}else{
	                server.addAppoint(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'保存成功',
	                            desc:res.message
	                        });
	                        self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'保存失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}

			},
			del(id){
				let self=this;
				self.$Modal.confirm({
                    onOk:function(){
                       server.delAppoint(id).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'删除成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,10);
		                    }else{
		                        self.$Notice.error({
		                            title:'删除失败',
		                            desc:res.message
		                        });
		                    }
		                }) 
                    },
                    content:'删除操作，将把该预约单移至废弃箱，可从废弃箱中恢复,是否确定废弃？'
                })
                
			},
			modelSave(){
				let self=this;
				self.modelLoading=true;
				if(self.agentListCk){
					self.modelForm.byAgentUserId=self.agentListCk;
					self.agentList.forEach((item)=>{
						if(self.agentListCk==item.id){
							self.modelForm.byAgent=item.agentName;
						}

					})
				}
				if(self.decorateCkList.length>0){
					self.modelForm.decorateProjectTypes=self.decorateCkList.join(',');
					self.modelForm.decorateProject='';
					self.decorateList.forEach((item)=>{
						self.decorateCkList.forEach((ck)=>{
							if(ck==item.id){
								self.modelForm.decorateProject+=item.dicName+',';
							}
						})
						
					})
				}
				self.modelForm.isOnlySave=false;
				if(self.modelForm.id){
					server.saveAppoint(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'提交成功',
	                            desc:res.message
	                        });
	                        self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'提交失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}else{
	                server.addAppoint(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'提交成功',
	                            desc:res.message
	                        });
	                        self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'提交失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}
			},
			nextAppoint(id){
				let self=this;
				self.$Modal.confirm({
                    onOk:function(){
                       server.nextAppoint(id).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'提交成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,10);
		                    }else{
		                        self.$Notice.error({
		                            title:'提交失败',
		                            desc:res.message
		                        });
		                    }
		                }) 
                    },
                    content:'您确认提交给下一步吗？'
                })
			},
            decoratingDateChange(e){
            	this.modelForm.decoratingTime=e;
            },
            homeTimeDateChange(e){
            	this.modelForm.homeTime=e;
            }
		}
	}
</script>