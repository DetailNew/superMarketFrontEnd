<template>
  <div class="login">
      <div class="photo">
          <img ref="headPhoto" :style="{'height':imgHeight + 'px'}" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650119490&t=e30f0cc60328e2bec3535e255d3a5d59" alt="头像">
      </div>
      <div v-show="!loginOk"  class="login-register">
          <div class="login-or-register">
              <span @click="login">登录</span>
              <span> / </span>
              <span @click="register">注册</span>
          </div>
          <div class="is-attach-phone">
              <svg t="1647528875092" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2666" width="14" height="14"><path d="M675.730015 65.279772 350.594937 65.279772c-44.89449 0-81.286328 36.389792-81.286328 81.282235l0 731.557508c0 44.89449 36.391838 81.284281 81.286328 81.284281l325.134055 0c44.89449 0 81.286328-36.389792 81.286328-81.284281L757.01532 146.562007C757.016343 101.669564 720.624505 65.279772 675.730015 65.279772zM716.374714 878.119515c0 22.447245-18.197454 40.642652-40.644699 40.642652L350.594937 918.762167c-22.447245 0-40.642652-18.195408-40.642652-40.642652l0-81.284281 406.42243 0L716.374714 878.119515zM716.374714 756.194628 309.952284 756.194628 309.952284 248.168126l406.42243 0L716.374714 756.194628zM716.374714 207.52445 309.952284 207.52445l0-60.962443c0-22.445198 18.195408-40.640606 40.642652-40.640606l325.134055 0c22.447245 0 40.644699 18.195408 40.644699 40.640606L716.373691 207.52445zM513.165546 878.117468c11.222599 0 20.319791-9.099239 20.319791-20.319791 0-11.222599-9.097192-20.321838-20.319791-20.321838-11.224646 0-20.321838 9.099239-20.321838 20.321838C492.843708 869.019253 501.9409 878.117468 513.165546 878.117468z" p-id="2667" fill="#ffffff"></path></svg>
              <span>暂未绑定手机号</span>
          </div>
      </div>
      <div v-show="loginOk" class="login-ok">
          <div class="user-name">
              {{account}}
          </div>
          <div class="is-attach-phone">
              <svg t="1647528875092" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2666" width="14" height="14"><path d="M675.730015 65.279772 350.594937 65.279772c-44.89449 0-81.286328 36.389792-81.286328 81.282235l0 731.557508c0 44.89449 36.391838 81.284281 81.286328 81.284281l325.134055 0c44.89449 0 81.286328-36.389792 81.286328-81.284281L757.01532 146.562007C757.016343 101.669564 720.624505 65.279772 675.730015 65.279772zM716.374714 878.119515c0 22.447245-18.197454 40.642652-40.644699 40.642652L350.594937 918.762167c-22.447245 0-40.642652-18.195408-40.642652-40.642652l0-81.284281 406.42243 0L716.374714 878.119515zM716.374714 756.194628 309.952284 756.194628 309.952284 248.168126l406.42243 0L716.374714 756.194628zM716.374714 207.52445 309.952284 207.52445l0-60.962443c0-22.445198 18.195408-40.640606 40.642652-40.640606l325.134055 0c22.447245 0 40.644699 18.195408 40.644699 40.640606L716.373691 207.52445zM513.165546 878.117468c11.222599 0 20.319791-9.099239 20.319791-20.319791 0-11.222599-9.097192-20.321838-20.319791-20.321838-11.224646 0-20.321838 9.099239-20.321838 20.321838C492.843708 869.019253 501.9409 878.117468 513.165546 878.117468z" p-id="2667" fill="#ffffff"></path></svg>
              <span v-if="!phone" @click="attachPhone">暂未绑定手机号</span>
              <span v-else> {{phone}} </span>
          </div>
      </div>
      

      <div class="right-arrows">
          <svg t="1647529380208" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3760" width="16" height="16"><path d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z" p-id="3761" fill="#ffffff"></path></svg>
      </div>

      <!-- 注册界面 -->
      <div class="tu-ceng"  v-show="isRegister">
          <div class="is-register">
          <div class="account">
              <span>用户名:</span>
              <input placeholder="请输入用户名(4到18个字符)" v-model="account" type="text">
          </div>
          <div class="password">
              <span>密码:</span>
              <input placeholder="请输入密码(4到18个字符)" v-model="password" type="text">
          </div>
          <div class="phone">
              <span>手机:</span>
              <input placeholder="请输入手机(可选)" v-model="phone" type="text">
          </div>
          <div class="ok-register">
              <div class="cancle" @click="cancle">取消</div>
              <div class="submit" @click="submit">提交</div>
          </div>
      </div>
      </div>
      <!-- 登录 -->
      <div class="tu-ceng"  v-show="isLogin">
          <div class="is-login">
          <div class="account">
              <span>用户名:</span>
              <input placeholder="请输入用户名(4到18个字符)" v-model="account" type="text">
          </div>
          <div class="password">
              <span>密码:</span>
              <input placeholder="请输入密码(4到18个字符)" v-model="password" type="password">
          </div>
          <div class="ok-register">
              <div class="cancle" @click="cancleLogin">取消</div>
              <div class="submit" @click="submitLogin">登录</div>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import {insertUsers, selectUser} from 'network/profile/login.js'
