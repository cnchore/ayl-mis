<style scoped lang="less">
    .l-page{
        height: 100vh;
    }
    
    .login{
        height: calc(100vh-10rem);
        
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
        form{
            padding: 14px;
            width: 400px;
            border: 1px solid #d1dbe5;
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
            
        }
        .copyright{
            
            padding: 0 10px;
            color:#999;
            line-height: 50px;
        }
    }
    
</style>
<template>
    <div class="l-page">
        <header>
            <Row>
                <i-col span="4">
                    <div class="logo"></div>
                </i-col>
            </Row>
        </header>
    <div class="login">
        <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
            
            <h1 style="text-align: center;padding-bottom: 14px;">系统登录</h1>
                
            <Form-item label="账号" prop="name">
            <i-input :value.sync="formValidate.name" placeholder="请输入姓名"></i-input>
            </Form-item>
            <Form-item label="密码" prop="pwd">
            <i-input :value.sync="formValidate.pwd" type="password" placeholder="请输入密码"></i-input>
            </Form-item>
            <Form-item label="验证码" prop="validateCode">
            <i-input :value.sync="formValidate.validateCode" placeholder="请输入验证码"></i-input>
            </Form-item>

            <Form-item>
                <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
                <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
            </Form-item>
        </i-form>
        <div class="copyright">版权所有 &copy; 2017.艾臣智能门窗科技有限公司.</div>
    </div>
</div>
</template>
<script>
import server,{ storage } from '../libs/server'
    export default {
        data () {
            return {
                formValidate: {
                    name: 'superadmin',
                    pwd: '000000',
                    validateCode: 'admin'
                },
                ruleValidate: {
                    name: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    validateCode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        ready(){
            console.log(this.$router.query);
            
        },
        methods: {
            handleSubmit (name) {
                let self=this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Loading.start();
                        server.login(self.formValidate.name,self.formValidate.pwd).then((res)=>{
                            this.$Loading.finish();
                            if(res.success){
                                storage.session.set('userInfo',res.data.user);
                                this.$router.go('/store');
                            }else{
                                this.$Message.error(res.message);
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
