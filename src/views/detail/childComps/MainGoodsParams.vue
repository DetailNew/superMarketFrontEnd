<template>
  <div class="main-goods-params">
      <div class="tables" v-if="'rule' in info && 'tables' in info.rule">
          <div class="basic-table" v-for="(item,index) in info.rule.tables[0]" :key="index">
              <div class="key"> {{item[0]}} </div>
              <div class="value-div">
                  <div class="value" v-for="index in item.length-1" :key="index"> {{item[index]}} </div>
              </div>
          </div>
      </div>
      <div class="params" v-if="'info' in info && 'set' in info.info">
          <div class="param" v-for="(item,index) in info.info.set" :key="index">
              <div class="param-key"> {{item.key}} </div>
              <div class="param-value"> {{item.value}} </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MainGoodsParams',
    props: {
        info: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    created(){
        // console.log(this.info);
    }
}
</script>

<style scoped>
.main-goods-params{
    margin: 0 10px;
    margin-top: 20px;
    font-size: var(--font-size);
}
.tables{
    border-bottom: 3px solid #eee;
}
.key{
    margin-right: 40px;
    float: left;
}
.value-div{
    width: calc(100% - 100px);
    float: left;
    display: flex;
}
.value {
    flex: 1;
}
.basic-table,.param{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
}
.key,.param-key{
    width: 60px;
}
.param-value{
    margin-left: 40px;
    width: calc(100% - 100px);
    color: var(--color-high-text);
}
.basic-table:nth-last-child(1){
    border-bottom-width: 0;
}
.key,.param-key,.param-value{
    display: inline-block;
}
div{
    overflow:hidden; 
	text-overflow:ellipsis;
	 white-space:nowrap 
}
</style>