
<template>
 <Menu mode="horizontal" :theme="theme1" active-key="1" @on-select="MenuSelect">
        <Menu-item key="1">
            <Icon type="ios-paper"></Icon>
            内容管理
        </Menu-item>
        <Menu-item key="2">
            <Icon type="ios-people"></Icon>
            用户管理
        </Menu-item>
        
        <Submenu key="3">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                统计分析
            </template>
            <Menu-group title="使用">
                <Menu-item key="3-1">新增和启动</Menu-item>
                <Menu-item key="3-2">活跃分析</Menu-item>
                <Menu-item key="3-3">时段分析</Menu-item>
            </Menu-group>
            <Menu-group title="留存">
                <Menu-item key="3-4">用户留存</Menu-item>
                <Menu-item key="3-5">流失用户</Menu-item>
                <Menu-item key="3-6">退出</Menu-item>
            </Menu-group>
        </Submenu>
        <Menu-item key="4">
            <Icon type="settings"></Icon>
            综合设置
        </Menu-item>
    </Menu>
    <br>
    <p>切换主题</p>
    <Radio-group :model.sync="theme1">
        <Radio value="light"></Radio>
        <Radio value="dark"></Radio>
        <Radio value="primary"></Radio>
    </Radio-group>
<i-table border :columns="columns4" :data="data1" @on-selection-change="selChange"></i-table>
<br/>
<button @click="update(4)">修改</button>{{modelForm.oldState}}
<i-select :model.sync="modelForm.state">
    <i-option v-for="item in stateList1" :disabled="item.disabled" :value="item.value">{{ item.label }}</i-option>
</i-select>
<br/>
<Time-picker format="HH:mm" :value.sync="timeStr" placeholder="选择时间" @on-change="timeChange" style="width: 112px"></Time-picker>{{timeStr}}


<br/>
{{modelForm.memoTimeStr}}
<br/>

<currency-input :value="total | currency '¥' '2'" :out-value.sync="total"  style="width:200px;"></currency-input>
<currency-input :value="total | currency '¥' '2'" :out-value="total" style="width:200px;"></currency-input>
<currency-input :value="total2" :out-value="total2" style="width:200px;"></currency-input>
<button @click="getVal">getVal</button>
<button @click="cancel">cancel</button>
<br/>
{{total | currency '¥' '2'}}
<br/>
<br/>
    <Transfer
        :data="data3"
        :target-keys="targetKeys3"
        :list-style="listStyle"
        :render-format="render3"
        :operations="['向左移动','向右移动']"
        filterable
        @on-change="handleChange3">
        <div :style="{float: 'right', margin: '5px'}">
            <i-button type="ghost" size="small" @click="reloadMockData">刷新</i-button>
        </div>
    </Transfer>
