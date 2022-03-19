<template>
  <div id="shop-item">
      <div class="item-selector">
          <CheckButton @checkBtnClick="checkedChange" :value="good.checked"></CheckButton>
      </div>
      <div class="item-img">
          <img :src="good.image" alt="商品图">
      </div>
      <div class="item-info">
          <div class="item-title">{{good.title}}</div>
          <div class="item-desc">{{good.desc}} </div>
          <div class="info-bottom">
              <div class="item-price left">{{good.price}} </div>
              <div class="item-count right">×{{good.count}} </div>
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton'
export default {
    name: 'GoodItem',
    components:{
        CheckButton,
    },
    data(){
        return{

        }
    },
    props:{
        good:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        checkedChange(){
            // 这里对于VueX里面的checked是没有改变的
            // 最新信息：这里直接改变state里的数据居然又是可以成功改变state的
            this.good.checked = !this.good.checked
            // console.log(this.$store.state.cartGoods);
            // console.log('haha');
            console.log(this.$store.state.cartGoods);
        }
    },
}
</script>

<style scoped>
#shop-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.item-selector{
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item-img{
    padding: 5px;
}
.item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}
.item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}
.info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
}
.info-bottom .item-price{
    color: orangered;
}
</style>