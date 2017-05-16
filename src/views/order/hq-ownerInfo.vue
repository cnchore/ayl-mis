<style scoped lang="less">
	
</style>
<template>
    <l-header page-src="/order/hq/ownerInfo"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/order/hq/ownerInfo"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">名称或电话</span>
                                <i-input :value.sync="seachForm.nameOrPhoneLike"  placeholder="请输入名称或电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">归属门店</span>
                                <i-select clearable :model.sync="seachForm.createrId" placeholder="请选择">
                                    <i-option v-for="item in agentList" :value="item.id">{{ item.agentName }}</i-option>
                                </i-select>
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
                menuActList:server.getMenuActionList('/order/hq/ownerInfo'),
				tableCol: [
				{title:'客户名称',key:'name',width:125},
                {title:'成单数量',key:'orderNum',width:125},
				{title:'成交总金额',width:200,key:'turnoverAmountTotal',
                    render(row){
                        return `{{${row.turnoverAmountTotal} | currency '¥' '2'}}`
                    }
                },
				{title:'电话',key:'mobilePhone',width:125},
				{title:'客户地址',width:400,
                    render(row){
                        return `${row.province?row.province:''}${row.city?row.city:''}${row.area?row.area:''}${row.address?row.address:''}`;
                    }
                },
				{title:'客户来源',key:'sourceType',width:125,
                    render(row){
                        return `${row.sourceType==1?'预约订单':'后台新增'}`;
                    }
                },
				{title:'备注',key:'remark',width:200},
                    {title:' '},
				{
					title: '操作',
					key: 'action',
					fixed:'right',width:65,
					align: 'center',
					render (row, column, index) {
					return `
                        <i-button type="primary" icon="eye" v-if="getAction('查看')" @click="look(${row.id})" title="查看" size="small"></i-button>
					`;
					}   
				}],
                agentList:[],
			}
		},
		ready(){
			this.getList();
            this.getAgentList();
		},
		methods:{
			getAction(name=''){
                var l=this.menuActList.filter((item)=>item.menuName===name).length;
                if(l>0){
                    return true;
                }
                return false;
            },
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
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,10);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,10);
			},
            look(id){
                this.$router.go('/order/hq/owner/look?id='+id)
            },
			
			
            
		}
	}
</script>