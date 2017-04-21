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
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="modelShow" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">客户名称</span>
                                <i-input :value.sync="seachForm.titleLike"  placeholder="请输入名称" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">客户电话</span>
                                <i-input :value.sync="seachForm.titleLike"  placeholder="请输入电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">区域</span>
                                <i-input :value.sync="seachForm.titleLike"  placeholder="请输入区域" ></i-input>
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
                    版权所有 &copy; 2017.艾臣智能门窗科技有限公司.
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
		        <i-col span="12">
		        <Form-item label="流水单号" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="预约人姓名" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="上门量尺时间" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="上门时间" prop="title">
		            <Date-picker type="date" :value="seachForm.publishTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择时间"></Date-picker>
		        </Form-item>
		        <Form-item label="装修项目" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="所属代理商" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
				</i-col>
				<i-col span="12">
				<Form-item label="&nbsp;">
		        </Form-item>
		        <Form-item label="预约人手机" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="预计装修时间" prop="title">
		           <Date-picker type="date" :value="seachForm.publishTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择时间"></Date-picker>
		        </Form-item>
		        <Form-item label="上门设计师电话" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="工程预算" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="所在城市" prop="title">
		            <Cascader :data="addressData" @on-change="addrSelected" :value.sync="addressValue" trigger="hover"></Cascader>
		        </Form-item>
				</i-col>
				</Row>
		        <Form-item label="装修地址" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="说明" prop="content">
		            <i-input :value.sync="modelForm.content" type="textarea" :rows="3" placeholder="请输入公告内容"></i-input>
		        </Form-item>
		    </i-form>
		    <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">取消</i-button>
                <i-button type="primary" size="large" :loading="modelLoading" @click="modelSubmit">确定</i-button>
            </div>
	    </Modal>
    </div>
</template>
<script>
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
import chinaAddress from '../../components/china-address-0408'
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				modalVisible:false,
				seachForm:{
					stateType:2
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{},
                addressData:chinaAddress,
                addressValue:[],
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
					key:'billCode',title:'预约单号',width:250
				},
				{
					key:'name',title:'客户名称',width:120
				},
				{
					key:'mobilePhone',title:'客户电话',width:130
				},
				{
					title:'客户地址',className:'l-m-min-width l-ellipsis',
					render(row){
						return `${row.province}${row.city}${row.area}${row.address}`;
					}
				},
				{
					width:100,key:'state',title:'当前阶段',

					render(row,column,index){
						return `{{getStatusName(${row.state})}}`;
					}
				},
				{
					key:'dealer',title:'发送人',width:120
				},
				
				{
					key:'appointDate',title:'预约时间',width:200
				},
				{
					key:'updateTime',title:'接受时间',width:200
				},
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:200,
					align: 'center',
					render (row, column, index) {
					return `
						
						<i-button type="primary" 
							v-show="${row.state}==0"
							@click="updateState(${row.id},'您确认发布吗？')"
							 size="small">发布</i-button>

						<i-button type="primary"
							v-show="${row.state}==1" 
							@click="updateState(${row.id},'您确认结束发布吗？')"
							 size="small">结束发布</i-button>

						<i-button type="primary" v-show="${row.state}==0"  icon="edit" @click="modelShow(${row.id})" size="small">修改</i-button>
						
						<i-button type="primary"
							v-show="${row.state}==0" 
							@click="del(${row.id})"
							 icon="ios-trash" size="small">删除</i-button>

					`;
					}   
				}]
			}
		},
		ready(){
			this.getList();
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
                    return "草稿";
                    case 1:
                    return "发布";
                    case 2:
                    return "结束发布";
                }
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

			modelShow(id){
				let self=this;
				if(id){
					self.$Loading.start();
	                server.getNoticeByid(id).then((res)=>{
	                	self.$Loading.finish();
	                    if(res.success){
	                        self.modelForm=res.data;
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
				if(self.modelForm.id){
					server.updateNotice(self.modelForm).then((res)=>{
						self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'修改成功',
	                            desc:res.message
	                        });
							self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'修改失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}else{
	                server.addNotice(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'新增成功',
	                            desc:res.message
	                        });
	                        self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'新增失败',
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
                       server.delNotice(id).then((res)=>{
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
                    content:'您确认删除这条内容吗？'
                })
                
			},
			updateState(id,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.publishNotice(id).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,10);
		                    }else{
		                        self.$Notice.error({
		                            title:'失败',
		                            desc:res.message
		                        });
		                    }
		                })
                    },
                    content:title
                })
                
            },
            createDateChange(e){
            	this.seachForm.publishTime=e;
            }
		}
	}
</script>