import axios from 'axios';
import env from '../config/env';

let util = {

};
const _HOST = window.location.origin;
let ajaxUrl = 'http://ktz.aylsonclub.com/admin';
// 测试环境
if(_HOST.indexOf('http://ktz.aylsonclub.com') === -1){
	ajaxUrl='http://test.aylsonclub.com/admin'
	//ajaxUrl='http://192.168.0.119:8080/admin'
}

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