<style scoped lang="less">
	.q-imgs{
		.q-title{
			margin-bottom: 15px;
			padding-left: 30px;
			
			display: flex;
			border-bottom: 1px solid #f5f7f9;
			font-size: 16px;
			align-items:center;
			i{
				font-size: 32px;
				margin-right:10px;
			}
			
		}
		.container{
			padding: 10px 30px 10px 60px;
			display: flex;
			.q-left{
				
				width:178px;
				
				.q-img-add{
					width:158px;
					height:128px;
					display: -webkit-box;
				    -webkit-box-pack: center;
				    -webkit-box-align: center;
				    -webkit-box-orient: vertical;
				}
			}
			.q-right{
				width: 100%;
				padding-left: 10px;
				.q-l-img-list{
					height:58px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom:15px;
					.l-upload-list{
						flex:0.5;
						width:58px;
						height:58px;
					}
					div{
						flex:1;
						text-align: center;
						i{
							font-size: 32px;
							cursor: pointer;
						}
						i:first-child{
							margin-right:15px;
						}
					}
					.double{
						flex:2;
					}
				}
				.q-top-b{
					padding:15px 10px;
					border-top: 1px solid #f5f7f9;
				}
			}
			.q-row{
				width:100%;
				
				.ivu-col{
					border: 1px solid #f5f7f9;
					text-align: center;
					padding: 5px 0px;
					height: auto;
					min-height: 33px;
				}
				.q-col{
					a{
						position: absolute;
						padding-left:20px;
					}
				}
			}
			.thead{
				.ivu-col{
					background-color:#448ed7;
					color: #fff;
				}
			}
			.title{
				.ivu-col{
					background-color: #e5e5e5;
				}
			}
			.ivu-collapse{
				background-color: #fff;
			}
		}
		.q-table{
			display: block;
		}
		.q-form-btn{
			display: -webkit-box;
			-webkit-box-pack: center;
			-webkit-box-align: center;
			-webkit-box-orient: vertical;
			margin-left: 0px;
			button:first-child{
				margin-right: 15px;
			}
		}
	}
</style>
<template>
    <l-header page-src="/order/hq/ownerInfo"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/order/hq/ownerInfo"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <br/>
                <div class="layout-content" >
               		<div class="q-imgs">
                    	<div class="q-title">
                        	<i class="iconfont icon-kehuxinxi"></i>客户信息
                    	</div>
                    	<div class="container q-table">
                    		<i-form :model="modelForm" :label-width="100" :rules="ruleForm">
                    			
            					<Form-item label="联系人姓名" prop="name">
						            <i-input :value.sync="modelForm.name" placeholder="请输入..."></i-input>
						        </Form-item>
                    			
            					<Form-item label="联系人手机" prop="mobilePhone">
						            <i-input :value.sync="modelForm.mobilePhone" placeholder="请输入手机号码"></i-input>
						        </Form-item>
                    			<Form-item label="客户归属">
						            <i-select :model.sync="belongIdsCk" multiple>
								        <i-option v-for="item in belongList" :value="item.value">{{ item.label }}</i-option>
								    </i-select>
						        </Form-item>
						        <Form-item label="装修项目" prop="decorate">
						           <Checkbox-group :model.sync="decorateCkList">
								        <Checkbox :value="item.dicName" v-for="item in decorateList">
								        	<span>{{item.dicName}}</span>
								        </Checkbox>
								    </Checkbox-group>
						        </Form-item>
            					<Form-item label="所在地区" prop="addressValue">
				        			<Cascader :data="addressData" @on-change="addrSelected" :value.sync="addressValue" trigger="hover"></Cascader>
						           
						        </Form-item>
            					<Form-item label="详细地址" prop="address">
						            <i-input :value.sync="modelForm.address" placeholder="请输入详细地址"></i-input>
						        </Form-item>
						        
                    			<Form-item label="备注">
						            <i-input :value.sync="modelForm.remark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></i-input>
						        </Form-item>
			
						    </i-form>
                    	</div>
                    </div>
                    <div class="q-imgs">
                        <div class="q-title">
                        	<i class="iconfont icon-fujian"></i>客户附件
                    	</div>
                    	<div class="container">
                    		<div class="q-left">
                    		<Upload
                                v-ref:upload
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="uploadFormat"
                                :max-size="10240"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                :action="baseUrl+'/common/imgUpload'"
                                :data="uploadData"
                                style="display: inline-block;width:158px;">
                                <div class="q-img-add">
                                    <Icon type="ios-plus-empty" size="64"></Icon>
                                </div>
                            </Upload>
                            </div>
                            <div class="q-right">
	                            <div class="q-l-img-list" v-for="item in uploadList">
		                    		<div class="l-upload-list" >
		                                <template v-if="item.status === 'finished' || item.state===1">

		                                    <img :src="item.avatar">
		                                </template>
		                                <template v-else>
		                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
		                                </template>
		                            </div>
		                            <div class="double" v-show="item.status === 'finished' ||item.state===1">
		                            	<i-input :value.sync="item.attachName" class="q-text-center" placeholder="请输入名称"></i-input>
		                            </div>
		                            <div v-show="item.status === 'finished' ||item.state===1">{{item.createTime}}</div>
		                            <div v-show="item.status === 'finished' ||item.state===1">
		                            	<Icon type="eye" title="查看" v-if="is7nImage(item.avatar)" @click="handleView(item.attachAddress)"></Icon>
		                            	<a :href="item.attachAddress" target="_blank">
		                           			<Icon type="ios-download-outline" title="下载"></Icon>
		                            	</a>
                                    	<Icon type="ios-trash-outline" title="删除" @click="handleRemove(item)"></Icon>
		                           	</div>
		                           
	                            </div>
	                            
                            </div>
                         </div>
                         <div class="q-form-btn">
                         	<i-button type="primary" :loading="modelLoading" size="large" @click="submit">提交</i-button>
                         	<i-button type="ghost" size="large" @click="cancel">取消</i-button>
                         </div>   
                    </div>
                  
                    
                </div>
                <div class="layout-copy">
                    版权所有 &copy; 2017.艾臣家居科技有限公司.
                </div>
            </i-col>
        </Row>
        
    </div>
    <Modal title="查看图片" :visible.sync="visible">
		<img :src="imgName" v-if="visible" style="width: 100%">
	</Modal>
