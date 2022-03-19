<template>
  <div class="user-info">
      <UserInfoItem class="user-info-item">
          <span class="number-color-font" slot="value">0.00</span>
          <span slot="unit">元</span>
          <span slot="desc">我的余额</span>
      </UserInfoItem>
      <div class="line"></div>
      <UserInfoItem class="user-info-item">
          <span class="number-color-font" slot="value">0</span>
          <span slot="unit">个</span>
          <span slot="desc">我的宝贝</span>
      </UserInfoItem>
      <div class="line"></div>
      <UserInfoItem class="user-info-item">
          <span class="number-color-font" slot="value">0</span>
          <span slot="unit">分</span>
          <span slot="desc">我的积分</span>
      </UserInfoItem>
  </div>
</template>

<script>
import UserInfoItem from 'components/content/UserInfoItem'
export default {
    name: 'UserInfo',
    components: {
        UserInfoItem,
    },
    data(){
        return {

        }
    },
}
</script>

<style scoped>
.user-info{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.user-info-item{
    flex: 1;
}   
.number-color-font{
    font-size: 18px;
    color: red;
    font-weight: bold;
}
.line{
    /* 帅气线条 */
    width: 1px;
    height: 80%;
    background-color: #eee;
}
</style>