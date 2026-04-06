import React from "react";

import { Form, Input, Button, Checkbox, Layout, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "@/redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/redux/auth/selectors";
const { Content, Footer } = Layout;

const LoginPage = () => {
  // const [error, setError] = useState();

  // const { setAdminData } = useContext(AdminContext);
  // const history = useHistory();
  const { loading: isLoading } = useSelector(selectAuth);
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setInputs((inputs) => ({ ...inputs, [name]: value }));
  // }
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login(values));
  };
  return (
    <>
      <Layout className="layout">
        <Row justify="center">
          <Col xs={22} sm={16} md={12} lg={10} xl={8}>
            <Content
              style={{
                padding: "120px 0 160px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <h1 style={{ marginBottom: 8 }}>StudyHub</h1>
              <p style={{ color: "#666", marginBottom: 0 }}>
                请使用管理员账号登录 StudyHub
              </p>
              {/* {error && (
                <ErrorNotice
                  message={error}
                  clearError={() => setError(undefined)}
                />
              )} */}
              <Divider />
              <div className="site-layout-content">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "请输入登录邮箱",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="请输入邮箱"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "请输入登录密码",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="请输入密码"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住登录状态</Checkbox>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={isLoading}
                    >
                      登录系统
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>

        <Footer style={{ textAlign: "center" }}>
          StudyHub 智能学习任务管理系统
        </Footer>
      </Layout>
    </>
  );
};

export default LoginPage;
