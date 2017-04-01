 <template>                  
    <Row type="flex" justify="start" class="code-row-bg">
        <i-col span="2">
            <i-button type="text" @click="handelClick">
                <Icon type="navicon" size="32"></Icon>
            </i-button>
        </i-col>
        <i-col span="6">
            <h1>艾臣营销管理平台</h1>
        </i-col>
        <i-col span="14">

        </i-col>
        <i-col span="2" class="f-center">
            <i-button type="primary" shape="circle" icon="person"></i-button>
        </i-col>
    </Row>
</template> 
<script>
    export default{
        methods:{
            handelClick(){
                this.$emit('on-click');
            }
        }
    }
</script>