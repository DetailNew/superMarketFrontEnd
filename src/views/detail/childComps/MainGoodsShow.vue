<template>
  <div class="main-goods-show">
        <div class="desc" v-if="info.desc!=undefined && info.desc!=''">
          {{info.desc}}
        </div>
            <div class="detail-show" v-for="(item,index) in info.detailImage" :key="index">
                <span class="title" v-if="'list' in item"> {{item.key}} </span>
                <!-- 可以通过'list' in item的方式判断item是否含有属性list -->
                <div class="image" v-if="'list' in item">
                <img @load="getLoad()" :src="imgitem" alt="" v-for="(imgitem,imgindex) in item.list" :key="imgindex">
                </div>
            </div>
  </div>
</template>

<script>
export default {
    name: 'MainGoodsShow',
    props:{
        info :{
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        getLoad(){
            this.$emit('getLoadOk')
        }
    },
    created(){
        // console.log(this.info.detailImage);
    },
}
</script>

<style scoped>
.main-goods-show{
    width: 100%;
}
.desc{
    padding: 20px 40px;
    font-size: var(--font-size);
    line-height: 18px;
    position: relative;
}
.desc::before{
    content: '';
    position: absolute;
    top: 10px;
    left: 20px;
    width: 60px;
    height: 5px;
    border-top: 1px solid var(--color-text);
    border-left: 1px solid var(--color-text);
}
.desc::after{
    content: '';
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 60px;
    height: 5px;
    border-bottom: 1px solid var(--color-text);
    border-right: 1px solid var(--color-text);
    /* vertical-align: middle; */
}
.title{
    height: 30px;
    line-height: 30px;
    /* 块级元素居中大法重现！ */
    display: inline-block;
    margin: 5px 0;
    margin-left: 50%;
    transform:translateX(-50%);
    font-size: var(--font-size);
}
img{
    /*  这里不能使用float！！！！！！！！！！！！！！！！！！！！ */
    /*  不知道为什么！明明使用了float图片还是会被挤到每排只有一张图，
        但是bscroll的scrollerHeight就是不会因为图片加载完成而变化！ */
    /* float: left; */
    width: 100%;
    height: auto;
    /* 于是我用vertical-align的方式去除图片之间的空白！不用float了！ */
    vertical-align: middle;
}
.detail-show{
    padding-bottom: 20px;
    border-bottom: 6px solid #eee;
}
</style>