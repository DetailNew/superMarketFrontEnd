// 重复代码单独导出，和封装类似
import BackTop from 'components/content/backTop/BackTop'
import { BACK_POSITION } from './const'
export const backToTop = {
    components:{
        BackTop,
    },
    data(){
        return{
            isShowTopBtn: false,
        }
    },
    methods: {
        backTop(){
            this.$refs.detail.scrollTo(0,0,300)
        },
        listenShowBackTop(position){
            this.isShowTopBtn = -position.y > BACK_POSITION
        }
    }
}