import React, { useState, useContext, useEffect } from "react";
import "./ImageUpload.css"
import logo from '././logo.png'
import { Upload, Button, Space, Row, Col, Image, Form, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageUploadDashboard from './ImageUploadDashboard'

import reqwest from 'reqwest';
import axios from 'axios'



function ImageUpload() {

    const [file, setFile] = useState({});
    const [filename, setFilename] = useState("Choose file");
    const [uploadedImagePath, setUploadedImagePath] = useState("");

    const checking=(file)=>{
        setFilename(file)
        
  }
    const viewFile = ()=>{
        if(filename=="Choose file"){
            console.log("No image selected")
        }else{
            setUploadedImagePath(filename.file.response.filePath)
            console.log(filename.file.response)
        }
        
    }

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
    
      const checkingValues = () => {
        console.log("check")
        
      };


    return (
        <div>
            <Row gutter ={[16,16]}>
                <Col>
                <Space  style={{ width: '100%' }} size="large">
                    <Upload
                    action="/api/v1/images/add_image"
                    listType="picture"
                    maxCount={1}
                    file ={file}
                    onChange={checking}
                    
                    >
                    <Button icon={<UploadOutlined />}
                    >Upload (Max: 1)</Button>
                    </Upload>
                    
                </Space>
                </Col>
            </Row>
            <Row gutter={[16,16]}>
            <Button onClick={viewFile} >Check Uploaded Image</Button>
            </Row>
            <Row gutter={[16,16]}>
            <Image
                width={250}
                height={250}
                src ={ uploadedImagePath ? uploadedImagePath : logo }
                style ={{borderColor: 'white', border: '10px'}}
            />
            </Row>
            <Row gutter={[16,16]}>
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
                        <Radio.Button value="1">Driver</Radio.Button>
                        <Radio.Button value="2">Jeepney</Radio.Button>
                        <Radio.Button value="3">Barangay</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            disabled ={uploadedImagePath.length === 0} 
                            onClick={checkingValues}
                            type="primary" 
                            htmlType="submit">
                                {uploadedImagePath ? "Save Image" : "Choose an image"}
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    )
}

export default ImageUpload
