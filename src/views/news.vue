<style scoped lang="less">
	
	
</style>
<template>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-key="1-2"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-header @on-click="toggleClick"></l-header>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <i-input type="text" :value.sync="seachForm.storeName" placeholder="模糊查询">
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
                <div class="layout-content" :style="{ height:contentHeight + 'px' }">
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
            
        </Modal>
    </div>
</template>
<script>
import server from '../libs/server'
import LeftMenu from '../components/left-menu'
import LHeader from '../components/header'
	export default{
		components:{LHeader,LeftMenu},
		data(){
			return{
				addModal:false,
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					storeName:''
				},
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                newsForm:{
					  thumb:'',   //缩略图
					  summary:'', //摘要
					  title:'',     //标题
					  content:'',     //内容
					  createTime:'', //创建时间
					  publishTime:'', //发布时间
					  status:'',     //状态:1 草稿  2 发布  3 结束发布
					  type:'',     //类别:1通知公告 2：新闻动态 3、艾臣资讯
					  isRead:''      //是否已读

                },
				tableCol: [
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
                        width: 150,
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
                    
                ]
			}
		},
		ready(){
			let self=this;
            self.setContentHeight();
            self.tableWidth=window.document.getElementsByClassName('layout-content')[0].offsetWidth-20;
		},
		methods:{
			modalOk(){

			},
			changePage(index){

			},
			search(name){

			},
			add(){

			},
			update(id){

			},
			remove(id){

			},
			setContentHeight(){
                this.contentHeight=window.document.body.clientHeight-185;
            },
            toggleClick () {
                this.leftMenu=!this.leftMenu;
                if (this.leftMenu) {
                    this.spanRight = 20;

                } else {
                    this.spanRight = 24;
                }
            }	
		}
	}
</script>