export default {
    name: 'Login',
    data(){
        return {
            imgHeight: 80,
            account: '',
            password: '',
            phone: '',
            isRegister: false,
            isLogin: false,
            loginOk: false,
            addPhone: false,
        }
    },
    components: {
    },
    methods: {
        init(){
            this.account = ''
            this.password = ''
            this.phone = ''
            this.isRegister = false
            this.isLogin = false
            this.addPhone = false
        },
        attachPhone(){
            this.$toast.show('目前仅支持在注册时绑定手机号')
        },
        register(){
            this.isRegister = true
            this.account = ''
            this.password = ''
            this.phone = ''
        },
        login(){
            this.isLogin = true
        },
        cancleLogin(){
            this.account = ''
            this.password = ''
            this.phone = ''
            this.isLogin = false
        },
        submitLogin(){
            // 校验
            if (!this.checkRegisterLaw()){
                return false
            }
            selectUser({
                params: {
                    account: this.account,
                    password: this.password,
                }
            }).then(res => {
                if (res.data.length == 0){
                    this.$toast.show('用户名或密码错误')
                    return
                }
                else {
                    // console.log(res);
                    this.$toast.show('登陆成功')
                    this.loginOk = true
                    this.phone = res.data[0].phone
                    this.isLogin = false
                    return 
                }
            })
        },
        cancle(){
            this.account = ''
            this.password = ''
            this.phone = ''
            this.isRegister = false
        },
        submit(){
            // 检验
            if (!this.checkRegisterLaw()){
                return false
            }
            insertUsers({
                params: {
                    account: this.account,
                    password: this.password,
                    time: new Date().toLocaleString(),
                    phone: this.phone,
                }
            }).then(res => {
                if (res.data.code == 500){
                    this.$toast.show("用户名重复")
                    return
                }
                if (res.data.code == 200){
                    this.isRegister = false
                    this.$toast.show("可以直接登录啦")
                    return
                }
            })
        },
        checkRegisterLaw(){
            const accoutNoSpace = this.account.replaceAll(" ","")
            const passwordNoSpace = this.password.replaceAll(" ","")
            const phoneNoSpace = this.phone.replaceAll(" ","")
            if (accoutNoSpace.length == 0){
                this.$toast.show("用户名不能为空")
                return false
            }
            if (passwordNoSpace.length == 0){
                this.$toast.show("密码不能为空")
                return false
            }
            if (accoutNoSpace.length < this.account.length){
                this.$toast.show("用户名不能包含空格")
                return false
            }
            if (passwordNoSpace.length < this.password.length){
                this.$toast.show("密码不能包含空格")
                return false
            }
            if (accoutNoSpace.length < 4 || accoutNoSpace.length > 18){
                this.$toast.show("用户名长度应在4~18之间")
                return false
            }
            if (passwordNoSpace.length < 4 || passwordNoSpace.length > 18){
                this.$toast.show("密码长度应在4~18之间")
                return false
            }
            if (phoneNoSpace.length < this.phone.length){
                this.$toast.show("手机号不能包含空格")
                return false
            }
            if (this.phone.length > 0 && (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone)))){
                this.$toast.show("手机号码格式有误")
                return false
            }
            return true
        }
    },
    mounted(){
        // 挂载图片后将图片高度设置为和宽一样
        this.imgHeight = this.$refs.headPhoto.width
        this.init()
    }
}
</script>

<style scoped>
.login{
    background-color: var(--color-tint);
    width: 100%;
    height: 100px;
    color: white;
    display: flex;
}
.photo{
    flex: 2;
    /* background-color: skyblue; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.photo img{
    width: 80%;
    /* height: 80px; */
    border-radius: 40px;
}
.login-register,
.login-ok{
    flex: 7;
    /* background-color: aqua; */
    padding-top: 30px;
    padding-left: 10px;
}
.login-or-register,
.user-name{
    font-size: 16px;
}
.right-arrows{
    flex: 1;
    /* background-color: bisque; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.is-attach-phone{
    font-size: var(--font-size);
}
.is-attach-phone{
    margin-top: 5px;
}
.tu-ceng{
    width: 100%;
    height: 3000px;
    background-color: rgba(0, 0, 0, .6);
    position: fixed;
    z-index: 99998;
    top: 0;
    left: 0;
}
.is-register{
    height: 240px;
}
.is-login{
    height: 180px;
}
.is-register,.is-login{
    width: 90%;
    padding: 0 5%;
    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .6);
    /* color: #666; */
    color: white;
}
.is-register div,
.is-login div{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}
.account span,
.password span,
.phone span{
    flex: 2;
    text-align: right;
    margin-right: 5px;
}
.account input,
.password input,
.phone input{
    flex: 8;
}
.ok-register div{
    flex: 1;
}
input{
    padding: 5px 0;
    padding-left: 2px;
    font-size: 14px;
}
.cancle{
    height: 80%;
    background-color: white;
    color: black;
    margin-right: 5%;
}
.submit{
    height: 80%;
    background-color: #1296db;
    margin-left: 5%;
}
.cancle,.submit{
    border-radius: 6%;
}
</style>