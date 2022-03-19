// 封装首页的所有请求

import {request} from '../request'

export function detailRequest(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}