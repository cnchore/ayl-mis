import util from './util'
import qs from 'qs'
import Vue from 'vue'

const serverPath={
	getDict:'/sys/dictionary/getList',
	getStoreAllList:'/sys/store/getList',
	getStoreList:'/sys/store/getPage',
	addStore:'/sys/store/add',
	getStoreListByid:'/sys/store/getById',
	updateStore:'/sys/store/update',
	deleteStoreByid:'/sys/store/deleteById',

	getAgentUserList:'/sys/agentUser/getList',
	getGpsByAddress:'/common/getGpsByAddress',
	login:'/sys/user/login',
	loginOut:'/sys/user/loginOut',

	getPublish:'/mem/publish/getPage',
	getAllPublish:'/mem/publish/getList',
	getPublishByid:'/mem/publish/getById',
	addPublish:'/mem/publish/add',
	updatePublish:'/mem/publish/update',
	deletePublishByid:'/mem/publish/deleteById',
	publish:'/mem/publish/publish',

	getProduct:'/sys/product/getPage',
	getAllProduct:'/sys/product/getList',
	getProductByid:'/sys/product/getById',
	addProduct:'/sys/product/add',
	updateProduct:'/sys/product/update',
	delProduct:'/sys/product/deleteById',

	getFeedback:'/mem/feedBack/getPage',
	getAllFeedback:'/mem/feedBack/getList',
	getFeedbackByid:'/mem/feedBack/getById',
	feedBackReply:'/mem/feedBack/reply',

	getHelp:'/sys/help/getPage',
	getAllHelp:'/sys/help/getList',
	getHelpByid:'/sys/help/getById',
	addHelp:'/sys/help/add',
	updateHelp:'/sys/help/update',
	delHelp:'/sys/help/deleteById',

	getCoupon:'/sys/coupon/getPage',
	getAllCoupon:'/sys/coupon/getList',
	getCouponByid:'/sys/coupon/getById',
	addCoupon:'/sys/coupon/add',
	updateCoupon:'/sys/coupon/update',
	applyCoupon:'/sys/coupon/apply',
	verifyCoupon:'/sys/coupon/verify',
	changeCoupon:'/sys/coupon/changeState',

	getCouponDetail:'/sys/couponDetail/getPage',
	getAllCouponDetail:'/sys/couponDetail/getList',
	getCouponDetailByid:'/sys/couponDetail/getById',
	addCouponDetail:'/sys/couponDetail/add',
	updateCouponDetail:'/sys/couponDetail/update',
	changeCouponDetail:'/sys/couponDetail/changeState',

	getGiftSend:'/mem/giftSend/getPage',
	getAllGiftSend:'/mem/giftSend/getList',
	getActInfo:'/mem/giftSend/getActInfo',
	upateGiftSendState:'/mem/giftSend/updateState',

	getParnerAccount:'/partner/partnerAccount/getPage',
	getAllParnerAccount:'/partner/partnerAccount/getList',
	getParnerAccountByid:'/partner/partnerAccount/getById',
	verifyParnerAccount:'/partner/partnerAccount/verify',

	getParnerBonus:'/partner/partnerAccount/getBonusPage',
	addParnerBonus:'/partner/partnerAccount/addBonus',

	getCouponConfig:'/partner/couponConfig/getPage',
	getAllCouponConfig:'/partner/couponConfig/getList',
	getCouponConfigByid:'/partner/couponConfig/getById',
	addCouponConfig:'/partner/couponConfig/add',
	updateCouponConfig:'/partner/couponConfig/update',
	delCouponConfig:'/partner/couponConfig/deleteById',
	upDownCouponConfig:'/partner/couponConfig/upDown',

	getParnerCoupon:'/partner/coupon/getPage',

	getNotice:'/sys/notice/getPage',
	getNoticeByid:'/sys/notice/getById',
	addNotice:'/sys/notice/add',
	updateNotice:'/sys/notice/update',
	delNotice:'/sys/notice/deleteById',
	publishNotice:'/sys/notice/publish',

	getCouponApply:'/partner/couponApply/getPage',
	verifyCouponApply:'/partner/couponApply/verify'

}

