<template>
  <div class="release">
    <NavBar class="release-nav-bar">
      <div class="title" slot="middle">我的发布</div>
    </NavBar>
  </div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: 'Release',
    data(){
        return {

        }
    },
    components: {
        NavBar,
    },
    methods: {

    }
}
</script>

<style scoped>
.release-nav-bar{
  background-color: var(--color-tint);
  color: whitesmoke;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>