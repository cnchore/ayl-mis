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
			margin-left: -100px;
			button:first-child{
				margin-right: 15px;
			}
		}
	}
</style>
<template>
    <l-header active-key="3"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="3" active-key="3-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <br/>
                <div class="layout-content" >
                	<div class="q-imgs">
                		<div class="q-title">
                        	<i class="iconfont icon-tianjia"></i>客户意见区
                    	</div>
                		<div class="container q-table">
                			<Collapse active-key="1">
						        <Panel key="1">
						            2017-04-19 对大样图设计及报价存在疑问
						            <p slot="content">对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。</p>
						        </Panel>
						        <Panel key="2">
						            2017-04-18 对大样图设计及报价存在疑问
						            <p slot="content">对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。</p>
						        </Panel>
						        <Panel key="3">
						            2017-04-17 对大样图设计及报价存在疑问
						            <p slot="content">对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。对大样图设计及报价存在疑问，能否详细门窗报价部门，并给予优惠。</p>
						        </Panel>
						    </Collapse>
                		</div>
                	</div>
                    <div class="q-imgs">
                        <div class="q-title">
                        	<i class="iconfont icon-tianjia"></i>公共附件区
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
                            <div class="q-right">
	                            <div class="q-img-list" v-for="item in uploadList">
		                    		<div class="l-upload-list" >
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
		                            <i-input :value.sync="item.name" class="q-text-center" placeholder="请输入名称"></i-input>

	                            </div>
	                            <div class="q-top-b">
	                            	<a href="#">下载报价单模版</a>
	                            </div>
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
						    <Row class="q-row">
						        <i-col span="5">产品费</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">安装运输邮费</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">运输费</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">安装费</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">销售总金额</i-col>
						        <i-col span="7">15000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">折扣</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">优惠券抵扣(公众号)</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">现金券抵扣</i-col>
						        <i-col span="7" class="q-col">5000
									<a href="#">选择现金券</a>
						        </i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">成交金额</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row title">
						        <i-col span="24">总部报价区</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">出厂金额</i-col>
						        <i-col span="7">15000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">折扣</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">折后金额</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
						        <i-col span="5">交货日期</i-col>
						        <i-col span="7">5000</i-col>
						        <i-col span="12">&nbsp;</i-col>
						    </Row>
						    <Row class="q-row">
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
                    		<i-form :model="formItem" :label-width="100">
                    			<Form-item label="经销商备注">
						            <i-input :value.sync="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
						        </Form-item>
                    		
                    			<Form-item label="总部备注">
						            <i-input :value.sync="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
						        </Form-item>
						        <Form-item>
						        	<div class="q-form-btn">
							        	<i-button type="primary" size="large">提交</i-button>
	            						<i-button type="ghost" size="large">取消</i-button>
        							</div>
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
				breads:[{text:'首页',href:'/index#!/index'},{text:'预约管理',href:'/index#!/waiting'},{text:'订货单编辑',href:''}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                baseUrl:server.getBaseUrl(),
                uploadData:{bucket:'dc-test'},
                defaultList: [
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''},
                {url:'',avatar:'http://obo5ony4m.bkt.clouddn.com/dc-test-20161216112359@|@848509258005235597.jpg',name:''}],
                imgName: '',
                visible: false,
                modelForm:{radio:1},
                formItem:{}
			}
		},
		ready(){
		},
		computed: {
           uploadList () {
                return this.$refs.upload ? this.$refs.upload.fileList : [];
            }
        },
		methods:{
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