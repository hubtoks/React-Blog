import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserInfo,clearUserInfo } from '@/store/modules/userStore'


const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const ToksLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();//获取当前URL路径
  const SelectedPath = location.pathname;

  useEffect(() => { 
    dispatch(fetchUserInfo()) 
  }, [dispatch])

  const userInfo = useSelector((state) => state.user.userInfo)

  const onConfirm = () => {
     dispatch(clearUserInfo())
     navigate('/login') 
    }

  return (
    <Layout>
      <Header className="header" title='后台管理系统'>
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}> 
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={SelectedPath}   //控制高亮
            selectedKeys={SelectedPath}    //控制高亮
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => navigate(key)}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default ToksLayout