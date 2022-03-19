import {mRequest,infoRequest} from '../request'


export function messageRequest() {
    return mRequest('http://istarmarket.com:8080/message/selectAll')
}

// 将用户输入的数据传到服务器
export function addInfo(config) {
    return infoRequest('http://istarmarket.com:8080/message/add',config)
}