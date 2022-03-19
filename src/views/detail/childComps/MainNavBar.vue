<template>
  <div class="main-nav-bar">
      <nav-bar class="detail-nav-bar">
          <div class="left" slot="left" @click="goback"><img src="~assets/img/detail/左箭头.svg" alt=""></div>
          <div class="middle" slot="middle">
              <span @click="getPage(index)" :class="{'titles-click':currentIndex == index,'chosen-color':isChosen[index]}" v-for="(item,index) in types" :key="index"> {{item}} </span>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: 'MainNavBar',
    components: {
        NavBar
    },
    data(){
        return {
            currentIndex: 0
        }
    },
    props: {
        types: {
            type: Array,
            default(){
                return []
            }
        },
        isChosen: {
            type: Array,
            default(){
                return []
            }
        },
        // goHeight:{
        //     type: Array,
        //     default(){
        //         return []
        //     }
        // }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        getPage(index){
            this.currentIndex = index
            this.$emit('page',index)
            // console.log(this.goHeight);
            // console.log(this.$refs.detail);
        }
    }
}
</script>

<style scoped>
.left,.middle{
    height: 100%;
    font-size: var(--font-size);
}
.left > img{
    display: block;
    text-align: center;
    height: 100%;
    width: auto;
    padding: 10px;
}
.middle{
    display: flex;
}
.middle > span{
    flex: 1;
}
.chosen-color{
   color: rgb(247, 89, 89)
}
</style>