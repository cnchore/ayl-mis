<style scoped lang="less">
	
	
</style>
<template>
    <l-header active-key="1"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-key="1-6"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="add" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm" inline>
                        <Form-item prop="category">
                            <div class="l-sel-inline">
                                <span slot="prepend">活动类型</span>
                                <i-select :model.sync="seachForm.activityType" clearable placeholder="请选择">
                                    <i-option v-for="item in activityTypeList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </div>
                        </Form-item>
                        <Form-item prop="category">
                            <div class="l-sel-inline">
                                <span slot="prepend">发布状态</span>
                                <i-select :model.sync="seachForm.state" clearable placeholder="请选择">
                                    <i-option v-for="item in stateList" :value="item.value">{{ item.label }}</i-option>
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
                    <i-col span="10">
                        <Form-item label="活动类型" prop="activityType">
                            <i-select :model.sync="modelForm.activityType" placeholder="请选择">
                                <i-option v-for="item in activityTypeList" :value="item.value">{{ item.label }}</i-option>
                            </i-select>
                        </Form-item>
                        <Form-item label="优惠券类型">
                            <i-input value="现金券" readonly ></i-input>
                        </Form-item>
                        
                        <Form-item label="使用优惠券" prop="couponFkid">
                          <i-select :model.sync="modelForm.couponFkid" placeholder="请选择">
                                <i-option v-for="item in couponFkList" :value="item.value">{{ item.label }}</i-option>
                            </i-select>
                        </Form-item>
                        <Form-item label="活动标题" prop="title">
                          <i-input :value.sync="modelForm.title" placeholder="请输入活动标题"></i-input>
                        </Form-item>
                        <Form-item label="活动摘要" prop="summary">
                          <i-input :value.sync="modelForm.summary" type="textarea" :rows="3" placeholder="请输入活动摘要"></i-input>
                        </Form-item>
                        <Form-item label="活动开始时间" prop="startTimeStr">
                            <Date-picker type="datetime" :value="modelForm.startTime" format="yyyy-MM-dd HH:mm:ss" @on-change="strDateChange"  placeholder="选择日期"></Date-picker>
                        </Form-item>
                        <Form-item label="活动终止时间" prop="endTimeStr">
                             <Date-picker type="datetime" :value="modelForm.startTime" format="yyyy-MM-dd HH:mm:ss" @on-change="endDateChange"  placeholder="选择日期"></Date-picker>
                        </Form-item>
                        <Form-item label="活动人数限制" prop="limitNum">
                            <i-input :value.sync="modelForm.limitNum" placeholder="请输入活动人数"></i-input>
                        </Form-item>
                        <Form-item label="活动地区" prop="address">
                            <Cascader :data="addressData" @on-change="addrSelected" :value.sync="addressValue" trigger="hover"></Cascader>
                        </Form-item>
                        
                    </i-col>
                    <i-col span="14">
                        <Form-item label="活动图" prop="thumb">
                            <div class="l-upload-list" v-for="item in avatarUploadList">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.avatar">
                                    <div class="l-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click="handleView(item.url)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                v-ref:avatarupload
                                :show-upload-list="false"
                                :default-file-list="avatarDefaultList"
                                :on-success="avatarSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="avatarBeforeUpload"
                                type="drag"
                                :action="baseUrl+'/common/imgUpload'"
                                :data="uploadData"
                                v-show="!isLook"
                                :class="{'show':!isLook}"
                                style="width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" :visible.sync="visible">
                                <img :src="imgName" v-if="visible" style="width: 100%">
                            </Modal>
                        </Form-item>
                        <Form-item label="活动内容" prop="content">
                            <v-editor :input-content="modelForm.content" :out-content.sync="outProp"></v-editor>
                        </Form-item>
                        <Form-item label="活动地点" prop="location">
                          <i-input :value.sync="modelForm.location" placeholder="请输入活动地点"></i-input>
                        </Form-item>
                        
                        <Form-item v-show="isToVerify" label="审批意见" prop="curAuditOpinion">
                          <i-input :value.sync="curAuditOpinion" placeholder="请输入审批意见"></i-input>
                        </Form-item>
                    </i-col>
                </Row>
                
            </i-form>
            <div slot="footer">
                <i-button type="ghost" size="large" @click="addModal=fasle">取消</i-button>
                <i-button type="primary" v-show="!isToVerify" size="large" :loading="modelLoading" @click="modalOk">确定</i-button>
                <i-button type="primary" v-show="isToVerify" size="large" :loading="modelLoading" @click="verify('y')">通过</i-button>
                <i-button type="primary" v-show="isToVerify" size="large" :loading="modelLoading" @click="verify('n')">不通过</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
