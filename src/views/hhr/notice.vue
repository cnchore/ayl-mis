<style scoped lang="less">
	
</style>
<template>
    <l-header page-src="/notice"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/notice"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="modelShow" :is-show="getAction('新增')" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">标题</span>
                                <i-input :value.sync="seachForm.titleLike"  placeholder="请输入标题" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">发布时间</span>
                                <Date-picker type="date" :value="seachForm.publishTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择时间"></Date-picker>
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
	        width=700
	        
			:mask-closable="false"
	        >
	        <i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="100">
		        <Form-item label="标题" prop="title">
		            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
		        </Form-item>
		        <Form-item label="内容" prop="content">
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
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'公告发布管理',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				modalVisible:false,
				seachForm:{
					titleLike:'',
					publishTime:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                menuActList:server.getMenuActionList('/notice'),
                modelForm:{},
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
					key:'title',title:'标题',width:200
				},
				{
					key:'state',title:'状态',width:150,

					render(row,column,index){
						return `{{getStatusName(${row.state})}}`;
					}
				},
				{
					key:'createTime',title:'创建时间',width:170
				},
				
				{
					key:'publishTime',title:'更新时间',width:170
				},
				{
					key:'content',title:'内容',width:200,className:'l-ellipsis'
				},
                    {title:' '},
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:210,
					align: 'center',
					render (row, column, index) {
					return `
						
						<i-button type="primary" 
							v-if="getAction('发布') && ${row.state}==0"
							@click="updateState(${row.id},'您确认发布吗？')"
							 size="small">发布</i-button>

						<i-button type="primary"
							v-if="getAction('结束发布') && ${row.state}==1" 
							@click="updateState(${row.id},'您确认结束发布吗？')"
							 size="small">结束发布</i-button>

						<i-button type="primary" v-if="getAction('编辑') && ${row.state}==0"  icon="edit" @click="modelShow(${row.id})" title="修改" size="small"></i-button>
						
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
                server.getNotice(_list).then((res)=>{
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