import Toast from './Toast'

let toast = {}
// Vue安装(use)toast插件时执行install函数
toast.install = function (vue) {
    // 创建组件构造器
    const toastConstrustor = vue.extend(Toast)
    // 使用组件构造器new出来一个组件
    const toast = new toastConstrustor()
    // 手动挂载组件至某一元素
    toast.$mount(document.createElement('div'))
    // 将挂载了组件的元素添加到body下
    document.body.appendChild(toast.$el)
    // 给Vue的原型上的$toast绑定已经存在于body下的toast组件，方便之后调用
    vue.prototype.$toast = toast
}

export default toast