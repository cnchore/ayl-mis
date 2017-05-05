<style scoped lang="less">
    
</style>
<template>
    <l-header active-key="4"></l-header>
    <div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="4" active-key="4-3"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">名称/电话</span>
                                <i-input :value.sync="seachForm.phoneOrNameLike"  placeholder="请输入客户名称/电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">订单号</span>
                                <i-input :value.sync="seachForm.orderNoLike"  placeholder="请输入订单号" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">下单时间</span>
                                <Date-picker type="date" :value="seachForm.createTimeStr" format="yyyy-MM-dd" @on-change="createTimeChange"  placeholder="选择日期"></Date-picker>
                            </div>
                        </Form-item>
                        <Form-item>
                            <i-button type="ghost" icon="search" @click="search('formInline')">搜索</i-button>
                        </Form-item>
                        
                        
                    </i-form>
                </div>
                <div class="layout-content" >
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
            title="订单状态修改"
            @on-ok="modelSubmit"
           
            :mask-closable="false"
            >
            <i-form v-ref:form-validate :model="modelForm"  :label-width="130">
                <Form-item label="订单状态">
                   <i-select :model.sync="modelForm.state">
                        <i-option v-for="item in stateList" :disabled="item.disabled" :value="item.value">{{ item.label }}</i-option>
                    </i-select>
                </Form-item>
            </i-form>
            <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">取消</i-button>
                <i-button type="primary" size="large" :loading="modelLoading" @click="changeState">确定</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
import server,{storage} from '../../libs/server'
import LeftMenu from '../../components/left-menu'
import LHeader from '../../components/header'
import LTitle from '../../components/title'
    export default{
        components:{LHeader,LeftMenu,LTitle},
        data(){
            return{
                breads:[{text:'首页',href:'/index'},{text:'订单管理',href:'/order/list'},{text:'订单状态修改',href:''}],
                rowsTotal:10,
                pageIndex:1,
                self:this,
                tableData:[],
                modalVisible:false,
                modelLoading:false,
                seachForm:{
                    flowState:2
                },
                leftMenu:true,
                spanLeft: 4,
                spanRight: 20,
                selectedData:[],
                modelForm:{
                    state:null,
                    oldState:0,
                    id:null
                },
                stateList:[],
                tableCol: [
                
                {
                    key:'name',title:'客户名称',width:95
                },
                {
                    key:'mobilePhone',title:'客户电话',width:125
                },
                {
                    key:'orderNo',title:'订单号',width:200
                },
                {
                    width:140,key:'state',title:'订单进度',

                    render(row,column,index){
                        return `{{getStatusName(${row.state})}}`;
                    }
                },
                {
                    title:'订单级别',width:95,
                    render(row){
                        let l=''
                        let _l=row.level?row.level:null
                        l=_l?_l===1?'低':_l===2?'中':'高':'无'
                        return l;
                    }
                },
                
                
                {
                    title:'下单时间',width:170,
                    render(row){
                        return row.createTime?row.createTime:'无'
                    }
                },
                
                {
                   title:'接收时间',width:170,
                   render(row){
                        return row.updateTime?row.updateTime:'无'
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed:'right',
                    width:65,
                    align: 'center',
                    render (row, column, index) {
                    return `
                        <i class="iconfont icon-bianji btn" v-show="${row.flowState}===2" title="修改订单状态" @click="changeClick(${row.id},${row.state})"></i>
                    `;
                    }   
                }]
            }
        },
        ready(){
            let userInfo=storage.session.get('userInfo');
            if(userInfo&&userInfo.type!=1){
                this.$router.go('/index');
                return;
            }
            this.getList();
            
        },
        computed:{
            canChangeData(){
                let _list=[];
                if(this.tableData&& this.tableData[0]){
                    this.tableData.forEach((item)=>{
                        let _item=item;
                        if(item.flowState!=2){
                            _item._disabled=true;
                        }
                        _list.push(_item);
                    })
                }
                return _list;
            },
            canCkStateList(){
                let _list=[];
                let stateList=[
                    {value:1,label:'确认订单'},
                    {value:2,label:'生产中'},
                    {value:3,label:'产品入库'},
                    {value:4,label:'已发货'},
                    {value:5,label:'已收货'}
                ];
                stateList.forEach((item)=>{
                    let _item=item;
                    if(item.value<=this.modelForm.oldState){
                        //_item.disabled=true;
                    }else{
                        //_item.disabled=false;
                        _list.push(_item);
                    }
                });
                return _list;
            }
        },
        watch:{
            canCkStateList: {
                handler (canCkStateList) {
                    this.stateList=canCkStateList;
                },
                immediate: true
            }
        },
        methods:{
            selChange(selection){
                console.log(selection);
                this.selectedData=selection;
            },
            changeClick(id,s){
                this.modelForm.id=id;
                this.modelForm.oldState=s;
                
                this.modalVisible=true;
            },
            changeState(){
                let self=this;
                self.modelLoading=true;
                if(self.modelForm.state<=self.modelForm.oldState){
                    self.modelLoading=false;
                    self.$Notice.warning({
                            title:'警告',
                            desc:'状态不能往前修改'
                    });
                    return;
                }
                self.$Loading.start();
                
                server.changeOrder(self.modelForm.id,self.modelForm.state).then((res)=>{
                    self.$Loading.finish();
                    if(res.success){
                        self.$Notice.success({
                            title:'状态修改成功',
                            desc:res.message
                        });
                        self.modelLoading=false;
                        self.modalVisible=false;
                        self.getList(self.pageIndex,10);
                    }else{
                        self.$Notice.error({
                            title:'状态修改失败',
                            desc:res.message
                        });
                    }
                })
                
                
            },
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
            
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                
                _list.page=page;
                _list.rows=rows;
                server.getOrderList(_list).then((res)=>{
                    self.$Loading.finish();
                    if(res.data&&res.data.rowsObject){
                        self.tableData=res.data.rowsObject;
                        self.rowsTotal=res.data.total;
                    }
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
            
            
            createTimeChange(e){
                this.seachForm.createTimeStr=e;
            },
           
            
        }
    }
</script>