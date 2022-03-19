<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <NavBar class="home-nav-bar">
      <div class="title" slot="middle">购物街</div>
    </NavBar>
    <!-- 选项卡信息(吸顶效果专用) -->
    <tab-control @typechoice='getTypeChoice' :dadTabControl="typeChoice" :class="{'is-attach':isAttach}" v-show="isAttach" ref="tabcontrol" :titles="keyWords" class="tab-control"></tab-control>
    <!-- 用了better-scroll之后移动端滑动会抖动，不知道为什么(问题1) -->
    <BScroll @scrollover="showMoreGoods" @scrollxy="scrollPosition" :scroll-type="3" :style="getScrollHeight()" ref="scroll">
    <!-- 轮播图 -->
    <!-- 通过v-if控制父组件拿到数据再传给子组件 -->
    <MainSwiper class="MainSwiper" :banner = 'banner' v-if="banner.length > 1"></MainSwiper>
    <!-- 今日推荐 -->
    <!-- 通过v-if控制父组件拿到数据再传给子组件 -->
    <main-recommend class="main-recomend" :recdata = 'recommend' v-if="banner.length > 1"></main-recommend>
    <!-- 每周流行 -->
    <main-feature/>
    <!-- 选项卡信息 -->
    <tab-control @typechoice='getTypeChoice' :dadTabControl="typeChoice" ref="tabcontrol" :titles="keyWords" class="tab-control"></tab-control>
    <!-- 首页商品 -->
    <pop-goods @getLoad="myLoad" v-if="goods[types[typeChoice]].page > 0" :data="goods[types[typeChoice]].list" :page="goods[types[typeChoice]].page"></pop-goods>
    <!-- 刷新标志 -->
    <refresh :style="{paddingBottom:'49px'}"></refresh>
    </BScroll>
    <back-top :class="{'back-top-show':isShowTopBtn}" @click.native="backTop" class="back-top"></back-top>
  </div>
</template>

<script>


import {homeRequest,homeGoodsRequest} from 'network/home/home'

import NavBar from 'components/common/navbar/NavBar'
import BScroll from 'components/common/scroll/BScroll'
import Refresh from 'components/common/refresh/Refresh'

import TabControl from 'components/content/TabControl'
import PopGoods from 'components/content/goods/PopGoods'
import BackTop from 'components/content/backTop/BackTop'

import MainSwiper from 'views/home/childrenComps/MainSwiper'
import MainRecommend from 'views/home/childrenComps/MainRecommend'
import MainFeature from 'views/home/childrenComps/MainFeature'


