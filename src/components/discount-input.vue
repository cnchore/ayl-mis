 <template>                  
    <div class="q-discout ivu-input-wrapper ivu-input-type">
    <input v-el:qdiscount v-bind:value="value" v-bind:disabled="disabled" type="text" v-on:change="updateValue" class="ivu-input" v-on:focus="onFoucs">
    </div>
</template> 
<script>
    export default{
        props:{
            value:{
                default:0
            },
            minValue:{
                type:Number,
                default:0
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        
        ready(){
        },
        methods:
        {
            updateValue(e){
                var val=e.target.value;
                if(val){
                    val=val.replace(/,/g,'').replace('¥','');
                }
                if(!isNaN(val)){
                    if(val<this.minValue){
                        this.$Notice.warning({
                            title:'警告',
                            desc:'折扣不能低于'+this.minValue
                        })
                        this.$els.qdiscount.value=this.minValue; 
                        this.value=this.minValue;
                    }else{
                        this.$els.qdiscount.value=parseFloat(val); 
                        this.value=parseFloat(val);
                    }
                    
                 }else{
                    this.value=0;
                    this.$els.qdiscount.value=0;
                 }
            },
            
            onFoucs(){
                this.$els.qdiscount.select();
            }
    }
}
</script>
<style scoped>
   
</style>