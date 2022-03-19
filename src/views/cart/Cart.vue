<template>
  <div id="cart">
    <NavBar class="nav-bar">
      <div slot="middle">购物车({{count}})</div>
    </NavBar>
    <div v-if="!count" class="empty">
        <img src="~assets/img/cart/empty.png" alt="">
        <div>购物车为空，快去添加宝贝吧</div>
      </div>
    <BScroll :style="getScrollHeight()" ref="cartScroll">
      <GoodList/>
    </BScroll>
    <BottomNav/>
  </div>
</template>

<script>
import BScroll from 'components/common/scroll/BScroll'
import NavBar from 'components/common/navbar/NavBar'
import GoodList from './childComps/GoodList'
import BottomNav from './childComps/BottomNav'
export default {
    name: 'Cart',
    data(){
      return {
        count: 0,
        homeXY: [],
      }
    },
    components: {
      NavBar,
      GoodList,
      BottomNav,
      BScroll,
    },
    methods: {
        getScrollHeight(){
            return {
            //   减去顶部和底部
            'height': this.homeXY[1] - 44 - 49 - 45 + 'px'
          }
        },
    },
    activated(){
      console.log(this.$store.state.cartGoods);
      for(let i of this.$store.state.cartGoods){
        this.count += i.count
      }
    },
    created(){
      this.homeXY = [document.documentElement.clientWidth,document.documentElement.clientHeight]
    },
    updated(){
      console.log('购物车更新');
      this.$refs.cartScroll.bscroll.refresh()
    }
}
</script>

<style scoped>
#cart{
  /* width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  margin-top: 50%;
  text-align: center; */
}
#cart > h2:nth-child(2){
  font-size: 20px;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.empty{
  position: fixed;
  text-align: center;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.empty img{
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
</style>