import axios from 'axios';
import env from '../config/env';

let util = {

};
const _HOST = window.location.origin;
let ajaxUrl = _HOST+'/service';
// 测试环境
if(_HOST.indexOf('www.aylsonclub.com') === -1){
	//ajaxUrl='http://test.aylsonclub.com/admin'
	//ajaxUrl='http://192.168.108:8080/admin'
	ajaxUrl='http://localhost:6688/admin'
	//本地后台接口
}
util.env=env;
util.serverPath=ajaxUrl;
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 7000,
    responseType:'json',
    header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
});

export default util;