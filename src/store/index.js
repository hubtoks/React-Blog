import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userStore";

const store = configureStore({   //组合子模块store到根store统一导出
    reducer: {
        user: userReducer
    }

})

export default store;