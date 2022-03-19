<template>
  <div class="main-good-info">
    <div class="shop-self">
        <img :src="info.shopLogo" alt="">
        <span class="shop-name"> {{info.name}} </span>
    </div>
    <div class="shop-popu-info">
        <div class="shop-sale-info">
            <div class="shop-sales">
                <div> {{info.cSells}} </div>
                <div class="text-black">总销量</div>
            </div>
            <div class="shop-goods">
                <div> {{info.cGoods}} </div>
                <div class="text-black">全部宝贝</div>
            </div>
        </div>
        <div class="cus-like">
            <div v-for="(item,index) in info.score" :key="index">
                <span class="text-black"> {{item.name}} </span>
                <span :class="{'text-green':!item.isBetter,'text-red':item.isBetter}"> {{item.score}} </span>
                <span :class="{'green-bg':!item.isBetter,'red-bg':item.isBetter}"> {{item.isBetter? '高':'低'}} </span>
            </div>
        </div>
    </div>
    <div class="link-to-shop">
        <div class="btn">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
 name: 'MainShopInfo',
 props: {
     info: {
         type: Object,
         default(){
             return {}
         }
     }
 },
 created(){
    //  console.log(this.info);
 }
}
</script>

<style scoped>
.main-good-info{
    width: 100%;
}
.shop-self{
    height: 60px;
}
.shop-self > img{
    height: 100%;
    width: 60px;
    border-radius: 30px;
    border: 1px solid #eee;
    margin: 0 10px;
    vertical-align: middle;
}
.shop-self > .shop-name{
    font-size: var(--font-size);
    color: rgb(78, 78, 78);
}
.shop-popu-info{
    width: 100%;
    height: 70px;
    display: flex;
    font-size: 13px;
    margin-top: 10px;
}
.shop-popu-info > div{
    flex: 1;
}
.shop-sale-info,.cus-like{
    height: 100%;
    padding: 0 5%;
    text-align: center;
    align-items: center;
}
.shop-sale-info{
    display: flex;
    position: relative;
}
.shop-sale-info::after{
    content: '';
    position: absolute;
    width: 2px;
    height: 80%;
    right: 0;
    top: 10%;
    background-color: #eee;
}
.shop-sale-info > div{
    flex: 1;
}
.shop-sale-info > div > div{
    padding: 3px 0;
}
.cus-like{
    display: flex;
    flex-direction: column;
}
.cus-like > div{
    flex: 1;
    padding: 3px 0;
    line-height: 20px;
    width: 100%;
    display: flex;
}
.cus-like > div > span:nth-child(1){
    flex: 4;
}
.cus-like > div > span:nth-child(2){
    flex: 3;
}
.cus-like > div > span:nth-child(3) {
    flex: 1;
    color: white;
}
.text-black{
    color: black;
}
.green-bg{
    background-color: rgb(22, 184, 92);
}
.red-bg{
    background-color: rgb(221, 96, 96);
}
.text-green{
    color: green;
}
.text-red{
    color: red;
}
.link-to-shop{
    width: 100%;
    height: 80px;
    /* 解决父元素塌陷问题 */
    border: 1px solid white;
    border-bottom: 5px solid #eee;
}
.link-to-shop > .btn{
    width: 40%;
    height: 30px;
    line-height: 30px;
    margin: 20px auto;
    border-radius: 15px;
    text-align: center;
    background-color: rgb(243, 243, 243);
}
</style>