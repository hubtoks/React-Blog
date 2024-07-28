
import {request} from '@/utils'


//request.post("/authorizations", loginForm); 
//登录请求
export function loginAPI(formData) { 
    return request({
        url: "/authorizations",
        method: "POST",
        data: formData
    })
}
//request.get("/user/profile");
//获取用户信息
export function getProfileAPI() {
     return request({ 
        url: "/user/profile", 
        method: "GET" 
    }) 
}