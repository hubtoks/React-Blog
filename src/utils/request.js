//axios封装处理
import axios from 'axios'

//1.根域名配置
//2.超时时间
const service = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0', // 基础url，解决跨域，部署项目时，需要根据实际情况修改
  timeout: 5000 // 超时时间
})

//3.请求拦截器   插入一些自定义配置处理参数
service.interceptors.request.use(config => config, error => Promise.reject(error))
//4.响应拦截器  处理响应数据
service.interceptors.response.use(response => response.data, error => Promise.reject(error))



export {service}
