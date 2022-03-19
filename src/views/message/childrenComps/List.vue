<template>
  <div class="list">
    <div  v-if="this.list.length">
      <div v-for="(item, index) in this.list" 
      :key="index" 
      class="list-item">
          <div class="span-con">
            <span>{{item.name}}:</span>
          </div>
          <div class="list-msg">
            <div>{{item.info}}</div>
            <div class="list-reply">
              <a @click="listChange(index)">回复</a>
            </div>
          </div>
      </div>
    </div>
    <div v-if="!this.list.length" 
    class="list-nothing">
      留言列表为空
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  methods: {
    listChange: function (index) {
      this.handleReply(index)
    },
    handleReply: function (index) {
      this.$emit('reply', index)
    }
  },
}
</script>
<style scoped>
.list{
  padding: 0 20px ;
  width: 100%;
}
.list-item{
  /* display: flex; */
  /* flex-direction: row; */
  padding: 10px 0;
  border-bottom: 1px solid #e3e8ee;
  overflow: hidden;
  width: 100%;
  /* flex: 5; */
}
.span-con{
  /* flex: 2; */
  float: left;
  width: 20%;
  /* margin-right: 15px; */
  color: #39f;
  text-align: justify;
  text-justify: newspaper;
  word-wrap:break-word; 
  word-break: break-all;
  font-size: var(--font-size);
}
.list-msg{
  /* flex: 8; */
  width: 80%;
  float: left;
  padding-left: 8px;
  text-align: justify;
  text-justify: newspaper;
   word-wrap:break-word; 
  word-wrap:break-word; 
  font-size: var(--font-size);
}
.list-msg .list-reply{
  text-align: right;
}
.list-msg a:hover{
  color: #39f
}
.list-msg a{
  color: #39f;
}
.list-nothing{
  text-align: center;
  color: #9ea7b4;
  padding: 20px;
}
</style>