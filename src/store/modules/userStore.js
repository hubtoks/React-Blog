import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken,removeToken} from "@/utils";
import {loginAPI,getProfileAPI} from "@/apis/user"

const userStore = createSlice({  
    name: "user",
    initialState: {
        token:getToken('token') || '' , //从本地存储中获取token,  
        userInfo: {},
    },
    reducers: {
      setToken(state,action){
        state.token = action.payload
        _setToken(action.payload)
      },
      setUserInfo(state, action) { 
        state.userInfo = action.payload 
      },
      clearUserInfo(state) {
        state.userInfo = {}
        state.token = ''
        removeToken() 
      },
    },
})
const {setToken, setUserInfo,clearUserInfo} = userStore.actions

//异步请求

//获取用户token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
      //请求Token
        const res = await loginAPI(loginForm) //原本为request.post("/authorizations", loginForm);  封装到apis里进行统一管理
      //将Token传入reducer里的action.payload
        dispatch(setToken(res.data.token));  
    }
}
//获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
      const res = await getProfileAPI()  //同上已经封装
      dispatch(setUserInfo(res.data));  
  }
}


export { fetchLogin ,fetchUserInfo,setToken,clearUserInfo };  //按需导出
const reducer = userStore.reducer;
export default reducer