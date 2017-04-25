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
					width:158px;
					height:158px;
					display: inline-block;
					margin:0px 10px 20px 10px;
					.l-upload-list{
						width:158px;
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
    <l-header active-key="10"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="10" active-key="10-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <br/>
                <div class="layout-content" >
                	<div class="q-imgs" v-show="optionList[0]">
                		<div class="q-title">
                        	<i class="iconfont icon-tianjia"></i>客户意见区
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
                        	<i class="iconfont icon-tianjia"></i>公共附件区
                    	</div>
                    	<div class="container">
                    		
                            <div class="q-right">
                            	<template v-for="(index,item) in uploadList">
                            	<div v-show="getIsShowDate(index,item.createTime.substr(0,10))">{{item.createTime.substr(0,10)}}</div>
	                            <div class="q-img-list" >
		                    		<div class="l-upload-list" >
	                                    <img :src="item.avatar">
	                                    <div class="l-upload-list-cover">
	                                        <a :href="item.attachAddress" target="_blank">
			                           			<Icon type="ios-download-outline" title="下载"></Icon>
			                            	</a>
	                                    </div>
		                            </div>
		                            <div>{{item.attachName}}</div>

	                            </div>
	                            </template>
	                            
                            </div>
                         </div>   
                    </div>
                    <div class="q-imgs">
                    	<div class="q-title">
                        	<i class="iconfont icon-tianjia"></i>艾臣家居门窗订货单
                    	</div>
                    	<div class="container q-table">
                    		<Row class="q-row thead">
						        <i-col span="5">项目</i-col>
						        <i-col span="7">费用</i-col>
						        <i-col span="12">说明</i-col>
						    </Row>
                    		<Row class="q-row title">
						        <i-col span="24">经销商报价区</i-col>
						    </Row>
						    <Row class="q-row" v-for="item in costVoList">
						        <i-col span="5">{{item.costName}}</i-col>
						        <i-col span="7">
						        	<span v-show="item.costType!=4 && item.costType!=11 && item.costType!=12" >{{item.costValue}}</span>

		            				<span v-show="item.costType===4">{{getCouponToal}}</span>
		            				<span v-show="item.costType===11">{{getSaleToal}}</span>
		            				<span v-show="item.costType===12">{{getDealToal}}</span>
						        </i-col>
						        <i-col span="12">
						        	{{item.desc}}
						        </i-col>
						    </Row>
						    
						   
						    
						    <Row class="q-row title" v-show="false">
						        <i-col span="24">总部报价区</i-col>
						    </Row>
						    <Row class="q-row" v-show="false">
						        <i-col span="5">出厂金额</i-col>
						        <i-col span="7">15000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row" v-show="false">
						        <i-col span="5">折扣</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row" v-show="false">
						        <i-col span="5">折后金额</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row" v-show="false">
						        <i-col span="5">交货日期</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row" v-show="false">
						        <i-col span="5">优先级</i-col>
						        <i-col span="7">
						        	<Radio-group :model.sync="modelForm.radio">
						                <Radio value="0">高</Radio>
						                <Radio value="1">中</Radio>
						                <Radio value="2">低</Radio>
						            </Radio-group>
						         </i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
		
                    	</div>
                    </div>
                    <div class="q-imgs">
                    	<div class="q-title">
                        	<i class="iconfont icon-tianjia"></i>备注
                    	</div>
                    	<div class="container q-table">
                    		<i-form :model="modelForm" :label-width="100">
                    			<Form-item label="经销商备注">
                    				{{modelForm.remark}}
						        </Form-item>
                    		
                    			<Form-item label="总部备注">
                    				{{modelForm.remark}}
						        </Form-item>
						        
						    </i-form>
                    	</div>
                    </div>
                    
                </div>
                <div class="layout-copy">
                    版权所有 &copy; 2017.艾臣智能门窗科技有限公司.
                </div>
            </i-col>
        </Row>
        
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
				breads:[{text:'首页',href:'/index#!/index'},{text:'预约管理',href:'/owner/waiting'},{text:'订货单查看',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                defaultList: [],
                
                modelLoading:false,
                modelForm:{
                	
                },
                costVoList:[
                	{costName:'产品费',costValue:0,desc:'',costType:1},
                	{costName:'运输费',costValue:0,desc:'',costType:2},
                	{costName:'安装费',costValue:0,desc:'',costType:3},
                	{costName:'销售总金额',costValue:0,desc:'',costType:11},

                	{costName:'折扣',costValue:1,desc:'',costType:5},
                	{costName:'优惠券抵扣(公众号)',costValue:0,desc:'',costType:6},
                	{costName:'现金券抵扣',costValue:0,desc:'',costType:4},
                	
                	{costName:'成交金额',costValue:0,desc:'',costType:12},
                ],
                id:null,
                optionList:[],
                couponList:[],
                targetKeysCoupon:[],
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
           		let _list=this.defaultList ? this.defaultList : [];
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
            getDealToal(){
            	return this.getSaleToal*this.costVoList[4].costValue-this.costVoList[5].costValue-this.getCouponToal;
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
			getIsShowDate(index,dateStr){
				if(!dateStr){
					return false;
				}
				let b=false;
				if(index>0){
					if(this.uploadList[index-1].createTime.substr(0,10)===dateStr){
						b=false;
					}else{
						b=true;
					}
				}else{
					b=true;
				}
				console.info(b);
				return b;
			},
			getList(){
				let self=this;
				if(self.id){
					self.$Loading.start();
	                server.getAppointByid(self.id).then((res)=>{
	                	self.$Loading.finish();
	                    if(res.success){
	                        self.modelForm=res.data.appointmentVo;
	                        if(res.data.agentAttach&&res.data.agentAttach[0]){
	                        	res.data.agentAttach.forEach((item)=>{
								self.defaultList.push({
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
	                        				self.costVoList[index].costValue=item.costValue;
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
	                        	self.targetKeysCoupon=self.couponList
	                        		.filter((v)=>v.orderId===self.modelForm.id && v.orderCode===self.modelForm.billCode)
	                        		.map(item=>item.key);

	                        }
	                    }else{
	                        self.modelForm={};
	                    }
	                })
            	}
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
            			return require('../../imgs/noimg.png');
        			case '.xls':
            			return require('../../imgs/xls.png');
            		case '.zip':
            			return require('../../imgs/zip.png');
            		case '.jpg':
            		case '.png':
            			return server.image.thumb(v,60,60);
            		default :
            			return require('../../imgs/noimg.png');

            	}
            },
            
		}
	}
</script>