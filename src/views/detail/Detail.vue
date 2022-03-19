<template>
  <div class="detail">
      <!-- 顶部导航栏 -->
      <main-nav-bar @page = "goPage" :isChosen="fourChosen" class="detail-nav-bar"  :types="types"></main-nav-bar>
      <BScroll @scrollover="showMoreGoods" @scrollxy="scrollPosition" :scroll-type="3" :style="getScrollHeight()" ref="detail">
      <!-- 轮播图 -->
      <main-swiper class="main-swiper" :banner = 'topImages' v-if="topImages.length > 0"></main-swiper>
      <!-- 商品基础信息 -->
      <!-- 添加个v-if(不能用v-show)，防止渲染的时候数据没传进去 -->
      <main-goods-info v-if="detailData.title!=undefined" :info="detailData"></main-goods-info>
      <!-- 商家信息 -->
      <main-shop-info v-if="Object.keys(shopData).length!= 0" :info="shopData"></main-shop-info>
      <!-- 服装展示信息 -->
      <main-goods-show @getLoadOk="imgLoadOk" v-if="Object.keys(showData).length!= 0" :info="showData"></main-goods-show>
      <!-- 参数信息 -->
      <main-goods-params ref="param" v-if="Object.keys(imgParams).length!= 0" :info="imgParams"></main-goods-params>
      <!-- 用户评价 -->
      <main-evaluate ref="rates" v-if="Object.keys(userRate).length!= 0 && userRate.cRate!=0" :info="userRate"></main-evaluate>
      <!-- 推荐商品 -->
      <pop-goods @getLoad="myLoad" ref="recommend" class="pop-goods" v-if="recommend.length > 0" :data="recommend" :page="1"></pop-goods>
      </BScroll>
      <BottomBar @addToCart="addToCart"/>
      <back-top :class="{'back-top-show':isShowTopBtn}" 
      @click.native="backTop" class="back-top"></back-top>
  </div>
</template>

<script>
import {homeGoodsRequest} from 'network/home/home'
import {detailRequest} from 'network/detail/detail'

import MainNavBar from 'views/detail/childComps/MainNavBar'
import MainGoodsInfo from 'views/detail/childComps/MainGoodsInfo'
import MainShopInfo from 'views/detail/childComps/MainShopInfo'
import MainGoodsShow from 'views/detail/childComps/MainGoodsShow'
import MainGoodsParams from 'views/detail/childComps/MainGoodsParams'
import MainEvaluate from 'views/detail/childComps/MainEvaluate'
import BottomBar from 'views/detail/childComps/BottomBar'

import BScroll from 'components/common/scroll/BScroll'
import Refresh from 'components/common/refresh/Refresh'
import Toast from 'components/common/toast/Toast'

import MainSwiper from 'views/home/childrenComps/MainSwiper'

import TabControl from 'components/content/TabControl'
import BackTop from 'components/content/backTop/BackTop'
import PopGoods from 'components/content/goods/PopGoods'
import {backToTop} from 'common/mixin'


