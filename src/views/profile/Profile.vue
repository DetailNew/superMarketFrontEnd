<template>
  <div id="profile">
    <NavBar class="profile-nav-bar">
      <div class="title" slot="middle">我的</div>
    </NavBar>
    <Login class="login"/>
    <div class="all-user-info" :style="{'height':infoHeight + 'px'}">
      <UserInfo class="user-info"/>
      <UserInfoList1 class="user-info-list1"/>
      <UserInfoList2 class="user-info-list2"/>
    </div>
  </div>
</template>

<script>
import Login from 'components/common/login/Login'
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './childrenComps/UserInfo'
import UserInfoList1 from './childrenComps/UserInfoList1'
import UserInfoList2 from './childrenComps/UserInfoList2'

export default {
    name: 'Profile',
    components: {
      Login,
      NavBar,
      UserInfo,
      UserInfoList1,
      UserInfoList2,
    },
    data(){
      return {
        infoHeight: 0,
        homeXY: [],
      }
    },
    methods: {

    },
    mounted(){
      this.homeXY = [document.documentElement.clientWidth,document.documentElement.clientHeight]
      this.infoHeight = this.homeXY[1] - 44 - 100 - 49
    }
}
</script>

<style scoped>
#profile{
  width: 100%;
}
.profile-nav-bar{
  background-color: var(--color-tint);
  color: whitesmoke;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.login{
  margin-top: 44px;
}
.user-info,.user-info-list1{
  border-bottom: 10px solid #eee;
}
.all-user-info{
  width: 100%;
  border-left: 2px solid #eee;
  border-right: 2px solid #eee;
}
</style>