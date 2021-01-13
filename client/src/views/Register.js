import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

const { Title, Text } = Typography;

function Register({ history }) {
  const onFinish = (values) => {
    console.log(values);
    console.log(values);
    axios
      .post("/api/v1/users/register", values)
      .then((res) => {})
      .catch((error) => console.log(error));
    history.push("/login");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const checking = () => {
    console.log("check");
  };

  return (
    <div>
      <Row>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h5>ReTrack Account Registration</h5>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: "Please input User Name!" }]}
          >
            <Input />
          </Form.Item>

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
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button onClick={() => checking()} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
}

export default withRouter(Register);
