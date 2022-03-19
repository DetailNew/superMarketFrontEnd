<template>
  <div class="good-list">
      <good-item class="item" v-for="(item,index) in goodsList" 
      :key="index" :good="item"></good-item>
  </div>
</template>

<script>
import GoodItem from './GoodItem'
export default {
    name: 'GoodList',
    data(){
        return{
            test: [],
            goodsLength: 0,
            goodsList: [],
        }
    },
    components:{
        GoodItem,
    },
    methods: {

    },
    created(){
        for(let i = 0 ;i < 100;i++){
            this.test.push(i)
        }
        this.goodsLength = this.$store.state.cartGoods.length
        this.goodsList = this.$store.state.cartGoods
    }
}
</script>

<style scoped>

</style>