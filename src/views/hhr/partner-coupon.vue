<style scoped lang="less">
	
</style>
<template>
    <l-header active-key="2"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="2" active-key="2-4"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">券号</span>
                                <i-input :value.sync="seachForm.couponCodeLike"  placeholder="请输入券号" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">客户姓名</span>
                               <i-input :value.sync="seachForm.ownerNameLike"  placeholder="请输入客户姓名" ></i-input>
                            </div>
                        </Form-item>
                        
                        <Form-item prop="storeName">
                             <div class="l-sel-inline">
                                <span slot="prepend">客户电话</span>
                                <i-input :value.sync="seachForm.ownerPhoneLike"  placeholder="请输入客户电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">券名称</span>
                               <i-input :value.sync="seachForm.applyCouponNameLike"  placeholder="请输入现金券名称" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">申请人</span>
                               <i-input :value.sync="seachForm.applierLike"  placeholder="请输入申请人" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">申请人Tel</span>
                               <i-input :value.sync="seachForm.applierPhoneLike"  placeholder="请输入手机号码" ></i-input>
                            </div>
                        </Form-item>
                        
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">有效时间</span>
                                <Date-picker type="datetime" :value="seachForm.updateTime" format="yyyy-MM-dd hh:mm:ss" @on-change="createDateChange"  placeholder="选择时间"></Date-picker>
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
                breads:[{text:'首页',href:'/index'},{text:'现金券使用情况',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				
				seachForm:{
					updateTime:'',//使用/失效时间
					couponCodeLike:'',//券号
					applierLike:'',//申请人名称
					applierPhoneLike:'',//申请人电话
					ownerNameLike:'',//业主名称
					ownerPhoneLike:'',//业主电话
					applyCouponNameLike:''//申请优惠券名称

				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
				{
					key:'couponCode',title:'券号',width:150
				},
				{
					key:'ownerName',title:'业主名称',width:120
				},
				{
					key:'ownerPhone',title:'业主电话',width:150
				},
				{
					key:'province',title:'客户地址',className:'l-m-min-width l-ellipsis',
					render(row){
						return `${row.province}${row.city}${row.area}${row.street}${row.unit}`
					}
				},
				
				{
					key:'applyCouponName',title:'优惠券名称',width:120
				},
				{
					key:'couponValue',title:'优惠券券值',width:120
				},
				{
					width:100,key:'state',title:'状态',

					render(row,column,index){
						return `{{getStatusName(${row.state},'s')}}`;
					}
				},
				{
					key:'effectTime',title:'有效时间',width:200
				},
				{
					key:'applier',title:'申请人名称',width:120
				},
				{
					key:'applierPhone',title:'申请人电话',width:150
				},
				{
					key:'createTime',title:'创建时间',width:200
				},
				{
					key:'updateTime',title:'更新时间',width:200
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
	                    return "待使用";
	                    case 1:
	                    return "已使用";
	                    case 2:
	                    return "已失效";
	                }
	            }
            },
            getList(page=1,rows=9){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getParnerCoupon(_list).then((res)=>{
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
            createDateChange(e){
                this.seachForm.updateTime=e;
            }
		}
	}
</script>