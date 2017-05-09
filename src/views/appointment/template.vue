<style>
			.q-img-list{
					width:198px;
					height:158px;
					display: inline-block;
					margin:0px 10px 20px 10px;
					.l-upload-list{
						width:198px;
						height:128px;
						margin: 0px;
					}
					.l-upload-list-cover{
						&:hover{
							display: flex;
							i{
								display: block;
							}
						}
						
						align-items: center;
						justify-content: center;
						i{
							&:first-child{
								margin-right: 10px;
							}
							&:last-child{
								margin-left: 10px;
							}
							display: none;
							font-size: 32px;
						}
					}
				}
				.q-img-list1{
					height:58px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom:15px;
					.l-upload-list{
						flex:0.5;
						width:58px;
						height:58px;
					}
					div{
						flex:1;
						text-align: center;
						i{
							font-size: 32px;
							cursor: pointer;
						}
						i:first-child{
							margin-right:15px;
						}
						i:last-child{
							margin-left:15px;
						}
					}
					.double{
						flex:2;
					}
				}
</style>
<template>

								<div class="q-img-list" v-for="item in uploadList">
		                    		<div class="l-upload-list" >
		                                <template v-if="item.status === 'finished' || item.state===1">

		                                    <img :src="item.avatar">
		                                </template>
		                                <template v-else>
		                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
		                                </template>
		                            </div>
		                            <div class="double" v-show="item.status === 'finished' ||item.state===1">
		                            	<i-input :value.sync="item.attachName" class="q-text-center" placeholder="请输入名称"></i-input>
		                            </div>
		                            <div v-show="item.status === 'finished' ||item.state===1">{{item.createTime}}</div>
		                            <div v-show="item.status === 'finished' ||item.state===1">
                                    	<Icon type="eye" title="查看" v-show="item.avatar.indexOf('imageMogr2/format')>-1" @click="handleView(item.attachAddress)"></Icon>
		                            	<a :href="item.attachAddress" target="_blank">
		                           			<Icon type="ios-download-outline" title="下载"></Icon>
		                            	</a>
                                    	<Icon type="ios-trash-outline" title="删除" @click="handleRemove(item)"></Icon>
		                           	</div>
		                           
	                            </div>
	
								<div class="q-img-list" v-for="(index,item) in uploadList">
		                    		<div class="l-upload-list" >
		                                <template v-if="item.status === 'finished'">
		                                    <img :src="item.avatar">
		                                    <div class="l-upload-list-cover">
		                                    	<Icon type="eye" title="查看" v-show="item.avatar.indexOf('imageMogr2/format')>-1" @click="handleView(item.attachAddress)"></Icon>
		                                        <a :href="item.attachAddress" target="_blank">
				                           			<Icon type="ios-download-outline" title="下载"></Icon>
				                            	</a>
		                                        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
		                                    </div>
		                                </template>
		                                <template v-else>
		                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
		                                </template>
		                            </div>
		                            <i-input :value.sync="item.attachName" v-show="item.status==='finished'" class="q-text-center" placeholder="请输入名称"></i-input>

	                            </div>
								<div class="q-img-list" v-show="item.state===1" v-for="item in uploadList">
		                    		<div class="l-upload-list" >
	                                    <img :src="item.avatar">
	                                    <div class="l-upload-list-cover">
	                                    	<Icon type="eye" title="查看" v-show="item.avatar.indexOf('imageMogr2/format')>-1" @click="handleView(item.attachAddress)"></Icon>
	                                        <a :href="item.attachAddress" target="_blank">
			                           			<Icon type="ios-download-outline" title="下载"></Icon>
			                            	</a>
	                                    </div>
		                            </div>
		                            <span>{{item.attachName}}</span>
	                            </div>
	<Icon type="eye" title="查看" v-if="is7nImage(item.avatar)" @click="handleView(item.attachAddress)"></Icon>
	<Modal title="查看图片" :visible.sync="visible">
		<img :src="imgName" v-if="visible" style="width: 100%">
	</Modal>

</template>	
<script>
				imgName: '',
                visible: false,
                //uploadFormat:server.uploadFormat(),
			getFileType(v){
            	return server.getFileType(v);
            },
            is7nImage(url){
				return server.is7nImage(url);
			},
           	handleView (name) {
                this.imgName = name;
                this.visible = true;
            }
</script>