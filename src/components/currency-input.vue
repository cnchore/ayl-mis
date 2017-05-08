 <template>                  

    <input v-el:input v-bind:value="value" v-on:change="updateValue" class="ivu-input" v-on:focus="onFoucs">
    
</template> 
<script>
    export default{
        props:{
            value:{
                default:0
            },
            outValue:{
                default:0
            }
        },
        
        ready(){
        },
        methods:
        {

            formatMoney(number, places, symbol, thousand, decimal) {
                number = number || 0;
                places = !isNaN(places = Math.abs(places)) ? places : 2;
                symbol = symbol !== undefined ? symbol : "¥";
                thousand = thousand || ",";
                decimal = decimal || ".";
                var negative = number < 0 ? "-" : "",
                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
                return  symbol+negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
            },
            
            updateValue(e){
                var val=e.target.value;
                if(val){
                    val=val.replace(/,/g,'').replace('¥','');
                }
                if(!isNaN(val)){
                    this.$els.input.value=this.formatMoney(val,2); 
                    this.outValue=parseFloat(val);
                 }else{
                    this.outValue=0;
                    this.$els.input.value=0;

                 }
            },
            
            onFoucs(){
                this.$els.input.select();
            }
    }
}
</script>
<style scoped>
    .q-currency-div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .q-currency-input{
        display: inline-block;
    }
</style>