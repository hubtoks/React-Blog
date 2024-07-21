
import { request } from "@/utils";
import {  useEffect } from "react";
const Layout = () =>{
    useEffect(() => {
        request.get('/user/profile')
        console.log('layout请求成功')
},[])

    return (
        <div>
            <h1>Layout</h1>
            <p>Layout</p>
        </div>
    )
}
export default Layout;