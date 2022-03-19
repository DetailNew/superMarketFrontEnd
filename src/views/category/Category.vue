<template>
  <div id="category">
    <!-- <div class="content">
      <div class="calc">
      {{num1}} + {{num2}} <span class="dengyu">=</span>  {{num2}} + {{num1}}
    </div>
    <div class="calc line">
      ({{num3}} + {{num4}}) + {{num5}} 
      <span class="dengyu">=</span>{{num3}} + ({{num4}} + {{num5}})
    </div>
    <div class="btn">
      <button @click="start">点击开始</button>
    </div>
    </div>
  </div> -->
<input class="hide_file" ref ="leftFile" id="upload" type="file" @change="getFile($event)" accept="image/*">
<div class="camera" @click="clickFile">
     <img v-if="img" class="bigImg" :src="img" alt="">
     <img v-if="!img" class="icon" src="~assets/img/temp/bg.png" alt="">
     <span v-if="!img" class="text">上传照片</span>
</div>
<div>
  <button @click="getImage">获取照片</button>
  <img :src="mySrc" alt="">
</div>


</div>

</template>

<script>
import BScroll from 'better-scroll'
import axios  from "axios";
import {getImage} from 'network/profile/login.js'

export default {
    name: 'Category',
    data(){
      return{
        num1: 3.2,
        num2: 2.5,
        num3: 4.7,
        num4: 2.6,
        num5: 7.4,
        img: '',
        newImg: '',
        mySrc: '',
      }
    },
    methods: {
      start(){
        this.num1 = 0.7
        this.num2 = 0
        this.num3 = 2.2
        this.num4 = 0.1
        this.num5 = 4.9
        let interval =  setInterval(() => {
          this.num1 = (parseFloat(this.num1) + 0.1).toFixed(1)
          this.num2 = (parseFloat(this.num2) + 0.1).toFixed(1)
          this.num3 = (parseFloat(this.num3) + 0.1).toFixed(1)
          this.num4 = (parseFloat(this.num4) + 0.1).toFixed(1)
          this.num5 = (parseFloat(this.num5) + 0.1).toFixed(1)
          if (this.num2 == 2.5){
            clearInterval(interval)
          }
        }, 70);
      },

      // 获取选择的图片文件上传
	getFile(e) {
        let file = e.target.files[0];  
        console.log(file);
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据  
         console.log(file);
         let config = {
             headers:{
                 'Content-Type':'multipart/form-data',
             }
         };  //添加请求头
         axios.post('http://istarmarket.com:8080/upload/image',param,config) 
         .then(res=>{
           console.log(res);
           this.$refs.leftFile.value = ''
            //  if(res.data.code==0){
            //      this.img = res.data.url;
            //      this.newImg = res.data.url;
            //      // this.$Message.success(res.data.msg) 
            //  }else{
            //      // this.$Message.error(res.data.msg)
            //  }
         })    
    },
    getImage(){
      const id = 10
      getImage({
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.mySrc = res.data[0].image
      })
    },
    // 点击触发input的点击事件
    clickFile(){
        this.$refs.leftFile.click();
    },
    },
    // 组件挂载完毕
    mounted(){
    }
}
</script>

<style scoped>
#category{
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  background: url("~assets/img/temp/bg.png");
}
.content{
  width: 100%;
  height: 600px;
  padding: 20px;
}
.btn{
  margin-top: 100px;
}
.calc{
  color: #e96678;
}
.line{
  margin-top: 40px;
}
.dengyu{
  color: blue;
  vertical-align: top;
}


.hide_file{
    display:none;
}
.camera{
    position: relative;
    z-index: 2;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 138px;
    height: 138px;
    background: #E7E7E7;
    border-radius: 6px;
    text-align: center;
}
    .bigImg{
        width: 138px;
        height: 138px;
    }
    .icon{
        width: 40px;
        margin-top: 40px;
    }
    .text{
        display: block;
        line-height: 22px;
        font-size: 15px;
        color: #999;
        margin-top: 8px;
    }

</style>