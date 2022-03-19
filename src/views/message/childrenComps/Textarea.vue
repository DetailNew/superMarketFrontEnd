<template>
  <div class="input-con">
    <span class="u-info">留言板:</span>
    <!--ref 被用来给元素或子组件注册引用信息。
    引用信息将会注册在父组件的 $refs 对象上。
    如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
    如果用在子组件上，引用就指向组件实例：  -->
    <textarea 
    ref="message" 
    type="text" 
    :value="value"  
    @input="updateValue" 
    placeholder="在这里留下你的文字..."></textarea>
  </div>
</template>
<script>
export default {
  // 接收父组件传入的value
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 监听input值
    updateValue: function (event) {
      this.$emit('input', event.target.value)
    },
    focus: function () {
      // 一个对象，持有注册过ref特性的所有DOM元素和组件实例。
      this.$refs.message.focus()
    }
  }
}
</script>
<style scoped>
.input-con{
  display: flex;
  flex-direction: row;
  /* justify-content: ; */
}
span{
  width: 100px;
  display: inline-block;
  text-align: right;
  vertical-align: top;
}
textarea{
  border: 1px solid #e6e6ee;
  padding: 4px 5px;
  line-height: 24px;
  border-radius: 5px;
  width: 300px;
  height: 100px;
}
.u-info{
    text-align: center;
    line-height: 100px;
}
</style>