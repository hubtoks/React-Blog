//1.创建一个use打头的函数
//2.在函数中封装业务逻辑，并return出组件中要用到的状态数据
//3.组件中导入函数执行,并解构出需要用到的状态数据

import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

const useChannel = () => {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {   //箭头函数前面是参数后面是函数体，整体可以赋值给一个变量
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])
    return {
        channelList
    }
}

export  {useChannel}

