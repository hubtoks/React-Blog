//高阶组件，接受一个组件，有token正常跳转，无token跳转登录页
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {  //children是要跳转到的路由组件
  const token = getToken();
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}