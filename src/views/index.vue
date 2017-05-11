<style scoped lang="less">
    .q-page{
        height: 100vh;
        overflow:auto;
        background-color: #f5f5f5;
        padding:30px 30px 80px 30px;
        .q-card{
            .ivu-col{
                .ivu-card{
                    background-color: #ededed;
                }
                padding:10px;
                i{
                    font-size: 64px;
                    color:#336699;
                }
                .q-title{
                    padding-left: 5px;
                }
                h3{
                    cursor: pointer;
                    text-align: right;
                    font-size: 24px;
                    font-weight: normal;
                }
                
                
                
            }
        }   
        .q-table{       
            .q-body{
                border: 1px solid #d7dde4;
                border-color: #e3e8ee;
                border-radius: 4px;
                background-color: #ededed;
                min-height: 382px;
                .ivu-row-flex{
                    padding:0px 15px;
                    i{
                        font-size: 40px;
                    }
                    i.btn{
                        font-size: 26px;
                    }
                    .q-title{
                        padding:5px 0px;
                    }
                    .q-right{
                        text-align: right;
                    }
                }

                .q-more{
                    color:#336699;
                    display: block;
                    text-align: right;
                    padding:10px 15px 10px 0px;
                }
            }
            .qrcode{
               display: -webkit-box;
               -webkit-box-pack: center;
               -webkit-box-align: center;
               -webkit-box-orient: vertical;
               img{
                width:258px;
                height:258px;
               }
           }   

        }
        .copyright{
            margin-left: -30px;
            margin-right: -30px;
            text-align: center;
            margin-top: 75px;
            padding: 0 10px;
            color:#999;
            font-size: 16px;
            line-height: 80px;
            background-color: #ededed;
        }
            
    }
</style>
<template>
    <l-header active-key="0"></l-header>
    <div class="q-page">
        <Row class="q-card">
            <i-col span="6">
                <Card>
                    <div>
                        <i class="iconfont icon-yuyuedaiban"></i>
                        <div class="q-title">预约待办</div>
                        <h3 @click="actionGoAppoint()">{{formData.waitDoNum?formData.waitDoNum:0}}</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6" v-show="userType===1">
                <Card>
                    <div>
                        <i class="iconfont icon-daiban"></i>
                        <div class="q-title">订单待办</div>
                        <h3 @click="actionGoOrder()">{{formData.orderWaitDoPage?formData.orderWaitDoPage.total:0}}</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <div>
                        <i class="iconfont icon-dingdan1"></i>
                        <div class="q-title">订单总数</div>
                        
                        <h3 @click="actionGoOrder()">{{formData.orderNum?formData.orderNum:0}}</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <div>
                        <i class="iconfont icon-kehu"></i>
                        <div class="q-title">客户数</div>
                        
                        <h3 @click="actionGoCustomer()">{{formData.clientNum?formData.clientNum:0}}</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6" v-show="userType===2">
                <Card>
                    <div>
                        <i class="iconfont icon-zhanghuzongjine"></i>
                        <div class="q-title">成交总金额</div>
                        
                        <h3>{{formData.totalAmount | currency '¥' '2'}}</h3>

                    </div>
                </Card>
            </i-col>
        </Row>
        <Row class="q-card q-table">
            <i-col :span="userType===2?18:12">
                <div class="q-body">
                    <Row type="flex" justify="center" align="middle">
                        <i-col :md="2" :lg="2" class="q-title">
                            <i class="iconfont icon-wodedaiban"></i>
                        </i-col>
                        <i-col :md="19" :lg="20">
                            我的预约待办
                        </i-col>
                        <i-col :md="3" :lg="2" class="q-right">
                            {{formData.appointPage?formData.appointPage.total:0}}
                        </i-col>
                    </Row>
                    <i-table :content="self" height="240" :columns="tableCol" :data="formData.appointPage?formData.appointPage.rowsObject?formData.appointPage.rowsObject.slice(0,4):[]:[]"></i-table>
                    <a v-if="userType===2" v-link="{path: '/owner/waiting'}" class="q-more">更多...</a>
                    <a v-else v-link="{path: '/waiting'}" class="q-more">更多...</a>
               </div>
            </i-col>
            <i-col span="12" v-show="userType===1">
                <div class="q-body">
                    <Row type="flex" justify="center" align="middle">
                        <i-col :md="2" :lg="2" class="q-title">
                            <i class="iconfont icon-wodedingdandaiban"></i>
                        </i-col>
                        <i-col :md="19" :lg="20">
                            我的订单待办
                        </i-col>
                        <i-col :md="3" :lg="2" class="q-right">
                            {{formData.orderWaitDoPage?formData.orderWaitDoPage.total:0}}
                        </i-col>
                    </Row>
                    <i-table :content="self" height="240" :columns="orderWaitCol" :data="formData.orderWaitDoPage?formData.orderWaitDoPage.rowsObject?formData.orderWaitDoPage.rowsObject.slice(0,4):[]:[]"></i-table>
                   
                    <a v-link="{path: '/order/list'}" class="q-more">更多...</a>
               </div>
            </i-col>
            <i-col span="12" v-show="userType===1">
                <div class="q-body">
                    <Row type="flex" justify="center" align="middle">
                        <i-col :md="2" :lg="2" class="q-title">
                            <i class="iconfont icon-dingdanyujing"></i>
                        </i-col>
                        <i-col :md="19" :lg="20">
                            订单预警
                        </i-col>
                        <i-col :md="3" :lg="2" class="q-right">
                            {{formData.orderPage?formData.orderPage.total:0}}
                        </i-col>
                    </Row>
                    <i-table :content="self" height="240" :columns="orderCol" :data="formData.orderPage?formData.orderPage.rowsObject?formData.orderPage.rowsObject.slice(0,4):[]:[]"></i-table>
                    
                    <a v-link="{path: '/order/list'}" class="q-more">更多...</a>
               </div>
            </i-col>
            
            <i-col span="6" v-show="userType===2">
                <div class="q-body qrcode">
                    <img v-lazy="qrcode">
                    <div>安居艾臣推广二维码</div>
                </div>
            </i-col>
            <i-col :span="userType===2?18:12">
               <div class="q-body">
                    <Row type="flex" justify="center" align="middle">
                        <i-col :md="2" :lg="2" class="q-title">
                            <i class="iconfont icon-beiwanglu"></i>
                        </i-col>
                        <i-col :md="19" :lg="20">
                            我的备忘录
                        </i-col>
                        <i-col :md="3" :lg="2"  class="q-right">
                            <i class="iconfont icon-tianjia btn" @click="$router.go('/memo')"></i>
                        </i-col>
                    </Row>
                    <i-table :content="self" height="240" :columns="memoCol" :show-header="false" :data="formData.memoPage?formData.memoPage.rowsObject?formData.memoPage.rowsObject.slice(0,5):[]:[]"></i-table>
                    <a v-link="{path: '/memo'}" class="q-more">更多...</a>
               </div>
            </i-col>
        </Row>
        <div class="copyright">版权所有 &copy; 2017.艾臣家居科技有限公司.</div>
    </div>
    

</template>
<script>
import server,{ storage } from '../libs/server'

