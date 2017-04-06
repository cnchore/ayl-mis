import util from './util'
import qs from 'qs'

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
	delHelp:'/sys/help/deleteById'

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
		            resolve(ret)
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
	getFeedback(page=1,rows=10,feedbackTimeStr='',feedbackTimeBegin='',feedbackTimeEnd=''){
		let feedbackerType=4;
		if(util.env=='development'){
			feedbackerType=''
		}
		return this.getPromise(serverPath.getFeedback,{page,rows,feedbackerType,feedbackTimeStr,feedbackTimeBegin,feedbackTimeEnd},'getFeedback');
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
	}
}