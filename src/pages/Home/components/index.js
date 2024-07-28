import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const BarChart = ({title}) => {  //用props传递title，记得解构
  const chartRef = useRef(null)//useRef创建一个ref对象
  useEffect(() => {  //放在useEffect中保证dom可用(有宽高的容器生成后)，图表才能渲染在其上
    const chartDom = chartRef.current//获取dom元素，chartRef.current指向dom元素
    // 1. 图表初始化，利用这个dom生成图表实例对象
    const myChart = echarts.init(chartDom)
    // 2. 准备图表参数
    const option = {
      title: { 
        text:title
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    // 3. 渲染参数
    myChart.setOption(option)
  }, [title])

  return (
  
      <div ref={chartRef} style={{ width: '400px', height: '300px' }} />
  
  )
}

export default BarChart