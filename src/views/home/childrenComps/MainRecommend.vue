<template>
  <div class="main-recommend">
      <Recommend v-for="item in recdata.length" :key="item" class="pink-title">
          <img @click="changeUrl(item-1)" :src="recdata[item-1].image" alt="" slot="rec-img">
          <div @click="changeUrl(item-1)"  slot="rec-title"> {{recdata[item-1].title}} </div>
      </Recommend>
  </div>
</template>

<script>
// 本组件基本实现好物推荐(一排，多个div盒子)的封装
// 当需要在其他项目内使用本组件时，应该(没测试过)只需要注意以下一点：
// 1. 父组件传入数据recdata内的image/title存储方式和本组件内对recdata的使用方式一致
//    即：怎么传的和怎么用的，结构要一致
// 然后在父组件中像Home.vue里所演示的方式，调用本组件即可。
import Recommend from 'components/common/recommend/Recommend'

export default {
    name: 'MainRecommend',
    data(){
        return {
            isPink: false
        }
    },
    components: {
        Recommend
    },
    props: {
        recdata: Array
    },
    methods: {
        // 跳转网页
        changeUrl(num){
            if (this.recdata.length > num){
                window.location.href = this.recdata[num].link
                }
            else{
                alert('链接已失效!')
            }
        },
    }

}
</script>

<style>
.main-recommend{
    height: 180px;
    width: 100%;
    display: flex;
}
.pink-title:hover{
    color: var(--color-tint);
}
</style>