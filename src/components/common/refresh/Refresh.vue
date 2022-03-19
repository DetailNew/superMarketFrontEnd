<template>
  <div class="refresh">
      <img src="~assets/img/refresh/刷新.svg" alt="">
    </div>
</template>

<script>
export default {
    name: 'Refresh'
}
</script>

<style scoped>
.refresh{
  width: 100%;
  height: 30px;
  position: relative;
}
.refresh > img{
  position: absolute;
  width: 16px;
  height: 16px;
  top: 14px;
  left: 48%;
  animation: rotate .7s infinite;
  -webkit-animation: rotate .7s infinite;
}   
@keyframes rotate {
    from {
        transform:rotate(0deg);
        -ms-transform:rotate(0deg); 	/* IE 9 */
        -moz-transform:rotate(0deg); 	/* Firefox */
        -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
        -o-transform:rotate(0deg); 	/* Opera */
    }
    to {
        transform:rotate(360deg);
        -ms-transform:rotate(360deg); 	/* IE 9 */
        -moz-transform:rotate(360deg); 	/* Firefox */
        -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
        -o-transform:rotate(360deg); 	/* Opera */
    }
}
@-webkit-keyframes rotate{
    from {
        transform:rotate(0deg);
        -ms-transform:rotate(0deg); 	/* IE 9 */
        -moz-transform:rotate(0deg); 	/* Firefox */
        -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
        -o-transform:rotate(0deg); 	/* Opera */
    }
    to {
        transform:rotate(360deg);
        -ms-transform:rotate(360deg); 	/* IE 9 */
        -moz-transform:rotate(360deg); 	/* Firefox */
        -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
        -o-transform:rotate(360deg); 	/* Opera */
    }
}
</style>