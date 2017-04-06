<style scoped lang="less">
	
	
</style>
<template>
    <l-header active-key="1"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-key="1-2"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title @on-click="toggleClick"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="titleLike">
                            <i-input type="text" :value.sync="seachForm.titleLike" placeholder="模糊查询">
                                <span slot="prepend">标题</span>
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
            title="新增/编辑"
            @on-ok="modalOk"
            width="700"
            loading
            :mask-closable="false" 
            scrollable=>
            <i-form v-ref:news-form :model="newsForm" :rules="newsRules" :label-width="100">
                <Form-item label="标题" prop="title">
                    <i-input :value.sync="newsForm.title" placeholder="请输入标题"></i-input>
                </Form-item>
                <Form-item label="摘要" prop="summary">
                    <i-input :value.sync="newsForm.summary" placeholder="请输入摘要"></i-input>
                </Form-item>
                <Form-item label="缩略图" prop="thumb">
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
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal  title="查看图片" :visible.sync="visible">
                        <img :src="imgName" v-if="visible" style="width: 100%">
                    </Modal>
                </Form-item>
                <Form-item label="内容" prop="content">
                    <v-editor :input-content="newsForm.content" :out-content.sync="outContent"></v-editor>
                </Form-item>
            </i-form>
        </Modal>
    </div>
</template>
<script>
import server from '../libs/server'
import LeftMenu from '../components/left-menu'
import LHeader from '../components/header'
import Editor from '../components/editor'
import LTitle from '../components/title'

	export default{
		components:{LHeader,LTitle,LeftMenu,'v-editor':Editor},
		data(){
			return{
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
				addModal:false,
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					titleLike:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                newsForm:{
					  thumb:'',   //缩略图
					  summary:'', //摘要
					  title:'',     //标题
					  content:'',     //内容
					  type:''     //类别:1通知公告 2：新闻动态 3、艾臣资讯
                },
                newsRules:{
                    title:[
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
				tableCol: [
                    {
                        title: '操作',
                        key: 'action',
                        className:'l-m-min-width',
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="primary" v-show="${row.status}==1" size="small" icon="edit" @click="update(${row.id})">修改</i-button>
                            <i-button type="primary" v-show="${row.status}==1" size="small" icon="forward" @click="publish(${row.id})">发布</i-button>
                            <i-button type="primary" v-show="${row.status}==2" size="small" icon="stop" @click="publish(${row.id})">结束发布</i-button>
                            <Poptip v-show="${row.status}==1"
                                confirm
                                title="您确认删除这条内容吗？"
                                @on-ok="remove(${row.id})">
                                <i-button type="primary" icon="ios-trash" size="small">删除</i-button>
                            </Poptip>
                            <i-button type="primary" size="small" icon="eye" @click="look(${row.id})">查看</i-button>
                            `;
                        }   
                    },
                    {
                        title: '标题',
                        className:'l-m-min-width',
                        key: 'title',
                        render (row, column, index) {
                            return `<strong>${row.title}</strong>`;
                        }
                    },
                    {
                        title: '状态',
                        className:'l-min-width',
                        key: 'status',
                        render(row,column,index){
                            return `<Tag type="dot" :color="getStatus(${row.status})">{{getStatusName(${row.status})}}</Tag>`;
                        }
                    },
                    {
                        title: '摘要',
                        className:'l-m-min-width l-ellipsis',
                        key: 'summary'
                    },
                    {
                        title: '发布时间',
                        className:'l-min-width',
                        key: 'publishTime'
                    }
                    
                ],
                avatarDefaultList:[],
                imgName: '',
                visible: false,
                isLook:false,
                outContent:''
			}
		},
		ready(){
            this.getList();
		},
        computed: {
           
            avatarUploadList () {
                return this.$refs.avatarupload ? this.$refs.avatarupload.fileList : [];
            }
        },
		methods:{
            getStatus(v){
                switch(v){
                    case 1:
                    return "blue";
                    case 2:
                    return "green";
                    case 3:
                    return "red";
                }
            },
            getStatusName(v){
                switch(v){
                    case 1:
                    return "草稿";
                    case 2:
                    return "发布";
                    case 3:
                    return "结束发布";
                }
            },
            getList(page=1,rows=10,titleLike=''){
                let self=this;
                self.$Loading.start();
                server.getPublish(page,rows,titleLike).then((res)=>{
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
                self.newsForm.content=self.outContent;

                if(self.newsForm.id){
                    server.updatePublish(self.newsForm).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'修改成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.seachForm.titleLike);
                           
                        }else{
                            self.$Notice.error({
                                title:'修改失败',
                                desc:res.message
                            })
                        }
                    })
                }else{
                    server.addPublish(self.newsForm).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'新增成功'
                            })
                            self.addModal=false;
                            self.getList(self.pageIndex,10,self.seachForm.titleLike);
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
                this.getList(index+0,10,this.seachForm.titleLike);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.titleLike);
			},
			add(){
                this.isLook=false;
                for (var obj in this.newsForm) {
                    this.newsForm[obj]='';
                }
                this.avatarDefaultList=[];
                this.addModal=true;
			},
			update(id){
                let self=this;
                self.isLook=false;
                server.getPublishByid(id).then((res)=>{   
                    return server.jsonParse(res.data);
                }).then((list)=>{
                    self.newsForm=list;
                    self.avatarDefaultList=[];
                    if(!self.newsForm || !self.newsForm.id){
                        return;
                    }
                    if(self.newsForm.thumb){
                        self.avatarDefaultList.push({
                            url:self.newsForm.thumb,
                            avatar:server.image.thumb(self.newsForm.thumb,60,60)
                        })
                    }
                    self.addModal=true;
                })
			},
            look(id){
                let self=this;
                self.isLook=true;
                server.getPublishByid(id).then((res)=>{   
                    return server.jsonParse(res.data);
                }).then((list)=>{
                    self.newsForm=list;
                    if(!self.newsForm || !self.newsForm.id){
                        return;
                    }
                    if(self.newsForm.thumb){
                        self.avatarDefaultList=[]
                        self.avatarDefaultList.push({
                            url:self.newsForm.thumb,
                            avatar:server.image.thumb(self.newsForm.thumb,60,60)
                        })
                    }
                    self.addModal=true;
                })
            },
			remove(id){
                let self=this;
                server.deletePublishByid(id).then((res)=>{
                    if(res.success){
                        self.$Notice.success({
                            title:'删除成功',
                            desc:res.message
                        });
                        self.getList(self.pageIndex,10,self.seachForm.titleLike);
                    }else{
                        self.$Notice.error({
                            title:'删除失败',
                            desc:res.message
                        });
                    }
                })
			},
            publish(id){
                let self=this;
                server.publish(id).then((res)=>{
                    if(res.success){
                        self.getList(self.pageIndex,10,self.seachForm.titleLike);
                        self.$Notice.success({
                                title:res.message
                            })
                    }else{
                        self.$Notice.error({
                            title:'失败',
                            desc:res.message
                        });
                    }
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
                    this.newsForm.thumb=file.url;
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