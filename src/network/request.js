// 对axios的实例进行封装，便于维护
import axios  from "axios";

export function request(config) {
    const instance = new axios.create({
        // 新数据接口
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 6000
    })
    instance.interceptors.response.use(res => {
        // console.log(res.data);
        return res.data
    },err => {
        console.log(err);
    })
    return instance(config)
}

export function mRequest(url) {
    // 这样子请求居然解决了跨域问题！
    // 最新注释，这样子配合vue.config.js里的配置可以解决开发环境下的跨域问题
    // 解决生产环境下的跨域问题还得靠@CrossOrigin
    return axios.get(url)
}

// 传数据到服务器
export function infoRequest(url,config) {
    return axios.get(url,config)
}