import server,{storage} from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import Editor from '../../components/editor'
import LTitle from '../../components/title'
import chinaAddress from '../../components/china-address-0408'
	export default{
		components:{LHeader,'v-editor':Editor,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'优惠活动发布',href:''}],
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
				addModal:false,
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					activityType:'',
                    state:''
				},
                activityTypeList:[{value:1,label:'线上活动'},{value:2,label:'线下活动'},{value:3,label:'电商活动'}],
                stateList:[{value:0,label:'未发布'},{value:1,label:'已发布'}],
                couponFkList:[],
                addressData:chinaAddress,
                addressValue:[],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
                    
                    {
                        title: '发布状态',width:125,
                        key: 'state',
                        render(row,column,index){
                            return `{{getStatusName(${row.state},'s')}}`;
                        }
                    },
                    {
                        title: '审核状态',width:125,
                        key: 'auditState',
                        render(row,column,index){
                            return `{{getStatusName(${row.auditState},'v')}}`;
                        }
                    },
                    {
                        title: '活动类型',width:125,
                        key: 'activityType',
                        render(row,column,index){
                            return `{{getStatusName(${row.activityType},'a')}}`;
                        }
                    },
                    {
                        title: '活动标题',width:125,
                        key: 'title'
                    },
                    {
                        title: '活动摘要',width:125,
                        className:'l-ellipsis',
                        key: 'summary'
                    },
                    {
                        title: '活动开始时间',width:170,
                        key: 'startTime'
                    },
                    {
                        title: '活动结束时间',width:170,
                        key: 'endTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:230,
                        fixed:'right',
                        align: 'center',
                        render (row, column, index) {
                            return `
                                <i-button type="primary" v-show="btnShow(${row.userType},${row.state},${row.auditState},'e')" size="small" icon="edit" @click="modalShow(${row.id},'u')" title="修改"></i-button>
                                <i-button type="primary" v-show="btnShow(${row.userType},${row.state},${row.auditState},'a')" size="small"  @click="apply(${row.id})">申请</i-button>
                                
                                <i-button type="primary" 
                                    v-show="btnShow(${row.userType},${row.state},${row.auditState},'ul')"
                                    @click="changeState(${row.id},'您确认上线吗？')"
                                    size="small" icon="arrow-graph-up-right" title="上线"></i-button>

                                <i-button type="primary"  
                                    v-show="btnShow(${row.userType},${row.state},${row.auditState},'dl')"
                                    @click="changeState(${row.id},'您确认下线吗？')"
                                    size="small" icon="arrow-graph-down-right" title="下线"></i-button>
                                
                                <i-button type="primary" v-show="btnShow(${row.userType},${row.state},${row.auditState},'vf')" size="small" icon="hammer" @click="modalShow(${row.id},'v')" title="审核"></i-button>
                                <i-button type="primary" size="small" icon="eye" @click="modalShow(${row.id},'l')" title="查看"></i-button>
                            `;
                        }   
                    }
                ],
                modelForm:{
                    activityType:'',             //类型：1线上活动    2线下活动    3电商活动
                    title:'',                     //活动标题    
                    summary:'',                  //活动摘要
                    location:'',                  //活动地点
                    limitNum:'',                //活动人数限制
                    url:'',                       //活动图
                    content:'',                  //活动内容
                    couponFkid:'',              //优惠券配置id
                    area:'',                     //区域
                    province:'',                 //省会
                    provinceId:'',              //省会id
                    city:'',                     //城市
                    cityId:'',                  //城市id
                    cityCode:'',                 //城市编码
                    areaId:'',                  //区域id
                    startTimeStr:'',              //活动开始时间                   
                    endTimeStr:''             //活动结束时间

                },

                ruleValidate:{
                    title:[
                        { required: true, message: '活动标题不能为空', trigger: 'blur' }
                    ],
                    summary:[
                        { required: true, message: '活动摘要不能为空', trigger: 'blur' }
                    ],
                    startTimeStr:[
                        { required: true, message: '活动开始时间不能为空', trigger: 'blur' }
                    ],
                    endTimeStr:[
                        { required: true, message: '活动终止时间不能为空', trigger: 'blur' }
                    ],
                    limitNum:[
                        { required: true, message: '活动人数限制不能为空', trigger: 'blur' }
                    ],
                    address:[
                        { required: true, message: '活动地区不能为空', trigger: 'blur' }
                    ],
                    location:[
                        { required: true, message: '活动地点不能为空', trigger: 'blur' }
                    ],
                    thumb:[
                        { required: true, message: '缩略图不能为空', trigger: 'blur' }
                    ]
                },
                outProp:'',
                avatarDefaultList:[],
                
                isLook:false,
                isToVerify:false,
                imgName: '',
                visible: false,
                modelLoading:false,
                curAuditOpinion:''
			}
		},
		ready(){
			this.getList();
            this.getFKlist();
		},
        computed:{
            
            avatarUploadList () {
                return this.$refs.avatarupload ? this.$refs.avatarupload.fileList : [];
            }
        },
		methods:{
            addrSelected(value,selectedData){
                //console.log(selectedData);
                if(selectedData.length>0){
                    this.modelForm.provinceId=selectedData[0].value;
                    this.modelForm.province=selectedData[0].label;
                    this.modelForm.cityId=selectedData[1].value;
                    this.modelForm.city=selectedData[1].label;
                    this.modelForm.areaId=selectedData[2].value;
                    this.modelForm.area=selectedData[2].label;
                    this.modelForm.cityCode=selectedData[2].code;
                }else{
                    this.modelForm.provinceId='';
                    this.modelForm.province='';
                    this.modelForm.cityId='';
                    this.modelForm.city='';
                    this.modelForm.areaId='';
                    this.modelForm.area='';
                    this.modelForm.cityCode='';
                }

            },
            getFKlist(){
                let self=this;
                server.getAllCouponDetail().then((res)=>{
                    res.data.forEach((item)=>{
                        self.couponFkList.push({
                            value:item.id,
                            label:item.couponName
                        });
                    })
                })
            },
            strDateChange(d){
                this.modelForm.startTimeStr=d;
            },
            endDateChange(d){
                this.modelForm.endTimeStr=d;
            },
            btnShow(userType,state,auditState,t){
                let userInfo=storage.session.get('userInfo');
                if(!userInfo || !userInfo.type)
                {
                    return false;
                }
                let eShow=false,ulShow=false,dlShow=false,vfShow=false,aShow=false;
                
                if(userInfo.type==1){
                    if(userType==1){
                        if(state==0){
                            eShow=true;
                            ulShow=true;
                        }else if(state==1){
                            dlShow=true;
                        }
                    }else if(userType==2 && auditState==1){
                        vfShow=true;
                    }
                }else if(userInfo.type==2){
                    if(state==0 && (auditState==0 || auditState==3)){
                        eShow=true;
                        aShow=true;
                    }else if(state==0 && auditState==2){
                        ulShow=true;
                    }else if(state==1){
                        dlShow=true;
                    }
                }
                switch(t){
                    case 'e':
                        return eShow;
                    case 'ul':
                        return ulShow;
                    case 'dl':
                        return dlShow;
                    case 'vf':
                        return vfShow;
                    case 'a':
                        return aShow;
                }
                
            },
            getStatusName(v,t){
                if(t=='s'){
                    switch(v){
                        case 0:
                            return "未发布";
                        case 1:
                            return "已发布";
                    }
                }
                if(t=='a'){
                    switch(v){
                        case 1:
                            return "线上活动";
                        case 2:
                            return "线下活动";
                        case 3:
                            return "电商活动";
                    }
                }
                if(t=='v'){
                    switch(v){
                        case 0:
                            return "未提交审核";
                        case 1:
                            return "审核中";
                        case 2:
                            return "审核通过";
                        case 3:
                            return "审核不通过";
                    }
                }
            },
            getList(page=1,rows=10,activityType=null,state=null){
                let self=this;
                self.$Loading.start();
                server.getCoupon(page,rows,activityType,state).then((res)=>{
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
                self.modelForm.content=self.outProp;
                self.modelLoading=true;
                if(self.modelForm.id){
                    server.updateCoupon(self.modelForm).then((res)=>{
                        self.modelLoading=false;
                        if(res.success){
                            self.$Notice.success({
                                title:'修改成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.seachForm.activityType,self.seachForm.state);
                           
                        }else{

                            self.$Notice.error({
                                title:'修改失败',
                                desc:res.message
                            })
                        }
                    })
                }else{
                    server.addCoupon(self.modelForm).then((res)=>{
                        self.modelLoading=false;
                        if(res.success){
                            self.$Notice.success({
                                title:'新增成功'
                            })
                            self.addModal=false;
                           self.getList(self.pageIndex,10,self.seachForm.category,self.seachForm.state);
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
                this.getList(index+0,10,this.seachForm.activityType,this.seachForm.state);
            },
			search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.activityType,this.seachForm.state);
			},
			add(){
                this.isLook=false;
                this.isToVerify=false;
                for (var obj in this.modelForm) {
                    this.modelForm[obj]='';
                }
                this.outProp='';
                this.avatarDefaultList=[];
                this.addressValue=[];
                this.addModal=true;
			},
			modalShow(id,t){
                let self=this;
                if(t=='u'){
                    self.isLook=false;
                    self.isToVerify=false;
                }else if(t=='l'){
                    self.isLook=true;
                    self.isToVerify=false;
                }else if(t=='v'){
                    self.isLook=false;
                    self.isToVerify=true;
                }
                self.addressValue=[];
                self.$Loading.start();
                server.getCouponByid(id).then((res)=>{   
                    self.$Loading.finish();

                    return server.jsonParse(res.data);

                }).then((list)=>{
                    self.modelForm=list;
                    if(!self.modelForm || !self.modelForm.id){
                        return;
                    }
                    self.avatarDefaultList=[];
                    self.outProp=self.modelForm.content;
                    if(self.modelForm.url){
                        
                        self.avatarDefaultList.push({
                            url:self.modelForm.url,
                            avatar:server.image.thumb(self.modelForm.url,60,60)
                        })
                    }
                    if(self.modelForm.provinceId){
                        self.addressValue.push(self.modelForm.provinceId);
                    }
                    if(self.modelForm.cityId){
                        self.addressValue.push(self.modelForm.cityId);
                    }
                    if(self.modelForm.areaId){
                        self.addressValue.push(self.modelForm.areaId);
                    }
                    self.addModal=true;
                })
			},
            changeState(id,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.changeCoupon(id).then((res)=>{
                            if(res.success){
                                self.$Notice.success({
                                    title:'成功',
                                    desc:res.message
                                });
                                self.getList(self.pageIndex,10,self.seachForm.activityType,self.seachForm.state);
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
			verify(t){
                let self=this;
                self.modelLoading=true;
                
                let isPass=false;
                if(t=='y'){
                    isPass=true;
                }else if(!self.curAuditOpinion){
                    self.modelLoading=false;
                    self.$Notice.warning({
                            title:'警告',
                            desc:'审核意见不能为空'
                        });

                    return;
                }
                self.isToVerify=false;
                server.verifyCoupon(self.modelForm.id,isPass,self.curAuditOpinion).then((res)=>{
                    self.modelLoading=false;
                    if(res.success){
                        self.$Notice.success({
                            title:'成功',
                            desc:res.message
                        });
                        self.addModal=false;
                        self.getList(self.pageIndex,10,self.seachForm.activityType,self.seachForm.state);
                    }else{
                        self.$Notice.error({
                            title:'失败',
                            desc:res.message
                        });
                    }
                })
			},
            apply(id){
               let self=this;
                server.applyCoupon(id).then((res)=>{
                    if(res.success){
                        self.$Notice.success({
                            title:'申请成功',
                            desc:res.message
                        });
                        self.getList(self.pageIndex,10,self.seachForm.activityType,self.seachForm.state);
                    }else{
                        self.$Notice.error({
                            title:'申请失败',
                            desc:res.message
                        });
                    }
                }) 
            },
           
            //===========缩略图方法=start====================
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            avatarSuccess (res, file) {
                file.url = res.data;
                file.avatar = server.image.thumb(res.data,60,60);
                this.avatarDefaultList=[]
                this.avatarDefaultList.push({
                    url:file.url,
                    avatar:file.avatar
                })
                if(file.url){
                    this.modelForm.url=file.url;
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M'
                });
            },
            avatarBeforeUpload () {
                
                const check = this.avatarUploadList.length < 2;
                if (!check) {
                    this.$Notice.warning({
                        title: '缩略图只能 1 张'
                    });
                }
                return check;
            }
            //===========缩略图方法=end====================  	
		}
	}
</script>