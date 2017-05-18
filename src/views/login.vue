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
                                    /*
                                    let list={data:{menuList:[],sessionInfo:{}}};
                                   
                                    let menuList=list.data.menuList;
                                    let userInfo=list.data.sessionInfo.user;
                                    storage.session.set('userInfo',userInfo);
                                    storage.session.set('menuList',menuList);
                                    */
                                    self.$router.go('/index');
                                }else{
                                    self.$Notice.error({
                                        title:'错误',
                                        desc:res.message
                                    });
                                }
                            }
                        })
                    } else {
                        self.$Notice.error({
                            title:'错误',
                            desc:'表单验证失败!'
                        });
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
