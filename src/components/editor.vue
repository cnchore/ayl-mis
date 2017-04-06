<template lang="html">
    <div :id="editorId" v-html="inputContent" ></div>
</template>

<script>
import WangEditor from 'wangeditor'
export default {
    props: {
        editorId:{
            type:String,
            default:'editor'
        },
        inputContent:{
            type:String,
            default:''
        },
        outContent:{
            type:String,
            default:''
        },
        uploadUrl:{
            type:String,
            default:''
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    ready() {
        this.createEditor()
    },
    methods: {
        createEditor() {
            const self = this
            const editor = new WangEditor(self.editorId)
            editor.config.menus = ['source', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor',  'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                 'link', 'unlink', 'table', 'img', 'video', 'insertcode',  'undo', 'redo', 'fullscreen'
            ]
            editor.config.uploadImgUrl = this.uploadUrl
            editor.onchange = function() {
                self.formatContent(this.$txt.html())
            }
            editor.create()
        },
        formatContent(content) {
            this.outContent=content;
        }
    },
    components: {}
}
</script>

<style lang="css" scoped>
    #editor{
        height: 250px;
    }
    
</style>