import Layout from "@/pages/Layout";
import Login from "@/pages/Login";


import { AuthRoute } from "@/components/AuthRoute";

//创建路由实例导出
import { createBrowserRouter } from 'react-router-dom'
import { lazy,Suspense } from "react";
const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children:
            [
                {
                    path: "/",
                    element: <Suspense fallback={<div>加载中...</div>}><Home /></Suspense>  //fallback显示未加载完成时的东西
                },
                {
                    path: "article",
                    element: <Suspense fallback={<div>加载中...</div>}><Article /></Suspense>
                },
                {
                    path: "publish",
                    element:  <Suspense fallback={<div>加载中...</div>}><Publish /></Suspense>
                }
            ],
    },
    {
        path: "/login",
        element: <Login />
    },
]);

export default router;