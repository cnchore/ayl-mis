<style scoped lang="less">
	.q-iframe{
		border: 0;
		
		width: 100%;
	}
</style>
<template>
    <l-header :page-src="pageSrc"></l-header>
	<div class="layout">
        <Row type="flex" class="l-row">
            <i-col :span="spanLeft" v-show="leftMenu" class="layout-menu-left">
                <left-menu :page-src="pageSrc"></left-menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <l-title :span-Left.sync="spanLeft" :span-Right.sync="spanRight" :left-Menu.sync="leftMenu" @on-add="modelShow" :is-show="false" :breads="breads"></l-title>
                </div>
                <br/>
                <div class="layout-content" >
                	
                    <iframe :height="iframeHeight" :src="iframeSrc" scrolling="auto" class="q-iframe"></iframe>
                	
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
	function getPageSrc(){
		var url=window.location.hash;
		return url.replace('#!/report/index?t=','');
	}
	export default{
		components:{LHeader,LeftMenu,LTitle},
		data(){
			return{
                breads:[{text:'首页',href:'/index'},{text:'统计分析',href:''}],
				pageSrc:getPageSrc(),
				iframeSrc:window.location.origin+getPageSrc(),
				iframeHeight:'600px',
				leftMenu:true,
				spanLeft: 4,
                spanRight: 20,
                
			}
		},
		ready(){

			this.iframeHeight=window.document.body.clientHeight-348;
		},
		route:{
            data:function({to}){
                if(to.query &&to.query.t){
                   this.iframeSrc=window.location.origin+getPageSrc();
                }
            }
        },
		methods:{
			
		}
	}
</script>