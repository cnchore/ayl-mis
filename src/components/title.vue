 <template>                  
    
    <i-button type="text" @click="handelClick">
        <Icon type="navicon" size="32"></Icon>
    </i-button>

    <h3>艾臣营销管理平台</h3>
    <i-button type="primary" v-show="isShow" style="float: right; margin-right: 15px; margin-top: 8px; " icon="ios-plus-empty" @click="add">新增</i-button>  
</template> 
<script>
    export default{
        props:{
            isShow:{
                type:Boolean,
                default:true
            },
            leftMenu:{
                type:Boolean,
                default:true
            },
            spanLeft:{
                type:Number,
                default:4
            },
            spanRight:{
                type:Number,
                default:20
            }
        },
        ready(){
            let w=window.document.body.clientWidth;
            if(w&&w<=1024){
                this.spanLeft=5;
                this.spanRight = 19;
            }
            else if(w&&w>=1440){
                this.spanLeft=3;
                this.spanRight = 21;
            }else if(w&&w>=2160){
                this.spanLeft=2;
                this.spanRight = 22;
            }else{
                this.spanLeft=4;
                this.spanRight = 20;
            }
        },
        methods:{
            handelClick(){
                let w=window.document.body.clientWidth;
                this.leftMenu=!this.leftMenu;
                if (this.leftMenu) {
                    if(w&&w<=1024){
                        this.spanLeft=0;
                        this.spanRight = 24;
                    }else if(w&&w>=1440){
                        this.spanLeft=3;
                        this.spanRight = 21;
                    }else if(w&&w>=2160){
                        this.spanLeft=2;
                        this.spanRight = 22;
                    }else{
                        this.spanLeft=4;
                        this.spanRight = 20;
                    }
                } else {
                    this.spanRight = 24;
                }
                //this.$emit('on-click');
            },
            add(){
                this.$emit('on-add')
            }
        }
    }
</script>