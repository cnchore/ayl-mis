import util from './util'
import qs from 'qs'

const serverPath={

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
	publish:'/mem/store/publish'
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
		return util.sererPath;
	},
	getStoreList(page=1,rows=10,storeNameLike=''){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.get(
	        	serverPath.getStoreList,{
	        		params:{page,rows,storeNameLike}
	        	}).then((body)=>{
	        		
		          if(body.data){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('getStoreList',error);
		        })
	    })
    	return promise
		
	},
	getAgentUserList(){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.get(serverPath.getAgentUserList
	        	).then((body)=>{
		          if(body){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('getAgentUserList',error);
		        })
	    })
    	return promise
		
	},
	getStoreAllList(){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.get(serverPath.getStoreAllList
	        	).then((body)=>{
		          if(body){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('getStoreList',error);
		        })
	    })
    	return promise
		
	},
	getStoreListByid(id){
		let ret = {}

	    let promise = new Promise( (resolve) => {
	      	if(!id){
	      		resolve(ret)
	      	}else{
	        util.ajax.get(
	        	serverPath.getStoreListByid,{
	        	params:{
	        		id
	        	}
	        }).then((body)=>{
		          if(body){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('getStoreListByid',error);
		        })
	        }
	    })
    	return promise
		
	},
	addStore(formData){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.request({
	          url: serverPath.addStore,
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
		          console.log('addStore',error);
		        })
	    })
    	return promise
	},
	updateStore(formData){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      
	        util.ajax.request({
	          url: serverPath.updateStore,
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
		          console.log('addStore',error);
		        })
	    })
    	return promise
	},
	deleteStoreByid(id){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	    	if(!id){
	    		resolve(ret)
	    	}else{
	        util.ajax.request({
	          url: serverPath.deleteStoreByid,
	          method: 'post',
	          headers: { 'content-type': 'application/x-www-form-urlencoded' },
	          data: qs.stringify({id})
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('deleteStoreByid',error);
		        })
	        }
	    })
    	return promise
	},
	getGpsByAddress(address){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	    	if(!address){
	    		resolve(ret)
	    	}else{
	        util.ajax.request({
	          url: serverPath.getGpsByAddress,
	          method: 'post',
	          headers: { 'content-type': 'application/x-www-form-urlencoded' },
	          data: qs.stringify({address})
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('getGpsByAddress',error);
		        })
	        }
	    })
    	return promise
	},
	login(userName,pwd){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	    	if(!userName||!pwd){
	    		resolve(ret)
	    	}else{
	        util.ajax.request({
	          url: serverPath.login,
	          method: 'post',
	          headers: { 'content-type': 'application/x-www-form-urlencoded' },
	          data: qs.stringify({userName,pwd})
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('login',error);
		        })
	        }
	    })
    	return promise
	},
	loginOut(){
		let ret = {}
		let promise = new Promise( (resolve) => {
			util.ajax.request({
				url: serverPath.loginOut,
				method: 'post',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: qs.stringify({})
			}).then((body)=>{
				if(body.data.success){
					resolve(body.data)
				}else{
					resolve(ret)
				}
			}, (error)=>{
				resolve(ret)
				console.log('login',error);
			})

		})
		return promise
	},
	getPublish(page=1,rows=10,titleLike=''){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      	let type=3;
	        util.ajax.get(
	        	serverPath.getPublish,{
	        		params:{type,page,rows,titleLike}
	        	}).then((body)=>{
	        		
		          if(body.data){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('getPublish',error);
		        })
	    })
    	return promise
	},
	getAllPublish(){
		let ret = {}
		let promise = new Promise( (resolve) => {

			util.ajax.get(serverPath.getAllPublish,{
				params:{type:3}
			}).then((body)=>{
				if(body){
					resolve(body.data)
				}else{
					resolve(ret)
				}
			}, (error)=>{
				resolve(ret)
				console.log('getAllPublish',error);
			})
		})
		return promise
	},
	getPublishByid(id){
		let ret = {}
		let promise = new Promise( (resolve) => {
			let type=3;
			if(!id){
				resolve(ret);
			}else{
				util.ajax.get(
					serverPath.getPublishByid,{
						params:{type,id}
					}).then((body)=>{

						if(body.data){
							resolve(body.data)
						}else{
							resolve(ret)
						}
					}, (error)=>{
						resolve(ret)
						console.log('getPublishByid',error);
					})
				}
			})
		return promise
	},
	addPublish(formData){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      	formData.type=3;
	        util.ajax.request({
	          url: serverPath.addPublish,
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
		          console.log('addPublish',error);
		        })
	    })
    	return promise
	},
	updatePublish(formData){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	      	format.type=3;
	        util.ajax.request({
	          url: serverPath.updatePublish,
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
		          console.log('updatePublish',error);
		        })
	    })
    	return promise
	},
	deletePublishByid(id){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	    	if(!id){
	    		resolve(ret)
	    	}else{
	        util.ajax.request({
	          url: serverPath.deletePublishByid,
	          method: 'post',
	          headers: { 'content-type': 'application/x-www-form-urlencoded' },
	          data: qs.stringify({id})
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('deletePublishByid',error);
		        })
	        }
	    })
    	return promise
	},
	publish(id){
		let ret = {}
	    let promise = new Promise( (resolve) => {
	    	if(!id){
	    		resolve(ret)
	    	}else{
	        util.ajax.request({
	          url: serverPath.publish,
	          method: 'post',
	          headers: { 'content-type': 'application/x-www-form-urlencoded' },
	          data: qs.stringify({id})
	        }).then((body)=>{
		          if(body.data.success){
		            resolve(body.data)
		          }else{
		            resolve(ret)
		          }
		        }, (error)=>{
		          resolve(ret)
		          console.log('publish',error);
		        })
	        }
	    })
    	return promise
	}
}