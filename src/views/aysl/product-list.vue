<style scoped lang="less">
	.l-page{
		height: 100vh;
		overflow:auto;

	}
	.container{
		padding: 10px;
		display: table;

	}
	.list{	
		.ivu-card{
			margin: 10px;
			overflow: hidden;
		}
	}
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		height: 255px;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
	@base: #fef0ef;
	.color-palette{
		margin: 45px 0;
		padding:20px;
		.color-title{
			margin: 0 0 24px;
		    font-weight: 500;
		    color: #5c6b77;
		    font-size: 26px;
		    text-transform: capitalize;
		    text-align: center;
			.color-description{
				font-size: 12px;
			    font-weight: lighter;
			    color: #777;
			    display: block;
			}
		}
		.main-color{
			display: flex;
			padding: 0;
			margin: 0;
			.main-color-item{
				cursor: pointer;
			    flex: 1;
			    height: 80px;
			    border-radius: 4px;
			    float: left;
			    margin-right: 4px;
			    transition: all .2s;
			    position: relative;
			    text-align: center;
			    padding-top: 28px;
			    font-family: Consolas;
			    font-size: 12px;
			    
    			.main-color-value{
    				font-size: 12px;
				    position: absolute;
				    bottom: -4px;
				    transform: scale(.85);
				    left: 0;
				    width: 100%;
				    text-align: center;
				    opacity: 0;
				    transition: all .2s ease .1s;
    			}
			}
		}
	}
	.palatte-red-1{
		background-color: darken(@base,0%);
	}
	.palatte-red-2{
		background-color: darken(@base,5%);
	}
	.palatte-red-3{
		background-color: darken(@base,10%);
	}
	.palatte-red-4{
		background-color: darken(@base,15%);
	}
	.palatte-red-5{
		background-color: darken(@base,20%);
	}
	.palatte-red-6{
		background-color: darken(@base,25%);
		color:#fff;
	}
	.palatte-red-7{
		background-color: darken(@base,25%);
		color:#fff;
	}
	.palatte-red-8{
		background-color: darken(@base,30%);
		color:#fff;
	}
	.palatte-red-9{
		background-color: darken(@base,35%);
		color:#fff;
	}
	.palatte-red-10{
		background-color: darken(@base,40%);
		color:#fff;
	}
</style>
<template>
	<div class="l-page">
		<header>
			<Menu mode="horizontal" theme="primary" active-key="1">
				<div class="logo"></div>
				<div class="title">艾臣营销管理平台</div>
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
		            </Menu-group>
		        </Submenu>
		        <Menu-item key="4">
		            <Icon type="settings"></Icon>
		            综合设置
		        </Menu-item>
		        <Menu-item key="6" style="float:right">
		        	<i-button shape="circle" icon="ios-bell"></i-button>
		        </Menu-item>
		        <Submenu key="5" style="float:right">
		            <template slot="title">
		                <Icon type="person"></Icon>
		                张得帅
		            </template>
		            
		                <Menu-item key="5-1">
		                <Icon type="information"></Icon>
		                账号信息</Menu-item>
		                <Menu-item key="5-2">
		                <Icon type="edit"></Icon>
		                修改密码</Menu-item>
		                <Menu-item key="5-3">
		                <Icon type="android-exit"></Icon>
		                退出</Menu-item>
		           
		        </Submenu>
		        
			</Menu>
		</header>
		
		<Row>
		<i-col span="8">color</i-col>
		<i-col span="16">
			<div class="color-palette">
				<div class="color-title">
					<!-- react-text: 155 -->red<!-- /react-text --><span class="color-description">热情、警示</span>
				</div>
				<div class="main-color">
					<div class="main-color-item palatte-red-1"  style="color: unset; font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 159 -->red-1<!-- /react-text --><span class="main-color-value">#fef0ef</span>
					</div>
					<div class="main-color-item palatte-red-2"  style="color: unset; font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 161 -->red-2<!-- /react-text --><span class="main-color-value">#fcdbd9</span>
					</div>
					<div class="main-color-item palatte-red-3"  style="color: unset; font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 163 -->red-3<!-- /react-text --><span class="main-color-value">#fabeb9</span>
					</div>
					<div class="main-color-item palatte-red-4"  style="color: unset; font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 165 -->red-4<!-- /react-text --><span class="main-color-value">#f79992</span>
					</div>
					<div class="main-color-item palatte-red-5"  style="color: unset; font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 167 -->red-5<!-- /react-text --><span class="main-color-value">#f46e65</span>
					</div>
					<div class="main-color-item palatte-red-6"  style="color: rgb(255, 255, 255); font-weight: bold;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 169 -->red-6<!-- /react-text --><span class="main-color-value">#f04134</span>
					</div>
					<div class="main-color-item palatte-red-7"  style="color: rgb(255, 255, 255); font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 171 -->red-7<!-- /react-text --><span class="main-color-value">#d73435</span>
					</div>
					<div class="main-color-item palatte-red-8"  style="color: rgb(255, 255, 255); font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 173 -->red-8<!-- /react-text --><span class="main-color-value">#bd2636</span>
					</div>
					<div class="main-color-item palatte-red-9"  style="color: rgb(255, 255, 255); font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 175 -->red-9<!-- /react-text --><span class="main-color-value">#a31837</span>
					</div>
					<div class="main-color-item palatte-red-10"  style="color: rgb(255, 255, 255); font-weight: normal;" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
						<!-- react-text: 177 -->red-10<!-- /react-text --><span class="main-color-value">#880a38</span>
					</div>
				</div>
			</div>
		</i-col>
	</Row>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				currentDate: new Date().toLocaleString(),
				images:[
					'http://hilongjw.github.io/vue-lazyload/dist/test1.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test2.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test3.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test4.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test5.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test6.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test7.jpg',
					'http://hilongjw.github.io/vue-lazyload/dist/test8.jpg'
				]
			}
		},
		ready(){

		},
		computed:{

		},
		methods:{
			handleMouseenter(e){
				
				let obj=document.getElementsByClassName(e.target.className)[0];
				let obj_siblings=obj.parentNode.getElementsByClassName('main-color-item');
				this.$nextTick(function () {
					for (var i = 0; i < obj_siblings.length; i++) {
						obj_siblings[i].style="padding-top:5px;";
						obj_siblings[i].getElementsByClassName('main-color-value')[0].style="opacity:1;bottom:0px;";
					}
			        obj.style="padding-top:5px;transform: scaleY(1.1) translateY(-5px);"
			    })

			},
			handleMouseleave(e){
				let obj=document.getElementsByClassName(e.target.className)[0];
				let obj_siblings=obj.parentNode.getElementsByClassName('main-color-item');
				this.$nextTick(function () {
					for (var i = 0; i < obj_siblings.length; i++) {
						obj_siblings[i].style="padding-top:28px;";
						obj_siblings[i].getElementsByClassName('main-color-value')[0].style="opacity:0;bottom:4px;";
					}
			        obj.style="transform: scaleY(1) translateY(0px);"
			    })
				
			}
		}
	}
</script>
