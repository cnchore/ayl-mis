<style scoped lang="less">
	
</style>
<template>
    <l-header page-src="/partner/account"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/partner/account"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">注册人</span>
                                <i-input :value.sync="seachForm.partnerNameLike"  placeholder="请输入注册人姓名" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">注册人Tel</span>
                               <i-input :value.sync="seachForm.mobilePhoneLike"  placeholder="请输入手机号码" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">注册日期</span>
                                <Date-picker type="date" :value="seachForm.registerTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择日期"></Date-picker>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                             <div class="l-sel-inline">
                                <span slot="prepend">行业</span>
                                <i-select clearable :model.sync="seachForm.industryType" placeholder="请选择">
                                    <i-option v-for="item in industryTypeList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">推荐人</span>
                               <i-input :value.sync="seachForm.referralNameLike"  placeholder="请输入推荐人" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">推荐人Tel</span>
                               <i-input :value.sync="seachForm.referralPhoneLike"  placeholder="请输入推荐人手机号码" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">代理商</span>
                               <i-input :value.sync="seachForm.agentNameLike"  placeholder="请输入代理商" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">代理商Tel</span>
                               <i-input :value.sync="seachForm.agentPhoneLike"  placeholder="请输入代理商手机号码" ></i-input>
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
                            <Page :total="rowsTotal" show-total show-elevator :page-size="9" :current.sync="pageIndex" @on-change="changePage"></Page>
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
                breads:[{text:'首页',href:'/index'},{text:'合伙人账号管理',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				industryTypeList:[
					{value:1,label:'设计师'},
					{value:2,label:'工长'},
					{value:3,label:'建筑'},
					{value:4,label:'房产中介'},
					{value:5,label:'售楼员'},
					{value:10,label:'其他'}
				],
				seachForm:{
					registerTime:'',                     //注册时间
					industryType:'',                    //行业类型
					partnerNameLike:'',                  //合伙人姓名
					mobilePhoneLike:'',                  //合伙人手机
					referralNameLike:'',                  //推荐人
					referralPhoneLike:'',                  //推荐人电话
					agentNameLike:'',                    //代理商
					agentPhoneLike:''                   //代理商电话
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
				{key:'partnerName',width:120,title:'合伙人姓名'},
				{
					width:120,key:'state',title:'状态',

					render(row,column,index){
						return `{{getStatusName(${row.state},'s')}}`;
					}
				},{key:'mobilePhone',width:150,title:'手机号'},
				{
					width:150,title:'所在城市',
					render(row){
						return `${row.province}${row.city}`;
					}
				},
				
				{
					key:'industryType',width:120,title:'行业类型',
					render(row,column,index){
						return `{{getStatusName(${row.industryType},'t')}}`;
					}
				},
				{key:'storeBrand',width:150,className:'l-min-width',title:'卖场/品牌'},
				{key:'referralName',width:120,title:'推荐人姓名'},
				{key:'referralPhone',width:170,title:'推荐人电话'},
				{key:'agentName',width:150,title:'代理商名称'},
				{key:'agentPhone',width:125,title:'代理商电话'},
				{key:'registerTime',width:170,title:'注册时间'},

				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:125,
					align: 'center',
					render (row, column, index) {
					return `
						
						<i-button type="primary"
							v-show="${row.state}==0" 
							@click="updateState(${row.id},true,'您确认该账号通过吗？')"
							 size="small">通过</i-button>
						<i-button type="primary"
							v-show="${row.state}==0" 
							@click="updateState(${row.id},false,'您确认该账号不通过吗？')"
							 size="small">不通过</i-button>

					`;
					}   
				}]
			}
		},
		ready(){
			this.getList();
		},
		methods:{
            getStatusName(v,t){
            	if(t==='s'){
	                switch(v){
	                    case 0:
	                    return "申请中";
	                    case 1:
	                    return "已通过";
	                    case 2:
	                    return "未通过";
	                }
	            }else{
	            	switch(v){
	                    case 1:
	                    return "设计师";
	                    case 2:
	                    return "工长";
	                    case 3:
	                    return "建筑";
	                    case 4:
	                    return "房产中介";
	                    case 5:
	                    return "售楼员";
	                    case 10:
	                    return "其他";
	                }
	            }
            },
            getList(page=1,rows=9){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getParnerAccount(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
			
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,9);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,9);
			},
			updateState(id,t,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.verifyParnerAccount(id,t).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,9);
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
                this.seachForm.registerTime=e;
            }
		}
	}
</script>