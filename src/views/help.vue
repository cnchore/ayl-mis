<template>
    <i-form v-ref:form-dynamic :model="formDynamic" :label-width="80">
        <Form-item
            v-for="item in formDynamic.items"
            :label="'项目' + ($index + 1)"
            :prop="'items.' + $index + '.value'"
            :rules="{required: true, message: '项目' + ($index + 1) +'不能为空', trigger: 'blur'}">
            <Row>
                <i-col span="18">
                    <i-input type="text" :value.sync="item.value" placeholder="请输入..."></i-input>
                </i-col>
                <i-col span="4" offset="1">
                    <i-button type="ghost" @click="handleRemove(item)">删除</i-button>
                </i-col>
            </Row>
        </Form-item>
        <Form-item>
            <Row>
                <i-col span="12">
                    <i-button type="dashed" long @click="handleAdd" icon="plus-round">新增</i-button>
                </i-col>
            </Row>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="handleSubmit('formDynamic')">提交</i-button>
            <i-button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</i-button>
        </Form-item>
    </i-form>
</template>
<script>
    export default {
        data () {
            return {
                formDynamic: {
                    items: [
                        {
                            value: ''
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formDynamic.items)
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove (item) {
                this.formDynamic.items.$remove(item);
            }
        }
    }
</script>
