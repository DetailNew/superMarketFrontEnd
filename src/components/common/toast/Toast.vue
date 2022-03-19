<template>
  <div  class="toast" v-if="isShow">
      {{message}}
  </div>
</template>

<script>
export default {
    name: 'Toast',
    data(){
        return{
            message: '',
            isShow:false
        }
    },
    methods: {
        show(message = '提示信息',time = 1500){
            this.isShow = true
            this.message = message
            setTimeout(() => {
                this.isShow = false
            }, time);
        }
    }
}
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999999;
    background-color: rgba(0, 0, 0, .8);
    color: white;
    font-size: var(--font-size);
    line-height: 24px;
    text-align: center;
    height: 24px;
    width: 220px;
    border-radius: 12px;
    opacity: 1;
}
.show{
    opacity: 1;
}
/* .animate{
  animation: opa 2s ease;
}
@keyframes opa {
  0%{
    top: 50%;
    opacity: 0;
  }
  20%{
    top: 50%;
    opacity: 1;
  }
  50%{
    top: 50%;
    opacity: 1;
  }
  100%{
    top: 45%;
    opacity: 0;
  }
} */
</style>