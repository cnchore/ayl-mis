 <template>                  
    
    <i-button type="text" @click="handelClick">
        <Icon type="navicon" size="32"></Icon>
    </i-button>

    <h3>艾臣营销管理平台</h3>
        
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