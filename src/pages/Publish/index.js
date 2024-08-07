import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill' //富文本组件
import 'react-quill/dist/quill.snow.css' //富文本组件配套样式

import { createArticleAPI, getArticleDetailAPI,updateArticleAPI } from "@/apis/article"  //这个{}表示按需引入
import { useChannel } from '@/hooks/useChannal'  //引入自定义hook，获取频道列表
import { useState, useEffect } from 'react'


const { Option } = Select

const Publish = () => {
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id') //获取路由参数中的id
    const { channelList } = useChannel() //结构出其中的频道列表用户渲染

    const onSubmit = (formValue) => {
        if (fileList.length !== imageType) return message.warning('请上传对应数量的图片')
        const { title, channel_id, content } = formValue
        const params = {
            title,
            content,
            cover: {
                type: imageType,  //封面模式
                images: fileList.map(item => {
                    if(item.response) {  //由于回填的图片url与上传的图片url在对象里的存储位置不同，所以需要判断
                        return item.response.data.url  
                    }else{
                        return item.url  
                    }
                })  //利用map的数组映射，将接口所需的url作为数组上传
            },
            channel_id,
        }
        if (articleId) { //编辑更新接口
            updateArticleAPI({...params, id: articleId})
            message.success('编辑成功')
        }else { //新增接口
            createArticleAPI(params)
            message.success('发布成功')
        }
        
        
        

    }

    //接收上传图片的回调信息
    const [fileList, setFileList] = useState([])
    const onUploadChange = (value) => {
        setFileList(value.fileList)
        console.log(fileList)
    }

    //传图选项
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }

    //编辑跳转时回填文章内容
    const [form] = Form.useForm() //使用antd的form组件,可直接将表单数据存入form中(form.setFieldsValue(res.data)),再将form绑定到form组件上即可
    
        useEffect(() => {
            if (articleId) {
            async function getArticleDetail() {
                const {data} = await getArticleDetailAPI(articleId)
                const {cover} = data
               
                form.setFieldsValue({
                    ...data,
                    type: cover.type,
                })
                setImageType(cover.type)
                setFileList(cover.images.map(url => ({ url })))//将接口所需的url
            }
            getArticleDetail()
        }
        }, [articleId, form])
    

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑' : '发布'}文章` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onSubmit}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => (  //map报错not a function多半是没接到数据或者解构错了，不是数组捯智德
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>   {/* onChange里的e有信息 */}
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload   //上传图片组件
                                listType="picture-card"
                                showUploadList   //多个上传列表
                                action={'http://geek.itheima.net/v1_0/upload'}  //接收图片，返还图片信息的接口
                                name="image"   //接口里叫image
                                onChange={onUploadChange}
                                maxCount={imageType}   //最多上传几张
                                fileList={fileList}   //绑定图片列表，接收时用
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}

                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {articleId ? '编辑文章' :'发布文章'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish