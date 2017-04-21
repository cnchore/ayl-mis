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
                    text-align: right;
                    font-size: 55px;
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
                min-height: 354px;
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
                        <i class="iconfont icon-daiban"></i>
                        <div class="q-title">代办件</div>
                        <h3>66</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <div>
                        <i class="iconfont icon-order"></i>
                        <div class="q-title">订单总数</div>
                        
                        <h3>6</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <div>
                        <i class="iconfont icon-kehu"></i>
                        <div class="q-title">客户数</div>
                        
                        <h3>88</h3>
                    </div>
                </Card>
            </i-col>
            <i-col span="6">
                <Card>
                    <div>
                        <i class="iconfont icon-zhanghuzongjine"></i>
                        <div class="q-title">成交总金额</div>
                        
                        <h3>88</h3>
                    </div>
                </Card>
            </i-col>
        </Row>
        <Row class="q-card q-table">
            <i-col span="9">
                <div class="q-body">
                    <Row type="flex" justify="center" align="middle">
                        <i-col :md="3" :lg="2" class="q-title">
                            <i class="iconfont icon-wodedaiban"></i>
                        </i-col>
                        <i-col :md="18" :lg="20">
                            我的待办业务
                        </i-col>
                        <i-col :md="3" :lg="2" class="q-right">
                            88
                        </i-col>
                    </Row>
                    <i-table :content="self" :columns="tableCol" :data="tableData"></i-table>
                    <div class="q-more">更多...</div>
               </div>
            </i-col>
            <i-col span="9">
               <div class="q-body">
                    <Row type="flex" justify="center" align="middle">
                        <i-col :md="3" :lg="2" class="q-title">
                            <i class="iconfont icon-beiwanglu"></i>
                        </i-col>
                        <i-col :md="18" :lg="20">
                            我的备忘录
                        </i-col>
                        <i-col :md="3" :lg="2"  class="q-right">
                            <i class="iconfont icon-tianjia btn" @click="$router.go('/memo')"></i>
                        </i-col>
                    </Row>
                    <i-table :content="self" :columns="memoCol" :show-header="false" :data="memoData"></i-table>
                    <a v-link="{path: '/memo'}" class="q-more">更多...</a>
               </div>
            </i-col>
            <i-col span="6">
                <div class="q-body qrcode">
                    <img src="../imgs/yz-qrcode.jpg">
                    <div>安居艾臣推广二维码</div>
                </div>
            </i-col>
        </Row>
        <div class="copyright">版权所有 &copy; 2017.艾臣智能门窗科技有限公司.</div>
    </div>
    

</template>
<script>
import LHeader from '../components/header'
    export default{
        components:{LHeader},
        data(){
            return{
                self:this,
                memoData:[{"name":'我的备忘录...','time':'2017-04-10','state':'!!!'},{"name":'我的备忘录...','time':'2017-04-10','state':'!!'},{"name":'我的备忘录...','time':'2017-04-10','state':'!'},{"name":'我的备忘录...','time':'2017-04-10','state':''},{"name":'我的备忘录...','time':'2017-04-10','state':''}],
                memoCol:[
                {
                    key:'state',width:30,
                    render(row){
                        return `<span class="l-s-Error">${row.state}</span>`
                    }
                },{key:'name',width:180},{key:'time',width:130},
                {
                    key: 'action',fixed:'right',
                    align: 'center',width:120,
                    render (row, column, index) {
                    return `
                        <i class="iconfont icon-bianji btn" title="编辑"></i>
                        <i class="iconfont icon-shanchu btn" title="删除"></i>
                    `;
                    }   
                }],
                tableData:[
                {"name":'赵得住',"tel":'13800001111',"state":'预约处理',"createTime":'2017-04-10'},
                {"name":'赵得住',"tel":'13800001111',"state":'预约处理',"createTime":'2017-04-10'},
                {"name":'赵得住',"tel":'13800001111',"state":'预约处理',"createTime":'2017-04-10'},
                {"name":'赵得住',"tel":'13800001111',"state":'预约处理',"createTime":'2017-04-10'}],
                tableCol: [
                {
                    key:'name',title:'客户名称',width:130
                },
                
                {
                    key:'tel',title:'客户电话',width:130
                },
                
                {
                    key:'state',title:'当前阶段',width:130
                },
                {
                    key:'createTime',title:'接受时间',width:110
                },
                {
                    title: '操作',
                    key: 'action',fixed:'right',
                    align: 'center',width:130,
                    render (row, column, index) {
                    return `
                        <i-button type="primary" 
                             size="small">办理</i-button>
                    `;
                    }   
                }]
            }
        },
        ready(){

        },
        methods:{
            
        }
    }
</script>