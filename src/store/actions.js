export default {
    addCartGoods(context,payload){
        return new Promise((resolve, reject) => {
            let good = context.state.cartGoods.find(item => {
                return item.iid == payload.iid
            })
            if (good){
                good.count += 1
                resolve('当前商品在购物车中的数量+1')
            }
            else{
                payload.count = 1
                context.state.cartGoods.push(payload)
                resolve('当前商品已经添加到购物车中')
            }
        })
    }
}