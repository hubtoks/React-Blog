import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Home = () => {
  const chartRef = useRef(null)//useRef创建一个ref对象
  useEffect(() => {  //放在useEffect中保证dom可用(有宽高的容器生成后)，图表才能渲染在其上
    const chartDom = chartRef.current//获取dom元素，chartRef.current指向dom元素
    // 1. 图表初始化，利用这个dom生成图表实例对象
    const myChart = echarts.init(chartDom)
    // 2. 准备图表参数
    const option = {
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
  }, [])

  return (
    <div>
      <div ref={chartRef} style={{ width: '400px', height: '300px' }} />
    </div >
  )
}

export default Home