import LHeader from '../components/header'
    export default{
        components:{LHeader},
        data(){
            return{
                self:this,
                formData:{},
                qrcode:require('../imgs/noimg.png'),
                memoData:[],
                memoCol:[
                {
                    key:'memoLevel',
                    render(row){
                        return `<span class="l-s-Error">${row.memoLevel?row.memoLevel===1?'!':row.memoLevel===2?'!!':'!!!':''}</span>`
                    }
                },
                {key:'content'},
                {key:'memoTime'},
                {
                    key: 'action',fixed:'right',
                    align: 'center',width:105,
                    render (row, column, index) {
                    return `
                        <i class="iconfont icon-bianji btn" title="编辑" @click="actionEdit"></i>
                        <i class="iconfont icon-shanchu btn" title="删除" @click="delMemo(${row.id})"></i>
                    `;
                    }   
                }],
                tableData:[],
                tableCol: [
                {
                    key:'name',title:'客户名称',width:95
                },
                {
                    key:'state',title:'当前阶段',width:140,
                    render(row){
                        return `{{getStatusName(${row.state})}}`
                    }
                },
                {
                    key:'mobilePhone',title:'客户电话',width:125
                },
                {
                    key:'updateTime',title:'接收时间',width:170
                },
                {
                    title: '操作',
                    key: 'action',fixed:'right',
                    align: 'center',width:65,
                    render (row, column, index) {
                    return `
                        <i-button type="primary" 
                             size="small" @click="actionGoAppoint(${row.id})">办理</i-button>
                    `;
                    }   
                }],
                orderWaitCol:[
                {
                    key:'name',title:'客户名称',width:95
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
                    key:'mobilePhone',title:'客户电话',width:125
                },
                {
                    key:'updateTime',title:'接收时间',width:170
                },
                {
                    title: '操作',
                    key: 'action',fixed:'right',
                    align: 'center',width:65,
                    render (row, column, index) {
                    return `
                        <i-button type="primary" 
                             size="small" @click="actionGoOrder(${row.id})">办理</i-button>
                    `;
                    }   
                }],
                orderCol:[
                {
                    key:'name',title:'客户姓名',width:95
                },
                
                {
                    key:'orderNo',title:'订单编号',width:170
                },
                
                {
                    key:'orderTime',title:'下单时间',width:170
                    
                },
                {
                    key:'warnDays',title:'剩余天数',width:95,
                    render(row){
                        return `<span class="l-s-Error">${row.warnDays}</span>`
                    }
                },
                {
                    title: '操作',
                    key: 'action',fixed:'right',
                    align: 'center',width:65,
                    render (row, column, index) {
                    return `
                        <i-button type="primary" 
                             size="small" @click="actionGoOrder(${row.id},${row.state})">办理</i-button>
                    `;
                    }   
                }
                ],
                userType:null,
            }
        },
        ready(){
            let userInfo=storage.session.get('userInfo');
            if(!userInfo){
                this.$router.go('/login');
                return;
            }
            this.userType=userInfo.type;
            if(userInfo.roleName==='自助学习'){
                this.$router.go('/info');
                return;
            }
            this.getList(); 
        },
        methods:{

            delMemo(id){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                       server.delMemo(id).then((res)=>{
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
                    content:'您确认删除这条备忘吗？'
                })
                
            },
            actionEdit(){
                this.$router.go('/memo');
            },
            actionGoAppoint(id){
                if(this.userType===2){
                    if(id){
                        this.$router.go('/appointment/edit?id='+id);
                    }else{

                        this.$router.go('/owner/waiting');
                    }
                }else{
                    if(id){

                        this.$router.go('/waiting?id='+id);
                    }else{

                        this.$router.go('/waiting');
                    }
                }
            },
            actionGoOrder(id,t=null){
                if(this.userType===2){
                    this.$router.go('/owner/order/list');
                }else{
                    if(id){
                        if(t){
                            this.$router.go('/order/state/change?id='+id)+'&s='+t;
                        }else{
                            this.$router.go('/order/edit?id='+id);
                        }
                    }else{
                        this.$router.go('/order/list');
                    }
                }
            },
            actionGoCustomer(){
                if(this.userType===2){
                    this.$router.go('/order/ownerInfo');

                }else{
                    this.$router.go('/order/hq/ownerInfo');

                }
            },
            getStatusName(v){
                
                switch(v){
                    case 0:
                    return "取消作废";
                    case 1:
                    return "预约处理";
                    case 2:
                    return "待设计报价";
                    case 3:
                    return "待客户确认";
                    case 31:
                    return "待重新设计报价";
                    case 4:
                    return "待下单";
                    case 5:
                    return "待确认订单";
                    case 6:
                    return "已确认订单";
                }
            },
            getList(){
                let self=this;
                self.$Loading.start();
                server.getIndex().then((res)=>{
                    self.$Loading.finish();
                    if(res.success){
                        self.formData=res.data;
                        if(res.data.myQrCodeUrl){
                            server.getQrcode(res.data.myQrCodeUrl).then((qr)=>{
                                if(qr.success){
                                    self.qrcode=qr.data;
                                }else{
                                    self.qrcode=require('../imgs/noimg.png');
                                }
                            })
                        }
                    }
                })
            },
        }
    
    }
</script>