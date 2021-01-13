import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";

import { withRouter } from "react-router-dom";
import { AuthContext } from ".././components/GlobalContext/AuthContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login({ history }) {
  let Auth = useContext(AuthContext);

  const onFinish = async (values) => {
    console.log("Success:", values);

    console.log(values);
    let { success, errorMessage } = await Auth.authenticate(values);
    console.log(success);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row>
        <Col>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <cardBody>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {/* <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <a style={{ float: "right" }} href="/register">
                    Register
                  </a>
                </Form.Item>
              </Form>
            </cardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);
