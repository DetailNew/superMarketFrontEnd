<template>
  <div class="MainSwiper">
      <Swiper class="home-swiper" @touchmove.native="mouseMove" @touchstart.native="mouseDown" @touchend.native="mouseUp()">
        <!-- 图片占位 -->
        <div :style="getSwiperItemStyle()" :class="{'transition2':noTransition}" class="home-swiper-item" slot="swiper-item">
            <SwiperItem v-for="item in banner.length" :key="item" :style="getSwiperImgWidth()">
            <!-- 注意banner内的数据存储结构，要看image放在哪里 -->
            <img @click="swiperLink(item-1)" :src="banner[item-1].image" alt="" >
            </SwiperItem>
        </div>
      <!-- 下方导航小图标占位 -->
      <div :style="getSwiperBarLength()" class="home-swiper-item-bar" slot="swiper-item-bar">
        <span :class="barChangeColor(item-1)" v-for="item in banner.length" :key="item"></span>
      </div>
    </Swiper>
  </div>
</template>

<script>
// 最新注释：
// 当前轮播图组件需要的数据格式如下：
//  banner = [{
//    image: "图片地址",
//    link: "图片跳转地址"
//  },{},{},...]
// (如果图片不需要跳转，设link为""即可)
// 传入的时候可以判断一下传入数据banner长度是否>0，否则不显示轮播图，用v-if即可。
// 本组件可以拿来就用，属于公共组件。(本轮播图目前封装的还可以)
// 轮播图高度可以自己根据项目实情在组件外设置(调用该组件时再添加其他的class就能设置样式)。

// 本组件基本实现轮播图封装
// 当需要在其他项目内使用本轮播图时，应该(没测试过)只需要注意以下一点：
// 1. 父组件传入数据banner内的image存储方式和本组件内对banner的使用方式一致
//    即：怎么传的和怎么用的，结构要一致
// 然后在父组件中像Home.vue里所演示的方式，调用本组件即可。
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
    name: 'MainSwiper',
    data(){
        return {
            swiperBarLength: '',
            changeTime: 2500,
            changeNum: 0,
            imgId: 0,
            timeInterval: 0,
            // 鼠标按下时横纵坐标
            oriTouch:[],
            // 鼠标松开时横纵坐标
            finTouch:[],
            // 需要切换图片时对应的鼠标移动距离比例
            ratio: 0.2,
            noTransition: false,
            isMove: false
        }
    },
    props: {
        banner: Array,
    },
    components: {
        Swiper,
        SwiperItem
    },
    created(){
        this.swiperBarLength = 20 * this.banner.length + 'px'
        // console.log(this.swiperBarLength);
        this.swiperChange()
    },
    methods: {
      swiperLink(num){
          // console.log(num);
        if (this.banner.length > num){
          if (this.banner[num].link == ""){
            return
          }
          else
            window.location.href = this.banner[num].link
        }
        else{
          alert('链接已失效!')
        }
      },
      // 实现动态设置轮播图导航栏的长度，以完成较好的圆点居中效果
      getSwiperBarLength(){
        return {
          width: this.swiperBarLength
        }
      },
      // 设置轮播图的总宽度
      getSwiperItemStyle(){
        // console.log(100 * this.banner.length + '%');
        return {
          width: 100 * this.banner.length + '%',
          marginLeft: this.changeNum + 'px'
        }
      },
      // 设置每张图片的宽度固定为可视区宽度
      getSwiperImgWidth(){
        return {
          width : document.body.offsetWidth + 'px',
          display: 'inline-block'
        }
      },
      // 设置小圆点的切换
      barChangeColor(num){
        return this.imgId == num ? {
            'bar-color-gray': true
        }:{
            'bar-color-white': true
        }
      },
      mouseDown($event){
        //   console.log('按下！');
          clearInterval(this.timeInterval)
        //   es6新语法，忘记叫啥了，可以这么写。
          this.oriTouch = [$event.touches[0].pageX,$event.touches[0].pageY]
          this.noTransition = true
        //   console.log(this.oriTouch[0]);
      },
      mouseMove($event){
          this.isMove = true
        //   console.log($event.touches[0].pageX);
        //   console.log($event);
        this.finTouch = [$event.touches[0].pageX,$event.touches[0].pageY]
        this.mouseAllDown(this.finTouch[0] - this.oriTouch[0])
      },
      mouseAllDown(num){
        if (num > 0){
            if (this.imgId != 0){
                this.changeNum = - this.imgId * document.body.offsetWidth + num
            }
        }
        else{
            if (this.imgId != this.banner.length - 1){
                this.changeNum = - this.imgId * document.body.offsetWidth + num
            }
        }
      },
      mouseUp(){
        // 判断是否有鼠标移动
        // 没移动就不做切换操作
          if (this.isMove){
            //   判断是否手动切换图片以及切换方向
            this.mouseChange(this.finTouch[0] - this.oriTouch[0])
            this.isMove = false
          }
        this.noTransition = false
        //   手动切换完毕，再调用自动切换
        this.swiperChange()
      },
    //   手动切换图片
      mouseChange(num){
        //   console.log(num);
        if (num > document.body.offsetWidth * this.ratio){
            this.imgId --
            this.imgId = this.imgId == -1? 0:this.imgId
        }
        else if (num < - document.body.offsetWidth * this.ratio){
            this.imgId ++
            this.imgId = this.imgId == this.banner.length? this.banner.length - 1:this.imgId
        }
        else{}
        this.changeNum = - this.imgId * document.body.offsetWidth
      },
    //   轮播图滚动
      swiperChange(){
          new Promise((resolve,reject) => {
            let times = this.imgId
            this.timeInterval = setInterval(() => {
                times ++
                this.imgId = times % this.banner.length
                this.changeNum = - this.imgId * document.body.offsetWidth
            }, this.changeTime);
        })
      }
    },
}
</script>

<style scoped>
.home-swiper,.home-swiper-item{
  width: 100%;
}
.home-swiper{
    overflow: hidden;
}

.home-swiper-item img{
  /* 实现图片的顶部对齐 */
  /* 如果轮播图在屏幕上方，这样子会好看点 */
    vertical-align: top;
    display: inline-block;
    width: 100%;
    /* height: auto; */
    /* 使用float: left后vertical-align会失效(或者说默认底部对齐了？) */
    /* float: left; */
}
.home-swiper-item{
    transition: all 0.4s linear;
}
.transition2{
    transition: all 0s linear!important;;
}
.home-swiper-item-bar span{
  display: inline-block;
  width: 8px;
  height: 8px;
  /* 实现小圆点居中的效果 */
  margin: 0 5px;
  border-radius: 5px;
}
.bar-color-white{
    background-color: whitesmoke;
}
.bar-color-gray{
    background-color: rgb(255, 70, 70);
}
</style>