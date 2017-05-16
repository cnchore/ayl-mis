<style scoped lang="less">
    
</style>
<template>
    <l-header page-src="/order/list"></l-header>
    <div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/order/list"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="actionAdd" :is-show="getAction('新增')" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">名称/电话</span>
                                <i-input :value.sync="seachForm.phoneOrNameLike"  placeholder="请输入客户名称/电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">订单号</span>
                                <i-input :value.sync="seachForm.orderNoLike"  placeholder="请输入订单号" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">下单时间</span>
                                
                                <Date-picker type="date" :value="seachForm.createTimeStr" format="yyyy-MM-dd" @on-change="createTimeChange"  placeholder="选择日期"></Date-picker>
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
            title="预约信息查看"
            @on-ok="modelSubmit"
            width=800
            
            :mask-closable="false"
            >
            <i-form v-ref:form-validate class="q-form-no-bottom" :model="modelForm" :rules="modeRule" :label-width="130">
                <Row>
                <i-col span="24">
                     <Form-item label="流水单号">
                    {{modelForm.billCode}}
                </Form-item>
                </i-col>
                <i-col span="12">
               
                <Form-item label="预约人姓名" prop="">
                    {{modelForm.name}}
                </Form-item>
                <Form-item label="上门量尺时间" prop="">
                    {{modelForm.homeTime}}
                </Form-item>
                <Form-item label="上门设计师" prop="">
                    {{modelForm.designer}}
                </Form-item>
                <Form-item label="装修项目" prop="">
                    {{modelForm.decorateProject}}
                </Form-item>
                <Form-item label="所属代理商" prop="">
                    {{modelForm.byAgent}}
                </Form-item>
                </i-col>
                <i-col span="12">
                
                <Form-item label="预约人手机" prop="">
                    {{modelForm.mobilePhone}}
                </Form-item>
                <Form-item label="预计装修时间" prop="">
                  {{modelForm.decoratingTime}}
                </Form-item>
                <Form-item label="上门设计师电话">
                   {{modelForm.designerPhone}}
                </Form-item>
                <Form-item label="工程预算" >
                    {{modelForm.budgetRange}}
                </Form-item>
                <Form-item label="所在城市" prop="">
                   {{modelForm.province}}{{modelForm.city}}{{modelForm.area}}
                </Form-item>
                </i-col>
                </Row>
                <Form-item label="装修地址" prop="address">
                    {{modelForm.address}}
                </Form-item>
                <Form-item label="说明">
                    {{modelForm.remark}}
                </Form-item>
            </i-form>
            <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">关闭</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
import server,{storage} from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
    export default{
        components:{LHeader,LeftMenu,LTitle},
        data(){
            return{
                breads:[{text:'首页',href:'/index'},{text:'订单管理',href:''}],
                rowsTotal:10,
                pageIndex:1,
                self:this,
                tableData:[],
                modalVisible:false,
                seachForm:{
                    
                },
                leftMenu:true,
                spanLeft: 4,
                spanRight: 20,
                menuActList:server.getMenuActionList('/order/list'),
                modelForm:{
         
                },
                tableCol: [
                
                {
                    key:'name',title:'客户名称',width:125
                },
                {
                    key:'mobilePhone',title:'客户电话',width:125
                },
                {
                    key:'orderNo',title:'订单号',width:200
                },
                {
                    title:'当前阶段',width:140,

                    render(row,column,index){
                        return `{{getStatusName(${row.flowState})}}`;
                    }
                },
                {
                    title:'订单级别',width:95,
                    render(row){
                        let l=''
                        let _l=row.level?row.level:null
                        l=_l?_l===1?'低':_l===2?'中':'高':'无'
                        return l;
                    }
                },
                
                {
                    title:'成交金额',width:200,
                    render(row){
                        return `{{${row.turnoverAmount} | currency '¥' '2'}}`
                    }
                },
                {
                    title:'订单来源',width:95,
                    render(row){
                        let s=''
                        let _s=row.sourceType?row.sourceType:null
                        s=_s?_s===1?'客户预约':'后台添加':'无'
                        return s;
                    }
                },
                {
                    title:'下单时间',width:170,
                    render(row){
                        return row.orderTime?row.orderTime:'无'
                    }
                },
                
                {
                   title:'接收时间',width:170,
                   render(row){
                        return row.updateTime?row.updateTime:'无'
                    }
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
                        <i class="iconfont icon-chakanyuyue btn" v-if="getAction('查看预约') && ${row.appointId}"  title="查看预约" @click="modelShow(${row.appointId})"></i>
                        <i class="iconfont icon-chakandingdan btn" v-if="getAction('查看订货单')" title="查看订货单" @click="actionShow(${row.id})"></i>
                        <i class="iconfont icon-bianji btn" title="编辑订货单" v-if="getAction('编辑') && ${row.flowState}===0" @click="actionShow(${row.id},true)"></i>
                        <i class="iconfont icon-fasong btn" title="提交" v-if="getAction('提交') && ${row.flowState}===0" @click="actionNext(${row.id})"></i>
                    `;
                    }   
                }]
            }
        },
        ready(){
            let userInfo=storage.session.get('userInfo');
            if(userInfo&&userInfo.type!=2){
                this.$router.go('/index');
                return;
            }
            this.getList();
            
        },
        methods:{
            getAction(name=''){
                var l=this.menuActList.filter((item)=>item.menuName===name).length;
                if(l>0){
                    return true;
                }
                return false;
            },
            getStatusName(v){
                
                switch(v){
                    case 0:
                    return "待下单";
                    case 1:
                    return "待总部确认";
                    case 2:
                    return "总部已确认";
                }
            },
            
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                
                _list.page=page;
                _list.rows=rows;
                server.getOrderList(_list).then((res)=>{
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
            modelShow(id=null){
                let self=this;
                if(id){
                    self.$Loading.start();
                    server.getAppointByid(id).then((res)=>{
                        self.$Loading.finish();
                        if(res.success){
                            self.modelForm=res.data.appointmentVo;
                            
                            self.modalVisible=true;
                        }else{
                            self.modelForm={};
                        }
                    })
                }
            },
            actionShow(id=null,t){
                if(t){
                    this.$router.go('/owner/order/edit?id='+id)
                }else{
                    this.$router.go('/owner/order/look?id='+id)
                }
            },
            actionAdd(){
                this.$router.go('/owner/order/edit')
            },
            //ownerOrderNext
            actionNext(id){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                       server.ownerOrderNext(id).then((res)=>{
                            if(res.success){
                                self.$Notice.success({
                                    title:'提交成功',
                                    desc:res.message
                                });
                                self.getList(self.pageIndex,10);
                            }else{
                                self.$Notice.error({
                                    title:'提交失败',
                                    desc:res.message
                                });
                            }
                        }) 
                    },
                    content:'您确认提交给总部吗？'
                })
                
            },
            createTimeChange(e){
                this.seachForm.createTimeStr=e;
            },
        }
    }
</script>