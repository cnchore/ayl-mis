<style scoped lang="less">
	
	
</style>
<template>
    <l-header page-src="/product/interest"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/product/interest"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-show="false" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm" inline>
                        <Form-item >
                            <div class="l-sel-inline">
                                <span slot="prepend">产品类别</span>
                                <i-select clearable :model.sync="seachForm.productType" placeholder="请选择">
                                    <i-option v-for="item in productTypeList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </div>
                        </Form-item>
                        <Form-item >
                            <i-input type="text" :value.sync="seachForm.nameLike" placeholder="模糊查询">
                                <span slot="prepend">姓名</span>
                            </i-input>
                        </Form-item>
                        <Form-item >
                            <i-input type="text" :value.sync="seachForm.mobilePhoneLike" placeholder="模糊查询">
                                <span slot="prepend">手机号码</span>
                            </i-input>
                        </Form-item>
                        <Form-item >
                            <div class="l-sel-inline">
                                <span slot="prepend">创建时间</span>
                                <Date-picker type="date" clearable :value="seachForm.createTime" format="yyyy-MM-dd" @on-change="createDateChange"  placeholder="选择日期"></Date-picker>
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
                breads:[{text:'首页',href:'/index'},{text:'建博会兴趣名单',href:''}],
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				seachForm:{
					nameLike:'',
                    mobilePhoneLike:'',
                    productType:'',
                    createTime:null,
				},
                productTypeList:[{label:'安全门窗',value:'1'},{label:'健康厨房',value:'2'}],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				menuActList:server.getMenuActionList('/product/interest'),
                tableCol: [
                    
                    {
                        title: '产品类别',width:150,
                        key: 'productType',
                        render(row){
                            return row.productType===1?'安全门窗':'健康厨房'
                        }
                    },
                    {
                        title: '客户名称',width:150,
                        key: 'name'
                    },
                    {
                        title: '客户电话',width:170,
                        key: 'mobilePhone'
                    },
                    {
                        title: '创建时间',width:170,
                        key: 'createTime'
                    },
                    {
                        title: '状态',width:120,
                        key: 'state',
                        render(row){
                            return row.state===0?'新建':'已回访'
                        }
                    },
                    {title:' '},
                    {
                        title: '操作',
                        key: 'action',
                        width:135,
                        fixed:'right',
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="primary" v-if="getAction('已回访') && ${row.state===0}" size="small" title="已回访"  @click="change(${row.id})">已回访</i-button>
                            `;
                        }   
                    }
                    
                ],
                
			}
		},
		ready(){
			this.getList();
		},
        computed:{
            
        },
		methods:{
            getAction(name=''){
                var l=this.menuActList.filter((item)=>item.menuName===name).length;
                if(l>0){
                    return true;
                }
                return false;
            },
            
            getList(page=1,rows=10){
                let self=this;
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                self.$Loading.start();
                server.getProductInterestList(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
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
			
			change(id){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                      server.changeProductInterest(id).then((res)=>{
                            if(res.success){
                                self.$Notice.success({
                                    title:'设置成功',
                                    desc:res.message
                                });
                                self.getList(self.pageIndex,10);
                            }else{
                                self.$Notice.error({
                                    title:'设置失败',
                                    desc:res.message
                                });
                            }
                        })  
                    },
                    content:'您确认设置已回访吗？'
                });
                
			},
            createDateChange(e){
                this.seachForm.createTime=e;
            },	
		}
	}
</script>