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
                                    let list={"success":true,"message":"登录成功","data":{"sessionInfo":{"user":{"id":60,"userName":"admin","pwd":"670B14728AD9902AECBA32E22FA4F6BD","type":1,"status":1,"roleId":17,"roleName":"总部人员","validateCode":null},"memAcount":null,"role":{"id":17,"roleName":"总部人员","roleCode":"org","remark":"总部人员角色"},"isLiveMode":false},"menuList":[{"id":63,"parentId":1,"seq":null,"iconUrl":"icon-zhuye","menuName":"首页","src":"/index","levelNum":1,"isLeaf":true,"nodePath":null,"remark":"营销平台首页","type":1,"state":"colsed","ck":true,"children":[]},{"id":64,"parentId":1,"seq":null,"iconUrl":"icon-yuyueguanli","menuName":"预约管理","src":"/waiting","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":72,"parentId":64,"seq":null,"iconUrl":"icon-daiban","menuName":"待办事项","src":"/waiting","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":128,"parentId":72,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":129,"parentId":72,"seq":null,"iconUrl":"","menuName":"编辑预约","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":130,"parentId":72,"seq":null,"iconUrl":"","menuName":"提交","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":131,"parentId":72,"seq":null,"iconUrl":"","menuName":"删除预约","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":73,"parentId":64,"seq":null,"iconUrl":"icon-mendian","menuName":"已办事项","src":"/complete","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":135,"parentId":73,"seq":null,"iconUrl":"","menuName":"查看预约","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":136,"parentId":73,"seq":null,"iconUrl":"","menuName":"查看订货单","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":74,"parentId":64,"seq":null,"iconUrl":"icon-shanchu","menuName":"预约废弃箱","src":"/trash","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":137,"parentId":74,"seq":null,"iconUrl":"","menuName":"恢复","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]}]},{"id":65,"parentId":1,"seq":null,"iconUrl":"icon-dingdan","menuName":"客户订单管理","src":"/order/list","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":75,"parentId":65,"seq":null,"iconUrl":"icon-dingdanguanli","menuName":"订单管理","src":"/order/list","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":138,"parentId":75,"seq":null,"iconUrl":"","menuName":"查看预约","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":139,"parentId":75,"seq":null,"iconUrl":"","menuName":"查看订货单","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":140,"parentId":75,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":76,"parentId":65,"seq":null,"iconUrl":"icon-kehuguanli","menuName":"客户管理","src":"/order/hq/ownerInfo","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":146,"parentId":76,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":77,"parentId":65,"seq":null,"iconUrl":"icon-dingdan1","menuName":"订单状态修改","src":"/order/state/change","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":147,"parentId":77,"seq":null,"iconUrl":"","menuName":"修改","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]}]},{"id":66,"parentId":1,"seq":null,"iconUrl":"icon-qiye","menuName":"安居艾臣","src":"/store","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":78,"parentId":66,"seq":null,"iconUrl":"icon-mendianzhanshiguanli","menuName":"门店展示管理","src":"/store","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":148,"parentId":78,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":149,"parentId":78,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":150,"parentId":78,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":79,"parentId":66,"seq":null,"iconUrl":"icon-zixunguanli-tishi","menuName":"艾臣资讯管理","src":"/news","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":151,"parentId":79,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":152,"parentId":79,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":153,"parentId":79,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":154,"parentId":79,"seq":null,"iconUrl":"","menuName":"发布","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":155,"parentId":79,"seq":null,"iconUrl":"","menuName":"结束发布","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":80,"parentId":66,"seq":null,"iconUrl":"icon-chanpinjieshao","menuName":"产品介绍","src":"/product","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":156,"parentId":80,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":157,"parentId":80,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":158,"parentId":80,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":159,"parentId":80,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":81,"parentId":66,"seq":null,"iconUrl":"icon-yijianfankuiguanli","menuName":"意见反馈管理","src":"/feed/back?t=4","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":160,"parentId":81,"seq":null,"iconUrl":"","menuName":"回复","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":161,"parentId":81,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":82,"parentId":66,"seq":null,"iconUrl":"icon-changjianwentiguanli","menuName":"常见问题管理","src":"/help","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":162,"parentId":82,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":163,"parentId":82,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":164,"parentId":82,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":83,"parentId":66,"seq":null,"iconUrl":"icon-youhuihuodongfabu","menuName":"优惠活动发布","src":"/coupon","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":165,"parentId":83,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":167,"parentId":83,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":168,"parentId":83,"seq":null,"iconUrl":"","menuName":"上线","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":169,"parentId":83,"seq":null,"iconUrl":"","menuName":"下线","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":170,"parentId":83,"seq":null,"iconUrl":"","menuName":"审核","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":84,"parentId":66,"seq":null,"iconUrl":"icon-youhuiquanmingxipeizhi","menuName":"优惠券明细配置","src":"/coupon/details","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":171,"parentId":84,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":172,"parentId":84,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":173,"parentId":84,"seq":null,"iconUrl":"","menuName":"启用","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":174,"parentId":84,"seq":null,"iconUrl":"","menuName":"禁用","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":85,"parentId":66,"seq":null,"iconUrl":"icon-lingqulipinguanli","menuName":"领取礼品管理","src":"/gift/send","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":175,"parentId":85,"seq":null,"iconUrl":"","menuName":"已回复","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":176,"parentId":85,"seq":null,"iconUrl":"","menuName":"已发货","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":177,"parentId":85,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]}]},{"id":67,"parentId":1,"seq":null,"iconUrl":"icon-hehuoren","menuName":"艾臣合伙人","src":"/partner/account","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":86,"parentId":67,"seq":null,"iconUrl":"icon-hehuorenzhanghaoguanli1","menuName":"合伙人账号管理","src":"/partner/account","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":178,"parentId":86,"seq":null,"iconUrl":"","menuName":"通过","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":179,"parentId":86,"seq":null,"iconUrl":"","menuName":"不通过","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":87,"parentId":67,"seq":null,"iconUrl":"icon-xianjinquanpeizhi","menuName":"现金券配置","src":"/coupon/config","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":180,"parentId":87,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":181,"parentId":87,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":182,"parentId":87,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":183,"parentId":87,"seq":null,"iconUrl":"","menuName":"上架","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":184,"parentId":87,"seq":null,"iconUrl":"","menuName":"下架","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":88,"parentId":67,"seq":null,"iconUrl":"icon-xianjinquanshenqingguanli","menuName":"现金券申请","src":"/coupon/apply","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":185,"parentId":88,"seq":null,"iconUrl":"","menuName":"通过","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":186,"parentId":88,"seq":null,"iconUrl":"","menuName":"不通过","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":89,"parentId":67,"seq":null,"iconUrl":"icon-xianjinquanshiyongqingkuang","menuName":"现金券使用情况","src":"/partner/coupon","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[]},{"id":90,"parentId":67,"seq":null,"iconUrl":"icon-gonggaofabuguanli1","menuName":"公告发布管理","src":"/notice","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":187,"parentId":90,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":188,"parentId":90,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":189,"parentId":90,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":190,"parentId":90,"seq":null,"iconUrl":"","menuName":"发布","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":191,"parentId":90,"seq":null,"iconUrl":"","menuName":"结束发布","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":91,"parentId":67,"seq":null,"iconUrl":"icon-shensuguanli_icon","menuName":"申诉管理","src":"/feed/back?t=5","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":192,"parentId":91,"seq":null,"iconUrl":"","menuName":"回复","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":193,"parentId":91,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":92,"parentId":67,"seq":null,"iconUrl":"icon-fenhongguanli1","menuName":"分红管理","src":"/partner/bonus","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":195,"parentId":92,"seq":null,"iconUrl":"","menuName":"查看","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]}]},{"id":68,"parentId":1,"seq":null,"iconUrl":"icon-mendian","menuName":"经销商管理","src":"/agent/index","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":93,"parentId":68,"seq":null,"iconUrl":"icon-mendian","menuName":"经销商管理","src":"/agent/index","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":196,"parentId":93,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":197,"parentId":93,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":198,"parentId":93,"seq":null,"iconUrl":"","menuName":"禁用","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":199,"parentId":93,"seq":null,"iconUrl":"","menuName":"启用","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]},{"id":200,"parentId":93,"seq":null,"iconUrl":"","menuName":"二维码","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部","type":2,"state":"colsed","ck":true,"children":[]}]}]},{"id":69,"parentId":1,"seq":null,"iconUrl":"icon-tongji","menuName":"统计分析","src":"","levelNum":1,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[]},{"id":70,"parentId":1,"seq":null,"iconUrl":"icon-zizhuxuexi","menuName":"自助学习","src":"/study/product/point","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":94,"parentId":70,"seq":null,"iconUrl":"icon-chanpinmaidian","menuName":"产品卖点","src":"/study/product/point","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[]},{"id":95,"parentId":70,"seq":null,"iconUrl":"icon-xitongjieshao","menuName":"系统介绍","src":"/study/sys/introduce","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[]},{"id":96,"parentId":70,"seq":null,"iconUrl":"icon-anzhuangshouhou","menuName":"安装售后","src":"/study/customer/service","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[]},{"id":97,"parentId":70,"seq":null,"iconUrl":"icon-yunyingtixi","menuName":"运营体系","src":"/study/operating/system","levelNum":2,"isLeaf":true,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[]}]},{"id":71,"parentId":1,"seq":null,"iconUrl":"","menuName":"个人中心","src":"/user","levelNum":1,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":98,"parentId":71,"seq":null,"iconUrl":"icon-zhanghaoxinxi","menuName":"基本信息","src":"/info","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":201,"parentId":98,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":99,"parentId":71,"seq":null,"iconUrl":"icon-xiugaimima","menuName":"修改密码","src":"/pwd/update","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":202,"parentId":99,"seq":null,"iconUrl":"","menuName":"编辑","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]},{"id":100,"parentId":71,"seq":null,"iconUrl":"icon-beiwanglu","menuName":"备忘录","src":"/memo","levelNum":2,"isLeaf":false,"nodePath":null,"remark":"营销平台－总部","type":1,"state":"colsed","ck":true,"children":[{"id":203,"parentId":100,"seq":null,"iconUrl":"","menuName":"新增","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":204,"parentId":100,"seq":null,"iconUrl":"","menuName":"修改","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]},{"id":205,"parentId":100,"seq":null,"iconUrl":"","menuName":"删除","src":"","levelNum":3,"isLeaf":true,"nodePath":null,"remark":"总部＋经销商","type":2,"state":"colsed","ck":true,"children":[]}]}]}]},"resultCode":200};
                                    let menuList=list.data.menuList;
                                    let userInfo=list.data.sessionInfo.user;
                                    storage.session.set('userInfo',userInfo);
                                    storage.session.set('menuList',menuList);
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
