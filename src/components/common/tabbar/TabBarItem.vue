<template>
  <div class="tab-bar-item" id="tab-bar-item" @click="itemclick">
      <div v-if="!isActive"><slot name="tabbar-ico"></slot></div>
      <div v-else><slot name="tabber-ico-active"></slot></div>
      <div :style="activeStyle"><slot name="tabbar-title"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
        path: String,
        activecolor: {
            type: String,
            default: 'red'
        }
    },
    data(){
        return {
            // isActive: true
        }
    },
    // computed自动监听，所以用自带的属性实现
    // 也可以在methods里面实现，但是需要点击才能触发
    computed: {
        isActive(){
            return this.$route.path.indexOf(this.path) != -1
        },
        activeStyle(){
            return this.isActive? {color:this.activecolor}:{}
        }
    },
    methods: {
        itemclick(){
            if (this.$router.history.current.fullPath != this.path){
                this.$router.push(this.path)
            }
        },
    },
}
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    /* 常用高度 */
    height: 49px;
  }
.tab-bar-item  img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 去掉图片下面本来的多余空间 */
    vertical-align: middle;
    margin-bottom: 2px;
  }
.tab-bar-item > div{
      font-size: 14px;
  }
</style>