</template>
<script>
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
import chinaAddress from '../../components/china-address-0408'
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				breads:[{text:'首页',href:'/index'},{text:'客户管理',href:'/order/ownerInfo'},{text:'客户新增/编辑',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
                uploadFormat:server.uploadFormat(),
                defaultList: [],
                modelForm:{},
                ruleForm:{
                	name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mobilePhone: [
                        { required: true, message: '电话不能为空', trigger: 'blur' }
                    ],
                    decorate: [
                        { required: true, message: '装修项目不能为空', trigger: 'blur' }
                    ],
                    addressValue: [
                        { required: true, message: '所在地区不能为空', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ]
                },
                addressData:chinaAddress,
                addressValue:[],
                decorateCkList:[],
                decorateList:[],
                belongIdsCk:[],
                belongList:[],
                modelLoading:false,
                id:null,
               	imgName: '',
                visible: false,

			}
		},
		ready(){
			this.getDict();
			this.getBelong();
			if(this.id){
				this.getList();
			}else{
				this.modelForm={};
				this.belongIdsCk=[];
				this.decorateCkList=[];
				this.defaultList=[];
				this.addressValue=[];
			}
			
		},
		route:{
            data:function(transition){
                if(transition.to.query &&transition.to.query.id){
                    let t=transition.to.query.id;
                    this.id=t;
                    
                }
            }
        },
		computed: {
           uploadList () {
                return this.$refs.upload ? this.$refs.upload.fileList : [];
            }
        },
		methods:{
			getList(){
				let self=this;
				server.getOwnerByid(self.id).then((res)=>{
					if(res.success&&res.data){
						self.modelForm=res.data;
						if(res.data.attachList){
							self.defaultList=[];
							res.data.attachList.forEach((item)=>{
								self.defaultList.push({
									attachName:item.attachName,
									attachAddress:item.attachAddress,
									state:item.status,
									createTime:item.createTime,
									avatar:self.getFileType(item.attachAddress)
								})
							})
						}
						if(res.data.provinceId){
							self.addressValue.push(res.data.provinceId)
						}
						if(res.data.cityId){
							self.addressValue.push(res.data.cityId)
						}
						if(res.data.areaId){
							self.addressValue.push(res.data.areaId)
						}
						if(res.data.belongIds){
							let ckList=res.data.belongIds.split(',');
							self.belongIdsCk=[];
							ckList.forEach((ck)=>{
								self.belongIdsCk.push(parseInt(ck));
							})
							
						}
						if(res.data.decorateProject){
							self.decorateCkList=res.data.decorateProject.split(',');
						}
						//console.log(self.belongIdsCk,self.decorateCkList,self.addressValue);
					}
				})
			},
			addrSelected(value,selectedData){
                //console.log(selectedData);
                console.log(this.addressValue)
                if(selectedData.length>0){
                    this.modelForm.provinceId=selectedData[0].value;
                    this.modelForm.province=selectedData[0].label;
                    this.modelForm.cityId=selectedData[1].value;
                    this.modelForm.city=selectedData[1].label;
                    this.modelForm.areaId=selectedData[2].value;
                    this.modelForm.area=selectedData[2].label;
                }else{
                    this.modelForm.provinceId='';
                    this.modelForm.province='';
                    this.modelForm.cityId='';
                    this.modelForm.city='';
                    this.modelForm.areaId='';
                    this.modelForm.area='';
                }

            },
			getDict(){
            	//ProductCategory_bigType
            	let self=this;
				server.getDict('ProductIntroduceCategory_Item').then((res)=>{
					self.decorateList=[];
                    if(res.data&&res.data.length>0){
                        res.data.forEach((item)=>{
                             self.decorateList.push({
                                dicName:item.dicName
                            })
                        })
                        
                    }
                }) 
            },
            getBelong(){
            	let self=this;
            	server.getStaffAll({isDisable:false}).then((res)=>{
            		self.belongList=[];
            		if(res.data){
            			res.data.forEach((item)=>{
            				self.belongList.push({
            					value:item.id,
            					label:item.staffName
            				})
            			})
            		}
            	})
            },
			submit(){
				let self=this;
				self.modelLoading=true;
				if(self.uploadList.length>0){
					self.modelForm.attachList=self.uploadList;
				}else{
					self.modelForm.attachList=self.defaultList;

				}
				if(self.decorateCkList.length>0){
					self.modelForm.decorateProject=self.decorateCkList.join(',');
				}
				if(self.belongIdsCk.length>0){
					self.modelForm.belongIds=self.belongIdsCk.join(',');
					self.modelForm.belongNames='';
					self.belongList.forEach((item)=>{
						self.belongIdsCk.forEach((ck)=>{
							if(parseInt(ck)===parseInt(item.value)){
								self.modelForm.belongNames+=item.label+',';
							}
						})
						if(self.modelForm.belongNames && self.modelForm.belongNames.length>1){
							self.modelForm.belongNames=self.modelForm.belongNames.substr(0,self.modelForm.belongNames.lastIndexOf(','));
						}
					})
				}
				if(self.modelForm.id){
					server.updateOwner(self.modelForm).then((res)=>{
						self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'修改成功',
	                            desc:res.message
	                        });
							self.$router.go('/order/ownerInfo');

	                    }else{
	                        self.$Notice.error({
	                            title:'修改失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}else{
	                server.addOwner(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'新增成功',
	                            desc:res.message
	                        });
							self.$router.go('/order/ownerInfo');

	                    }else{
	                        self.$Notice.error({
	                            title:'新增失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}
			},
			cancel(){
				this.$router.go('/order/ownerInfo');
			},
			is7nImage(url){
				return server.is7nImage(url);
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
                //console.log(res,file)
                file.attachAddress = res.data;
                let nameList=res.data.split('@|@');
                if(nameList&&nameList.length>1){
                	file.attachName=nameList[1].substr(0,nameList[1].lastIndexOf('.'));
		            file.avatar=this.getFileType(res.data);
                }
                
	            file.createTime=new Date().toLocaleString();
	            //file.state=1;
               
            },
            getFileType(v){
            	return server.getFileType(v);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg、png、doc、docx、xls、xlsx、pdf、dwg 格式'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 10M'
                });
            },
            handleBeforeUpload () {
                
                const check = this.uploadList.length < 160;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 160 个文件'
                    });
                }
                return check;
            },
		}
	}
</script>