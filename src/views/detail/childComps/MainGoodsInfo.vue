<template>
  <div class="main-goods-info" v-if="info!={}">
      <div class="goods-title"> {{info.title}} </div>
      <div class="goods-price">
          <span class="now-price">{{info.price}}</span>
          <span v-show="info.oldPrice!=undefined" class="ori-price">{{info.oldPrice}}</span>
          <span :style="discountBg" v-show="isShowDisc()" class="low-price"> {{info.discount.discountDesc}} </span>
      </div>
      <div class="sale-info">
          <span>{{info.sale}}</span>
          <span>收藏 {{info.cFav}}人</span>
          <span> {{info.rightDesc}} </span>
      </div>
      <div class="back-goods">
          <span v-for="(item,index) in info.bottomDesc" :key="index">
              <img :src="info.bottomDescIcon[index]" alt=""> <span>{{item}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MainGoodsInfo',
    props: {
        info:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        isShowDisc(){
            return (this.info.discount.discountDesc!=undefined) && (this.info.discount.discountDesc!="")
        }
    },
    computed: {
        discountBg(){
            if (this.info.discount.discountBgColor!=undefined){
                return {backgroundColor:this.info.discount.discountBgColor}
            }
            else{
                return {}
            }
        },
    },
    created(){
        // console.log(this.info);
    },
    
}
</script>
<style scoped>
.main-goods-info{
    /* 仅项目组件，可以设置高度 */
    height: 180px;
    width: 100%;
}
.goods-title{
    padding: 10px 5px;
    color: black;
    letter-spacing: 1px;
    font-size: var(--font-size);
    line-height: 18px;
}
.goods-price{
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
}
.goods-price > span{
    display: float;
    text-align: center;
}
.now-price{
    color: var(--color-high-text);
    margin-right: 5px;
}
.ori-price{
    color: var(--color-text);
    text-decoration:line-through;
    font-size: 12px;
    margin-right: 5px;
}
.low-price{
    border-radius: 4px;
    color: white;
    padding: 1px 3px;
}

.sale-info{
    padding: 5px;
    padding-top: 15px;
    height: 40px;
    line-height: 16px;
    border-bottom: 1px solid #eee;
    display: flex;
}
.sale-info > span{
    flex: 1;
    font-size: 12px;
}
.sale-info > span:nth-last-child(1){
    text-align: right;
}
.sale-info > span:nth-last-child(2){
    text-align: center;
}
.back-goods{
    padding: 15px 5px;
    display: flex;
    font-size: 12px;
    height: 50px;
    border-bottom: 3px solid #eee;
}
.back-goods > span{
    flex: 1;
    color: black;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
}
.back-goods > span:nth-last-child(1){
    text-align: right;
}
.back-goods > span:nth-child(1){
    text-align: left;
}
.back-goods img{
    vertical-align: middle;
    width: 12px;
    height: auto;
}
</style>