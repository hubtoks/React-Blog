import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

import { AuthRoute } from "@/components/AuthRoute";

//创建路由实例导出
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children:
            [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "article",
                    element: <Article />
                },
                {
                    path: "publish",
                    element: <Publish />
                }
            ],
    },
    {
        path: "/login",
        element: <Login />
    },
]);

export default router;