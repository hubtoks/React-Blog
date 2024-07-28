import {request} from '@/utils'

export function getChannelAPI() { 
    return request({
        url: "/channels",
        method: "GET",
    })
}