import {request} from '@/utils'

//获取频道列表
export function getChannelAPI() { 
    return request({
        url: "/channels",
        method: "GET",
    })
}

//创建文章
export function createArticleAPI(data) { 
    return request({
        url: "/mp/articles?draft=false",
        method: "POST",
        data
    }) 
}
