<template>
  <div class="goods-item" @click="itemClick">
      <div class="goods-img"><slot name="goods-img"></slot></div>
      <div class="goods-title"><slot name="goods-title"></slot></div>
      <div class="goods-info"><slot name="goods-info"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'GoodsItem',
    props: {
        goodItem: {
            type: Object,
            default(){
                return {}
            }
        },
        fav: {
            type: Number,
            default: 0
        }
    },
    methods: {
        itemClick(){
            this.$router.push({
                // 跳转到Detail
                path: '/Detail',
                // 第二种路由间传参方式
                // 带上一个query，里面是iid属性，然后在Detail界面截取
                query: {
                    iid: this.goodItem.iid,
                    cFav: this.fav
                }
            })
        }
    }
}
</script>

<style scoped>
.goods-img{
    width: 100%;
}
.goods-img img{
    width: 100%;
    height: auto;
}
.goods-title{
    width: 100%;
    height: 16px;
}
.goods-title div{
    font-size: 12px;
    color: var(--color-text);
    /* 文本溢出显示省略号 */
    overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap
}
.goods-info{
    width: 100%;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
}
</style>