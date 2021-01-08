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


const { Title, Text } = Typography;


function BarangayChartShit() {
    const [barangays,setBarangays] = useState([]);

    useEffect(() => {

        axios.get("/api/v1/barangays/")
          .then((res) => {
            console.log(res);
    
            let data = res.data;
           setBarangays(data);
          })
          .catch((error) => console.log(error));
      }, []);

      const onFinish = (values) => {
        console.log(values)
        axios
          .post("/api/v1/barangays/add_barangay", values)
          .then((res) => {
            let barangaysCopy = [...barangays];
    
            barangaysCopy = [...barangaysCopy, res.data];
            console.log(barangaysCopy);
           setBarangays(barangaysCopy);
          })
          .catch((error) => console.log(error));
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log("fail");
        console.log("Failed:", errorInfo);
      };
    
      const checking = () => {
        console.log("check")
        
      };
    
      const handleDelete = (id) => {
        axios
          .delete("/api/v1/barangays/delete_barangay", {
            params: {
              id,
            },
          })
          .then((res) => {
            let barangaysCopy = [...barangays];
    
            barangaysCopy = barangaysCopy.filter((barangay) => barangay.id !== id);
           setBarangays(barangaysCopy);
    
            console.log(barangaysCopy);
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
          label="Barangay Name"
          name="barangayName"
          rules={[{ required: true, message: "Please input the Barangay Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input Barangay's Location!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Barangay Description"
          name="barangayDescription"
          rules={[{ required: true, message: "Please input the Barangay's Description!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => checking()}type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {barangays.map((barangay, index) => (
        <Col key={index} md={{ span: 6 }}>
          <Card className="shadow-sm">
            <Title>
              {barangay.barangayName}
            </Title>
            <Content>
              {barangay.location}
            </Content>
            <Content>
              {barangay.barangayDescription}
            </Content>
            <Button onClick={() => handleDelete(barangay.id)} danger>
              Delete
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
    )
}

export default BarangayChartShit
