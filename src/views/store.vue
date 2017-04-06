<style scoped lang="less">

</style>
<template>
    <l-header active-key="1"></l-header>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-key="1-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title @on-click="toggleClick"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="formInline"  inline>
                        <Form-item prop="storeName">
                            <i-input type="text" :value.sync="formInline.storeName" placeholder="模糊查询">
                                <span slot="prepend">门店名称：</span>
                            </i-input>
                        </Form-item>
                        <Form-item>
                            <i-button type="ghost" icon="search" @click="search('formInline')">搜索</i-button>
                        </Form-item>
                        <Form-item>
                            <i-button type="primary" icon="ios-plus-empty" @click="add">新增</i-button>
                        </Form-item>
                    </i-form>
                </div>
                <div class="layout-content">
                    <i-table :content="self" :columns="storeCols" :data="storeData"></i-table>
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
            title="新增/编辑"
            @on-ok="modalOk"
            width="700"
            :loading="true"
            :mask-closable="false" 
            :scrollable="true">
            <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <i-col span="12">
                        <Form-item label="序号" prop="seq">
                            <i-input :value.sync="formValidate.seq" placeholder="请输入序号"></i-input>
                        </Form-item>
                        <Form-item label="门店名称" prop="storeName">
                            <i-input :value.sync="formValidate.storeName" placeholder="请输入门店名称"></i-input>
                        </Form-item>
                        
                        <Form-item label="营业时间" prop="openTime">
                          <i-input :value.sync="formValidate.openTime" placeholder="请输入营业时间,如：9:00-18:00"></i-input>
                        </Form-item>
                        <Form-item label="工作电话" prop="workPhone">
                            <i-input :value.sync="formValidate.workPhone" placeholder="请输入工作电话"></i-input>
                        </Form-item>
                        <Form-item label="门店介绍" prop="introduce">
                            <i-input type="textarea" :value.sync="formValidate.introduce" placeholder="请输入门店介绍"></i-input>
                        </Form-item>
                        <Form-item label="经纬度">
                            <Row>
                                <i-col span="11">
                                    <Form-item prop="longitude">
                                        <i-input :value.sync="formValidate.longitude" placeholder="经度"></i-input>
                                    </Form-item>
                                </i-col>
                                <i-col span="2" style="text-align: center">-</i-col>
                                <i-col span="11">
                                    <Form-item prop="latitude">
                                        <i-input :value.sync="formValidate.latitude" placeholder="维度"></i-input>
                                    </Form-item>
                                </i-col>
                            </Row>
                        </Form-item>
                        
                        
                    </i-col>
                    <i-col span="12">
                        <Form-item label="缩略图" prop="thumbnail">
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
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" :visible.sync="visible">
                                <img :src="imgName" v-if="visible" style="width: 100%">
                            </Modal>
                        </Form-item>
                        <Form-item label="门店图片" prop="storeImgs">
                            <div class="l-upload-list" v-for="item in uploadList">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.avatar">
                                    <div class="l-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                v-ref:upload
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                :action="baseUrl+'/common/imgUpload'"
                                :data="uploadData"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </Form-item>
                    </i-col>
                </Row>
                <Form-item label="门店地址" prop="address">
                    <Row>
                        <i-col span="14">
                            <i-input :value.sync="formValidate.address" placeholder="请输入门店地址"></i-input> 
                        </i-col>
                        <i-col span="6">
                            <i-button icon="ios-search" @click="getGpsByAddress">获取经纬度</i-button>
                        </i-col>
                        <i-col span="4">
                            <a  href="http://map.yanue.net/toLatLng/" target="_blank">网页查询</a>
                        </i-col>
                    </Row>
                            
                </Form-item>
                <Form-item label="门店所属用户" prop="agentInfoId">
                    <i-select :model.sync="formValidate.agentInfoId">
                        <i-option v-for="item in agentList" :value="item.value">{{ item.label }}</i-option>
                    </i-select>
                </Form-item>
            </i-form>
        </Modal>
    </div>
