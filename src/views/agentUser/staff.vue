<style scoped lang="less">
	
</style>
<template>
    <l-header active-key="9"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="9" active-key="9-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="addOrUpdate" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">姓名</span>
                                <i-input :value.sync="seachForm.staffNameLike"  placeholder="请输入姓名" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">电话</span>
                                <i-input :value.sync="seachForm.staffPhoneLike"  placeholder="请输入电话" ></i-input>
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
	        title="新增／编辑"
	        :mask-closable="false"
            >
            <i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="100">
                <Form-item label="姓名" prop="staffName">
                    <i-input :value.sync="modelForm.staffName" placeholder="请输入姓名"></i-input>
                </Form-item>
                <Form-item label="电话" prop="staffPhone">
                    <i-input :value.sync="modelForm.staffPhone" placeholder="请输入电话"></i-input>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <i-input :value.sync="modelForm.remark" type="textarea" :rows="3" placeholder="请输入备注"></i-input>
                </Form-item>
            </i-form>
		    <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">取消</i-button>
                <i-button type="primary" size="large"  @click="modelSubmit">确定</i-button>
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
				breads:[{text:'首页',href:'/index'},{text:'人员管理',href:''}],
				tableData:[],
				seachForm:{
					staffNameLike:'',
					staffPhoneLike:'',
				},
				agentList:[{value:'true',label:'非直营'},{value:'false',label:'直营'}],
				addressData:chinaAddress,
                addressValue:[],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modalVisible:false,
                modelForm:{},
                modeRule:{
                    staffName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    staffPhone: [
                        { required: true, message: '电话不能为空', trigger: 'blur' }
                    ]
                },
				tableCol: [
				{title:'姓名',key:'staffName'},
                {title:'是否禁用',key:'isDisable',
                    render(row){
                        return `${row.isDisable?'是':'否'}`
                    }
                },

				{title:'电话',key:'staffPhone'},
				{title:'所属组织',key:'source'},
				
				{
					key:'createTime',title:'创建时间'
				},
                {title:'备注',key:'remark'},
				
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:135,
					align: 'center',
					render (row, column, index) {
					return `
						<i-button type="primary" title="修改" icon="edit" @click="addOrUpdate(${row.id})" size="small"></i-button>
						<i-button type="primary"
							v-show="${row.isDisable}===false" 
							@click="updateState(${row.id},'您确定禁用么？')"
							  size="small">禁用</i-button>
						<i-button type="primary"
							v-show="${row.isDisable}===true" 
							@click="updateState(${row.id},'您确定启用么？')"
							  size="small">启用</i-button>
					`;
					}   
				}]
			}
		},
		ready(){
			this.getList();
		},
		methods:{
			
            
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getStaffList(_list).then((res)=>{
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

			addOrUpdate(id){
				let self=this;
                if(id){
                    self.$Loading.start();
                    server.getStaffByid(id).then((res)=>{
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
                    server.updateStaff(self.modelForm).then((res)=>{
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
                    server.addStaff(self.modelForm).then((res)=>{
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
			updateState(id,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.changeStaff(id).then((res)=>{
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
            
		}
	}
</script>