</template>
<script>
import CurrencyInput from '../../components/currency-input'
    export default {
        components:{CurrencyInput},
        data () {
            return {
                 theme1: 'light',
                data3: [],
                targetKeys3:[],
                listStyle: {
                    width: '250px',
                    height: '300px'
                },
                total:1000,
                total1:1001,
                total2:1002,
                stateList:[
                    {value:1,label:'确认订单'},
                    {value:2,label:'生产中'},
                    {value:3,label:'产品入库'},
                    {value:4,label:'已发货'},
                    {value:5,label:'已收货'}
                ],
                stateList1:[],
                modelForm:{
                    state:1,
                   oldState:2,
                   memoTimeStr:''
                },
                value:new Date('2017-10-10 10:00:00'),
                timeStr:new Date('2017-05-02 10:00:00'),
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width:140
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title:'电话',
                        key:'tel',
                        width:125
                    },
                    {
                        title: '地址',
                        width:170,
                        key: 'address',className:'l-ellipsis'
                    },
                    {
                    title: '操作',
                    key: 'action',fixed:'right',
                    align: 'center',width:140,
                    render (row, column, index) {
                    return `
                        <i class="iconfont icon-chakanyuyue btn" v-show="${row.appointId}!=0" title="查看预约" @click="modelShow(${row.id})"></i>
                        <i class="iconfont icon-chakandingdan btn" title="查看订货单" @click="actionShow(${row.id})"></i>
                        <i class="iconfont icon-bianji btn" title="编辑订货单" @click="actionShow(${row.id},true)"></i>
                    `;
                    }   
                }
                ],
                data1: [
                    {
                        id:1,
                        name: '待重新设计报价',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        tel:'18922151556'
                    },
                    {
                        id:2,
                        name: '张小刚',
                        age: 25,
                        address: '2017-05-02 09:01:33',
                        tel:'18922151556'

                    },
                    {
                        id:3,
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        tel:'18922151556'

                    },
                    {
                        id:4,
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        tel:'18922151556'

                    }
                ]
            }
        },
        computed:{
            canCkStateList(){
                let _list=[];
                this.stateList.forEach((item)=>{
                    let _item=item;
                    if(item.value<=this.modelForm.oldState){
                        _item.disabled=true;
                    }else{
                        _item.disabled=false;
                    }
                         _list.push(_item);
                   
                });
                return _list;
            }
        },
        ready(){
            
        },
        watch:{
            canCkStateList: {
                handler (canCkStateList) {
                    this.stateList1=canCkStateList;
                    console.log(this.stateList1);
                },
                immediate: true
            }
            
        },
        methods: {
            MenuSelect(key){
                if(key==='3-6'){
                    var t;
                    clearTimeout(t);
                    t = setTimeout(() => {
                        this.$router.go('/login');
                        
                    }, 600);
                    return;
                }
                this.$Notice.info({
                    title:'信息',
                    desc:'选择了'+key
                });
            },
            getForChild(list=[],src=''){
                let keys={
                    topKey:0,
                    leftKey:0
                }
                
                for(var i=0;i<list.length;i++){
                    
                    if(list[i].levelNum===2 && list[i].src===src){
                        keys.topKey=list[i].parentId;
                        keys.leftKey=list[i].id;
                        return keys;
                    }else if(list[i].children){
                        for(var j=0;j<list[i].children.length;j++){
                            if(list[i].children[j].levelNum===2 && list[i].children[j].src===src){
                                keys.topKey=list[i].children[j].parentId;
                                keys.leftKey=list[i].children[j].id;
                                return keys;
                            }
                        }
                        
                    }
                }
                return keys;
            },
            getChild(list=[]){
                list.forEach((item)=>{
                    if(item.children.length>0){
                        this.getChild(item.children);
                    }
                })
            },
            cancel(){
                this.$router.go(-1);
            },
            getVal(){
                console.log(this.total1);
            },
            inputChange(obj,e){

                console.log(e,obj);
                obj=parseFloat(e).toFixed(2)
               //this.$refs[id].value=parseFloat(e).toFixed(2);
            },
            selectAll(e){
                setTimeout(function(){
                    e.target.select();
                },0)
            },
            timeChange(e){
                this.modelForm.memoTimeStr=this.value.getFullYear()+'-';
                let m=this.value.getMonth();
                if(m<9){
                    this.modelForm.memoTimeStr+='0'+(m+1)+'-';

                }else{
                    this.modelForm.memoTimeStr+=(m+1)+'-';

                }
                let d=this.value.getDate();
                if(d<9){
                this.modelForm.memoTimeStr+='0'+(d)+' ';

                }else{
                this.modelForm.memoTimeStr+=(d)+' ';

                }
                this.modelForm.memoTimeStr+=e+':00';
                console.log(e);
            },
            actionEdit(){},
            update(s){
                this.modelForm.oldState=s;
                this.modelForm.state=s;
                
            },
            selChange(selection){
                console.log(selection);
            },
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        applyCouponName: '内容' + i,
                        description: '内容' + i + '的描述信息'
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                let a='内容11',b='内容11的描述信息';
                return this.getMockData()
                        .filter((v) => v.applyCouponName===a && v.description===b)
                        .map(item => item.key);
            },
            handleChange3 (newTargetKeys) {
                this.targetKeys3 = newTargetKeys;
                console.log(this.targetKeys3.join());
                this.targetKeys3.forEach((item)=>{
                    this.data3.forEach((da)=>{
                        if(item===da.key){
                            console.log(da.applyCouponName);
                        }
                    })
                    
                })
            },
            render3 (item) {
                return item.applyCouponName + ' - ' + item.description;
            },
            reloadMockData () {
                this.data3 = this.getMockData();
                this.targetKeys3 = [];//this.getTargetKeys();
            }
        }
    }
</script>
