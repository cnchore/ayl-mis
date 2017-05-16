<style scoped lang="less">
	
</style>
<template>
    <l-header page-src="/coupon/config"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/coupon/config"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="modelShow" :is-show="getAction('新增')" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">券名</span>
                                <i-input :value.sync="seachForm.couponNameLike"  placeholder="请输入券名" ></i-input>
                            </div>
                        </Form-item>
                        
                        <Form-item>
                            <i-button type="ghost" icon="search" @click="search('formInline')">搜索</i-button>
                        </Form-item>
                        
                    </i-form>
                </div>
                <div class="layout-content" :style="{ height:contentHeight + 'px' }">
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
	        width=700
	        
			:mask-closable="false"
	        >
	        <i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="100">
		        <Form-item label="券名" prop="couponName">
		            <i-input :value.sync="modelForm.couponName" placeholder="请输入券名"></i-input>
		        </Form-item>
		        <Form-item label="券面值" prop="couponValue">
		            <i-input :value.sync="modelForm.couponValue" placeholder="请输入券面值"></i-input>
		        </Form-item>
		        <Form-item label="条件" prop="achieveMoney">
		        	<Row>
			        	<i-col span="3">
			        		订单满足
			        	</i-col>
			            <i-col span="8">
			            	<i-input :value.sync="modelForm.achieveMoney" placeholder="请输入条件"></i-input>
			            </i-col>
			        	<i-col span="4">
			            	元可以使用
			            </i-col>
		            </Row>
		        </Form-item>
		        <Form-item label="有效天数" prop="effectDays">
		        	<Row>
			        	<i-col span="3">
			        		申请通过后
			        	</i-col>
			        	<i-col span="8">
			            	<i-input :value.sync="modelForm.effectDays" placeholder="请输入有效天数"></i-input>
			        	</i-col>
			        	<i-col span="4">
			            	天内可以使用
			            </i-col>
		            </Row>
		        </Form-item>
		        <Form-item label="备注" prop="remark">
		            <i-input :value.sync="modelForm.remark" type="textarea" :rows="3" placeholder="请输入备注"></i-input>
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
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'现金券配置管理',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				modalVisible:false,
				seachForm:{
					couponNameLike:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                menuActList:server.getMenuActionList('/coupon/config'),
                modelForm:{},
                modeRule:{
                	couponName: [
                        { required: true, message: '券名不能为空', trigger: 'blur' }
                    ],
                    couponValue: [
                        { required: true, message: '券面值不能为空', trigger: 'blur' }
                    ],
                    achieveMoney: [
                        { required: true, message: '条件不能为空', trigger: 'blur' }
                    ],
                    effectDays: [
                        { required: true, message: '有效天数不能为空', trigger: 'blur' }
                    ]
                },
                modelLoading:false,
				tableCol: [
				{
					key:'couponName',title:'券名',width:150
				},
				{
					key:'couponValue',title:'券面值',width:200,
					render(row){
						return `{{${row.couponValue} | currency '¥' '2'}}`
					}
				},
				{
					key:'state',title:'状态',width:125,

					render(row,column,index){
						return `{{getStatusName(${row.state})}}`;
					}
				},
				{
					key:'achieveMoney',title:'使用条件',width:200,
					render(row){
						return `订单满足 ${row.achieveMoney} 元可以使用`;
					}
				},
				
				{
					key:'effectDays',title:'有效天数',width:230,
					render(row){
						return `申请通过后 ${row.effectDays} 天内可以使用`;
					}
				},
				{
					key:'remark',title:'备注',width:200,className:'l-ellipsis'
				},
                    {title:' '},
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:170,
					align: 'center',
					render (row, column, index) {
					return `
						
						<i-button type="primary"
						 v-if="getAction('上架') && ${row.state}==0"
						 @click="updateState(${row.id},'您确认上架吗？')" size="small">上架</i-button>
						<i-button type="primary"
						 v-if="getAction('下架') && ${row.state}==1"
						 @click="updateState(${row.id},'您确认下架吗？')" size="small">下架</i-button>

						
						<i-button type="primary" v-if="getAction('编辑') && ${row.state}==0" title="修改" icon="edit" @click="modelShow(${row.id})" size="small"></i-button>
						
						<i-button type="primary"
							v-if="getAction('删除') && ${row.state}==0" 
							@click="del(${row.id})" title="删除"
						 icon="ios-trash" size="small"></i-button>

					`;
					}   
				}]
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
            getStatusName(v){
            	
                switch(v){
                    case 0:
                    return "新建";
                    case 1:
                    return "已上架";
                    case 2:
                    return "已下架";
                }
            },
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getCouponConfig(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
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
	                server.getCouponConfigByid(id).then((res)=>{
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
					server.updateCouponConfig(self.modelForm).then((res)=>{
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
	                server.addCouponConfig(self.modelForm).then((res)=>{
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
                        server.delCouponConfig(id).then((res)=>{
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
			updateState(id,t){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.upDownCouponConfig(id).then((res)=>{
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
                    content:t
                })
                
            }
		}
	}
</script>