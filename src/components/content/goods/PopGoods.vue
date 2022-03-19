<template>
  <div class="main-goods">
    <div class="ori-a" v-for="(item,index) in data" :key="index">
        <goods-item :fav="parseInt(item.cfav)" :goodItem="data[index]">
            <a  slot="goods-img"><img class="goods-img" @load="getLoad()" :src="item.show.img" alt=""></a>
            <a  slot="goods-title"><div class="goods-title"> {{item.title}} </div></a>
            <a  slot="goods-info">
            <div class="goods-info">
                <span class="price"> ￥{{item.price}} </span>
                <span class="fav"> 
                    <img src="~assets/img/goods/星星12.svg" alt="">
                    <span> {{item.cfav}} </span>
                </span>
            </div>
            </a> 
        </goods-item>
    </div>
</div>
</template>

<script>
import GoodsItem from './GoodsItem.vue'


export default {
    name: 'MainGoods',
    components: {
        GoodsItem,
    },
    props: {
        page: Number,
        data: Array
    },
    methods: {
        getLoad(){
            this.$emit('getLoad')
        }
    }
}
</script>

<style scoped>
.main-goods{
    width: 100%;
    /* 给大盒子flex布局，使得其下面的图片能够平滑整齐布局(每行两张图片) */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.ori-a{
    float: left;
    display: block;
    width: 50%;
    /* 神之padding */
    /* 控制好盒子的大小，然后设置padding，使得内容区被往里面挤，此之谓盒子模型 */
    padding: 0 1.5%;
    text-decoration: none;
}
.goods-img{
    border-radius: 5px;
}
.goods-info{
    display: flex;
}
.goods-info > span{
    flex: 1;
    text-align: center;
}
.price{
    color: var(--color-tint);
}
.fav{
    color: var(--color-text);
}
.fav img{
    vertical-align: middle;
    padding-bottom: 3px;
}
</style>