/*========本地存储===========*/
const STORE_PREFIX = '_ayl_mis_'
export let storage = {
  getPrefix: () => STORE_PREFIX,
  cookies: {
    get(sKey) {
      if (!sKey) return null
      sKey = STORE_PREFIX + sKey
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    },
    set(sKey, sValue, vEnd = 1800, sPath = '/', sDomain = '', bSecure = false) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey))  return false

      sKey = STORE_PREFIX + sKey
      let sExpires = ''
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number: // 单位秒
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
            break
          case String:
            sExpires = '; expires=' + vEnd
            break
          case Date:
            sExpires = '; expires=' + vEnd.toUTCString()
            break
        }
      }
      document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
      return true
    },
    remove(sKey, sPath = '/', sDomain = '') {
      if (!this.has(sKey)) return false 

      sKey = STORE_PREFIX + sKey
      document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
      return true
    },
    has(sKey) {
      if (!sKey) return false
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
    },
    keys() {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
      for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
      return aKeys
    }
  },
  session: {
    set(key, value) {
      if(!key) return false
      window.sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value || {}))
    },
    get(key) {
      if(!key) return null
      return JSON.parse(window.sessionStorage.getItem(STORE_PREFIX + key))
    },
    remove(key){
    	if(!key) return null;
    	window.sessionStorage.removeItem(STORE_PREFIX+key);
    } 
  },
  local: {
    set(key, value, ms = 1000*3600*24*365) {
      if(!key) return false
      
      key = STORE_PREFIX + key
      let newValue = {
        value: value,
        expires: ms,
        time: new Date().getTime()
      }
      window.localStorage.setItem(key, JSON.stringify(newValue))
    },
    get(key) {
      if(!key) return null
      key = STORE_PREFIX + key
      
      let value = JSON.parse(window.localStorage.getItem(key))
      if (value && (new Date().getTime() - value.time < value.expires)) {
        value = value.value
      }else{
        value = null
      }
      return value
    } 
  }
}
/*========数据接口===========*/
export default {
	jsonParse(obj){
		if(obj){
			return JSON.parse(JSON.stringify(obj));
		}else{
			return {};
		}

	},
	getPromise(url='',params={},requestName=''){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.get(
	        	url,{
	        		params:params
	        	}).then((body)=>{
	        		
		          if(body.data){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log(requestName,error);
		        })
	    })
    	return promise
	},
	getJsonpPromise(url='',params={},requestName=''){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        Vue.http.jsonp(util.serverPath+url,{
		        	method:'GET',
		        	headers: { 'content-type': 'application/x-www-form-urlencoded' },
		        	params:params,
		        	credientials:false,
		        	emulateJSON:true
	        	}).then((body)=>{
	        		
		          if(body.data){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log(requestName,error);
		        })
	    })
    	return promise
	},
	postPromise(url='',formData={},requestName=''){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.request({
	          url: url,
	          method: 'post',
	          headers: { 'content-type': 'application/x-www-form-urlencoded' },
	          data: qs.stringify(formData)
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(body.data)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log(requestName,error);
		        })
	    })
    	return promise
	},
	postPromise1(url='',formData={},requestName=''){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	    	//let pData=JSON.stringify(formData);
	        Vue.http.post(util.serverPath+url,qs.stringify(formData),{
	        	headers: { 'content-type': 'application/x-www-form-urlencoded' }
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(body.data)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log(requestName,error);
		        })
	    })
    	return promise
	},
	image: {
	    thumb(src, width, height) {
	      width = width || 320
	      if(!src){ 
	        return ''
	      }
	      src += `?imageMogr2/format/jpg/interlace/1/quality/60/gravity/Center/thumbnail/${width}x`
	      if(height){
	        src += `/crop/x${height}`
	      }
	      return src
	    },
	    thumbyWidth(src, width) {
	      width = width || 320
	      if(!src){ 
	        return ''
	      }
	      src += `?imageMogr2/thumbnail/${width}x/format/jpg/blur/1x0/quality/75|imageslim`
	      return src
	    }
	},
	getBaseUrl(){
		return util.serverPath;
	},
	getDict(dicType='',parentId=null){
		let params={
			dicType
		}
		if(parentId){
			params.parentId=parentId;
		}
    	return this.getPromise(serverPath.getDict,params,'getDict');
	},
	//门店展示管理
	getStoreList(page=1,rows=10,storeNameLike=''){
    	return this.getPromise(serverPath.getStoreList,{page,rows,storeNameLike},'getStoreList');
	},
	getAgentUserList(){
    	return this.getPromise(serverPath.getAgentUserList,{},'getAgentUserList');
	},
	getStoreAllList(){
    	return this.getPromise(serverPath.getStoreAllList,{},'getStoreList');
	},
	getStoreListByid(id){
    	return this.getPromise(serverPath.getStoreListByid,{id},'getStoreListByid');
	},
	addStore(formData){
    	return this.postPromise(serverPath.addStore,formData,'addStore');
	},
	updateStore(formData){
    	return this.postPromise(serverPath.updateStore,formData,'updateStore');
	},
	deleteStoreByid(id){
    	return this.postPromise(serverPath.deleteStoreByid,{id},'deleteStoreByid');
	},
	//根据中文地址获取经纬度
	getGpsByAddress(address){
    	return this.postPromise(serverPath.getGpsByAddress,{address},'getGpsByAddress');
	},
	//登录
	login(userName,pwd){
    	return this.postPromise(serverPath.login,{userName,pwd},'login');
	},
	//登出
	loginOut(){
    	return this.postPromise(serverPath.loginOut,{},'loginOut');
	},
	//艾臣资讯管理
	getPublish(page=1,rows=10,titleLike=''){
    	return this.getPromise(serverPath.getPublish,{type:3,page,rows,titleLike},'getPublish');
	},
	getAllPublish(){
    	return this.getPromise(serverPath.getAllPublish,{type:3},'getAllPublish');
	},
	getPublishByid(id){
    	return this.getPromise(serverPath.getPublishByid,{type:3,id},'getPublishByid');
	},
	addPublish(formData){
		let _list={
    		thumb:formData.thumb,   //缩略图
		  	summary:formData.summary, //摘要
		  	title:formData.title,     //标题
		  	content:formData.content,     //内容
		  	type:3    //类别:1通知公告 2：新闻动态 3、艾臣资讯
    	}
    	return this.postPromise(serverPath.addPublish,_list,'addPublish');
	},
	updatePublish(formData){
		let _list={
    		id:formData.id,
    		thumb:formData.thumb,   //缩略图
		  	summary:formData.summary, //摘要
		  	title:formData.title,     //标题
		  	content:formData.content,     //内容
		  	type:3    //类别:1通知公告 2：新闻动态 3、艾臣资讯
    	}
    	return this.postPromise(serverPath.updatePublish,_list,'updatePublish');
	},
	deletePublishByid(id){
    	return this.postPromise(serverPath.deletePublishByid,{id},'deletePublishByid');
	},
	publish(id){
    	return this.postPromise(serverPath.publish,{id},'publish');
	},
	//产品介绍管理
	getProduct(page=1,rows=10,category=-1,productNameLike=''){
    	return this.getPromise(serverPath.getProduct,{page,rows,category,productNameLike},'getProduct');
	},
	getAllProduct(category=-1,productNameLike=''){
    	return this.getPromise(serverPath.getAllProduct,{category,productNameLike},'getAllProduct');
	},
	getProductByid(id){
    	return this.getPromise(serverPath.getProductByid,{id},'getProductByid');
	},
	addProduct(formData){
		let _list={
    		seq:formData.seq,
    		category:formData.category,
		  	categoryName:formData.categoryName,
		  	thumbnail:formData.thumbnail,
		  	productName:formData.productName,
		  	productProp:formData.productProp,
		  	application:formData.application,
		  	params:formData.params,
		  	videoTitle:formData.videoTitle,
		  	videoThum:formData.videoThum,
		  	videoDesc:formData.videoDesc,
		  	videoUrl:formData.videoUrl,
		  	pictureShowsItem:formData.pictureShows,
		  	pictureDescItem:formData.pictureDesc
    	}
    	return this.postPromise(serverPath.addProduct,_list,'addProduct');
	},
	updateProduct(formData){
		let _list={
			id:formData.id,
    		seq:formData.seq,
    		category:formData.category,
		  	categoryName:formData.categoryName,
		  	thumbnail:formData.thumbnail,
		  	productName:formData.productName,
		  	productProp:formData.productProp,
		  	application:formData.application,
		  	params:formData.params,
		  	videoTitle:formData.videoTitle,
		  	videoThum:formData.videoThum,
		  	videoDesc:formData.videoDesc,
		  	videoUrl:formData.videoUrl,
		  	pictureShowsItem:formData.pictureShows,
		  	pictureDescItem:formData.pictureDesc
    	}
    	return this.postPromise(serverPath.updateProduct,_list,'updateProduct');
	},
	delProduct(id){
    	return this.postPromise(serverPath.delProduct,{id},'delProduct');
	},
	//会员反馈管理
	getFeedback(searchData){
		let feedbackerType=4;
		if(util.env=='development'){
			feedbackerType=''
		}
		return this.getPromise(serverPath.getFeedback,searchData,'getFeedback');
	},
	getAllFeedback(feedbackTimeStr='',feedbackTimeBegin='',feedbackTimeEnd=''){
		return this.getPromise(serverPath.getAllFeedback,{feedbackerType:4,feedbackTimeStr,feedbackTimeBegin,feedbackTimeEnd},'getAllFeedback');
	},
	getFeedbackByid(id){
    	return this.getPromise(serverPath.getFeedbackByid,{id},'getFeedbackByid');
	},
	feedBackReply(feedBackId=null,replyCont=''){
    	return this.postPromise(serverPath.feedBackReply,{feedBackId,replyCont},'feedBackReply');
	},
	//常见问题管理
	getHelp(page=1,rows=10,type=null){
		return this.getPromise(serverPath.getHelp,{page,rows,type},'getHelp');
	},
	getAllHelp(type=null){
		return this.getPromise(serverPath.getAllHelp,{type},'getAllHelp');

	},
	getHelpByid(id){
		return this.getPromise(serverPath.getHelpByid,{id},'getHelpByid');
	},
	addHelp(formData){
		let _list={
		 seq:formData.seq,
		 question:formData.question,
		 answer:formData.answer,
		 type:formData.type
		}
    	return this.postPromise(serverPath.addHelp,formData,'addHelp');
	},
	updateHelp(formData){
    	return this.postPromise(serverPath.updateHelp,formData,'updateHelp');
	},
	delHelp(id){
    	return this.postPromise(serverPath.delHelp,{id},'delHelp');
	},
	//优惠券活动配置
	getCoupon(page=1,rows=10,activityType=null,state=null){

		return this.getPromise(serverPath.getCoupon,{page,rows,activityType,state},'getCoupon');
	},
	getAllCoupon(activityType=null,state=null){

		return this.getPromise(serverPath.getAllCoupon,{activityType,state},'getAllCoupon');
	},
	getCouponByid(id){

		return this.getPromise(serverPath.getCouponByid,{id},'getCouponByid');
	},
	addCoupon(formData){
		let _list={
			activityType:formData.activityType,             //类型：1线上活动    2线下活动    3电商活动
			title:formData.title,                     //活动标题 	
			summary:formData.summary,                  //活动摘要
			location:formData.location,                  //活动地点
			limitNum:formData.limitNum,                //活动人数限制
			url:formData.url,                       //活动图
			content:formData.content,                  //活动内容
			couponFkid:formData.couponFkid,              //优惠券配置id
			area:formData.area,                     //区域
			province:formData.province,                 //省会
			provinceId:formData.provinceId,              //省会id
			city:formData.city,                     //城市
			cityId:formData.cityId,                  //城市id
			cityCode:formData.cityCode,                 //城市编码
			areaId:formData.areaId,                  //区域id
			startTimeStr:formData.startTimeStr,              //活动开始时间           		
			endTimeStr:formData.endTimeStr             //活动结束时间
		}
    	return this.postPromise(serverPath.addCoupon,_list,'addCoupon');
	},
	updateCoupon(formData){
		let _list={
			id:formData.id,
			activityType:formData.activityType,             //类型：1线上活动    2线下活动    3电商活动
			title:formData.title,                     //活动标题 	
			summary:formData.summary,                  //活动摘要
			location:formData.location,                  //活动地点
			limitNum:formData.limitNum,                //活动人数限制
			url:formData.url,                       //活动图
			content:formData.content,                  //活动内容
			couponFkid:formData.couponFkid,              //优惠券配置id
			area:formData.area,                     //区域
			province:formData.province,                 //省会
			provinceId:formData.provinceId,              //省会id
			city:formData.city,                     //城市
			cityId:formData.cityId,                  //城市id
			cityCode:formData.cityCode,                 //城市编码
			areaId:formData.areaId,                  //区域id
			startTimeStr:formData.startTimeStr,              //活动开始时间           		
			endTimeStr:formData.endTimeStr             //活动结束时间
		}
    	return this.postPromise(serverPath.updateCoupon,_list,'updateCoupon');
	},
	applyCoupon(id){
    	return this.postPromise(serverPath.applyCoupon,{id},'applyCoupon');
	},
	verifyCoupon(id,isPass,curAuditOpinion=null){
    	return this.postPromise(serverPath.verifyCoupon,{id,isPass,curAuditOpinion},'verifyCoupon');
	},
	changeCoupon(id){
    	return this.postPromise(serverPath.changeCoupon,{id},'changeCoupon');
	},
	//优惠券明细配置
	getAllCouponDetail(couponType=1,isEnabled=1){
		return this.getPromise(serverPath.getAllCouponDetail,{couponType,isEnabled},'getAllCouponDetail');
	},
	getCouponDetail(page=1,rows=10,couponType=null,isEnabled=null){
		return this.getPromise(serverPath.getCouponDetail,{page,rows,couponType,isEnabled},'getCouponDetail');
	},
	getCouponDetailByid(id){
		return this.getPromise(serverPath.getCouponDetailByid,{id},'getCouponDetailByid');
	},
	addCouponDetail(formData){
		let _list={
			couponName:formData.couponName,
			couponType:formData.couponType,
			couponValue:formData.couponValue,
			ruleDesc:formData.ruleDesc,
			notice:formData.notice,
			serviceTel:formData.serviceTel,
			comments:formData.comments,
			startTimeStr:formData.startTimeStr,
			endTimeStr:formData.endTimeStr
		}
		if(formData.couponRuleList){
			formData.couponRuleList.forEach((item,index)=>{
				if(item.deratePrice){
					_list["couponRuleList["+index+"].deratePrice"]=item.deratePrice;
					_list["couponRuleList["+index+"].startPrice"]=item.startPrice;
					_list["couponRuleList["+index+"].endPrice"]=item.endPrice;
				}
			})
			
		}
    	return this.postPromise(serverPath.addCouponDetail,_list,'addCouponDetail');

	},
	updateCouponDetail(formData){
		let _list={
			id:formData.id,
			couponName:formData.couponName,
			couponType:formData.couponType,
			couponValue:formData.couponValue,
			ruleDesc:formData.ruleDesc,
			notice:formData.notice,
			serviceTel:formData.serviceTel,
			comments:formData.comments,
			startTimeStr:formData.startTimeStr,
			endTimeStr:formData.endTimeStr
		}
		if(formData.couponRuleList){
			formData.couponRuleList.forEach((item,index)=>{
				if(item.deratePrice){
					_list["couponRuleList["+index+"].id"]=item.id;
					_list["couponRuleList["+index+"].deratePrice"]=item.deratePrice;
					_list["couponRuleList["+index+"].startPrice"]=item.startPrice;
					_list["couponRuleList["+index+"].endPrice"]=item.endPrice;
				}
			})
			
		}
    	return this.postPromise(serverPath.updateCouponDetail,_list,'updateCouponDetail');
	},
	changeCouponDetail(id,isEnabled=1){
    	return this.postPromise(serverPath.changeCouponDetail,{id,isEnabled},'changeCouponDetail');

	},
	//获取礼品管理
	getGiftSend(page=1,rows=10,createTime=null,updateTime=null,consigneePhoneLike=null,consigneeLike=null){
		return this.getPromise(serverPath.getGiftSend,{page,rows,createTime,updateTime,consigneePhoneLike,consigneeLike},'getGiftSend');

	},
	getAllGiftSend(createTime=null,updateTime=null,consigneePhoneLike=null,consigneeLike=null){
		return this.getPromise(serverPath.getAllGiftSend,{createTime,updateTime,consigneePhoneLike,consigneeLike},'getAllGiftSend');

	},
	getActInfo(id){
		return this.getPromise(serverPath.getActInfo,{id},'getActInfo');

	},
	upateGiftSendState(id){
    	return this.postPromise(serverPath.upateGiftSendState,{id},'upateGiftSendState');

	},
	//合伙人账号管理
	getParnerAccount(formData){
		return this.getPromise(serverPath.getParnerAccount,formData,'getParnerAccount');
	},
	getAllParnerAccount(formData){
		return this.getPromise(serverPath.getAllParnerAccount,formData,'getAllParnerAccount');

	},
	getParnerAccountByid(id){
		return this.getPromise(serverPath.getParnerAccountByid,{id},'getParnerAccountByid');
	},
	verifyParnerAccount(id,isPass=false){
    	return this.postPromise(serverPath.verifyParnerAccount,{id,isPass},'verifyParnerAccount');

	},
	//现金券配置管理
	getCouponConfig(searchData){
		return this.getPromise(serverPath.getCouponConfig,searchData,'getCouponConfig');

	},
	getAllCouponConfig(searchData){
		return this.getPromise(serverPath.getAllCouponConfig,searchData,'getAllCouponConfig');

	},
	getCouponConfigByid(id){
		return this.getPromise(serverPath.getCouponConfigByid,{id},'getCouponConfigByid');

	},
	addCouponConfig(formData){
		let _list={
			couponName:formData.couponName,//券名
			couponValue:formData.couponValue,//券面值
			achieveMoney:formData.achieveMoney,//满足多少钱可以使用
			remark:formData.remark,//备注
			effectDays:formData.effectDays//有效天数
		}
    	return this.postPromise(serverPath.addCouponConfig,_list,'addCouponConfig');

	},
	updateCouponConfig(formData){
		let _list={
			id:formData.id,
			couponName:formData.couponName,//券名
			couponValue:formData.couponValue,//券面值
			achieveMoney:formData.achieveMoney,//满足多少钱可以使用
			remark:formData.remark,//备注
			effectDays:formData.effectDays//有效天数
		}
    	return this.postPromise(serverPath.updateCouponConfig,_list,'updateCouponConfig');

	},
	delCouponConfig(id){
    	return this.postPromise(serverPath.delCouponConfig,{id},'delCouponConfig');

	},
	upDownCouponConfig(id){
    	return this.postPromise(serverPath.upDownCouponConfig,{id},'upDownCouponConfig');

	}
	//现金券使用情况管理
	,
	getParnerCoupon(searchData){
		return this.getPromise(serverPath.getParnerCoupon,searchData,'getParnerCoupon');

	}
	//公告发布管理
	,
	getNotice(searchData){
		return this.getPromise(serverPath.getNotice,searchData,'getNotice');

	},
	getNoticeByid(id){
		return this.getPromise(serverPath.getNoticeByid,{id},'getNoticeByid');

	},
	addNotice(formData){
		let _list={
			title:formData.title,
			content:formData.content
		}
    	return this.postPromise(serverPath.addNotice,_list,'addNotice');

	},
	updateNotice(formData){
		let _list={
			id:formData.id,
			title:formData.title,
			content:formData.content
		}
    	return this.postPromise(serverPath.updateNotice,_list,'updateNotice');

	},
	delNotice(id){
    	return this.postPromise(serverPath.delNotice,{id},'delNotice');

	},
	publishNotice(id){
    	return this.postPromise(serverPath.publishNotice,{id},'publishNotice');

	}
	//现金券申请管理
	,
	getCouponApply(searchData){
		return this.getPromise(serverPath.getCouponApply,searchData,'getCouponApply');

	},
	verifyCouponApply(id,isPass=false){
    	return this.postPromise(serverPath.verifyCouponApply,{id,isPass},'verifyCouponApply');

	}
	//分红管理
	,
	getParnerBonus(searchData){
		return this.getPromise(serverPath.getParnerBonus,searchData,'getParnerBonus');

	},
	addParnerBonus(formData){
		let _list={
			accountId:formData.id,
			wallet:formData.walletNew,
			attachUrl:formData.attachUrl
		}
    	return this.postPromise(serverPath.addParnerBonus,_list,'addParnerBonus');

	}
}