<style scoped lang="less">
	
</style>
<template>
    <l-header active-key="11"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="11" active-key="11-2"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="addOrUpdate()" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">名称或电话</span>
                                <i-input :value.sync="seachForm.nameOrPhoneLike"  placeholder="请输入名称或电话" ></i-input>
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
				rowsTotal:10,
				pageIndex:1,
				self:this,
				breads:[{text:'首页',href:'/index'},{text:'客户管理',href:''}],
				tableData:[],
				seachForm:{
					nameOrPhoneLike:'',
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
               
				tableCol: [
				{title:'客户名称',key:'name',width:125},
				{title:'成交总金额',width:125,key:'turnoverAmountTotal'},
				{title:'电话',key:'mobilePhone',width:125},
				{title:'客户地址',key:'address',width:125},
				{title:'客户来源',key:'sourceType',width:125,
                    render(row){
                        return `${row.sourceType==1?'预约订单':'后台新增'}`;
                    }
                },
				{title:'备注',key:'remark',width:400},
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:135,
					align: 'center',
					render (row, column, index) {
					return `
                        <i-button type="primary" title="查看" icon="eye" @click="look(${row.id})" size="small"></i-button>
						<i-button type="primary" title="修改" v-if="${row.sourceType}===2" icon="edit" @click="addOrUpdate(${row.id})" size="small"></i-button>
					
						<i-button type="primary" title="删除" v-if="${row.sourceType}===2" icon="ios-trash" @click="del(${row.id})"  size="small"></i-button>	
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
                server.getOwnerList(_list).then((res)=>{
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
            look(id){
                this.$router.go('/order/owner/look?id='+id)
            },
			addOrUpdate(id){
				let self=this;
				if(id){
					self.$router.go('/order/owner/edit?id='+id);
            	}else{
            		self.$router.go('/order/owner/edit');
            	}
			},
			
			del(id){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.delOwner(id).then((res)=>{
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
                    content:'确定删除这个客户么？'
                })
                
            },
            
		}
	}
</script>