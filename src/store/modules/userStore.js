import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({  
    name: "user",
    initialState: {
        token:'',  //要接收的是个数组
    },
    reducers: {
      setToken(state,action){
        state.token = action.payload
      }
    },
})
const {setToken} = userStore.actions

//异步请求


const fetchLogin = (loginForm) => {
    return async (dispatch) => {
      //请求Token
        const res = await request.post("/authorizations", loginForm);
      //将Token传入reducer里的action.payload
        dispatch(setToken(res.data.token));  
    }
}

export { fetchLogin ,setToken };  //按需导出
const reducer = userStore.reducer;
export default reducer