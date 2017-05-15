<style scoped lang="less">
	
	
</style>
<template>
    <l-header page-src="/product"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/product"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="add" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm" inline>
                        <Form-item prop="category">
                            <div class="l-sel-inline">
                                <span slot="prepend">产品类别</span>
                                <i-select :model.sync="seachForm.category" placeholder="请选择">
                                    <i-option v-for="item in categoryList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </div>
                        </Form-item>
                        <Form-item prop="productNameLike">
                            <i-input type="text" :value.sync="seachForm.productNameLike" placeholder="模糊查询">
                                <span slot="prepend">产品名称</span>
                            </i-input>
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
            width="1000"
            loading
            :mask-closable="false" 
            scrollable=>
             <i-form v-ref:form-validate :model="modelForm" :rules="ruleValidate" :label-width="100">
                <Row>
                    <i-col span="12">
                        <Form-item label="序号" prop="seq">
                            <i-input :value.sync="modelForm.seq" placeholder="请输入序号"></i-input>
                        </Form-item>
                        <Form-item label="产品类别" prop="category">
                            <i-select :model.sync="modelForm.category" placeholder="请选择">
                                <i-option v-for="item in categoryList" :value="item.value">{{ item.label }}</i-option>
                            </i-select>
                        </Form-item>
                        
                        <Form-item label="产品名称" prop="productName">
                          <i-input :value.sync="modelForm.productName" placeholder="请输入产品名称"></i-input>
                        </Form-item>
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
                        <Form-item label="产品特性" prop="productProp">
                            <v-editor :input-content="modelForm.productProp" :out-content.sync="outProp"></v-editor>
                        </Form-item>
                        <Form-item label="适用范围" prop="application">
                          <i-input :value.sync="modelForm.application" placeholder="请输入适用范围"></i-input>
                        </Form-item>
                        
                    </i-col>
                    <i-col span="12">
                        <Form-item label="技术参数" prop="params">
                            <v-editor editor-id="editorParams" :input-content="modelForm.params" :out-content.sync="outParams"></v-editor>
                        </Form-item>
                        <Form-item label="实景展示" prop="pictureShows">
                            <div class="l-upload-list l-desc" v-for="item in uploadList">
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
                                <i-input class="l-img-desc" v-show="item.status==='finished'" type="text" :value.sync="item.desc" placeholder="请输入图片描述"></i-input>

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
                                v-show="!isLook"
                                :action="baseUrl+'/common/imgUpload'"
                                :data="uploadData"
                                :class="{'show':!isLook}"
                                style="width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </Form-item>
                        <Form-item label="视频缩略图" prop="videoThum">
                            <div class="l-upload-list" v-for="item in videoUploadList">
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
                                v-ref:avatar-video
                                :show-upload-list="false"
                                :default-file-list="avatarVideo"
                                :on-success="videoSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="videoBeforeUpload"
                                type="drag"
                                :action="baseUrl+'/common/imgUpload'"
                                :data="uploadData"
                                v-show="!isLook"
                                 :class="{'show':!isLook}"
                                style="width:58px;">
                                <div  style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" :visible.sync="visible">
                                <img :src="imgName" v-if="visible" style="width: 100%">
                            </Modal>
                        </Form-item>
                        <Form-item label="视频标题" prop="videoTitle">
                          <i-input :value.sync="modelForm.videoTitle" placeholder="请输入视频标题"></i-input>
                        </Form-item>
                        <Form-item label="视频描述" prop="videoDesc">
                          <i-input :value.sync="modelForm.videoDesc" placeholder="请输入视频描述"></i-input>
                        </Form-item>
                        <Form-item label="视频地址" prop="videoUrl">
                          <i-input :value.sync="modelForm.videoUrl" placeholder="请输入视频地址"></i-input>
                        </Form-item>
                    </i-col>
                </Row>
                
            </i-form>
        </Modal>
    </div>
