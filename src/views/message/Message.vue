<template>
  <div id="get-message">
    <div class="tips" :class="{'animate':animate}">{{tips}}</div>
    <div class="message" :style="{'height':(homeXY[1]-10-44-49)/3 + 'px'}">
      <v-input v-model="username"></v-input>
      <v-textarea v-model="message" ref="message"></v-textarea>
      <div class="btn-con">
        <input @click="handleSend" type="button" class="btn" value="留言"/>
        <span class="smessage" @click="isScrect">
          <input ref="secretbtn" type="checkbox" id="secret" value="私密" class="secret"> 
        <label for="secret" class="sinfo" :class="{'isblue':secret}"> 私密留言</label>
        </span>
      </div>
    </div>
    <BScroll class="list-all" ref="mscroll" :style="{'height':(homeXY[1]-10-44-49)*2/3 + 'px'}">
    <v-list  v-if="list.length > 0" :list="list" @reply="handleReply"></v-list>
    </BScroll>
  </div>
</template>
<script>
import vInput from './childrenComps/Input'
import vTextarea from './childrenComps/Textarea'
import vList from './childrenComps/List'
import BScroll from 'components/common/scroll/BScroll'

import {messageRequest,addInfo} from 'network/message/message'
// import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      message: '',
      list: [],
      specialLength: 4,
      isReply: false,
      isReadyReply: false,
      homeXY: [],
      maxNum: 50,
      secret: false,
      type: '公开',
      tips: '留言成功',
      animate:false
      // rawData: []
    }
  },
  components: {
    vInput,
    vTextarea,
    vList,
    BScroll
  },
  created(){
    // console.log(new Date().toLocaleString());
    // console.log('hello');
      this.homeXY = [document.documentElement.clientWidth,document.documentElement.clientHeight]
      // alert
      // 发起留言数据请求
      messageRequest().then(res => {
        // console.log(res);
        this.list= res.data
        setTimeout(() => {
          // console.log(this.$refs.mscroll.bscroll.scrollerHeight);
          this.$refs.mscroll.bscroll.refresh()
          // console.log(this.$refs.mscroll.bscroll.scrollerHeight);
          
      }, 200);
      setTimeout(() => {
          // console.log(this.$refs.mscroll.bscroll.scrollerHeight);
          this.$refs.mscroll.bscroll.refresh()
          // alert(this.$refs.mscroll.bscroll.scrollerHeight)
          // console.log(this.$refs.mscroll.bscroll.scrollerHeight);
      }, 500);
      })
  },
  updated(){
  },
  methods: {
    isScrect(){
      if (this.$refs.secretbtn.checked){
        this.secret = true
      }
      else{
        this.secret = false
      }
      console.log(this.secret);
    },
    handleSend: function () {
      if (this.username === '') {
        window.alert('请输入昵称')
        return
      }
      if (this.username.length > 50){
        window.alert('昵称太长了(不超过50个字符)')
        return
      }
      if (this.message === '') {
        window.alert('请输入留言内容')
        return
      }
      if (this.message.length > 480){
        window.alert('留言内容太长了(不超过500个字符)')
        return
      }
      if (  this.message[0] == '回' && 
            this.message[1] == '复' && 
            this.message[2] == '@'  &&
            this.isReadyReply){
                this.isReply = true
            }
        else{
            this.isReply = false
        }
      if (this.isReply && this.message.length <= this.specialLength){
        window.alert('请输入回复内容')
        return
      }
    //   if ()
      // 数组list存储了所有的留言内容，通过函数给list添加一项留言数据，添加成功后把文本框置空
      // 隐藏name为‘橘子味汽水’的用户留言
      if (!this.secret){
          this.list.unshift({
          name: this.username,
          info: this.message
        })
      }
      if (this.secret){
        this.type = '私密'
        this.tips = '私密留言成功'
      }
      else {
        this.type = '公开'
        this.tips = '留言成功'
      }
      this.animate = true
      setTimeout(() => {
        this.animate = false
      }, 2450);
      // 发送数据到服务器
      addInfo({
        params: { name: this.username,
                  info: this.message ,
                  times: new Date().toLocaleString(),
                  secret: this.type}
      }).then(res => {
        // console.log('已存入');
      })
      if (this.list.length > this.maxNum){
        this.list.pop()
      }
      // console.log(this.list);
      this.message = ''
      this.isReply = false
      this.isReadyReply = false
      this.specialLength = 4
      setTimeout(() => {
          // console.log(this.$refs.mscroll.bscroll.scrollerHeight);
          this.$refs.mscroll.bscroll.refresh()
          // console.log(this.$refs.mscroll.bscroll.scrollerHeight);
      }, 100);
    },
    handleReply: function (index) {
      this.isReadyReply = true
      var name = this.list[index].name
      this.message = '回复@' + name + ':'
      this.specialLength += name.length
      this.$refs.message.focus()
    }
  }
}
</script>

<style scoped>
#get-message{
  position: relative;
}
.message {
  display: flex;
  flex-direction: column;
  /* height: 250px; */
  margin: 44px 20px 10px 0px;
}

.message div{
  margin-bottom: 12px;
  flex-direction: row;
}
.message input:focus,
.message textarea:focus{
  border: 1px solid #3399ff;
  border-radius: 5px;
}
.message .btn-con{
  text-align: center;
  /* padding-left: 50%; */
  display: inline-block;
  position: relative;
  margin-left: 20px;
}
.message .btn-con::before{
  content: '(显示最近50条留言)';
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
}
.message .btn{
  padding: 6px 15px;
  border: 1px solid #39f;
  border-radius: 4px;
  color: #fff;
  background-color: #39f;
  cursor: pointer;
  outline: none;
}
.list-all{
    /* height: 60%; */
    width: 100%;
}
.smessage{
  position: absolute;
  bottom:0;
  right: 0;
}
.isblue{
  color: #409eff;
}
.tips{
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #39f;
  color: white;
  padding: 6px;
  border-radius: 4px;
  opacity: 0;
  /* transition: all 1s ease; */
}
.animate{
  animation: opa 2.4s ease;
}
@keyframes opa {
  0%{
    opacity: 0;
  }
  40%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>