<style scoped lang="less">
	
</style>
<template>
    <l-header page-src="/trash"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/trash"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">客户名称</span>
                                <i-input :value.sync="seachForm.nameLike"  placeholder="请输入名称" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">客户电话</span>
                                <i-input :value.sync="seachForm.mobilePhoneLike"  placeholder="请输入电话" ></i-input>
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
				breads:[{text:'首页',href:'/index'},{text:'预约管理',href:'/waiting'},{text:'预约废弃箱',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				modalVisible:false,
				seachForm:{
					stateType:0
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{
         
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
					key:'dealer',title:'处理人',width:95
				},
				
				{
					key:'appointDate',title:'预约时间',width:170
				},
				{
					key:'updateTime',title:'接收时间',width:170
				},
				{
					key:'updateTime',title:'废弃时间',width:170
				},
				
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:65,
					align: 'center',
					render (row, column, index) {
					return `
						<i-button type="primary" size="small" @click="reStore(${row.id})" >恢复</i-button>
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
			reStore(id){
				let self=this;
				self.$Modal.confirm({
                    onOk:function(){
                       server.restoreAppoint(id).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'恢复成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,10);
		                    }else{
		                        self.$Notice.error({
		                            title:'恢复失败',
		                            desc:res.message
		                        });
		                    }
		                }) 
                    },
                    content:'您确认恢复这条预约吗？'
                })
                
			},
			
		}
	}
</script>