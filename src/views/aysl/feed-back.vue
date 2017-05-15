<style scoped lang="less">
	.l-reply{
        //border-top:1px solid #d7dde4;
        height: 350px;
        overflow-y: auto;
        padding: 10px 20px 10px 10px;
        &:first-child{
            text-align: center;
        }
        .l-date{
            text-align: center;
            width:auto;
            background-color: #d7dde4;
            color:#fff;
            font-size: 9px;
            padding: 3px 8px;
            border-radius: 4px;
        }
        .l-left{
            width: 100%;
            float: left;
            padding: 5px 0;
            .l-p{
                display: inline-block;
                float:left;
            }
        }
        .l-right{
            padding: 5px 0;
            width: 100%;
            float:right;
            .l-p{
                display: inline-block;
                float:right;
            }
        }

    }
</style>
<template>
    <l-header :page-src="pageSrc"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu :page-src="pageSrc"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">提交日期</span>
                                <Date-picker type="date" :value="seachForm.feedbackTimeStr" format="yyyy-MM-dd" @on-change="strDateChange"  placeholder="选择日期"></Date-picker>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">开始日期</span>
                                <Date-picker type="date" :value="seachForm.feedbackTimeBegin" format="yyyy-MM-dd" @on-change="startDateChange"  placeholder="选择日期"></Date-picker>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">结束日期</span>
                                <Date-picker type="date" :value="seachForm.feedbackTimeEnd" format="yyyy-MM-dd" @on-change="endDateChange" placeholder="选择日期"></Date-picker>
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
            :visible.sync="addModal"
            title="新增/编辑"
            width="580"
            :mask-closable="false" 
            scrollable=>
            <i-form :model="modalForm" label-position="right" :label-width="100">
                <Form-item label="反馈标题：">
                    {{modalForm.title}}
                </Form-item>
                <Form-item label="反馈内容：">
                    {{modalForm.content}}
                </Form-item>
                <Form-item label="回复历史：">
                    <div class="l-reply">
                        <div v-for="item in modalForm.feedBackReplyList">
                            <span class="l-date">{{item.replyTime}}</span>
                            <div class="l-left" v-if="item.replyType==1">
                                <div class="l-p">提问人：</div>
                                <div class="fade-transition ivu-tooltip-popper l-chat left" x-placement="right">
                                    <div class="ivu-tooltip-content">
                                        <div class="ivu-tooltip-arrow"></div>
                                        <div class="ivu-tooltip-inner">
                                            <p>{{item.replyCont}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="l-right" v-else>
                                <div class="l-p">：客服人员</div>
                                <div class="fade-transition ivu-tooltip-popper l-chat right" x-placement="left" >
                                    <div class="ivu-tooltip-content">
                                        <div class="ivu-tooltip-arrow"></div>
                                        <div class="ivu-tooltip-inner">
                                            <p>{{item.replyCont}}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </Form-item>
                <Form-item v-show="!isLook" label="回复：">
                    <i-input type="textarea" :value.sync="modalForm.replyCont" :rows="3" placeholder="请输入..." ></i-input>
                 </Form-item>
            </i-form>
            <div slot="footer">
                <i-button type="ghost" size="large" @click="addModal=fasle">取消</i-button>
                <i-button type="primary" size="large" :loading="modelLoading" @click="modalOk">确定</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
	
    function getPageSrc(){
        var _hash=window.location.hash;
        return _hash.replace('#!','');
    }
    export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'意见反馈',href:''}],
				addModal:false,
                activeMenu:'1',
                activeT:'1',
                pageSrc:getPageSrc(),
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
                    feedbackerType:'',
					feedbackTimeStr:'',
                    feedbackTimeBegin:'',
                    feedbackTimeEnd:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
                    
                    {
                        title: '反馈标题',width:200,
                        
                        key: 'title',
                        render (row, column, index) {
                            return `<strong>${row.title}</strong>`;
                        }
                    },
                    {
                        title: '反馈内容',
                        width:200,className:'l-ellipsis',
                        key: 'content'
                    },
                    {
                        title: '反馈状态',
                        width:150,
                        key: 'state',
                        render(row,column,index){
                            return `{{getStatusName(${row.state})}}`;
                        }
                    },
                    {
                        title: '反馈时间',
                       width:170,
                        key: 'feedbackTime'
                    },
                    {
                        title: '回复时间',
                       width:170,
                        key: 'replyTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width:125,
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="primary" size="small" @click="reply(${row.id})">回复</i-button>
                            <i-button type="primary" size="small" title="查看" icon="eye" @click="look(${row.id})"></i-button>
                            `;
                        }   
                    }
                    
                ],
                modalForm:{
                    title:'',
                    content:'',
                    feedBackReplyList:[],
                    replyCont:''
                },
                isLook:false,
                modelLoading:false
			}
		},
        route:{
            data:function(transition){
                if(transition.to.query &&transition.to.query.t){
                    let t=transition.to.query.t;
                    this.seachForm.feedbackerType=t;
                    if(t==5){
                        window.document.title="艾臣营销管理平台－申诉管理";
                        
                        this.pageSrc='/feed/back?t=5';
                    }
                }else{
                    this.pageSrc='/feed/back?t=4';

                }
            }
        },
		ready(){
            
			this.getList();
		},
		methods:{
            getStatusName(v){
                switch(v){
                    case 1:
                    return "待回复";
                    case 2:
                    return "已回答";
                    case 3:
                    return "已查看";
                    case 4:
                    return "反馈人已查看";
                }
            },
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getFeedback(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
			modalOk(){
                let self=this;
                if(this.isLook){
                    this.addModal=false;
                    return
                }
                if(!this.modalForm.replyCont){
                    self.$Notice.warning({
                                title:'警告',
                                desc:'请输入回复内容'
                            })
                    return;
                }
                self.modelLoading=true;
                server.feedBackReply(self.modalForm.id,this.modalForm.replyCont).then((res)=>{
                    if(res.success){
                        self.$Notice.success({
                            title:'回复成功'
                        })
                        server.getFeedbackByid(self.modalForm.id).then((res)=>{
                            self.modalForm=res.data;
                            self.backBottom();
                            self.modelLoading=false;
                            
                        })
                    }else{
                        self.$Notice.error({
                            title:'回复失败',
                            desc:res.message
                        })
                        self.modelLoading=false;
                    }
                })
			},
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,10,this.seachForm.feedbackTimeStr,this.seachForm.feedbackTimeBegin,this.seachForm.feedbackTimeEnd);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.feedbackTimeStr,this.seachForm.feedbackTimeBegin,this.seachForm.feedbackTimeEnd
                    );
			},
			reply(id){
                this.modalForm.feedBackReplyList=[];
                this.isLook=false;
                server.getFeedbackByid(id).then((res)=>{
                    this.modalForm=res.data;
                    this.backBottom();
                })
                this.addModal=true;
                
			},
			look(id){
                this.isLook=true;
                this.modalForm.feedBackReplyList=[];
                server.getFeedbackByid(id).then((res)=>{
                    this.modalForm=res.data;
                    this.backBottom();
                })
                this.addModal=true;
			},
            
            strDateChange(e){
                this.seachForm.feedbackTimeStr=e;
            },
            startDateChange(e){
                this.seachForm.feedbackTimeBegin=e;
            },
            endDateChange(e){
                this.seachForm.feedbackTimeEnd=e;
            },
            backBottom(){
                let obj=document.getElementsByClassName('l-reply')[0];
                this.$nextTick(function () {
                    obj.scrollTop=obj.clientHeight;
                })
            }	
		}
	}
</script>