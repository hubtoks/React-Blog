//统一导出
//用的时候就可以import {request} from '@/utils'  不用再一个个导出了

import {request} from './request';
import { setToken, getToken, removeToken } from './token';

export {
    request,
    setToken, 
    getToken, 
    removeToken
} 