//筛选页面依赖
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'

//筛选列表结果依赖
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

import { getArticleListAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannal'  //引入自定义hook，获取频道列表
import { useEffect,useState } from 'react'




const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const { channelList } = useChannel() //结构出其中的频道列表用户渲染
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => data === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="success">审核通过</Tag> //根据后端拿到的data，利用render进行二次处理，返回不同的标签
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]

    //获取筛选信息
    const [filter, setFilter] = useState({ //默认为空，表示获取所有文章
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page:1,
        per_page: 5
    })

    const onFinish = (formValue) => {
        setFilter({
            ...filter,
            status: formValue.status,
            channel_id: formValue.channel_id,
            begin_pubdate: formValue.date ? formValue.date[0].format('YYYY-MM-DD') : '',
            end_pubdate: formValue.date ? formValue.date[1].format('YYYY-MM-DD') : ''
        })
    }
    

    // 获取文章列表
    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getArticleList() {
            const res = await getArticleListAPI(filter)  
            setArticleList(res.data.results)
            setCount(res.data.total_count)
        }
        getArticleList()
    },[filter])

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"

                            style={{ width: 120 }}
                        >
                            {channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}

                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articleList} />{/*只用传入columns列名和数据即可渲染*/}
            </Card>
        </div>
    )
}

export default Article