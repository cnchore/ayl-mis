<style scoped lang="less">
	.l-tb-title{
        text-align: center;
        font-size: 16px;
        color:#464c5b;
        font-weight: bold;
        padding-bottom: 24px;
    }   
</style>
<template>
    <l-header active-key="1"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-key="1-8"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">收货人</span>
                                <i-input :value.sync="seachForm.consigneeLike"  placeholder="请输入收货人" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">手机号码</span>
                               <i-input :value.sync="seachForm.consigneePhoneLike"  placeholder="请输入手机号码" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">提交日期</span>
                                <Date-picker type="date" :value="seachForm.createTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择日期"></Date-picker>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">更新日期</span>
                                <Date-picker type="date" :value="seachForm.updateTime" format="yyyy-MM-dd" @on-change="updateDateChange"  placeholder="选择日期"></Date-picker>
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
                            <Page :total="rowsTotal" :current.sync="pageIndex" @on-change="changePage"></Page>
                        </div>
                    </div>
                </div>
                <div class="layout-copy">
                    版权所有 &copy; 2017.艾臣智能门窗科技有限公司.
                </div>
            </i-col>
        </Row>
        <Modal
            :visible.sync="addModal"
            title="活动参与情况"
            width="700"
            :mask-closable="false" 
            scrollable=>
            <i-form :model="modalForm" label-position="right" :label-width="150">
                <Row>
                    <i-col span="12">
                        <Form-item label="收货人姓名：">
                            {{modalForm.giftSendVo.consignee}}
                        </Form-item>
                        <Form-item label="参与活动时间：">
                            {{modalForm.wxShareVo.createTime}}
                        </Form-item>
                        <Form-item label="助力人数：">
                            {{modalForm.wxShareVo.sharesHad}}
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item label="收货人手机：">
                            {{modalForm.giftSendVo.consigneePhone}}
                        </Form-item>
                        <Form-item label="申请奖品时间：">
                            {{modalForm.giftSendVo.createTime}}
                        </Form-item>
                        <Form-item label="助力完成率">
                            {{(modalForm.wxShareVo.assistValue+0+modalForm.wxShareVo.assistValueHad)/10}}%
                        </Form-item>
                    </i-col>
                </Row>
                <div class="l-tb-title">助力微信用户列表</div>
                <i-table :content="self" size="small" height="380" :columns="shareTbCol" :data="modalForm.wxShareList"></i-table>
            </i-form>
            <div slot="footer">
                <i-button type="ghost" size="large" @click="addModal=fasle">取消</i-button>
                <i-button type="primary" size="large" @click="modalOk">确定</i-button>
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
				addModal:false,
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					createTime:'',
                    updateTime:'',
                    consigneePhoneLike:'',
                    consigneeLike:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                tableCol: [
                {width:150,key:'state',title:'状态',
                    
                    render(row,column,index){
                        return `{{getStatusName(${row.state})}}`;
                    }
                },
                {className:'l-min-width',key:'billCode',title:'单号'},
                {className:'l-min-width',key:'giftName',title:'礼品名称'},
                {className:'l-min-width',key:'consignee',title:'收货人'},
                {className:'l-min-width',key:'consigneePhone',title:'收货人手机号码'},
                {className:'l-min-width',key:'province',title:'省会名称'},
                {className:'l-min-width',key:'city',title:'城市名称'},
                {className:'l-min-width',key:'area',title:'区域名称'},
                {width:400,key:'address',title:'详细地址'},
                {className:'l-min-width',key:'createTime',title:'创建时间'},
                {className:'l-min-width',key:'updateTime',title:'更新时间'
                },{
                    title: '操作',
                    key: 'action',
                    fixed:'right',
                    className:'l-m-min-width',
                    align: 'center',
                    render (row, column, index) {
                        return `
                        
                        
                        <Poptip 
                            confirm
                            title="您确认处理为［已回访］吗？"
                            v-show="${row.state}==1"
                            @on-ok="updateState(${row.id})">
                            <i-button type="primary"  size="small">已回访</i-button>
                        </Poptip>
                        <Poptip 
                            confirm
                            title="您确认处理为［已发货］吗？"
                            v-show="${row.state}<3" 
                            @on-ok="updateState(${row.id})">
                            <i-button type="primary" size="small">已发货</i-button>
                        </Poptip>
                        <i-button type="primary" size="small" icon="eye" @click="look(${row.id})">活动参与情况</i-button>
                        `;
                    }   
                }],
                modalForm:{
                   giftSendVo:[],
                   wxShareList:[],
                   wxShareVo:[] 
                },
                shareTbCol:[
                    {title:'序号',type:'index',width:80,align:'center'},
                    {title:'昵称',key:'wxNickName'},
                    {title:'助力时间',key:'createTime'},
                    {title:'助力值',key:'assistValue',render(row){
                        return `${row.assistValue/10}%`
                    }}
                ],
                isLook:false,
                modelLoading:false
			}
		},
		ready(){
			this.getList();
		},
		methods:{
            getStatusName(v){
                switch(v){
                    case 1:
                    return "已下单";
                    case 2:
                    return "已处理";
                    case 3:
                    return "已发货";
                }
            },
            getList(page=1,rows=10,createTime=null,updateTime=null,consigneePhoneLike=null,consigneeLike=null){
                let self=this;
                self.$Loading.start();
                
                server.getGiftSend(page,rows,createTime,updateTime,consigneePhoneLike,consigneeLike).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
			modalOk(){
                this.addModal=false;
			},
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,10,this.seachForm.createTime,this.seachForm.updateTime,this.seachForm.consigneePhoneLike,this.seachForm.consigneeLike);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.createTime,this.seachForm.updateTime,this.seachForm.consigneePhoneLike,this.seachForm.consigneeLike
                    );
			},
			updateState(id){
                let self=this;
                server.upateGiftSendState(id).then((res)=>{
                    if(res.success){
                        self.$Notice.success({
                            title:'成功',
                            desc:res.message
                        });
                        self.getList(self.pageIndex,10,self.seachForm.createTime,self.seachForm.updateTime,self.seachForm.consigneePhoneLike,self.seachForm.consigneeLike);
                    }else{
                        self.$Notice.error({
                            title:'失败',
                            desc:res.message
                        });
                    }
                })
            },
			look(id){
                this.isLook=true;
                this.modalForm.giftSendVo=[];
                this.modalForm.wxShareList=[];
                this.modalForm.wxShareVo=[];
                this.$Loading.start();
                server.getActInfo(id).then((res)=>{
                    
                    this.modalForm.giftSendVo=res.data.giftSendVo;
                    this.modalForm.wxShareList=res.data.wxShareList;
                    this.modalForm.wxShareVo=res.data.wxShareVo;
                    this.$Loading.finish();
                    this.addModal=true;
                })
                
			},
            createDateChange(e){
                this.seachForm.createTime=e;
            },
            updateDateChange(e){
                this.seachForm.updateTime=e;
            }
		}
	}
</script>