<template>
    <Transfer
        :data="data3"
        :target-keys="targetKeys3"
        :list-style="listStyle"
        :render-format="render3"
        :operations="['向左移动','向右移动']"
        filterable
        @on-change="handleChange3">
        <div :style="{float: 'right', margin: '5px'}">
            <i-button type="ghost" size="small" @click="reloadMockData">刷新</i-button>
        </div>
    </Transfer>
</template>
<script>
    export default {
        data () {
            return {
                data3: this.getMockData(),
                targetKeys3: this.getTargetKeys(),
                listStyle: {
                    width: '250px',
                    height: '300px'
                }
            }
        },
        methods: {
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        applyCouponName: '内容' + i,
                        description: '内容' + i + '的描述信息'
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                let a='内容11',b='内容11的描述信息';
                return this.getMockData()
                        .filter((v) => v.applyCouponName===a && v.description===b)
                        .map(item => item.key);
            },
            handleChange3 (newTargetKeys) {
                this.targetKeys3 = newTargetKeys;
                console.log(this.targetKeys3.join());
                this.targetKeys3.forEach((item)=>{
                    this.data3.forEach((da)=>{
                        if(item===da.key){
                            console.log(da.applyCouponName);
                        }
                    })
                    
                })
            },
            render3 (item) {
                return item.applyCouponName + ' - ' + item.description;
            },
            reloadMockData () {
                this.data3 = this.getMockData();
                this.targetKeys3 = this.getTargetKeys();
            }
        }
    }
</script>
