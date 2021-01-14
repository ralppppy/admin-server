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
import { Content } from "antd/lib/layout/layout";
import { ModalImageUpload } from "../../components/ModalImageUpload";

const { Title, Text } = Typography;

function StudentChartShit() {
  const [drivers, setDrivers] = useState([]);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/drivers/")
      .then((res) => {
        console.log(res);

        let data = res.data;
        setDrivers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinish = (values) => {
    console.log(values);
    axios
      .post("/api/v1/drivers/add_driver", values)
      .then((res) => {
        let driversCopy = [...drivers];

        driversCopy = [...driversCopy, res.data];
        console.log(driversCopy);
        setDrivers(driversCopy);
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const checking = () => {
    console.log("check");
  };

  const handleDelete = (id) => {
    axios
      .delete("/api/v1/drivers/delete_driver", {
        params: {
          id,
        },
      })
      .then((res) => {
        let driversCopy = [...drivers];

        driversCopy = driversCopy.filter((driver) => driver.id !== id);
        setDrivers(driversCopy);

        console.log(driversCopy);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row gutter={[16, 16]}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your First Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Middle Name"
          name="middleName"
          rules={[
            { required: true, message: "Please input your Middle Name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            { required: true, message: "Please input your contact Number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Generate Password"
          name="generatePassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => checking()} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {drivers.map((driver, index) => (
        <Col key={index} md={{ span: 6 }}>
          <Card className="shadow-sm">
            <Title>
              {driver.firstName} {driver.middleName} {driver.lastName}
            </Title>
            <Content>{driver.address}</Content>
            <Content>{driver.contactNumber}</Content>
            <Content>{driver.email}</Content>
            <Button onClick={() => handleDelete(driver.id)} danger>
              Delete
            </Button>
            <ModalImageUpload
              info={drivers[index]}
              userType={"DRIVER"}
              imageReferenceId={1}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default StudentChartShit;
