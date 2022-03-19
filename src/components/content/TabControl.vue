<template>
  <div ref="tabctrl" class="tab-control">
      <div @click="clickItem(item-1)" v-for="item in titles.length" :key="item">
          <span :class="{'titles-click':getRealIndex == item-1}" class="titles"> {{titles[item-1]}} </span>
          <span :class="{'line-click':getRealIndex == item-1}" class="line"></span>
      </div>
  </div>
</template>

<script>
// 本组件为一排水平整齐放置的div(个数不限)，div内仅含文字和下划线
// 鼠标经过的时候，文字变色同时下划线出现(颜色需要在组件内设置)
// 只需要从父组件传入数组，元素为字符串即可，如['流行','新款','精选']。


export default {
    name: 'TabControl',
    data(){
        return {
            currentIndex: 0,
        }
    },
    // 为统一多个完全相同的tabcontrol组件的颜色变化，
    // 从父组件传来选项标号信息，然后子组件设置，
    // 同时，子组件又会给父组件返回相同的选项标号信息。
    props: {
        dadTabControl: {
            type: Number,
            // 如果父组件不传来父组件里的选项信息，说明没有效果需要使用本功能，
            // 则将该标号设定为-1，在计算属性里面使用时进行一下判断就没问题。
            default: -1
        },
        titles:{
            type: Array
        }
    },
    computed: {
        getRealIndex(){
            // 终于知道为什么会打印两次而且currentIndex还不一样了，
            // 因为有两个该组件，这两个组件的currentIndex的状态是不一样的，
            // 所以才需要dadTabControl来控制，因此他们的dadTabControl是一样的。
            // console.log('currentIndex:' + this.currentIndex);
            // console.log('dadTabControl:' + this.dadTabControl);
            return this.dadTabControl == -1 ? this.currentIndex:this.dadTabControl
            // console.log(this.dadTabControl+ '.....');
        }
    },
    methods: {
        clickItem(num){
            this.currentIndex = num
            // console.log(this.currentIndex);
            this.$emit('typechoice',num)
        },
    },
}
</script>

<style scoped>
.tab-control{
    display: flex;
    background-color: white;
}
.tab-control > div{
    height: 40px;
    line-height: 40px;
    flex: 1;
    text-align: center;
    font-size: var(--font-size);
}
span{
    display: block;
}
.line{
    width: 30%;
    margin-top: -8px;
    /* 普通元素居中大法！ */
    margin-left: 50%;
    transform: translate(-50%, 0);
    height: 2px;
    
}
.line-click{
    background-color: rgb(247, 89, 89);
}
.titles-click{
    color: var(--color-tint);
}
</style>