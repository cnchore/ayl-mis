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
				.q-img-list{
					width:198px;
					height:158px;
					display: inline-block;
					margin:0px 10px 20px 10px;
					.l-upload-list{
						width:198px;
						height:128px;
						margin: 0px;
					}
					.l-upload-list-cover{
						&:hover{
							display: flex;
							i{
								display: block;
							}
						}
						
						align-items: center;
						justify-content: center;
						i{
							&:first-child{
								margin-right: 10px;
							}
							&:last-child{
								margin-left: 10px;
							}
							display: none;
							font-size: 32px;
						}
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
					min-height: 44px;
					display: -webkit-box;
				    -webkit-box-pack: center;
				    -webkit-box-align: center;
				    -webkit-box-orient: vertical;
				}
				.q-col{
					display: flex;
					align-items: center;
					justify-content: center;
					div{
						flex:2;
					}
					a{	
						flex:1;
						//position: absolute;
						//padding-left:20px;
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
			.q-tab{
				background-color: #e5e5e5;
    			color: #fff;
    			padding:13px 30px;
    			cursor:pointer;
    			&:first-child{
    				margin-right:20px;
    			}
			}
			.q-active{
				background-color: #448ed7;

			}
			&.center{
				justify-content: center;
				align-items: center;
			}
		}
		.q-table{
			display: block;
		}

	}
	.q-btns{
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		-webkit-box-orient: vertical;
		text-align: center;
		margin-left: 0px;
		button{
			margin:0px 7px;
		}
	}
</style>
<template>
    <l-header active-key="4"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="4" active-key="4-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <br/>
                <div class="layout-content" >
                	<div class="q-imgs" v-show="optionList[0]">
                		<div class="q-title">
                        	<i class="iconfont icon-kehuyijian"></i>客户意见区
                    	</div>
                		<div class="container q-table">
                			<Collapse active-key="1">
						        <Panel :key="item.id" v-for="item in optionList">
						            {{item.createTime}}
						            <p slot="content">{{item.remark}}</p>
						        </Panel>
						    </Collapse>
                		</div>
                	</div>
                    <div class="q-imgs">
                        <div class="q-title">
                        	<i class="iconfont icon-fujian"></i>公共附件区
                    	</div>
                    	<div class="container center">
                    		<div class="q-tab" :class="{'q-active':tabIndex===1}" @click="tabIndex=1">经销商附件区</div>
                    		<div class="q-tab" :class="{'q-active':tabIndex===2}" @click="tabIndex=2">总部附件区</div>
                    	</div>
                    	<div class="container">
                    		<div class="q-left">
                    		<Upload
                                v-ref:upload
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png','doc','docx','xls','xlsx','pdf','dwg']"
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
                            <div class="q-right" v-show="tabIndex===1">
                            	
								<div class="q-img-list" v-show="item.state===1" v-for="item in agentAttach">
		                    		<div class="l-upload-list" >
	                                    <img :src="item.avatar">
	                                    <div class="l-upload-list-cover">
	                                    	<Icon type="eye" title="查看" v-show="item.avatar.indexOf('imageMogr2/format')>-1" @click="handleView(item.attachAddress)"></Icon>
	                                        <a :href="item.attachAddress" target="_blank">
			                           			<Icon type="ios-download-outline" title="下载"></Icon>
			                            	</a>
	                                    </div>
		                            </div>
		                            <span>{{item.attachName}}</span>
	                            </div>
	                            <div class="q-top-b">
	                            	<a href="#">下载报价单模版</a>
	                            </div>
                            </div>
                            <div class="q-right" v-show="tabIndex===2">
                            		
	                            
								<div class="q-img-list" v-for="(index,item) in uploadList">
		                    		<div class="l-upload-list" >
		                                <template v-if="item.status === 'finished'">
		                                    <img :src="item.avatar">
		                                    <div class="l-upload-list-cover">
		                                    	<Icon type="eye" title="查看" v-show="item.avatar.indexOf('imageMogr2/format')>-1" @click="handleView(item.attachAddress)"></Icon>
		                                        <a :href="item.attachAddress" target="_blank">
				                           			<Icon type="ios-download-outline" title="下载"></Icon>
				                            	</a>
		                                        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
		                                    </div>
		                                </template>
		                                <template v-else>
		                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
		                                </template>
		                            </div>
		                            <i-input :value.sync="item.attachName" v-show="item.status==='finished'" class="q-text-center" placeholder="请输入名称"></i-input>

	                            </div>
	                            <div class="q-top-b">
	                            	<a href="#">下载报价单模版</a>
	                            </div>
                            </div>
                         </div>   
                    </div>
                    <div class="q-imgs">
                    	<div class="q-title">
                        	<i class="iconfont icon-dinghuodan"></i>艾臣家居门窗订货单
                    	</div>
                    	<div class="container q-table">
                    		<Row class="q-row thead">
						        <i-col span="5">项目</i-col>
						        <i-col span="5">费用</i-col>
						        <i-col span="14">说明</i-col>
						    </Row>
                    		<Row class="q-row title">
						        <i-col span="24">经销商报价区</i-col>
						    </Row>
						    <template v-for="item in costVoList">
						     <Row class="q-row title" v-if="item.costType===7">
						        <i-col span="24">总部报价区</i-col>
						    </Row>
						    <Row class="q-row" >
						        <i-col span="5">{{item.costName}}</i-col>
						        <i-col span="5" class="q-col-right">
		            				<span v-if="item.costType===1 || item.costType===2 || item.costType===3 || item.costType===6">{{item.costValue | currency '¥' '2'}}</span>
		            				<span v-if="item.costType===5">{{item.costValue}}%</span>
									<currency-input v-if="item.costType===7" :value="item.costValue | currency '¥' '2'" :out-value.sync="item.costValue" ></currency-input>
		            				<i-input class="q-discout" v-if="item.costType===8 " :value.sync="item.costValue" ></i-input>
		            				<span v-if="item.costType===4">{{getCouponToal | currency '¥' '2'}}</span>
		            				<span v-if="item.costType===11">{{getSaleToal | currency '¥' '2'}}</span>
		            				<span v-if="item.costType===12">{{getDealToal | currency '¥' '2'}}</span>
						        </i-col>
						        <i-col span="14" class="q-flex">
						        	<i-input v-if="item.costType===7 || item.costType===8 " :value.sync="item.desc" ></i-input>
						        	<span v-else>{{item.desc}}</span>

						        </i-col>
						    </Row>
						    </template>	
						    <Row class="q-row">
						        <i-col span="5">折后金额</i-col>
						        <i-col span="5" class="q-col-right">{{getDiscout | currency '¥' '2'}}</i-col>
						        <i-col span="14">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">交货日期</i-col>
						        <i-col span="5" class="q-col-right">
						        	<i-input :value.sync="modelForm.limitDays" ></i-input>
						        </i-col>
						        <i-col span="14">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">优先级</i-col>
						        <i-col span="5" class="q-col-right">
						        	<Radio-group :model.sync="modelForm.level">
						                <Radio value="3">高</Radio>
						                <Radio value="2">中</Radio>
						                <Radio value="1">低</Radio>
						            </Radio-group>
						         </i-col>
						        <i-col span="14">&nbsp;</i-col>
						    </Row>
		
                    	</div>
                    </div>
                    <div class="q-imgs">
                    	<div class="q-title">
                        	<i class="iconfont icon-beizhu"></i>备注
                    	</div>
                    	<div class="container q-table">
                    		<i-form :model="modelForm" :label-width="100">
                    			<Form-item label="经销商备注">
                    				{{modelForm.agentRemark}}
						        </Form-item>
                    		
                    			<Form-item label="总部备注">
						            <i-input :value.sync="modelForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
						        </Form-item>
						        
						    </i-form>
                    	</div>
                    </div>
                    <div class="q-btns">
                    	<i-button type="primary" :loading="modelLoading" @click="ownerSaveAppoint(true)" size="large">保存</i-button>
                    	<i-button type="primary" :loading="modelLoading" @click="ownerSaveAppoint(false)" size="large">提交</i-button>
                    	<i-button type="ghost" size="large" @click="cancel">取消</i-button>
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
import CurrencyInput from '../../components/currency-input'
	export default{
		components:{LHeader,LeftMenu,LTitle,CurrencyInput},
		data(){
			return{
				breads:[{text:'首页',href:'/index'},{text:'订单管理',href:'/order/list'},{text:'订货单编辑',href:''}],
				couponList:[],
				targetKeysCoupon:[],
				tabIndex:2,
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
                defaultList: [],
                modelForm:{
                	
                },
                costVoList:[
                	{costName:'产品费',costValue:0,desc:'',costType:1},
                	{costName:'运输费',costValue:0,desc:'',costType:2},
                	{costName:'安装费',costValue:0,desc:'',costType:3},
                	{costName:'总金额',costValue:0,desc:'',costType:11},

                	{costName:'折  扣',costValue:100,desc:'',costType:5},
                	{costName:'优惠券',costValue:0,desc:'',costType:6},
                	{costName:'现金券',costValue:0,desc:'',costType:4},
                	
                	{costName:'成交额',costValue:0,desc:'',costType:12},
                	
                	{costName:'出厂金额',costValue:0,desc:'',costType:7},
                	{costName:'折扣',costValue:100,desc:'',costType:8},
                ],
                id:null,
                optionList:[],
                appointId:null,
                agentAttach:[],
                imgName: '',
                visible: false,
			}
		},
		ready(){
			if(this.id){
				this.getList();
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
           		let _list=this.$refs.upload ? this.$refs.upload.fileList : [];
           		if(_list.length>2){
           			_list.sort(function(a,b){
           				return a.createTime-b.createTime;
           			})
           		}
                return _list;
            },
            getSaleToal(){
            	//成交总金额＝（销售总金额＊折扣－优惠券）－现金券
            	//折后金额＝出厂金额＊折扣
            	let t=0;
            	this.costVoList.forEach((item)=>{
            		if(item.costType===1 || item.costType===2 || item.costType===3){
            			t+=parseFloat(item.costValue);
            		}
            		
            	})
            	return t;
            },
            getDiscout(){
            	let d=1;
            	this.costVoList.forEach((item)=>{
            		if(item.costType===7 || item.costType===8){
            			d*=parseFloat(item.costValue)/100;
            		}
            		
            	})
            	return d;
            },
            getDealToal(){
            	return this.getSaleToal*this.costVoList[4].costValue/100-this.costVoList[5].costValue-this.getCouponToal;
            },
            getCouponToal(){
            	let t=0;
            	this.targetKeysCoupon.forEach((item)=>{
            		this.couponList.forEach((cl)=>{
            			if(cl.key===item){
            				t+=parseFloat(cl.value);
            			}
            		})
            		
            	})
            	return t;
            }
        },
		methods:{
			getIsShowDate(index,dateStr,t){
				if(!dateStr){
					return false;
				}
				let b=false;
				if(index>1){
					if(t){
						if(this.uploadList[index-1].createTime.substr(0,10)===dateStr){
							b=false;
						}else{
							b=true;
						}
					}else{
						if(this.agentAttach[index-1].createTime.substr(0,10)===dateStr){
							b=false;
						}else{
							b=true;
						}
					}
					
				}else{
					b=true;
				}
				return b;
			},
			
			getList(){
				let self=this;
				if(self.id){
					self.$Loading.start();
	                server.getOrderInfo(self.id).then((res)=>{
	                	self.$Loading.finish();
	                    if(res.success){
	                    	self.defaultList=[];
	                    	self.agentAttach=[];
	                        self.modelForm=res.data.orderVo;
	                        if(res.data.agentAttach&&res.data.agentAttach[0]){
	                        	res.data.agentAttach.forEach((item)=>{
									self.agentAttach.push({
										id:item.id,
										attachName:item.attachName,
										attachAddress:item.attachAddress,
										state:item.status,
										avatar:self.getFileType(item.attachAddress),
										createTime:item.createTime
									})
								})
	                        }
	                        //orgAttach
	                        if(res.data.orgAttach&&res.data.orgAttach[0]){
	                        	res.data.orgAttach.forEach((item)=>{
									self.defaultList.push({
										id:item.id,
										attachName:item.attachName,
										attachAddress:item.attachAddress,
										state:item.status,
										avatar:self.getFileType(item.attachAddress),
										createTime:item.createTime
									})
								})
	                        }
	                        if(res.data.costList){
	                        	res.data.costList.forEach((item)=>{
	                        		self.costVoList.forEach((citem,index)=>{
	                        			if(item.costType===citem.costType){
	                        				if(item.id){
	                        					self.costVoList[index].id=item.id;
	                        				}
	                        				self.costVoList[index].costValue=item.costValue;
	                        				self.costVoList[index].desc=item.desc;
	                        			}
	                        		})
	                        	})
	                        }
	                        if(res.data.optionList){
	                        	self.optionList=res.data.optionList;
	                        	
	                        }
	                        if(res.data.couponList){
	                        	self.couponList=[];
	                        	res.data.couponList.forEach((item)=>{
	                        		if(item.state!=2){
		                        		self.couponList.push({
		                        			key:item.id,
		                        			name:item.applyCouponName,
		                        			code:item.couponCode,
		                        			value:item.couponValue,
		                        			orderId:item.orderId,
		                        			orderCode:item.orderCode,
		                        			state:item.state
		                        		});
		                        	}
	                        	})
	                        	if(self.modelForm.sourceType===2){
	                        		self.targetKeysCoupon=self.couponList
	                        		.filter((v)=>v.orderId===self.modelForm.id && v.orderCode===self.modelForm.orderNo)
	                        		.map(item=>item.key);

	                        	}else{
	                        		self.targetKeysCoupon=self.couponList
	                        		.filter((v)=>v.orderId===res.data.appointmentVo.id && v.orderCode===res.data.appointmentVo.billCode)
	                        		.map(item=>item.key);

	                        	}
	                        	self.modelForm.couponIds=self.targetKeysCoupon.join();
	                        }
	                        if(res.data.orderVo){
	                        	self.modelForm.limitDays=res.data.orderVo.limitDays?res.data.orderVo.limitDays:35;
	                        	self.modelForm.level=res.data.orderVo.level?res.data.orderVo.level:1;
	                        }
	                    }else{
	                        self.modelForm={};
	                    }
	                })
            	}
			},
			ownerSaveAppoint(t){
				let self=this;
				self.modelLoading=true;
				self.modelForm.isOnlySave=t;
				self.modelForm.couponIds=self.targetKeysCoupon.join();

				self.modelForm.attachmentVoList=self.uploadList;
				self.modelForm.costVoList=self.costVoList;
				server.confirmOrder(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:t?'保存成功':'提交成功',
	                            desc:res.message
	                        });
	                        //self.modalVisible=false;
	                        //self.getList();
	                        self.$router.go('/order/list');
	                    }else{
	                        self.$Notice.error({
	                            title:t?'保存失败':'提交失败',
	                            desc:res.message
	                        });
	                    }
	                })
			},
			cancel(){
				this.$router.go('/order/list');
			},
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.attachAddress = res.data;
                let nameList=res.data.split('@|@');
                if(nameList&&nameList.length>1){
                	file.attachName=nameList[1].substr(0,nameList[1].lastIndexOf('.'));
		            file.avatar=this.getFileType(res.data);
                }
               	file.createTime=new Date();
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            getFileType(v){
            	if(!v){
            		return null;
            	}
            	let l=v.lastIndexOf('.');
            	switch(v.substr(l)){
            		case '.doc':
            		case '.docx':
            			return require('../../imgs/doc.png');
            		case '.dwg':
            			return require('../../imgs/noimg.png');
					case '.pdf':
            			return require('../../imgs/pdf.png');
        			case '.ppt':
        			case '.pptx':
            			return require('../../imgs/noimg.png');
        			case '.xls':
        			case '.xlsx':
            			return require('../../imgs/xls.png');
            		case '.zip':
            			return require('../../imgs/zip.png');
            		case '.jpg':
            		case '.png':
            			return server.image.thumb(v,60,60);
            		case '.txt':
            			return require('../../imgs/txt.png');
            		default :
            			return require('../../imgs/noimg.png');

            	}

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
                
                const check = this.uploadList.length < 16;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 15 张图片'
                    });
                }
                return check;
            },
		}
	}
</script>