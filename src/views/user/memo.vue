<style scoped lang="less">
	.layout-content{
		.ivu-col-span-8{
			padding-left: 10px;
			padding-right: 10px;
			border-right: 1px solid #e3e8ee;
		}
	}
	.ivu-date-picker-cells{
		width: 100%;
		margin:0px;
		padding-left:1%;
		span{
			display: inline-block;
			width:14%;
			height: 40px;
			margin:0;
			line-height: 40px;
			em{
				margin:0;
				width:100%;
				line-height: 36px;
				height: 36px;
			}
		}
	}
	.q-date-title{
		text-align: center;
		padding-bottom: 25px;
		h1{
			font-size: 3rem;
		}
		div{
			display: -webkit-box;
		    -webkit-box-pack: center;
		    -webkit-box-align: center;
		    -webkit-box-orient: vertical;
			span{
				padding: 10px 30px;
				border-radius: 4px;
				margin-left: 35px;
				font-size: 1rem;
				background-color: darken(#f5f7f9,20%);
			}
			i{
				
				
			}
		}
	}
	.q-form-btn{
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		-webkit-box-orient: vertical;
		button:first-child{
			margin-right: 15px;
		}
	}
	.q-cell-memo em{
		text-decoration: overline;
	}
</style>
<template>
    <l-header active-key="0"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu active-Menu="0" active-key="0-3"></left-menu>
            </i-col>
            <i-col :span="spanRight">

                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" :is-Show="false" :breads="breads" ></l-title>
                </div>
               	<br/>
                <div class="layout-content">
                	<Row>
                		<i-col span="8" >
 							<div :class="[datePrefixCls + '-header']">
				                <span
				                    :class="iconBtnCls('prev', '-double')"
				                    @click="prevYear"><Icon type="ios-arrow-left"></Icon></span>
				                <span
				                    :class="iconBtnCls('prev')"
				                    @click="prevMonth"
				                    ><Icon type="ios-arrow-left"></Icon></span>
				                <span
				                    :class="[datePrefixCls + '-header-label']"
				                    >{{year}}年</span>
				                <span
				                    :class="[datePrefixCls + '-header-label']"
				                    >{{ month+1 }}月</span>
				                <span
				                    :class="iconBtnCls('next', '-double')"
				                    @click="nextYear"><Icon type="ios-arrow-right"></Icon></span>
				                <span
				                    :class="iconBtnCls('next')"
				                    @click="nextMonth"
				                    ><Icon type="ios-arrow-right"></Icon></span>
				            </div>
					        <div class="ivu-date-picker-cells"
								:class="classes"
        						@click="handleClick"
					        >
					        	<div :class="[prefixCls + '-header']">
					        		<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
					        	</div>
					        	<!--v-for-start-->
					        	<span :class="getCellCls(item)" v-for="(index,item) in readCells"><em :index="index">{{item.text}}</em></span>
					        	
					        	<!--v-for-end-->
					        </div>
					        <div :class="[datePrefixCls + '-header']">
				                
				                <span
				                    :class="[datePrefixCls + '-header-label']"
				                    >{{rightYear}}年</span>
				                <span
				                    :class="[datePrefixCls + '-header-label']"
				                    >{{ rightMonth+1 }}月</span>
				               
				            </div>
					        <div class="ivu-date-picker-cells"
								:class="classes"
        						@click="rightDateClick"
					        >
					        	<div :class="[prefixCls + '-header']">
					        		<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
					        	</div>
					        	<!--v-for-start-->
					        	<span :class="getCellCls(item)" v-for="(index,item) in rightReadCells"><em :index="index">{{item.text}}</em></span>
					        	
					        	<!--v-for-end-->
					        </div>
                		</i-col>
                		<i-col span="16" style="padding-left: 10px;">
                			<div class="q-date-title">
                				<h1>{{value.getDate()}}</h1>
                				<div>
                					<span>{{value.getFullYear()}}年 {{value.getMonth()+1}}月</span>
                            		<i class="iconfont icon-tianjia btn" @click="addOrUpdate()"></i>
                				</div>
                			</div>
                			<i-table :content="self" :columns="tableCol" :data="tableData"></i-table>
		                    <div style="margin: 10px;overflow: hidden">
		                        <div style="float: right;">
		                            <Page :total="rowsTotal" :page-size="5" show-total show-elevator :current.sync="pageIndex" @on-change="changePage"></Page>
		                        </div>
		                    </div>
		                    
	                    	<i-form v-ref:form-validate v-show="formVisable" :model="modelForm" :rules="modeRule" :label-width="100">
						        <Form-item label="备忘时间" prop="memoTime">
						          
						            <Time-picker :value="modelForm.memoTime?new Date(modelForm.memoTime):value" format="HH:mm" @on-change="createDateChange"  placeholder="选择时间"></Time-picker>
						        </Form-item>
						        <Form-item label="内容" prop="content">
						            <i-input :value.sync="modelForm.content" type="textarea" :rows="3" placeholder="请输入备忘内容"></i-input>
						        </Form-item>
						        <Form-item label="优先级">
						            <Radio-group :model.sync="modelForm.memoLevel">
						                <Radio value="3">高</Radio>
						                <Radio value="2">中</Radio>
						                <Radio value="1">一般</Radio>
						            </Radio-group>
						        </Form-item>
						        <Form-item>
						        	<div class="q-form-btn">
						            <i-button type="primary" @click="modelSubmit">保存</i-button>
						            <i-button type="ghost" @click="formVisable=false">取消</i-button>
						            </div>
						        </Form-item>
						    </i-form>
		                   
                		</i-col>
                	</Row>
                    
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
import { getFirstDayOfMonth, getDayCountOfMonth } from '../../libs/date-util'
	
	const prefixCls = 'ivu-date-picker-cells';
	const datePrefixCls = 'ivu-date-picker';

	const clearHours = function (time) {
        const cloneDate = new Date(time);
        cloneDate.setHours(0, 0, 0, 0);
        return cloneDate.getTime();
    };
    function typeOf(obj) {
	    const toString = Object.prototype.toString;
	    const map = {
	        '[object Boolean]'  : 'boolean',
	        '[object Number]'   : 'number',
	        '[object String]'   : 'string',
	        '[object Function]' : 'function',
	        '[object Array]'    : 'array',
	        '[object Date]'     : 'date',
	        '[object RegExp]'   : 'regExp',
	        '[object Undefined]': 'undefined',
	        '[object Null]'     : 'null',
	        '[object Object]'   : 'object'
	    };
	    return map[toString.call(obj)];
	}
    const deepCopy=function(data) {
	    const t = typeOf(data);
	    let o;

	    if (t === 'array') {
	        o = [];
	    } else if ( t === 'object') {
	        o = {};
	    } else {
	        return data;
	    }

	    if (t === 'array') {
	        for (let i = 0; i < data.length; i++) {
	            o.push(deepCopy(data[i]));
	        }
	    } else if ( t === 'object') {
	        for (let i in data) {
	            o[i] = deepCopy(data[i]);
	        }
	    }
	    return o;
	};
	
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
				datePrefixCls:datePrefixCls,
				breads:[{text:'首页',href:'/index#!/index'},{text:'备忘录',href:''}],
				rowsTotal:5,
				pageIndex:1,
				self:this,
				tableData:[],
				date: {},
	            year: new Date().getFullYear(),
	            month: new Date().getMonth(),
	            rightYear:{},
	            rightMonth:{},
	            value:new Date(),
	            valueStr:this.getDateStr(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),
				prefixCls: prefixCls,
                readCells: [],
                rightReadCells:[],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{},
                modeRule:{
                	content: [
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                    ],
                    memoLevel: [
                        { required: true, message: '优先级不能为空', trigger: 'blur' }
                    ],
                    memoTime: [
                        { required: true, message: '备忘时间不能为空', trigger: 'blur' }
                    ]
                },
                formVisable:false,
                modelLoading:false,
				tableCol: [
				{
					width:95,key:'memoLevel',title:'优先级',

					render(row,column,index){
						return `<span class="l-s-Error">{{getStatusName(${row.memoLevel})}}</span>`;
					}
				},
				{
					key:'memoTime',title:'备忘时间',width:200
				},
				{
					key:'content',title:'备忘',className:'l-min-width l-ellipsis'
				},
				
				{
					title: '操作',
					key: 'action',width:160,
					align: 'center',
					render (row, column, index) {
					return `
						<i-button type="primary" icon="edit" @click="addOrUpdate(${row.id})" size="small">修改</i-button>
						<i-button type="primary"
							@click="del(${row.id})"
							 icon="ios-trash" size="small">删除</i-button>
					`;
					}   
				}]
			}
		},
		ready(){
			
		},
		watch:{
			cells: {
                handler (cells) {
                    this.readCells = cells;

                },
                immediate: true
            },
            rightCells: {
                handler (rightCells) {
                    this.rightReadCells = rightCells;
                },
                immediate: true
            },
            valueStr:{
            	handler(valueStr){
            		this.getList();
            	},
            	immediate:true
            }
		},
		computed:{
			cells () {
                const date = new Date(this.year, this.month, 1);
                let day = getFirstDayOfMonth(date);    // day of first day
                day = (day === 0 ? 7 : day);
                const today = clearHours(new Date());    // timestamp of today
                const selectDay = clearHours(new Date(this.value));    // timestamp of selected day
                const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
                const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));
                let cells = [];
                const cell_tmpl = {
                    text: '',
                    type: '',
                    selected: false
                    
                };
                if (day !== 7) {
                    for (let i = 0; i < day; i++) {
                        const cell = deepCopy(cell_tmpl);
                        cell.type = 'prev-month';
                        cell.text = dateCountOfLastMonth - (day - 1) + i;
                        
                       
                        cells.push(cell);
                    }
                }
                let nextMonth = this.month + 1;
                let nextYear = this.year;
                if (this.month === 11) {
                    nextMonth = 0;
                    nextYear += 1;
                }
                let memoList=this.getNoPageList(this.getDateStr(this.year,this.month,1),this.getDateStr(nextYear,nextMonth,1));

                for (let i = 1; i <= dateCountOfMonth; i++) {
                    const cell = deepCopy(cell_tmpl);
                    const time = clearHours(new Date(this.year, this.month, i));
                    cell.type = time === today ? 'today' : 'normal';
                    if(typeOf(memoList)=== 'array'){
                    	memoList.forEach((item)=>{
	                    	let d=new Date(item.memoTime).getDate();
	                    	if(d===i){
	                    		cell.memo='memo';
	                    	}
	                    })
                    }
                    
                    //cell.memo='memo';
                    cell.text = i;
                    cell.selected = time === selectDay;
                   
                    cells.push(cell);
                }
                const nextMonthCount = 42 - cells.length;
                for (let i = 1; i <= nextMonthCount; i++) {
                    const cell = deepCopy(cell_tmpl);
                    cell.type = 'next-month';
                    cell.text = i;
                    
                   
                    cells.push(cell);
                }
                return cells;
            },
            rightCells () {
            	let rightYear=this.year;
            	let rightMonth=this.month;
            	rightMonth++;
            	if (rightMonth > 11) {
                    rightMonth = 0;
                    rightYear++;
                }
                this.rightYear=rightYear;
                this.rightMonth=rightMonth;
                const date = new Date(rightYear, rightMonth, 1);
                let day = getFirstDayOfMonth(date);    // day of first day
                day = (day === 0 ? 7 : day);
                const today = clearHours(new Date());    // timestamp of today
                const selectDay = clearHours(new Date(this.value));    // timestamp of selected day
                const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
                const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));
                let cells = [];
                const cell_tmpl = {
                    text: '',
                    type: '',
                    selected: false
                    
                };
                if (day !== 7) {
                    for (let i = 0; i < day; i++) {
                        const cell = deepCopy(cell_tmpl);
                        cell.type = 'prev-month';
                        cell.text = dateCountOfLastMonth - (day - 1) + i;
                        
                       
                        cells.push(cell);
                    }
                }
                let nextMonth = this.rightMonth + 1;
                let nextYear = this.rightYear;
                if (this.rightMonth === 11) {
                    nextMonth = 0;
                    nextYear += 1;
                }
                let memoList=this.getNoPageList(this.getDateStr(this.rightYear,this.rightMonth,1),this.getDateStr(nextYear,nextMonth,1));

                for (let i = 1; i <= dateCountOfMonth; i++) {
                    const cell = deepCopy(cell_tmpl);
                    const time = clearHours(new Date(rightYear, rightMonth, i));
                    cell.type = time === today ? 'today' : 'normal';
                    if(typeOf(memoList)=== 'array'){
                    	memoList.forEach((item)=>{
	                    	let d=new Date(item.memoTime).getDate();
	                    	if(d===i){
	                    		cell.memo='memo';
	                    	}
	                    })
                    }
                    //cell.memo='memo';
                    cell.text = i;
                    cell.selected = time === selectDay;
                   
                    cells.push(cell);
                }
                const nextMonthCount = 42 - cells.length;
                for (let i = 1; i <= nextMonthCount; i++) {
                    const cell = deepCopy(cell_tmpl);
                    cell.type = 'next-month';
                    cell.text = i;
                    
                   
                    cells.push(cell);
                }
                return cells;
            }
		},
		methods:{
			getNoPageList(memoTimeStart,memoTimeEnd){
				server.getMemoAll({memoTimeStart,memoTimeEnd}).then((res)=>{
					if(res.success){
						return res.data;
					}else{
						return []
					}
				})
			},
			getList(page=1,rows=5){
                let self=this;
                self.$Loading.start();
                let _list={};
                _list.memoTime=this.valueStr;
                _list.page=page;
                _list.rows=rows;
                server.getMemoList(_list).then((res)=>{
                    self.$Loading.finish();
                    if(res.data&&res.data.rowsObject){
	                    self.tableData=res.data.rowsObject;
	                    self.rowsTotal=res.data.total;
	                }
                })
            },
			
			changePage(index){
                this.pageIndex=index+0;
                this.getList(index+0,5);
			},
			search(name){
                this.pageIndex=1;
                this.getList(1,5);
			},
			getDateOfCell (cell,t=null) {
                let year = this.year;
                let month = this.month;
                if(t){
                	year=this.rightYear;
                	month=this.rightMonth;
                }
                let day = cell.text;
                
                if (cell.type === 'prev-month') {
                    if (month === 0) {
                        month = 11;
                        year--;
                    } else {
                        month--;
                    }
                } else if (cell.type === 'next-month') {
                    if (month === 11) {
                        month = 0;
                        year++;
                    } else {
                        month++;
                    }
                }
                let monthStr=month+1;
                let dayStr=day+1;
                if(monthStr<10){
                	monthStr='0'+monthStr;
                }
                if(dayStr<10){
                	dayStr='0'+dayStr;
                }
                this.valueStr=this.getDateStr(year,month,day);
                return new Date(year,month,day);
                //return year+'-'+month+'-'+day;
            },
            getDateStr(year,month,day){
            	let monthStr=month+1;
                let dayStr=day;
                if(monthStr<10){
                	monthStr='0'+monthStr;
                }
                if(dayStr<10){
                	dayStr='0'+dayStr;
                }
                return year+'-'+monthStr+'-'+dayStr;
            },
            handleClick (event) {
                const target = event.target;
                if (target.tagName === 'EM') {
                    const cell = this.cells[parseInt(event.target.getAttribute('index'))];
                    const newDate = this.getDateOfCell(cell);
                    
                    this.value=newDate;
                    //console.log(newDate);
                }
            },
            rightDateClick (event) {
                const target = event.target;
                if (target.tagName === 'EM') {
                    const cell = this.rightCells[parseInt(event.target.getAttribute('index'))];
                    const newDate = this.getDateOfCell(cell,true);
                    this.value=newDate;
                    //console.log(newDate);
                }
            },
            prevYear(){
            	this.year--;
            },
            nextYear(){
            	this.year++;
            },
            prevMonth () {
                this.month--;
                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }
            },
            nextMonth () {
                this.month++;
                if (this.month > 11) {
                    this.month = 0;
                    this.year++;
                }
            },
			getStatusName(v){
				switch(v){
					case 1:
						return '!';
					case 2:
						return '!!';
					case 3:
						return '!!!';
				}
			},
			addOrUpdate(id){
				let self=this;
				console.log(id);

				if(id){
					self.$Loading.start();
	                server.getMemoByid(id).then((res)=>{
	                	self.$Loading.finish();
	                    if(res.success){
	                        self.modelForm=res.data;
	                        self.formVisable=true;
	                    }else{
	                        self.modelForm={};
	                    }
	                })

				}else{
					self.modelForm={};
					self.formVisable=true;
				}
				self.modelForm.memoTimeStr=server.DateFormat(self.value,"yyyy-MM-dd HH:mm:ss");
			},
			modelSubmit(){
				let self=this;
				self.modelLoading=true;
				if(self.modelForm.id){
					server.updateMemo(self.modelForm).then((res)=>{
						self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'修改成功',
	                            desc:res.message
	                        });
							self.formVisable=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'修改失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}else{
	                server.addMemo(self.modelForm).then((res)=>{
	                	self.modelLoading=false;
	                    if(res.success){
	                        self.$Notice.success({
	                            title:'新增成功',
	                            desc:res.message
	                        });
	                        self.formVisable=false;
	                        self.getList(self.pageIndex,10);
	                    }else{
	                        self.$Notice.error({
	                            title:'新增失败',
	                            desc:res.message
	                        });
	                    }
	                })
				}

			},
			del(id){
				let self=this;
				self.$Modal.confirm({
                    onOk:function(){
                       server.delMemo(id).then((res)=>{
		                    if(res.success){
		                        self.$Notice.success({
		                            title:'删除成功',
		                            desc:res.message
		                        });
		                        self.getList(self.pageIndex,10);
		                    }else{
		                        self.$Notice.error({
		                            title:'删除失败',
		                            desc:res.message
		                        });
		                    }
		                }) 
                    },
                    content:'您确认删除这条备忘吗？'
                })
                
			},
			createDateChange(e){
				this.modelForm.memoTimeStr=this.value.getFullYear()+'-';
				let m=this.value.getMonth();
				if(m<9){
					this.modelForm.memoTimeStr+='0'+(m+1)+'-';

				}else{
					this.modelForm.memoTimeStr+=(m+1)+'-';

				}
				let d=this.value.getDate();
				
				this.modelForm.memoTimeStr+=d+' ';

            	this.modelForm.memoTimeStr+=e+':00';
            },
			getCellCls (cell) {
                return [
                    `${prefixCls}-cell`,
                    {
                        [`${prefixCls}-cell-selected`]: cell.selected,
                        [`${prefixCls}-cell-today`]: cell.type === 'today',
                        ['q-cell-memo']: cell.memo === 'memo',
                        [`${prefixCls}-cell-prev-month`]: cell.type === 'prev-month',
                        [`${prefixCls}-cell-next-month`]: cell.type === 'next-month'
                    }
                ];
            },
            iconBtnCls(prev='',double=''){
            	
            	return [
            		'ivu-picker-panel-icon-btn',
            		{
            			['ivu-date-picker-prev-btn']:prev==='prev',
            			['ivu-date-picker-next-btn']:prev==='next',
            			[`ivu-date-picker-${prev}-btn-arrow-double`]:double==='-double'
            		}
            	];
            }
		}
	}
</script>