</template>
<script>
import server from '../libs/server'
import LHeader from '../components/header'
import LeftMenu from '../components/left-menu'
import LTitle from '../components/title'
    export default {
        components:{LeftMenu,LTitle,LHeader},
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                leftMenu:true,
                addModal:false,
                rowsTotal:10,
                pageIndex:1,
                formInline:{
                    storeName:''
                },
                formValidate:{
                    storeName:'',
                    openTime:'',
                    workPhone:'',
                    address:'',
                    introduce:'',
                    thumbnail:'',
                    storeImgs:'',
                    longitude:'',
                    latitude:'',
                    seq:'',
                    agentInfoId:''
                },
                ruleValidate: {
                    storeName: [
                        { required: true, message: '门店名称不能为空', trigger: 'blur' }
                    ],
                    openTime: [
                        { required: true, message: '营业时间不能为空', trigger: 'blur' }
                    ]
                },
                agentList:[],
                self: this,
                storeCols: [
                    {
                        title: '操作',
                        key: 'action',
                        className:'l-min-width',
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="ghost" size="small" icon="edit" @click="update(${row.id})">修改</i-button>
                            <Poptip
                                confirm
                                title="您确认删除这条内容吗？"
                                @on-ok="remove(${row.id})">
                                <i-button type="ghost" icon="ios-trash" size="small">删除</i-button>
                            </Poptip>`;
                        }   
                    },
                    {
                        title: '门店名称',
                        className:'l-min-width',
                        key: 'storeName',
                        render (row, column, index) {
                            return `<strong>${row.storeName}</strong>`;
                        }
                    },
                    {
                        title: '营业时间',
                        className:'l-min-width',
                        key: 'openTime'
                    },
                    {
                        title: '工作电话',
                        className:'l-min-width',
                        key: 'workPhone'
                    },
                    {
                        title: '门店地址',
                        className:'l-m-min-width',
                        key: 'address'
                    }
                    
                ],
                storeData:[],
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
                defaultList: [],
                avatarDefaultList:[],
                imgName: '',
                visible: false
            }
        },
        ready(){
            let self=this;
           
            self.getList(self.pageIndex,10);
            self.getAgentList();
            
        },
        computed: {
           uploadList () {
            //console.log(this.$refs)
                return this.$refs.upload ? this.$refs.upload.fileList : [];
            },
            avatarUploadList () {
                return this.$refs.avatarupload ? this.$refs.avatarupload.fileList : [];
            }
        },
        methods: {
            getList(page=1,rows=10,storeName=''){
                let self=this;
                self.$Loading.start();
                server.getStoreList(page,rows,storeName).then((res)=>{
                    self.storeData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;//Math.ceil(res.total/10);
                    self.$Loading.finish();
                })
            },  
            getAgentList(){
                let self=this;
                server.getAgentUserList().then((res)=>{
                    if(res.data.length>0){
                        res.data.forEach((item)=>{
                             self.agentList.push({
                                value:item.id,
                                label:item.agentName+' '+item.address+' '+item.contacter
                            })
                        })
                        
                    }
                   // self.agentList=res;
                })
            },
            toggleClick () {
                this.leftMenu=!this.leftMenu;
                if (this.leftMenu) {
                    this.spanRight = 20;

                } else {
                    this.spanRight = 24;
                }
            },
            update(id){
                let self=this;
                
                server.getStoreListByid(id).then((res)=>{   
                    return server.jsonParse(res.data);
                }).then((list)=>{
                    self.formValidate=list;
                    if(!self.formValidate || !self.formValidate.id){
                        return;
                    }
                    //let _index=self.data6.findIndex((v)=>v.id==id);
                    //self.formValidate=self.data6[_index];

                    //<;>
                    self.defaultList=[];
                    self.avatarDefaultList=[]
                    
                    if(self.formValidate.storeImgs){
                        let _list=self.formValidate.storeImgs.split('<;>');
                        _list.forEach(function(item){
                            if(item){
                                self.defaultList.push({
                                    url:item,
                                    avatar:server.image.thumb(item,60,60)
                                })
                            }
                        })
                    }
                    if(self.formValidate.thumbnail){
                        self.avatarDefaultList.push({
                            url:self.formValidate.thumbnail,
                            avatar:server.image.thumb(self.formValidate.thumbnail,60,60)
                        })
                    }
                    self.addModal=true;
                })
            },
            remove(id){
                let self=this;
                server.deleteStoreByid(id).then((res)=>{
                    if(res.success){
                        self.getList(self.pageIndex,10,self.formInline.storeName);
                    }else{
                        self.$Notice.error({
                            title:'删除失败',
                            desc:res.message
                        });
                    }
                })
            },
            search(formData){
                this.pageIndex=1;
                this.getList(1,10,this.formInline.storeName);
            },
            add(){
                for (var obj in this.formValidate) {
                    this.formValidate[obj]='';
                }
                this.defaultList=[];
                this.addModal=true;
            },
            changePage (e){
                this.pageIndex=e+0;
                this.getList(e+0,10,this.formInline.storeName);
            },
            modalOk(){
                //新增
                let self=this;
                if(self.uploadList.length>0){
                    self.formValidate.storeImgs='';
                    self.uploadList.forEach(function(item){
                        self.formValidate.storeImgs+=item.url+'<;>'
                    })
                    //self.formValidate.storeImgs=self.uploadList.join('<;>');
                }
                if(self.formValidate.id){
                    server.updateStore(self.formValidate).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'修改成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.formInline.storeName);
                           
                        }else{
                            self.$Notice.error({
                                title:'修改失败',
                                desc:res.message
                            })
                        }
                    })
                }else{
                    server.addStore(self.formValidate).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'新增成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.formInline.storeName);
                        }else{
                            self.$Notice.error({
                                title:'新增失败',
                                desc:res.message
                            })
                        }
                    });
                }
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = res.data;
                file.avatar = server.image.thumb(res.data,60,60);
               
            },
            avatarSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = res.data;
                file.avatar = server.image.thumb(res.data,60,60);
                this.avatarDefaultList=[]
                this.avatarDefaultList.push({
                    url:file.url,
                    avatar:file.avatar
                })
                if(file.url){
                    this.formValidate.thumbnail=file.url;
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
            handleBeforeUpload () {
                
                const check = this.uploadList.length < 16;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 15 张图片'
                    });
                }
                return check;
            },
            avatarBeforeUpload () {
                
                const check = this.avatarUploadList.length < 2;
                if (!check) {
                    this.$Notice.warning({
                        title: '缩略图只能 1 张'
                    });
                }
                return check;
            },
            getGpsByAddress(){
                let self=this;
                server.getGpsByAddress(self.formValidate.address).then((res)=>{
                    self.formValidate.latitude=res.data[1];
                    self.formValidate.longitude=res.data[0];
                })
            }
        }
    }
</script>
