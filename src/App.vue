<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <!-- 同一路由改变query时强制刷新:给路由绑定iid(商品详情界面)或者path(非商品详情界面) -->
      <router-view :key="'iid' in $route.query? $route.query.iid:$route.path"></router-view>
    </keep-alive>
    <MainTabBar/>

    <!-- 21点游戏 -->
    <!-- <points/> -->
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar.vue'
import points from 'views/points/points'


export default {
  name: 'App',
  components: {
    MainTabBar,
    points,
  },
  mounted(){
  }
}
</script>

<style>
/* 直接在最外层导入base.css */
  @import "assets/css/base.css";
</style>
