//登录页面
import { Card,Form, Input, Button} from "antd";
import './index.scss'

const Login = () => {
    const onFinish = (values) => console.log(values);
    return (
      <div className="login">
        <Card className="login-container" title="欢迎登录">
        <Form onFinish={onFinish}>{/* 写好的直接拿value */}
            <Form.Item 
            name="mobile" 
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
            ]}>
              <Input className="input" size="large" placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
            name="code" 
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}>
              <Input className="input" size="large" placeholder="请输入验证码"  />
            </Form.Item>
            <Form.Item>
              <Button className="button" type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
 
export default Login;