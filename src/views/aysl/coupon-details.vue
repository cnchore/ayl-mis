<style scoped lang="less">
	
	
</style>
<template>
    <l-header page-src="/coupon/details"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/coupon/details"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="add" :is-show="getAction('新增')" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm" inline>
                        <Form-item prop="category">
                            <div class="l-sel-inline">
                                <span slot="prepend">券类型</span>
                                <i-select :model.sync="seachForm.couponType" clearable placeholder="请选择">
                                    <i-option v-for="item in couponTypeList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </div>
                        </Form-item>
                        <Form-item prop="category">
                            <div class="l-sel-inline">
                                <span slot="prepend">是否启用</span>
                                <i-select :model.sync="seachForm.isEnabled" clearable placeholder="请选择">
                                    <i-option v-for="item in isEnabledList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </div>
                        </Form-item>
                        <Form-item>
                            <i-button type="ghost" icon="search" @click="search('formInline')">搜索</i-button>
                        </Form-item>
                        
                    </i-form>
                </div>
                <div class="layout-content">
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
            @on-ok="modalOk"
            width="800"
            :mask-closable="false" 
            scrollable=>
             <i-form v-ref:form-validate :model="modelForm" :rules="ruleValidate" :label-width="125">
                <Row>
                    <i-col span="12">
                        <Form-item label="优惠券名称" prop="couponName">
                          <i-input :value.sync="modelForm.couponName" placeholder="请输入优惠券名称"></i-input>
                            
                        </Form-item>
                        <Form-item label="优惠券类型">
                            <i-input value="现金券" readonly ></i-input>
                        </Form-item>
                        
                        <Form-item label="券面值(元)" prop="couponValue">
                          <i-input :value.sync="modelForm.couponValue" placeholder="请输入券面值"></i-input>
                         
                        </Form-item>
                        <Form-item label="兑换规则说明" prop="ruleDesc">
                          <i-input :value.sync="modelForm.ruleDesc" placeholder="例如：2000以下减50"></i-input>
                        </Form-item>
                        <Form-item label="客服电话" prop="serviceTel">
                          <i-input :value.sync="modelForm.serviceTel" placeholder="请输入客服电话"></i-input>
                        </Form-item>
                        
                        
                    </i-col>
                    <i-col span="12">
                        <Form-item label="有效开始时间" prop="startTimeStr">
                            <Date-picker type="datetime" :value="modelForm.startTime" format="yyyy-MM-dd HH:mm:ss" @on-change="strDateChange"  placeholder="选择时间"></Date-picker>
                        </Form-item>
                        <Form-item label="有效终止时间" prop="endTimeStr">
                             <Date-picker type="datetime" :value="modelForm.endTime" format="yyyy-MM-dd HH:mm:ss" @on-change="endDateChange"  placeholder="选择时间"></Date-picker>
                        </Form-item>
                        <Form-item label="兑奖须知" prop="notice">
                            <i-input :value.sync="modelForm.notice" type="textarea" :rows="3"  placeholder="请输入兑奖须知"></i-input>
                        </Form-item>
                         <Form-item label="备注说明" prop="comments">
                            <i-input :value.sync="modelForm.comments" type="textarea" :rows="2" placeholder="请输入备注"></i-input>
                        </Form-item>
                        
                    </i-col>
                </Row>
                <Form-item label="兑换规则设定">
                    <Row v-for="(index,item) in modelForm.couponRuleList">
                        <i-col span="2" >规则{{index}}.</i-col>
                        <i-col span="5">
                            <i-input :value.sync="item.startPrice" placeholder="开始金额"></i-input>
                        </i-col>
                        <i-col span="1" style="text-align: center;">~</i-col>
                        <i-col span="5">
                            <i-input :value.sync="item.endPrice" placeholder="结束金额"></i-input>
                        </i-col>
                        <i-col span="2" style="text-align: right;"> 减免</i-col>
                        <i-col span="5">
                            <i-input :value.sync="item.deratePrice" placeholder="减免金额"></i-input>
                        </i-col>
                        <i-col span="1">元</i-col>
                    </Row>
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
import server,{storage} from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'优惠券明细配置',href:''}],
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
				addModal:false,
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					couponType:'',
                    isEnabled:''
				},
                couponTypeList:[{value:1,label:'现金券'}],
                isEnabledList:[{value:0,label:'禁用'},{value:1,label:'启用'}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                menuActList:server.getMenuActionList('/coupon/details'),
				tableCol: [
                    
                    {
                        title: '是否启用',width:95,
                        key: 'isEnabled',
                        render(row,column,index){
                            return `{{getStatusName(${row.isEnabled},'s')}}`;
                        }
                    },
                    {
                        title: '优惠券名称',width:135,
                        key: 'couponName'
                    },
                    {
                        title: '优惠券类型',width:135,
                        key: 'couponType',
                        render(row,column,index){
                            return `{{getStatusName(${row.couponType},'t')}}`;
                        }
                    },
                    {
                        title: '券面值',width:200,
                        key: 'couponValue',
                        render(row){
                            return `{{${row.couponValue} | currency '¥' '2'}}`
                        }
                    },
                    {
                        title: '有效开始时间',width:170,
                        key: 'startTime'
                    },
                    {
                        title: '有效终止时间',width:170,
                        key: 'endTime'
                    },
                    {
                        title: '客服电话',width:170,
                        key: 'serviceTel'
                    },
                    {title:' '},
                    {
                        title: '操作',
                        key: 'action',width:135,
                        fixed:'right',
                        align: 'center',
                        render (row, column, index) {
                            return `
                                <i-button type="primary" size="small" v-if="getAction('编辑')" icon="edit" @click="modalShow(${row.id})" title="修改"></i-button>
                                
                                <i-button type="primary"
                                    v-if="getAction('启用') && ${row.isEnabled}==0"
                                    @click="changeState(${row.id},true,'您确认启用吗？')"
                                     size="small" >启用</i-button>

                                <i-button type="primary" 
                                    v-if="getAction('禁用') && ${row.isEnabled}==1"
                                    @click="changeState(${row.id},false,'您确认禁用吗？')"
                                     size="small" >禁用</i-button>

                            `;
                        }   
                    }
                ],
                modelForm:{
                    id:'',
                    couponName:'',
                    couponType:'',
                    couponValue:'',
                    ruleDesc:'',
                    notice:'',
                    serviceTel:'',
                    comments:'',
                    startTimeStr:'',
                    endTimeStr:'',
                    couponRuleList:[]
                },

                ruleValidate:{
                    couponName:[
                        { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
                    ],
                    couponType:[
                        { required: true, message: '优惠券类型不能为空', trigger: 'blur' }
                    ],
                    couponValue:[
                        { required: true, message: '券面值不能为空', trigger: 'blur' }
                    ],
                    startTimeStr:[
                        { required: true, message: '有效开始时间不能为空', trigger: 'blur' }
                    ],
                    endTimeStr:[
                        { required: true, message: '有效结束时间不能为空', trigger: 'blur' }
                    ],
                    couponRules:[
                        { required: true, message: '兑换规则设定不能为空', trigger: 'blur' }
                    ]
                },
                
                isLook:false,
                modelLoading:false
			}
		},
		ready(){
			this.getList();
		},
        computed:{
           
        },
		methods:{
            getAction(name=''){
                var l=this.menuActList.filter((item)=>item.menuName===name).length;
                if(l>0){
                    return true;
                }
                return false;
            },
            strDateChange(d){
                this.modelForm.startTimeStr=d;
            },
            endDateChange(d){
                this.modelForm.endTimeStr=d;
            },
            
            getStatusName(v,t){
                if(t=='s'){
                    switch(v){
                        case 0:
                            return "禁用";
                        case 1:
                            return "启用";
                    }
                }
                if(t=='t'){
                    switch(v){
                        case 1:
                            return "现金券";
                    }
                }
                
            },
            getList(page=1,rows=10,couponType=null,isEnabled=null){
                let self=this;
                self.$Loading.start();
                server.getCouponDetail(page,rows,couponType,isEnabled).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
			modalOk(){
                //新增
                let self=this;
                if(self.isLook){
                    self.isLook=false;
                    self.addModal=false;
                    return;
                }
                self.modelForm.couponType=1;
                self.modelLoading=true;
                console.log(self.modelForm);
                if(self.modelForm.id){
                    server.updateCouponDetail(self.modelForm).then((res)=>{
                        self.modelLoading=false;
                        if(res.success){
                            self.$Notice.success({
                                title:'修改成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.seachForm.couponType,self.seachForm.isEnabled);
                           
                        }else{

                            self.$Notice.error({
                                title:'修改失败',
                                desc:res.message
                            })
                        }
                    })
                }else{
                    server.addCouponDetail(self.modelForm).then((res)=>{
                        self.modelLoading=false;
                        if(res.success){
                            self.$Notice.success({
                                title:'新增成功'
                            })
                            self.addModal=false;
                           self.getList(self.pageIndex,10,self.seachForm.couponType,self.seachForm.isEnabled);
                        }else{
                            self.$Notice.error({
                                title:'新增失败',
                                desc:res.message
                            })
                        }
                    });
                }
			},
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,10,this.seachForm.couponType,this.seachForm.isEnabled);
            },
			search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.couponType,this.seachForm.isEnabled);
			},
			add(){
                this.isLook=false;
                for (var obj in this.modelForm) {
                    this.modelForm[obj]='';
                }
                this.modelForm.couponRuleList=[
                    {deratePrice:'',startPrice:'',endPrice:''},
                    {deratePrice:'',startPrice:'',endPrice:''},
                    {deratePrice:'',startPrice:'',endPrice:''},
                    {deratePrice:'',startPrice:'',endPrice:''},
                    {deratePrice:'',startPrice:'',endPrice:''}
                ];
                this.addModal=true;
			},
			modalShow(id){
                let self=this;
                self.isLook=false;
                self.$Loading.start();
                server.getCouponDetailByid(id).then((res)=>{   
                    self.$Loading.finish();

                    return server.jsonParse(res.data);

                }).then((list)=>{
                    self.modelForm=list.couponDetailVo;
                    if(list.couponRuleList){
                        self.modelForm.couponRuleList=[];
                        self.modelForm.couponRuleList=list.couponRuleList;

                        
                    }
                    if(!self.modelForm || !self.modelForm.id){
                        return;
                    }
                    self.addModal=true;
                })
			},
            changeState(id,isEnabled,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.changeCouponDetail(id,isEnabled).then((res)=>{
                            if(res.success){
                                self.$Notice.success({
                                    title:'成功',
                                    desc:res.message
                                });
                                self.getList(self.pageIndex,10,self.seachForm.couponType,self.seachForm.isEnabled);
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
                
            }
		}
	}
</script>