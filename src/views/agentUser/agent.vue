<style scoped lang="less">
	
</style>
<template>
    <l-header active-key="5"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="5" active-key="5-1"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="addOrUpdate" :breads="breads" ></l-title>
                </div>
                <div class="layout-breadcrumb">
                    <i-form v-ref:form-inline :model="seachForm"  inline>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">账号</span>
                                <i-input :value.sync="seachForm.userNameLike"  placeholder="请输入经销商账号" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">电话</span>
                                <i-input :value.sync="seachForm.contactPhoneLike"  placeholder="请输入经销商电话" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">区域</span>
                                <i-input :value.sync="seachForm.addressLike"  placeholder="请输入区域" ></i-input>
                            </div>
                        </Form-item>
                        <Form-item prop="storeName">
                            <div class="l-sel-inline">
                                <span slot="prepend">门店类型</span>
                                <i-select :model.sync="seachForm.isAgent" clearable placeholder="请选择">
	                                    <i-option v-for="item in agentList" :value="item.value">{{ item.label }}</i-option>
	                            </i-select>
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
	        title="二维码"
	        >
	        <div>
	        	
	        </div>
		    <div slot="footer">
                <i-button type="ghost" size="large" @click="modalVisible=fasle">取消</i-button>
                <i-button type="primary" size="large"  @click="modalVisible=fasle">确定</i-button>
            </div>
	    </Modal>
    </div>
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
				rowsTotal:10,
				pageIndex:1,
				self:this,
				breads:[{text:'首页',href:'/index'},{text:'经销商管理',href:''}],
				tableData:[],
				seachForm:{
					userNameLike:'',
					contactPhoneLike:'',
					isAgent:null
				},
				agentList:[{value:'true',label:'非直营'},{value:'false',label:'直营'}],
				addressData:chinaAddress,
                addressValue:[],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
               
				tableCol: [
				{title:'账号',key:'userName',width:125},
				{title:'门店名称',key:'agentName',width:200},
				
				{title:'门店地址',key:'address',width:300},
				{title:'联系人',key:'contacter',width:125},
				{title:'联系电话',key:'contactPhone',width:125},
				{title:'代理产品',key:'products',width:125},
				
				{
					key:'createTime',title:'创建时间',width:170
				},
				
				
				{
					title: '操作',
					key: 'action',
					fixed:'right',
					width:170,
					align: 'center',
					render (row, column, index) {
					return `
						<i-button type="primary" title="修改" icon="edit" @click="addOrUpdate(${row.id})" size="small"></i-button>
						<i-button type="primary"
							v-show="${row.status}==1" 
							@click="updateState(${row.userId},0,'您确定禁用么？')"
							  size="small">禁用</i-button>
						<i-button type="primary"
							v-show="${row.status}==0" 
							@click="updateState(${row.userId},1,'您确定启用么？')"
							  size="small">启用</i-button>
						<i-button type="primary" size="small">二维码</i-button>	
					`;
					}   
				}]
			}
		},
		ready(){
			this.getList();
		},
		methods:{
			addrSelected(value,selectedData){
                //console.log(selectedData);
                if(selectedData.length>0){
                    this.seachForm.provinceId=selectedData[0].value;
                    this.seachForm.province=selectedData[0].label;
                    this.seachForm.cityId=selectedData[1].value;
                    this.seachForm.city=selectedData[1].label;
                    this.seachForm.areaId=selectedData[2].value;
                    this.seachForm.area=selectedData[2].label;
                }else{
                    this.seachForm.provinceId='';
                    this.seachForm.province='';
                    this.seachForm.cityId='';
                    this.seachForm.city='';
                    this.seachForm.areaId='';
                    this.seachForm.area='';
                }

            },
            
            getList(page=1,rows=10){
                let self=this;
                self.$Loading.start();
                let _list=self.seachForm;
                _list.page=page;
                _list.rows=rows;
                server.getAgentList(_list).then((res)=>{
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

			addOrUpdate(id){
				let self=this;
				if(id){
					self.$router.go('/agent/edit?id='+id);
            	}else{
            		self.$router.go('/agent/edit');
            	}
			},
			
			updateState(id,t,title){
                let self=this;
                self.$Modal.confirm({
                    onOk:function(){
                        server.changeAgent(id,t).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,10);
		                    }else{
		                        self.$Notice.error({
		                            title:'失败',
		                            desc:res.message
		                        });
		                    }
		                })
                    },
                    content:title
                })
                
            },
            
		}
	}
</script>