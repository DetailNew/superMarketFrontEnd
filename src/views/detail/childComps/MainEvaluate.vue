<template>
  <div class="main-evaluate">
      <div class="title">
          <span class="evaluate">用户评价({{info.cRate}})</span>
          <span class="more">更多</span>
      </div>
      <div class="person" v-for="(item,index) in info.list" :key="index">
        <div class="user">
            <img :src="item.user.avatar" alt="">
            <span> {{item.user.uname}} </span>
        </div>
        <div class="content">
            {{item.content}}
        </div>
        <div class="time">
            <span> {{getTime(item.created)}} </span>
            <span> {{item.style}} </span>
        </div>
        <div class="show-img" v-if="('images' in item)&&item.images.length>0">
            <img :src="img" alt="" v-for="img in item.images" :key="img">
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MainEvaluate',
    props: {
        info:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        getTime(nums){
            // Unix时间戳得乘以1000
            const date = new Date(nums * 1000)
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            // var h = date.getHours() + ':';
            // var m = date.getMinutes() + ':';
            // var s = date.getSeconds();
            return Y+M+D;
        }
    },
    created(){
    }
}
</script>

<style scoped>
.main-evaluate{
    width: 100%;
    margin-top: 40px;
    border-top: 4px solid #eee;
    padding-bottom: 10px;
    border-bottom: 4px solid #eee;
}
.title{
    width: calc(100% - 20px);
    height: 60px;
    line-height: 60px;
    margin: 0 10px;
    color: black;
    border-bottom: 2px solid #eee;
    position: relative;
}
.more{
    position: absolute;
    right: 10px;
}
.person{
    width: calc(100% - 20px);
    margin: 0 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
}
.person:nth-last-child(1){
    border-bottom: 0;
}
.user{
    height: 60px;
}
.user > img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0;
    vertical-align: middle;
    margin-right: 10px;
}
.user > span{
    color: black;
}
.content{
    font-size: var(--font-size);
    line-height: 18px;
    color: rgb(85, 85, 85);
}
.time{
    margin-top: 10px;
    font-size: 13px;
}
.show-img {
    margin-top: 10px;
}
.show-img > img{
    width: 100%;
    vertical-align: middle;
}
</style>