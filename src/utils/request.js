//axios封装处理
import axios from 'axios'
import { getToken, removeToken } from '@/utils'
import router from '@/router'




//1.根域名配置
//2.超时时间
const request = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0', // 基础url，解决跨域，部署项目时，需要根据实际情况修改
  timeout: 5000 // 超时时间
})

//3.请求拦截器   插入一些自定义配置处理参数
request.interceptors.request.use((config)=>{

  //操作config，注入token
  //获取token，按后端要求格式做token的拼接
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
//4.响应拦截器  处理响应数据
request.interceptors.response.use((response) =>{
  //2xx范围内
  return response.data
},(error) => {
  //2xx范围外
  //监控长时间未操作后端返回的401，token失效
  console.dir(error)
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/login').then(
      () => { window.location.reload() }
    )

}
  return Promise.reject(error)
})



export {request}
