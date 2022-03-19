import {homeGoodsRequest} from 'network/home/home'
export default {
    addGoods(state){
        let random = Math.floor(Math.random()*(2+1))
        const types = ['pop','new','sell']
        while (state.page <= 3) {
            homeGoodsRequest(types[random],state.page++).then(res => {
                state.importGoods = state.importGoods.concat(res.data.list)
            })
        }
    },
}