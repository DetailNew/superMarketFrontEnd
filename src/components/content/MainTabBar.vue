<template>
  <TabBar>
      <TabBarItem path="/Home" activecolor="red">
      <!-- 在DOM里面用路径别名要在前面加上~ -->
        <img src="~assets/img/tabbar/首页.svg" alt="" slot="tabbar-ico">
        <img src="~assets/img/tabbar/首页2.svg" alt="" slot="tabber-ico-active">
        <div slot="tabbar-title">首页</div>
      </TabBarItem>
      <TabBarItem path="/Category" activecolor="red">
        <img src="~assets/img/tabbar/分类.svg" alt="" slot="tabbar-ico">
        <img src="~assets/img/tabbar/分类2.svg" alt="" slot="tabber-ico-active">
        <div slot="tabbar-title">分类</div>
      </TabBarItem>
      <TabBarItem path="/Cart" activecolor="red">
        <img src="~assets/img/tabbar/购物车.svg" alt="" slot="tabbar-ico">
        <img src="~assets/img/tabbar/购物车2.svg" alt="" slot="tabber-ico-active">
        <div slot="tabbar-title">购物车</div>
      </TabBarItem>
      <TabBarItem path="/Profile" activecolor="red">
        <img src="~assets/img/tabbar/我的.svg" alt="" slot="tabbar-ico">
        <img src="~assets/img/tabbar/我的2.svg" alt="" slot="tabber-ico-active">
        <div slot="tabbar-title">我的</div>
      </TabBarItem>
      <!-- 暂时停止对留言板的功能显示 -->
      <TabBarItem path="/Message" activecolor="red">
        <img src="~assets/img/tabbar/留言.svg" alt="" slot="tabbar-ico">
        <img src="~assets/img/tabbar/留言2.svg" alt="" slot="tabber-ico-active">
        <div slot="tabbar-title">留言</div>
      </TabBarItem>
      <TabBarItem path="/Release" activecolor="red">
        <img src="~assets/img/tabbar/留言.svg" alt="" slot="tabbar-ico">
        <img src="~assets/img/tabbar/留言2.svg" alt="" slot="tabber-ico-active">
        <div slot="tabbar-title">发布</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>