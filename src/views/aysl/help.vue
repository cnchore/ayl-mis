<style scoped lang="less">
    
    
</style>
<template>
    <l-header page-src="/help"></l-header>
    <div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu page-src="/help"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="add" :is-show="getAction('新增')" :breads="breads"></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm" inline>
                        <Form-item prop="category">
                            <div class="l-sel-inline">
                                <span slot="prepend">问题类别</span>
                                <i-select :model.sync="seachForm.type" clearable placeholder="请选择">
                                    <i-option v-for="item in typeList" :value="item.value">{{ item.label }}</i-option>
                                </i-select>
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
            :visible.sync="addModal"
            title="新增/编辑"
            @on-ok="modalOk"
            width="580"
            loading
            :mask-closable="false" 
            scrollable=>
             <i-form v-ref:form-validate :model="modelForm" :rules="ruleValidate" :label-width="100">
                <Form-item label="序号" prop="seq">
                    <i-input :value.sync="modelForm.seq" placeholder="请输入序号"></i-input>
                </Form-item>
                <Form-item label="问题类型" prop="type" v-if="false">
                    <i-select :model.sync="modelForm.type" placeholder="请选择">
                        <i-option v-for="item in typeList" :value="item.value">{{ item.label }}</i-option>
                    </i-select>
                </Form-item>
                <Form-item label="问题描述" prop="question">
                    <i-input :value.sync="modelForm.question" placeholder="请输入问题描述"></i-input>
                </Form-item>
                <Form-item label="问题答案" prop="answer">
                    <v-editor :input-content="modelForm.answer" :out-content.sync="outProp"></v-editor>
                </Form-item>
                
        
            </i-form>
        </Modal>
    </div>
</template>
<script>
import server from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import Editor from '../../components/editor'
import LTitle from '../../components/title'
    export default{
        components:{LHeader,'v-editor':Editor,LeftMenu,LTitle},
        data(){
            return{
                breads:[{text:'首页',href:'/index'},{text:'常见问题管理',href:''}],
                
                addModal:false,
                rowsTotal:10,
                pageIndex:1,
                self:this,
                tableData:[],
                seachForm:{
                    type:''
                },
                typeList:[{value:1,label:'设计师'},{value:2,label:'开拓者'},{value:3,label:'业主'}],
                leftMenu:true,
                spanLeft: 4,
                spanRight: 20,
                menuActList:server.getMenuActionList('/help'),
                tableCol: [
                    
                    {
                        title: '问题类型',width:125,
                        key: 'type',
                        render(row,column,index){
                            return `{{getTypeName(${row.type})}}`;
                        }
                    },
                    {
                        title: '问题标题',width:580,ellipsis:true,
                        key: 'question'
                    },
                    {title:' '},
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width:105,
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="primary" v-if="getAction('编辑')" size="small" title="修改" icon="edit" @click="update(${row.id})"></i-button>
                          
                            <i-button type="primary" v-if="getAction('删除')"
                                @click="remove(${row.id})" title="删除"
                                 icon="ios-trash" size="small"></i-button>

                            `;
                        }   
                    }
                    
                ],
                modelForm:{
                    seq:'',
                    question:'',
                    answer:'',
                    type:''
                },

                ruleValidate:{
                    question:[
                        { required: true, message: '问题不能为空', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ]
                },
                outProp:'',
                outParams:'',
                
                isLook:false
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
            getTypeName(value){
                let _index=this.typeList.findIndex((v)=>v.value==value);
                return this.typeList[_index].label;
            },
            getList(page=1,rows=10,type=null){
                let self=this;
                self.$Loading.start();
                server.getHelp(page,rows,type).then((res)=>{
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
                self.modelForm.answer=self.outProp;
                self.modelForm.type=3;
                
                if(self.modelForm.id){
                    server.updateHelp(self.modelForm).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'修改成功'
                            })
                            self.addModal=false;
                           self.getList(self.pageIndex,10,self.seachForm.type);
                        }else{
                            self.$Notice.error({
                                title:'修改失败',
                                desc:res.message
                            })
                        }
                    })
                }else{
                    server.addHelp(self.modelForm).then((res)=>{
                        if(res.success){
                            self.$Notice.success({
                                title:'新增成功'
                            })
                            self.addModal=false;
                           self.getList(self.pageIndex,10,self.seachForm.type);
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
                this.getList(index+0,10,this.seachForm.type);
            },
            search(name){
                this.pageIndex=1;
                this.getList(1,10,this.seachForm.type);
            },
            add(){
                this.isLook=false;
                for (var obj in this.modelForm) {
                    this.modelForm[obj]='';
                }
                
                this.outProp='';
                
                this.addModal=true;
            },
            update(id){
                let self=this;
                self.isLook=false;
                self.$Loading.start();
                server.getHelpByid(id).then((res)=>{   
                    self.$Loading.finish();

                    return server.jsonParse(res.data);

                }).then((list)=>{
                    self.modelForm=list;
                    if(!self.modelForm || !self.modelForm.id){
                        return;
                    }
                    
                    self.outProp=self.modelForm.answer;
                    
                    self.addModal=true;
                })
            },
            remove(id){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                       server.delHelp(id).then((res)=>{
                            if(res.success){
                                self.$Notice.success({
                                    title:'删除成功',
                                    desc:res.message
                                });
                                self.getList(self.pageIndex,10,self.seachForm.type);
                            }else{
                                self.$Notice.error({
                                    title:'删除失败',
                                    desc:res.message
                                });
                            }
                        }) 
                    },
                    content:'您确认删除这条内容吗？'
                })
                
            }  
        }
    }
</script>