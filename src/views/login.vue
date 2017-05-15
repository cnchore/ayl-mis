<style scoped lang="less">
    .l-page{
        height: 100vh;

    }
    
    .login{
        height: calc(100vh-8.5rem);
        background-position:left center;
        background-size: cover;
        
        display: -webkit-box;
        -webkit-box-align:end;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;

        form{
            margin-right: 10%;
            padding: 30px;
            width: 380px;
            border: 1px solid #d1dbe5;
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
            .v-code{
                padding-left: 14px;
                img{
                    width:100%;
                    height:50px;
                    cursor: pointer;
                }
            }
            
        }
        .copyright{
            
            padding: 0 10px;
            color:#999;
            line-height: 50px;
        }
    }

</style>
<template>
    <div class="l-page l-login-page">
        <header>
            <Row>
                <i-col span="5">
                    <div class="logo"></div>
                </i-col>
            </Row>
        </header>
    <div class="login">
        <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate">
            
            <h3 style="padding-bottom: 15px; border-bottom: 1px solid #d7dde4;">欢迎登录</h3>
            <Form-item ></Form-item>  
            <Form-item prop="userName">
            <i-input :value.sync="formValidate.userName" @keyup.enter="handleSubmit('formValidate')" size="large" placeholder="请输入用户名"></i-input>
            </Form-item>
            <Form-item  prop="pwd">
            <i-input :value.sync="formValidate.pwd" @keyup.enter="handleSubmit('formValidate')" size="large" type="password" placeholder="请输入密码"></i-input>
            </Form-item>
            <Form-item prop="validateCode">
                <Row>
                    <i-col span="16">
                        <i-input :value.sync="formValidate.validateCode" @keyup.enter="handleSubmit('formValidate')" size="large" placeholder="请输入验证码"></i-input>
                    </i-col>
                    
                    <i-col span="8" class="v-code">
                        <img :src="vCode" @click="vCodeClick">
                    </i-col>
                </Row>
            </Form-item>

            <Form-item>
                <i-button type="primary"  @click="handleSubmit('formValidate')" size="large" long>登录</i-button>
            </Form-item>
        </i-form>
        <div class="copyright" v-show="false">版权所有 &copy; 2017.艾臣家居科技有限公司.</div>
    </div>
</div>
</template>
<script>
import server,{ storage } from '../libs/server'
import util from '../libs/util'
    export default {
        data () {
            return {
                formValidate: {
                    userName: '',
                    pwd: '',
                    validateCode: ''
                },
                ruleValidate: {
                    userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    validateCode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                    ]
                },
                vCode:util.serverPath+'/web/captchaImage',
            }
        },
        ready(){
            
        },
        methods: {
            onEnter(){
                alert('enter');
            },
            vCodeClick(){
                this.vCode=util.serverPath+'/web/captchaImage?'+Math.random();
            },
            handleSubmit (name) {
                let self=this;
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        self.$Loading.start();
                        server.login(self.formValidate).then((res)=>{
                            self.$Loading.finish();
                            if(res.success){
                                storage.session.set('userInfo',res.data.sessionInfo.user);
                                storage.session.set('menuList',res.data.menuList);
                                self.$router.go('/index');
                            }else{
                                if(window.location.origin.indexOf('http://localhost:')!=-1){
                                    let list={"success":true,"message":"登录成功","data":{"sessionInfo":{"user":{"id":36,"userName":"刘路路","pwd":"670B14728AD9902AECBA32E22FA4F6BD","type":2,"status":1,"roleId":4,"roleName":"代理商","validateCode":null},"memAcount":null,"role":{"id":4,"roleName":"代理商","roleCode":"agent","remark":"代理商"},"isLiveMode":false},"menuList":[{"id":63,"parentId":1,"seq":null,"iconUrl":"icon-zhuye","menuName":"首页","src":"/index","levelNum":1,"isLeaf":true,"nodePath":null,"remark":"营销平台首页","state":"colsed","ck":true,"children":[]},{"id":64,"parentId":1,"seq":null,"iconUrl":"icon-yuyueguanli","menuName":"预约管理","src":"/waiting","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[{"id":72,"parentId":64,"seq":null,"iconUrl":"icon-daiban","menuName":"待办事项","src":"/waiting","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":73,"parentId":64,"seq":null,"iconUrl":"icon-mendian","menuName":"已办事项","src":"/complete","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]}]},{"id":65,"parentId":1,"seq":null,"iconUrl":"icon-dingdan","menuName":"客户订单管理","src":"/order/list","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[{"id":75,"parentId":65,"seq":null,"iconUrl":"icon-dingdanguanli","menuName":"订单管理","src":"/order/list","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":76,"parentId":65,"seq":null,"iconUrl":"icon-kehuguanli","menuName":"客户管理","src":"/order/hq/ownerInfo","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]}]},{"id":66,"parentId":1,"seq":null,"iconUrl":"icon-qiye","menuName":"安居艾臣","src":"/store","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[{"id":83,"parentId":66,"seq":null,"iconUrl":"icon-youhuihuodongfabu","menuName":"优惠活动发布","src":"/coupon","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]}]},{"id":67,"parentId":1,"seq":null,"iconUrl":"icon-hehuoren","menuName":"艾臣合伙人","src":"/partner/account","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[{"id":92,"parentId":67,"seq":null,"iconUrl":"icon-fenhongguanli1","menuName":"分红管理","src":"/partner/bonus","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]}]},{"id":70,"parentId":1,"seq":null,"iconUrl":"icon-zizhuxuexi","menuName":"自助学习","src":"/study/product/point","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[{"id":94,"parentId":70,"seq":null,"iconUrl":"icon-chanpinmaidian","menuName":"产品卖点","src":"/study/product/point","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":95,"parentId":70,"seq":null,"iconUrl":"icon-xitongjieshao","menuName":"系统介绍","src":"/study/sys/introduce","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":96,"parentId":70,"seq":null,"iconUrl":"icon-anzhuangshouhou","menuName":"安装售后","src":"/study/customer/service","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":97,"parentId":70,"seq":null,"iconUrl":"icon-yunyingtixi","menuName":"运营体系","src":"/study/operating/system","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]}]},{"id":71,"parentId":1,"seq":null,"iconUrl":"","menuName":"个人中心","src":"/user","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[{"id":98,"parentId":71,"seq":null,"iconUrl":"icon-zhanghaoxinxi","menuName":"基本信息","src":"/info","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":99,"parentId":71,"seq":null,"iconUrl":"icon-xiugaimima","menuName":"修改密码","src":"/pwd/update","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]},{"id":100,"parentId":71,"seq":null,"iconUrl":"icon-beiwanglu","menuName":"备忘录","src":"/memo","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","state":"colsed","ck":true,"children":[]}]},{"id":107,"parentId":1,"seq":null,"iconUrl":"icon-mendian","menuName":"门店管理","src":"/staff","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－经销商","state":"colsed","ck":true,"children":[{"id":117,"parentId":107,"seq":null,"iconUrl":"icon-kehu","menuName":"人员管理","src":"/staff","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－经销商","state":"colsed","ck":true,"children":[]}]}]},"resultCode":200};
                                    let menuList=list.data.menuList;
                                    let userInfo=list.data.sessionInfo.user;
                                    storage.session.set('userInfo',userInfo);
                                    storage.session.set('menuList',menuList);
                                    self.$router.go('/index');
                                }else{
                                    self.$Message.error(res.message);
                                }
                            }
                        })
                    } else {
                        self.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
