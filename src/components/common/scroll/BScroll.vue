<template>
  <div class="my-better-scroll">
      <div>
          <slot></slot>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'BScroll',
    data(){
        return {
            bscroll: null,
            // 设置虚拟DOM更新后等待执行refresh()的时间
            delayTime: 300
        }
    },
    props: {
        scrollType: {
            type: Number,
            default: 0
        }
    },
    methods: {
        // es6  给参数默认值
        scrollTo(x,y,time=500){
            this.bscroll.scrollTo(x,y,time)
        },
        finishPull(){
            this.bscroll.finishPullUp()
        }
    },
    mounted(){
        this.bscroll = new BScroll('.my-better-scroll',{
            probeType: this.scrollType,
            click: true,
            pullUpLoad: true,
            // 这是解决scroll可滑动区域不正常的方式之二(新版本的属性)
            // observeDOM:true,
            // 这里会频繁刷新
            // observeImage: true
        })
        // 监听滑动距离，发送结果
        this.bscroll.on('scroll',res => {
            this.$emit('scrollxy',res)
        })
        this.bscroll.on('pullingUp',() =>{
            // console.log('上拉！！');
            this.$emit('scrollover',true)
        })
    },
    // 更新插槽里面的数据后，要对better-scroll效果进行刷新
    // 否则无法进行正常滚动
    updated(){
        // 设置定时器，使得每次本组件内DOM更新后，都等待100ms的时间再调用refresh()
        // 调用refresh()：使得better-scroll能正常生效；
        // 等待100ms：因为DOM更改后，updated执行到渲染完成需要一段时间。
        // 这是解决scroll可滑动区域不正常的方式之一(原始方法，始终牛逼！)
        // 不会频繁刷新,即实现了防抖(移动端该抖的还是抖)
        // 最新更新，已经关闭了这个功能，而采取了图片加载完再刷新，并且使用了防抖动
        setTimeout(() => {
            // console.log('刷新');
            // this.bscroll.refresh()
            // console.log(this.bscroll.scrollerHeight);
        }, this.delayTime);
        // 为了实现吸顶，这里必须有所更改
    }
}
</script>

<style scoped>
.my-better-scroll{
    overflow: hidden;
}
</style>