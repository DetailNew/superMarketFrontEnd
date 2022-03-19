// 封装首页的所有请求

import {request} from '../request'

// 首页第一个请求
export function homeRequest() {
    return request({
        url: '/home/multidata'
    })
}

export function homeGoodsRequest(type,page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}