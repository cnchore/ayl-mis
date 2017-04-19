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
                            		<i class="iconfont icon-tianjia btn"></i>
                				</div>
                			</div>
                			<i-table :content="self" :columns="tableCol" :data="tableData"></i-table>
		                    <div style="margin: 10px;overflow: hidden">
		                        <div style="float: right;">
		                            <Page :total="rowsTotal" show-total show-elevator :current.sync="pageIndex" @on-change="changePage"></Page>
		                        </div>
		                    </div>
		                    
	                    	<i-form v-ref:form-validate :model="modelForm" :rules="modeRule" :label-width="100">
						        <Form-item label="标题" prop="title">
						            <i-input :value.sync="modelForm.title" placeholder="请输入标题"></i-input>
						        </Form-item>
						        <Form-item label="内容" prop="content">
						            <i-input :value.sync="modelForm.content" type="textarea" :rows="3" placeholder="请输入备忘内容"></i-input>
						        </Form-item>
						        <Form-item label="优先级">
						            <Radio-group :model.sync="modelForm.radio">
						                <Radio value="0">高</Radio>
						                <Radio value="1">中</Radio>
						                <Radio value="2">低</Radio>
						            </Radio-group>
						        </Form-item>
						        <Form-item>
						        	<div class="q-form-btn">
						            <i-button type="primary">保存</i-button>
						            <i-button type="ghost">取消</i-button>
						            </div>
						        </Form-item>
						    </i-form>
		                   
                		</i-col>
                	</Row>
                    
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
				rowsTotal:10,
				pageIndex:1,
				self:this,
				tableData:[],
				date: {},
	            year: new Date().getFullYear(),
	            month: new Date().getMonth(),
	            rightYear:{},
	            rightMonth:{},
	            value:new Date(),
				prefixCls: prefixCls,
                readCells: [],
                rightReadCells:[],
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                modelForm:{radio:1},
                modeRule:{
                	content: [
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                    ]
                },
                modelLoading:false,
				tableCol: [
				
				{
					key:'createTime',title:'时间',width:200
				},
				{
					key:'title',title:'备忘',className:'l-min-width l-ellipsis'
				},
				{
					width:80,key:'state',title:'优先级',

					render(row,column,index){
						return `{{getStatusName(${row.state})}}`;
					}
				},
				{
					title: '操作',
					key: 'action',width:60,
					align: 'center',
					render (row, column, index) {
					return `
						<i-button type="primary" icon="edit" @click="modelShow(${row.id})" size="small">修改</i-button>
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
                        let prevMonth = this.month - 1;
                        let prevYear = this.year;
                        if (this.month === 0) {
                            prevMonth = 11;
                            prevYear -= 1;
                        }
                       
                        cells.push(cell);
                    }
                }
                for (let i = 1; i <= dateCountOfMonth; i++) {
                    const cell = deepCopy(cell_tmpl);
                    const time = clearHours(new Date(this.year, this.month, i));
                    cell.type = time === today ? 'today' : 'normal';
                    cell.memo='memo';
                    cell.text = i;
                    cell.selected = time === selectDay;
                   
                    cells.push(cell);
                }
                const nextMonthCount = 42 - cells.length;
                for (let i = 1; i <= nextMonthCount; i++) {
                    const cell = deepCopy(cell_tmpl);
                    cell.type = 'next-month';
                    cell.text = i;
                    let nextMonth = this.month + 1;
                    let nextYear = this.year;
                    if (this.month === 11) {
                        nextMonth = 0;
                        nextYear += 1;
                    }
                   
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
                        let prevMonth = rightMonth - 1;
                        let prevYear = rightYear;
                        if (rightMonth === 0) {
                            prevMonth = 11;
                            prevYear -= 1;
                        }
                       
                        cells.push(cell);
                    }
                }
                for (let i = 1; i <= dateCountOfMonth; i++) {
                    const cell = deepCopy(cell_tmpl);
                    const time = clearHours(new Date(rightYear, rightMonth, i));
                    cell.type = time === today ? 'today' : 'normal';
                    cell.memo='memo';
                    cell.text = i;
                    cell.selected = time === selectDay;
                   
                    cells.push(cell);
                }
                const nextMonthCount = 42 - cells.length;
                for (let i = 1; i <= nextMonthCount; i++) {
                    const cell = deepCopy(cell_tmpl);
                    cell.type = 'next-month';
                    cell.text = i;
                    let nextMonth = rightMonth + 1;
                    let nextYear = rightYear;
                    if (rightMonth === 11) {
                        nextMonth = 0;
                        nextYear += 1;
                    }
                   
                    cells.push(cell);
                }
                return cells;
            }
		},
		methods:{
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
                return new Date(year,month,day);
                //return year+'-'+month+'-'+day;
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

			},
			modelShow(id){

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