export default {
    name: 'Home',
    data(){
      return {
        banner: [0],
        dKeyword: null,
        keywords: null,
        recommend: [0],
        keyWords: ['流行','新款','精选'],
        // 三类数据结构
        goods: {
          'pop': {'page': 0,'list': []},
          'new': {'page': 0,'list': []},
          'sell': {'page': 0,'list': []},
        },
        typeChoice: 0,
        types: ['pop','new','sell'],
        homeXY: [],
        scrollHeight: 0,
        scrollXY: {x:0,y:0},
        isShowTopBtn: false,
        isShowTopBtnTime: 2600,
        isAttachHeight: 34,
        isAttach: false,
        finalHeight: 0,
        recommendCount: 0,
      }
    },
    components: {
      NavBar,
      MainSwiper,
      MainRecommend,
      MainFeature,
      TabControl,
      PopGoods,
      BScroll,
      BackTop,
      Refresh
    },
    methods: {
      // 防抖动
      // 最新注释：放弃使用该方法
      myLoad(){
            // console.log(this.typeChoice);
            // this.recommendCount ++ 
            // let maxLength = this.goods.pop.list.length >= this.goods.new.list.length?this.goods.pop.list.length:this.goods.new.list.length
            // maxLength = this.goods.sell.list.length >= maxLength?this.goods.sell.list.length:maxLength
            // console.log('已加载：' + this.recommendCount);
            // console.log('最大加载:' + maxLength);
            // console.log('一半加载' + parseInt(maxLength / 2));
            // if (this.recommendCount == maxLength || 
            //     this.recommendCount == parseInt(maxLength / 2)){
                // console.log('刷新前：' + this.$refs.scroll.bscroll.scrollerHeight);
                // this.$refs.scroll.bscroll.refresh()
                // console.log('刷新后：' + this.$refs.scroll.bscroll.scrollerHeight);
            // }
        },
      showMoreGoods(bool){
        if (bool){
          let times = 1000
          if (this.goods['pop'].page == 0){
            this.tohomeGoodsRequest('pop')
            this.tohomeGoodsRequest('new')
            this.tohomeGoodsRequest('sell')
          }
          else{
            // 等待1秒，然后获取服务器数据
            setTimeout(() => {
              this.tohomeGoodsRequest('pop')
              this.tohomeGoodsRequest('new')
              this.tohomeGoodsRequest('sell')
            }, times);
            // 再等待0.5秒，重新实现对上拉到底的判定(不可能0.5s用户就上拉到底了)
            // 如果不多等待一会，仍然有可能一次性获取好几页的数据
            setTimeout(() => {
              console.log('上拉');
              this.$refs.scroll.finishPull()
            }, times * 1.5);
          }
        }
      },
      isShowTop(){
        this.isShowTopBtn = (-this.scrollXY.y > this.isShowTopBtnTime)
      },
      isAttachTop(height){
        this.isAttach = (this.isAttachHeight >= height)
        // console.log(this.isAttachHeight,height);
        // console.log(this.isAttach);
      },
      scrollPosition(position){
        this.scrollXY = position
        this.finalHeight = position.y < 0 ? position.y : this.finalHeight
        this.isShowTop()
        // console.log(this.$refs.tabcontrol.$el.offsetTop);
        const absoluteHeightSub = this.$refs.tabcontrol.$el.offsetTop + this.scrollXY.y
        this.isAttachTop(absoluteHeightSub)
      },
      getTypeChoice(num){
        this.typeChoice = num
      },
      getScrollHeight(){
        // console.log(this.scrollHeight + 'px');
        return {
          'height': this.scrollHeight + 'px'
        }
      },
      backTop(){
        // 通过ref拿到当前组件中的better-scroll组件，然后获取到其data下的实例对象
        this.$refs.scroll.scrollTo(0,0,500)
      },
      // 时刻注意！请求是异步进行的！
      tohomeGoodsRequest(type){
        // 确保第一次请求的是第一页
        // 以后每次请求的都是后面那一页的数据
        const newPage = this.goods[type].page + 1
        homeGoodsRequest(type,newPage).then(res => {
          // es6的对象赋值写法,保存请求结果
          // 并且将后面请求到的数据进行拼接保存
          // bug！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！1
          // bug1:page到一定数量就会不再有新数据，这时候需要处理，否则报错(不影响使用)
          // bug2:下拉过快会一次性请求多个page的数据
          // 以上两个bug已经全部解决！

          // 一类数据全部请求完毕，则直接结束该类数据的获取
          if (res == []){
            // console.log(type + ': ' + newPage);
            return
          }
          this.goods[type] = {'page':newPage,'list':this.goods[type].list.concat(res.data.list)}
          // console.log(this.goods['pop'].list);
          // for (let i of this.goods[type].list){
          //   console.log(i.cfav);
          // }
        })
      },
      tohomeRequest(){
        homeRequest().then(res => {
        // 请求成功后将获取到的数据存放在data里
        this.banner = res.data.banner.list
        this.dKeyword = res.data.dKeyword.list
        this.keywords = res.data.keywords.list
        this.recommend = res.data.recommend.list
        // console.log(this.banner);
        // console.log(this.dKeyword);
        // console.log(this.keywords);
        // console.log(this.recommend);
      })
      }
    },
    created(){
      // home组件创建完就发送网络请求
      this.tohomeRequest()
      // 请求三类信息的第一页数据
      this.showMoreGoods(true)
      // 获取到网站可视区的宽高及设置滚动高度
      this.homeXY = [document.documentElement.clientWidth,document.documentElement.clientHeight]
      // 知道为什么不用减去44了，因为轮播图用的是padding-top
      // 也不用减去49，因为给最下面的商品列表加上了一个padding-bottom
      // 这里和移动端不好适配(咋都是better-scroll带来的问题？？！问题2)
      this.scrollHeight = this.homeXY[1]
      this.recommendCount = 0
    },
    activated(){
      // console.log(this.finalHeight);
      // 为了解决如下问题：
      // 在正在滑动时切换界面，再切换回来，home就会因为bscroll内部原因而自动滑到顶部
      // 解决方式：一回来就调用refresh()
      this.$refs.scroll.bscroll.refresh()
      // 为了解决如下问题：
      // 有时候切换界面后，再切换回来，home会直接展示最顶部的界面(和上面那个不一样)
      // 解决方式：记录切换出去前的滚动高度，在切换回来时第二时间滚到这里即可。
      this.$refs.scroll.scrollTo(0,this.finalHeight,0)
      // this.$refs.scroll.bscroll.refresh()
    },
    deactivated(){

    },
    updated(){
      // 解决home里面bscroll的刷新问题
      // 这下只会在导航栏固定和松开时、返回顶部按钮出现和消失时以及图片加载时进行刷新
      // 比目标(图片加载时刷新)多了四次刷新时机，问题不大。
      setTimeout(() => {
        console.log('刷新前：' + this.$refs.scroll.bscroll.scrollerHeight);
        this.$refs.scroll.bscroll.refresh()
        console.log('刷新后：' + this.$refs.scroll.bscroll.scrollerHeight);
      }, 300);
    }
}
</script>

<style scoped>
.MainSwiper{
  padding-top: 44px;
  /* 因为设置了padding-top，所以要加上自己的padding-top*/
  height: calc(190px + 44px);
}

.home-nav-bar{
  background-color: var(--color-tint);
  color: whitesmoke;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.tab-control{
  width: 100%;
  margin-top: 20px;
  border-top: 10px solid #eee;
  /* 滑到顶部的时候停止 */
  /* 用了better-scroll后失效 */
  position: sticky;
  top: 34px;
}
.back-top{
  width: 40px;
  height: 0px;
  border-radius: 20px;
  right: 10px;
  bottom: 59px;
}
.back-top-show{
  height: 40px;
}
/* 为了实现吸顶效果，给额外的tab-control添加的样式 */
.is-attach{
  position: fixed;
  top: 44px;
  left: 0;
  border-top: 0;
  margin-top: 0;
  z-index: 10;
}
</style>