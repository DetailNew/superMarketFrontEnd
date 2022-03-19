<template>
  <div class="bottom-nav">
      <div class="getAll" @click="getAll">
          <CheckButton :value="isGetAll" class="check-btn"/>
          <div>全选</div>
      </div>
      <div class="total-price">
          <div>合计: </div>
          <div>￥ {{totalPrice}} </div>
      </div>
      <div class="checkAll">
          <div class="text">
              去结算({{checkNum}})
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton'
export default {
    name: 'BottomNav',
    data(){
        return{
        }
    },
    components: {
        CheckButton,
    },
    methods: {
        getAll(){
            if (this.isGetAll){
                this.$store.state.cartGoods.forEach(element => {
                    element.checked = false
                });
            }
            else{
                this.$store.state.cartGoods.forEach(element => {
                    element.checked = true
                });
            }
        }
    },
    computed: {
        totalPrice(){
            return this.$store.state.cartGoods.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkNum(){
            return this.$store.state.cartGoods.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.count
            },0)
        },
        isGetAll(){
            // 购物车没有内容
            if (this.$store.state.cartGoods.length == 0){
                return false
            }
            return !Boolean(this.$store.state.cartGoods.find(item => {
                return !item.checked
            }))
        }
    }
}
</script>

<style scoped>
.bottom-nav{
    width: 100%;
    height: 45px;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 49px;
    background-color: white;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .15);
}
.getAll{
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.getAll div,.check-btn{
    flex: 1;
    text-align: center;
}
.total-price{
    height: 100%;
    width: 160px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.total-price div:nth-child(1){
    flex: 1;
}
.total-price div:nth-child(2){
    flex: 3;
}
.checkAll{
    width: calc(100% - 160px - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.text{
    width: 80%;
    height: 80%;
    background-color: red;
    border-radius: 20px;
    color: white;
    line-height: 36px;
    text-align: center;
}
</style>