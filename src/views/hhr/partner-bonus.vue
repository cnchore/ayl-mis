<style scoped lang="less">
	
</style>
<template>
    <l-header active-key="2"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="2" active-key="2-7"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">合伙人</span>
                                <i-input :value.sync="seachForm.partnerNameLike"  placeholder="请输入收货人" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">合伙人Tel</span>
                               <i-input :value.sync="seachForm.mobilePhoneLike"  placeholder="请输入手机号码" ></i-input>
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
	        :visible.sync="modalVisible"
	        title="添加转账"
	        @on-ok="modelSubmit"
	        width=700
	        
			:mask-closable="false"
	        >
	        <i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="100">
		        <Row>
		        	<i-col span="12">
						<Form-item label="合伙人姓名">
		            		{{modelForm.partnerName}}
		        		</Form-item>
		        		<Form-item label="未转分红">
		            		{{modelForm.wallet+modelForm.walletHad}}
		        		</Form-item>
		        		<Form-item label="身份证号">
		            		{{modelForm.cardID}}
		        		</Form-item>
		        		<Form-item label="银行卡号">
		            		{{modelForm.bankNo}}
		        		</Form-item>
		        		<Form-item label="转账金额" prop="walletNew">
				            <i-input :value.sync="modelForm.walletNew" placeholder="请输入转账金额"></i-input>
				        </Form-item>
		        	</i-col>
		        	<i-col span="12">
						<Form-item label="手机号">
		            		{{modelForm.mobilePhone}}
		        		</Form-item>
		        		<Form-item label="已转分红">
		            		{{modelForm.walletHad}}
		        		</Form-item>
		        		<Form-item label="开户行">
		            		{{modelForm.bankName}}
		        		</Form-item>
		        		<Form-item label="开户名">
		            		{{modelForm.bankAccountName}}
		        		</Form-item>
		        		<Form-item label="转账凭证" prop="thumb">
		        			<div class="l-upload-list" v-for="item in avatarDefaultList">
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
                                style="width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                           
		        		</Form-item>
		        	</i-col>
		        </Row>
		        
		        
		    </i-form>
		    <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">取消</i-button>
                <i-button type="primary" size="large" :loading="modelLoading" @click="modelSubmit">确定</i-button>
            </div>
	    </Modal>
	    <Modal
			:visible.sync="modelBouns"
			title="转账记录"
			@on-ok="modelBouns=false"
			width=700
			:mask-closable="false"
	    >
            <i-table :content="self" :columns="bounsCol" :data="bounsData"></i-table>
            <div style="margin: 10px;overflow: hidden">
            	<div style="float: right;">
            		<Page :total="bounsTotal" show-total show-elevator :current.sync="pageBounsIndex" @on-change="changeBounsPage"></Page>
            	</div>
            </div>
		
		</Modal>
		 <Modal title="查看转账凭证" :visible.sync="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
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
                breads:[{text:'首页',href:'/index'},{text:'分红管理',href:''}],
				baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
                imgName: '',
                visible: false,
                modelBouns:false,
				rowsTotal:10,
				pageIndex:1,
				bounsTotal:10,
				pageBounsIndex:1,
				bounsData:[],
				accountId:'',
				self:this,
				tableData:[],
				modalVisible:false,
				seachForm:{
					partnerNameLike:'',
					mobilePhoneLike:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{
                	walletNew:''
                },
                modeRule:{
                	walletNew: [
                        { required: true, message: '转账金额不能为空', trigger: 'blur' }
                    ],
                    thumb: [
                        { required: true, message: '转账凭证不能为空', trigger: 'blur' }
                    ]
                },
                modelLoading:false,
				tableCol: [{
					key:'partnerName',title:'合伙人姓名',width:120
				},
				{
					key:'mobilePhone',title:'合伙人手机号',width:125
				},
				{
					key:'cardID',title:'身份证号',width:200
				},
				{
					key:'wallet',title:'总分红',width:95,
					render(row){
						return `<strong>${row.wallet}</strong>`
					}
				},
				{
					title:'未转分红',width:95,
					render(row){
						return `<span class="l-s-Error">{{${row.wallet}+${row.walletHad}}}</span>`;
					}
				},
				{
					key:'walletHad',title:'已转分红',width:95,

					render(row){
						return `<span class="l-s-Info">${row.walletHad}</span>`;
					}
				},
				{
					key:'bankName',title:'开户行',width:150
				},
				{
					key:'bankNo',title:'银行账号',className:'l-m-min-width'
				},
				{
					key:'bankAccountName',title:'户名',width:95
				},
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:105,
					align: 'center',
					render (row, column, index) {
					return `
						<i-button type="primary" title="添加转账" icon="plus" @click="modelShow(${row.id})" size="small"></i-button>
						
						<i-button type="primary"
							 @click="showBonus(${row.id})"
								title="查看转账记录"
							 icon="eye" size="small"></i-button>

					`;
					}   
				}],
				bounsCol:[
					{title:'序号',type:'index',width:80,align:'center'},
                    {title:'转账金额',key:'wallet'},
                    {title:'转账人',key:'description'},
                    {title:'转账时间',key:'createTime',width:150},
                    {title:'转账附件',key:'action',
                    	render(row,column,index){
                        	return `
                        	<i-button type="primary"
							 v-show="btnShow(${index})"
                        	 @click="imageView(${index})"
							 icon="eye" size="small">查看</i-button>`
                    	}
                	}
				]
			}
		},
		ready(){
			this.getList();
		},
		computed:{
            
            avatarUploadList () {
                return this.$refs.avatarupload ? this.$refs.avatarupload.fileList : [];
            }
        },
		methods:{
            
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                _list.state=1;
                server.getParnerAccount(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
			getBounsList(page=1,rows=10){
				let self=this;
                self.$Loading.start();
                let _list={};
                _list.page=page;
                _list.rows=rows;
                _list.type=-1;
                _list.accountId=self.accountId;
            	
                server.getParnerBonus(_list).then((res)=>{
                    self.$Loading.finish();
                    self.bounsData=res.data.rowsObject;
                    self.bounsTotal=res.data.total;
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
			changeBounsPage(index){
				this.pageBounsIndex=index+0;
                this.getBounsList(index+0,10);
			},
			modelShow(id){
				let self=this;
				self.modelLoading=false;
				self.modelForm.attachUrl='';
				self.avatarUploadList=[];
                self.avatarDefaultList=[];
				if(id){
					self.$Loading.start();
	                server.getParnerAccountByid(id).then((res)=>{
	                	self.$Loading.finish();
	                    if(res.success){
	                        self.modelForm=res.data;
	                        self.modelForm.walletNew='';
	                        
	                        self.modalVisible=true;
	                    }else{
	                        self.modelForm={};
	                    }
	                })
            	}else{
            		self.modelForm={};
            		self.modalVisible=true;
            	}
			},
			modelSubmit(){
				let self=this;
				self.modelLoading=true;
				if(!self.modelForm.walletNew){
					self.$Notice.error({
						title:'错误',
						desc:'转账金额不能为空'
					});
					self.modelLoading=false;
					return;
				}
				if(!self.modelForm.attachUrl){
					self.$Notice.error({
						title:'错误',
						desc:'转账凭证不能为空'
					});
					self.modelLoading=false;
					return;
				}
				if(self.modelForm.id){
				
	                server.addParnerBonus(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'新增成功',
	                            desc:res.message
	                        });
	                        self.modalVisible=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'新增失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}

			},
			showBonus(id){
				this.bounsData=[];
				this.bounsTotal=10;
				this.pageBounsIndex=1;
                this.accountId=id;
                this.getBounsList();
                this.modelBouns=true;
            },
            btnShow(index){
            	if(this.bounsData&&this.bounsData[index]&&this.bounsData[index].attachUrl){
            		return true;
            	}else{
            		return false;
            	}
            },
            imageView (index) {
            	
            	if(this.bounsData&&this.bounsData[index]&&this.bounsData[index].attachUrl){
	                this.imgName = this.bounsData[index].attachUrl;
	                console.log(this.imgName)
	                this.visible = true;
	            }
            },
            //===========缩略图方法=start====================
            handleView (name) {
            	if(name){
	                this.imgName = name;
	                this.visible = true;
	            }
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
                    this.modelForm.attachUrl=file.url;
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
                        title: '只能上传 1 张'
                    });
                }
                return check;
            }
            //===========缩略图方法=end====================  
		}
	}
</script>