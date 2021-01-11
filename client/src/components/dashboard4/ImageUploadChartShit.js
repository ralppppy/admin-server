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
  Radio,
} from "antd";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";
const { Title, Text } = Typography;


function ImageUploadChartShit() {

  const [images,setImages] = useState([]);

    useEffect(() => {

        axios.get("/api/v1/images/")
          .then((res) => {
            console.log(res);
    
            let data = res.data;
           setImages(data);
          })
          .catch((error) => console.log(error));
      }, []);

      const onFinish = (values) => {
        console.log(values)
        // axios
        //   .post("/api/v1/images/add_jeep", values)
        //   .then((res) => {
        //     let imagesCopy = [...images];
    
        //     imagesCopy = [...imagesCopy, res.data];
        //     console.log(imagesCopy);
        //    setImages(imagesCopy);
        //   })
        //   .catch((error) => console.log(error));
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log("fail");
        console.log("Failed:", errorInfo);
      };
    
      const checking = () => {
        console.log("check")
        
      };
    
      const handleDelete = (id) => {
        // axios
        //   .delete("/api/v1/images/delete_jeep", {
        //     params: {
        //       id,
        //     },
        //   })
        //   .then((res) => {
        //     let imagesCopy = [...images];
    
        //     imagesCopy = imagesCopy.filter((jeepney) => jeepney.id !== id);
        //    setImages(imagesCopy);
    
        //     console.log(imagesCopy);
        //   })
        //   .catch((error) => console.log(error));
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
        label="Image Reference ID"
        name="imageReferenceId"
        rules={[{ required: true, message: 'Please select image owner!' }]}
      >
        <Radio.Group>
          <Radio.Button value="1">Jeepney</Radio.Button>
          <Radio.Button value="2">Barangay</Radio.Button>
          <Radio.Button value="3">Driver</Radio.Button>
        </Radio.Group>
        
      </Form.Item>

      <Form.Item>
        <Button onClick={() => checking()}type="primary" htmlType="submit">
          Save Image
        </Button>
      </Form.Item>
    </Form>

    {images.map((image, index) => (
      <Col key={index} md={{ span: 6 }}>
        <Card className="shadow-sm">
          <Title>
            {image.imageName}
          </Title>
          <Content>
            {image.location}
          </Content>
          <Content>
            {image.imageDescription}
          </Content>
          <Button onClick={() => handleDelete(image.id)} danger>
            Delete
          </Button>
        </Card>
      </Col>
    ))}
  </Row>
  )
}

export default ImageUploadChartShit
