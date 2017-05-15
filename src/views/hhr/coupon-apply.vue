<style scoped lang="less">
	
</style>
<template>
    <l-header page-src="/coupon/apply"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/coupon/apply"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">申请人</span>
                                <i-input :value.sync="seachForm.applierLike"  placeholder="请输入申请人" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">申请人Tel</span>
                               <i-input :value.sync="seachForm.applierPhoneLike"  placeholder="请输入申请人电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">申请日期</span>
                                <Date-picker type="date" :value="seachForm.applyTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择时间"></Date-picker>
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
                breads:[{text:'首页',href:'/index'},{text:'现金券申请管理',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				
				seachForm:{
                    applierLike:'',//申请人名称
                    applierPhoneLike:'',//申请人电话
                    ownerNameLike:'',//业主名称
                    ownerPhoneLike:'',//业主电话
                    applyCouponNameLike:'',//申请优惠券名称
                    applyTime:''//申请时间
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
                
                {
                    width:100,key:'state',title:'状态',

                    render(row,column,index){
                        return `{{getStatusName(${row.state},'s')}}`;
                    }
                },
                {
                    key:'applier',title:'申请人',width:120
                },
                {
                    key:'applierPhone',title:'申请人电话',width:150
                },
                
                {
                    key:'ownerName',title:'客户名称',width:120
                },
                {
                    key:'ownerPhone',title:'客户电话',width:150
                },
                {
                    key:'applyCouponName',title:'优惠券名称',width:120
                },
                {
                    key:'couponValue',title:'券值',width:200,
                    render(row){
                        return `{{${row.couponValue} | currency '¥' '2'}}`
                    }
                },
                
                {
                    key:'applyNum',title:'申请数量',width:120
                },
                {
                    key:'province',title:'客户地址',width:400,
                    render(row){
                        return `${row.province}${row.city}${row.area}${row.street}${row.unit}`
                    }
                },
                {
                    key:'applyTime',title:'申请时间',width:200
                },
                {
                    key:'houseStyle',title:'房子风格',width:120
                },  
                {
                    key:'houseType',title:'户型',width:120
                },
                {
                    key:'houseArea',title:'房子面积',width:120
                },
                {
                    key:'progress',title:'进度',width:120,
                    render(row){
                        return `<span :class="${row.progress}===1?'l-s-Success':'l-s-Error'">
                        {{${row.progress}===1?'已进场':'未进场'}}</span>`;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed:'right',
                    width:140,
                    align: 'center',
                    render (row, column, index) {
                    return `
                        
                        <i-button type="primary"
                            v-show="${row.state}==0"
                            @click="updateState(${row.id},true,'您确认审核通过吗？')"
                          size="small">通过</i-button>
                        <i-button type="primary"
                            v-show="${row.state}==0"
                            @click="updateState(${row.id},false,'您确认审核不通过吗？')"
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
	            }
            },
            getList(page=1,rows=9){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getCouponApply(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
			updateState(id,t,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        self.$Loading.start();

                       server.verifyCouponApply(id,t).then((res)=>{
                            self.$Loading.finish();
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
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,9);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,9);
			},
            createDateChange(e){
                this.seachForm.applyTime=e;
            }
		}
	}
</script>