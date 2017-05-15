<style scoped lang="less">
	
	
</style>
<template>
    <l-header page-src="/study/product/point"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/study/product/point"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads"></l-title>
                </div>
                <br/>
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
                breads:[{text:'首页',href:'/index'},{text:'产品卖点',href:''}],
                
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
				tableCol: [
                    {
                        title: '课程名称',
                        key: 'courseName'
                    },
                    {
                        title: '课程描述',width:200,className:'l-ellipsis',
                        key: 'courseDesc'
                    },
                    {
                        title: '讲师',
                        key: 'lecturer'
                    },
                    {
                        title: '创建时间',width:170,
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        render(row){
                            return `<a target="_blank" href="${row.courseUrl}">马上学习</a>`;

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
            
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list={
                    page:page,
                    rows:rows,
                    type:1,
                    state:2
                }
                server.getCourse(_list).then((res)=>{
                    self.$Loading.finish();
                    self.tableData=res.data.rowsObject;
                    self.rowsTotal=res.data.total;
                })
            },
            changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,10);
            },
        }
	}
</script>