export default {
    name: 'Detail',
    data(){
        return {
            iid: '',
            detailData: {},
            types: ['商品','参数','评论','推荐'],
            topImages: [],
            shopData: {},
            homeXY: [],
            showData: {},
            imgCount:0,
            imgAllCount:0,
            imgParams: {},
            userRate: {},
            recommend: [],
            scrollXY: {x:0,y:0},
            fourHeight:[],
            recommendCount: 0,
            fourChosen: [true,false,false,false],
            fourScrollHeight: [0,0,0,0],
        }
    },
    components: {
        MainNavBar,
        BackTop,
        MainSwiper,
        MainGoodsInfo,
        MainShopInfo,
        BScroll,
        MainGoodsShow,
        MainGoodsParams,
        MainEvaluate,
        PopGoods,
        BottomBar,
        Toast,
    },
    mixins:[backToTop],
    methods: {
        goPage(index){
            console.log(index);
            this.$refs.detail.scrollTo(0,this.fourScrollHeight[index],800)
        },
        scrollPosition(position){
        this.scrollXY = position
        this.initFourData()
        this.listenShowBackTop(position)
      },
      addToCart(){
        //   获取购物车需要展示的信息
        const goodInfo = {
            image: this.topImages[0].image,
            title: this.detailData.title,
            desc: this.detailData.desc,
            price: this.detailData.lowPrice,
            iid: this.iid,
            checked: true,
        }
        // 传信息给购物车并返回传递结果
        this.$store.dispatch('addCartGoods',goodInfo).then(res => {
            this.$toast.show(res,1500)
        })
      },
        // 随机从大量商品中抽取20个作为推荐
        getRecommend(){
            // setInterval(() => {
                console.log(this.$store.state.importGoods.length);
            // }, 1000);
            let random = 0
            while (true) {
                if (this.$store.state.importGoods.length > 44)
                    break
            }
            random = Math.floor(Math.random()*(this.$store.state.importGoods.length-22+1)+22) - 22
            console.log(random);
            let i = random
            while (i < random + 21) {
                // 如果推荐里面有本身就在展示的这个商品
                // 则跳下一个
                if(this.iid == this.$store.state.importGoods[i].iid){
                    i++
                    continue
                }
                // console.log(this.recommend.length);
                if (this.recommend.length == 20){
                    break
                }
                else{
                    this.recommend.push(this.$store.state.importGoods[i++])
                }
            }
        },
        // 200ms只能满足首页的30张图片的加载时间
        // 而不一定能够满足详情页面的所有图片的加载时间
        // 所以直接监听了每一张图片的加载，每次加载完成后，就使用refresh即可
        // 然后进行优化，即采取防抖动，尽可能少地调用refresh，判断一下加载数量和图片数量即可
        // 这里就采取了防抖动,在所有图片加载一半和图片加载完时，各调用了一次refresh
        imgLoadOk(){
            this.imgCount ++
            if (this.imgCount == parseInt(this.imgAllCount / 2) || this.imgCount == this.imgAllCount){
                console.log('目前加载图片数量：' + this.imgCount);
                this.$refs.detail.bscroll.refresh()
                console.log('新的高度:' + this.$refs.detail.bscroll.scrollerHeight);
            }
        },
        myLoad(){
            this.recommendCount ++
            if (this.recommendCount == 10 || this.recommendCount == 20){
                this.$refs.detail.bscroll.refresh()
            }
        },
        showMoreGoods(boolean){
        },
        getScrollHeight(){
          return {
            //   减去顶部和底部
          'height': this.homeXY[1] - 44 - 49 + 'px'
        }
        },
        // 抽离子组件需要的基础信息数据
        getItemInfo(info){
            this.detailData.desc = info.itemInfo.desc
            this.detailData.title = info.itemInfo.title
            this.detailData.price = info.itemInfo.price
            this.detailData.lowPrice = info.itemInfo.lowNowPrice? info.itemInfo.lowNowPrice:info.itemInfo.price
            this.detailData.oldPrice = info.itemInfo.oldPrice
            this.detailData.discount = {discountDesc:info.itemInfo.discountDesc,
                             discountBgColor:info.itemInfo.discountBgColor}
            this.detailData.sale = info.columns[0]
            this.detailData.cFav = this.$route.query.cFav
            this.detailData.rightDesc = info.shopInfo.services.length > 3? info.shopInfo.services[0].name: ""
            let bottom = []
            let icon = []
            for(let i in info.shopInfo.services){
                if (i == 0 && info.shopInfo.services.length > 3)
                    continue
                if (info.shopInfo.services[i].icon != undefined)
                {
                    icon.push(info.shopInfo.services[i].icon)
                }
                bottom.push(info.shopInfo.services[i].name)  
            }
            this.detailData.bottomDesc = bottom
            this.detailData.bottomDescIcon = icon
            // console.log(this.detailData);
        },
        // 抽离商家信息的数据
        getShopInfo(info){
            this.shopData.shopLogo = info.shopInfo.shopLogo
            this.shopData.name = info.shopInfo.name
            this.shopData.cSells = info.shopInfo.cSells
            this.shopData.cGoods = info.shopInfo.cGoods
            this.shopData.score = info.shopInfo.score
        },
        // 获取详情页的图片数量
        getImgCount(info){
            let count = 0
            for (let i of info.detailImage){
                if ('list' in i)
                    count += i.list.length
            }
            this.imgAllCount = count
        },
        toDetailRequest(iid){
            detailRequest(iid).then(res =>{
                this.getItemInfo(res.result)
                this.getShopInfo(res.result)
                this.showData = res.result.detailInfo
                this.imgParams = res.result.itemParams
                this.userRate = res.result.rate
                this.getImgCount(this.showData)
                this.topImages = []
                let imgObj = {}
                // 设计imgObj格式，使之符合轮播图组件所需数据的格式
                for (let i of res.result.itemInfo.topImages){
                    // 重建对象
                    imgObj = {}
                    // 添加image和link属性
                    imgObj.image = i
                    imgObj.link = ''
                    // 将对象添加到topImages数组
                    this.topImages.push(imgObj)
                }
                // 在第一轮数据获取完成并清洗完数据后，开始进行第二轮数据的抽离。
                // 经测试，在created下抽离数据是不行的，容易直接卡死；
                // (好像是因为第二轮数据还没有被成功获取)；
                // 在mounted下抽离数据是不行的，因为抽离出的图片也需要被挂载；
                // 所以要在进行初始操作时抽离数据。
                // 本来打算放在详情商品图片展示那里，即当最后一张img加载完就开始抽离，
                // 可是考虑到详情商品图片区域可能没有图片(但是可能性很小)。
                // 所以放进了第一轮数据获取的末尾，给了总数据的获取时间，
                // (为了确保总数据的多样性，放在了detail.vue下的created里面获取)
                // 执行到setTimeout语句的瞬间，由于等待时间500ms，所以先执行
                // this.$store.commit('addGoods')，即给第二轮数据的获取留了400ms的时间
                // 注意，第二轮数据只需要获取90条数据(三个90条数据随机选择),所以很快
                setTimeout(() => {
                    this.getRecommend()
                }, 400);
                // this.topImages = this.detailData.itemInfo.topImages
                // console.log(res.result);
                // console.log(this.topImages);
            })
        },
        initFourData(){
            this.fourHeight = [ 44,
                                'param' in this.$refs? this.$refs.param.$el.offsetTop: 99999,
                                'rates' in this.$refs? this.$refs.rates.$el.offsetTop: 99999,
                                this.$refs.recommend.$el.offsetTop]
            this.fourChosen = [true,false,false,false]
            for(let num in this.fourHeight){
                num = parseInt(num)
                if (num == 0){
                    this.fourScrollHeight[0] = 0
                }
                else if (this.fourHeight[num] != 99999){
                    this.fourScrollHeight[num] = 34 - this.fourHeight[num]
                }
                else{
                    if (this.fourScrollHeight[num+1] != 99999){
                        this.fourScrollHeight[num] = 34 - this.fourHeight[num + 1]
                    }
                    else {
                        this.fourScrollHeight[num] = 34 - this.fourHeight[num + 2]
                    }
                }
                if (-this.scrollXY.y + 34 >= this.fourHeight[num]){
                    for (let i in this.fourChosen){
                        this.fourChosen[i] = false
                    }
                    this.fourChosen[num] = true
                    continue
                }
            }
        }
    },
    computed:{
    },
    created(){
        // 存放iid
        this.iid = this.$route.query.iid
        // 获取数据
        this.toDetailRequest(this.iid)
        // 不能紧跟在下面获取detailData的信息，因为请求数据是异步的，目前还没有获取到数据呢

        // 获取到随机的90条推荐数据
        this.$store.commit('addGoods')
        this.homeXY = [document.documentElement.clientWidth,document.documentElement.clientHeight]
        this.recommendCount = 0

        // console.log(this.isShowBackTop);
    },
    mounted(){
        // 这里在mounted中进行对滚动高度的获取
        // 可能会出现问题，最好的方式还是在图片加载完成后再进行获取(同时需要防抖)
        setTimeout(() => {
            try {
                this.initFourData()
            } catch (error) {
                console.log('没事，再来一次');
            }
        }, 500);
        setTimeout(() => {
            try {
                this.initFourData()
            } catch (error) {
                console.log('没事，再来一次');
            }
        }, 700);
        setTimeout(() => {
            try {
                this.initFourData()
            } catch (error) {
                console.log('没事，再来一次');
            }
        }, 900);
        setTimeout(() => {
            try {
                this.initFourData()
            } catch (error) {
                console.log('没事，再来一次');
            }
        }, 1200);
    }
}
</script>

<style scoped>
.main-swiper{
    /* 设置调用的MainSwiper的高度 */
    height: 300px;
}
.pop-goods{
    margin-top: 20px;
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
</style>