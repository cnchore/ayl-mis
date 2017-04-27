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
    <l-header active-key="11"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="11" active-key="11-2"></left-menu>
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
                    		<i-form :model="modelForm" :label-width="100" >
                    			<Row>
                    				<i-col span="12">
										<Form-item label="联系人姓名">
		            						{{modelForm.name}}
								        </Form-item>
		                    			
		            					<Form-item label="联系人手机">
								            {{modelForm.mobilePhone}}
								        </Form-item>
		                    			<Form-item label="客户归属">
								            {{modelForm.belongNames}}
								        </Form-item>
                    				</i-col>
                    				<i-col span="12">
										<Form-item label="装修项目">
								           {{modelForm.decorateProject}}
								        </Form-item>
		            					<Form-item label="所在地区">
						        			
								            {{modelForm.province}} {{modelForm.city}} {{modelForm.area}}
								           
								        </Form-item>
		            					<Form-item label="详细地址">
								            {{modelForm.address}}
								           
								        </Form-item>
                    				</i-col>
                    				<i-col span="24">
										<Form-item label="备注">
								           {{modelForm.remark}}
								        </Form-item>
                    				</i-col>
                    			</Row>
            					
						    </i-form>
                    	</div>
                    </div>
                    <div class="q-imgs" v-show="orderList&&orderList[0]">
                        <div class="q-title">
                        	<i class="iconfont icon-dinghuodan"></i>客户订单
                    	</div>
                    	<div class="container">
                    		<div>
                    		<i-table :content="self" :columns="tableCol" :data="tableData"></i-table>
		                    <div style="margin: 10px;overflow: hidden">
		                        <div style="float: right;">
		                            <Page :total="rowsTotal" show-total show-elevator :current.sync="pageIndex" @on-change="changePage"></Page>
		                        </div>
		                    </div>
                            </div>
                         </div>
                         
                    </div>
                    <div class="q-imgs" v-show="defaultList&&defaultList[0]">
                        <div class="q-title">
                        	<i class="iconfont icon-tianjia"></i>客户附件
                    	</div>
                    	<div class="container">
                    		
                            <div class="q-right">
	                            <div class="q-img-list" v-show="item.state==1" v-for="item in defaultList">
		                    		<div class="l-upload-list" >
		                                    <img :src="item.avatar">
		                            </div>
		                            <div class="double" >
		                            	{{item.attachName}}
		                            </div>
		                            <div>{{item.createTime}}</div>
		                            <div>
		                            	<a :href="item.attachAddress" target="_blank">
		                           			<Icon type="ios-download-outline" title="下载"></Icon>
		                            	</a>
		                           	</div>
		                           
	                            </div>
	                            
                            </div>
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
				breads:[{text:'首页',href:'/index'},{text:'客户管理',href:'/order/ownerInfo'},{text:'客户资料查看',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                defaultList:[],
                id:null,
                modelForm:{},
                rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				tableCol: [
				{title:'订单编号',
					render(row){
						return `<a v-link="{path:'/owner/order/look?id='+${row.id}}">${row.orderNo}</a>`;
					}
				},
				{title:'下单日期',key:'createTime'},
				{title:'下单人',key:'byAgent'},
				{title:'订单成交额',key:'turnoverAmount'},
				{title:'订单状态',key:'state',
					render(row){
						return `{{getStatusName(${row.state})}}`
					}
				},
				{title:'订单来源',key:'sourceType',
					render(row){
						return row.sourceType?row.sourceType===1?'预约':'后台添加':'无'
					}
				}],
				orderList:[],
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
		computed:{
			tableData(){
				return this.orderList.slice((this.pageIndex-1)*10,10);
			}
		},
		methods:{

			getStatusName(v){
                
                switch(v){
                    case 1:
                    return "确认订单";
                    case 2:
                    return "生产中";
                    case 3:
                    return "产品入库";
                    case 4:
                    return "已发货";
                    case 5:
                    return "已收货";
                }
            },
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
						if(res.data.orderList){
							self.orderList=res.data.orderList;
							self.rowsTotal=res.data.orderList.length;
						}
					}
				})
			},
			changePage(index){
                this.pageIndex=index+0;
                //this.getList(index+0,10);
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