</template>
<script>
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import Editor from '../../components/editor'
import LTitle from '../../components/title'
	export default{
		components:{LHeader,'v-editor':Editor,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'产品介绍',href:''}],
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
				addModal:false,
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					category:'',
                    productNameLike:''
				},
                categoryList:[],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
                    
                    {
                        title: '产品类别',
                        key: 'categoryName'
                    },
                    {
                        title: '产品名称',
                        key: 'productName'
                    },
                    {
                        title: '适用范围',
                        key: 'application'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:135,
                        fixed:'right',
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="primary" size="small" title="修改" icon="edit" @click="update(${row.id})"></i-button>
                            
                            <i-button type="primary"
                                @click="remove(${row.id})"
                                 icon="ios-trash" size="small" title="删除" ></i-button>

                            <i-button type="primary" size="small" icon="eye" title="查看" @click="look(${row.id})"></i-button>
                            `;
                        }   
                    }
                    
                ],
                modelForm:{
                    seq:'',                    //序号
                    category:'',              //产品类别 
                    categoryName:'',         //产品类别名称
                    thumbnail:'',             //缩略图
                    productName:'',          //产品名称 
                    productProp:'',           //产品特性
                    application:'',            //适用范围 
                    params:'',               //技术参数
                    pictureShows:'',          //图片展示
                    pictureDesc:'',           //图片描述 
                    videoTitle:'',                 //视频标题 
                    videoThum:'',            //视频图片 
                    videoDesc:'',             //视频描述 
                    videoUrl:'',               //视频地址
                    pictureInfo:[]   //图片展示信息:pictureShows:pictureDesc

                },

                ruleValidate:{
                    productName:[
                        { required: true, message: '产品名称不能为空', trigger: 'blur' }
                    ],
                    category:[
                        { required: true, message: '产品类别不能为空', trigger: 'blur' }
                    ]
                },
                outProp:'',
                outParams:'',
                avatarDefaultList:[],
                defaultList:[],
                avatarVideo:[],
                isLook:false,
                imgName: '',
                visible: false
			}
		},
		ready(){
			this.getList();
            this.getDict();
		},
        computed:{
            uploadList () {
            //console.log(this.$refs)
                return this.$refs.upload ? this.$refs.upload.fileList : [];
            },
            avatarUploadList () {
                return this.$refs.avatarupload ? this.$refs.avatarupload.fileList : [];
            },
            videoUploadList(){
                return this.$refs.avatarVideo ? this.$refs.avatarVideo.fileList : [];

            }
        },
		methods:{
            getDict(){
                let self=this;
               server.getDict('ProductIntroduceCategory_Item').then((res)=>{
                    if(res.data.length>0){
                        res.data.forEach((item)=>{
                             self.categoryList.push({
                                value:item.id,
                                label:item.dicName
                            })
                        })
                        
                    }
                }) 
            },
            getList(page=1,rows=10,category=null,productNameLike=''){
                let self=this;
                self.$Loading.start();
                server.getProduct(page,rows,category,productNameLike).then((res)=>{
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
                self.modelForm.productProp=self.outProp;
                self.modelForm.params=self.outParams;
                if(self.uploadList.length>0){
                    self.modelForm.pictureShows='';
                     self.modelForm.pictureDesc='';
                    self.uploadList.forEach(function(item){
                        self.modelForm.pictureShows+=item.url+'<;>';
                        self.modelForm.pictureDesc+=item.desc+'<;>'
                    })
                }
                if(self.modelForm.category){
                    let _index=self.categoryList.findIndex((v)=>v.value==self.modelForm.category);
                    self.modelForm.categoryName=self.categoryList[_index].label;
                }
                if(self.modelForm.id){
                    server.updateProduct(self.modelForm).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'修改成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.seachForm.category,self.seachForm.productNameLike);
                           
                        }else{
                            self.$Notice.error({
                                title:'修改失败',
                                desc:res.message
                            })
                        }
                    })
                }else{
                    server.addProduct(self.modelForm).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'新增成功'
                            })
                            self.addModal=false;
                           self.getList(self.pageIndex,10,self.seachForm.category,self.seachForm.productNameLike);
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
                this.getList(index+0,10,this.seachForm.category,this.seachForm.productNameLike);
            },
			search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.category,this.seachForm.productNameLike);
			},
			add(){
                this.isLook=false;
                for (var obj in this.modelForm) {
                    this.modelForm[obj]='';
                }
                this.outParams='';
                this.outProp='';
                this.avatarDefaultList=[];
                this.avatarVideo=[];
                this.defaultList=[];
                this.addModal=true;
			},
			update(id){
                let self=this;
                self.isLook=false;
                self.$Loading.start();
                server.getProductByid(id).then((res)=>{   
                    self.$Loading.finish();

                    return server.jsonParse(res.data);

                }).then((list)=>{
                    self.modelForm=list;
                    if(!self.modelForm || !self.modelForm.id){
                        return;
                    }
                    self.avatarDefaultList=[];
                    self.defaultList=[];
                    self.avatarVideo=[]
                    self.outParams=self.modelForm.productProp;
                    self.outProp=self.modelForm.params;
                    if(self.modelForm.thumbnail){
                        
                        self.avatarDefaultList.push({
                            url:self.modelForm.thumbnail,
                            avatar:server.image.thumb(self.modelForm.thumbnail,60,60)
                        })
                    }
                    if(self.modelForm.pictureShows){
                        let _list=self.modelForm.pictureShows.split('<;>');
                        let _descList=self.modelForm.pictureDesc.split('<;>');
                        _list.forEach(function(item,index){
                            if(item){
                                self.defaultList.push({
                                    url:item,
                                    avatar:server.image.thumb(item,60,60),
                                    desc:_descList[index]?_descList[index]:''
                                })
                            }
                        })
                    }
                    if(self.modelForm.videoThum){
                        self.avatarVideo.push({
                            url:self.modelForm.videoThum,
                            avatar:server.image.thumb(self.modelForm.videoThum,60,60)
                        })
                    }
                    self.addModal=true;
                })
			},
			remove(id){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                      server.delProduct(id).then((res)=>{
                            if(res.success){
                                self.$Notice.success({
                                    title:'删除成功',
                                    desc:res.message
                                });
                                self.getList(self.pageIndex,10,self.seachForm.category,self.seachForm.productNameLike);
                            }else{
                                self.$Notice.error({
                                    title:'删除失败',
                                    desc:res.message
                                });
                            }
                        })  
                    },
                    content:'您确认删除这条内容吗？'
                });
                
			},
            look(id){
                
                let self=this;
                self.isLook=true;
                self.$Loading.start();
                server.getProductByid(id).then((res)=>{   
                    self.$Loading.finish();
                    return server.jsonParse(res.data);

                }).then((list)=>{
                    self.modelForm=list;
                    if(!self.modelForm || !self.modelForm.id){
                        return;
                    }
                    if(self.modelForm.thumbnail){
                        self.avatarDefaultList=[]
                        self.avatarDefaultList.push({
                            url:self.modelForm.thumbnail,
                            avatar:server.image.thumb(self.modelForm.thumbnail,60,60)
                        })
                    }
                    if(self.modelForm.pictureShows){
                        let _list=self.modelForm.pictureShows.split('<;>');
                        self.defaultList=[];
                        _list.forEach(function(item){
                            if(item){
                                self.defaultList.push({
                                    url:item,
                                    avatar:server.image.thumb(item,60,60)
                                })
                            }
                        })
                    }
                    if(self.modelForm.videoThum){
                        self.avatarVideo=[]
                        self.avatarVideo.push({
                            url:self.modelForm.videoThum,
                            avatar:server.image.thumb(self.modelForm.videoThum,60,60)
                        })
                    }
                    self.addModal=true;
                })
            },
            
            //===========缩略图方法=start====================
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
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
                    this.modelForm.thumbnail=file.url;
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
            },
            videoSuccess(res, file) {
                file.url = res.data;
                file.avatar = server.image.thumb(res.data,60,60);
                this.avatarVideo=[]
                this.avatarVideo.push({
                    url:file.url,
                    avatar:file.avatar
                })
                if(file.url){
                    this.modelForm.videoThum=file.url;
                }

            },
            videoBeforeUpload(){
                const check = this.videoUploadList.length < 2;
                if (!check) {
                    this.$Notice.warning({
                        title: '视频缩略图只能 1 张'
                    });
                }
                return check;
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = res.data;
                file.avatar = server.image.thumb(res.data,60,60);
               
            },
            handleBeforeUpload(){
                const check = this.defaultList.length < 16;
                if (!check) {
                    this.$Notice.warning({
                        title: '视频缩略图只能 15 张'
                    });
                }
                return check;
            }
            //===========缩略图方法=end====================  	
		}
	}
</script>