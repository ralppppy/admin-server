import React, { useState } from "react";
import { Modal, Button } from "antd";

function DriversInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);

    console.log(props.info);
  };

  const handleOk = () => {
    props.passedData(props.info);
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIfCanceled(true);
    setIsModalVisible(false);
  };
  const handleClose = () => {
    if (ifCanceled) {
    } else {
      props.afterClosing();
    }
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Details
      </Button>
      <Modal
        title="Driver Info"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}
      >
        <h1></h1>
        <p>
          <h3>ID:</h3>
          {props.info.id}
        </p>
        <p>
          <h3>Name:</h3>
          {props.info.firstName} {props.info.middleName} {props.info.lastName}
        </p>
        <p>
          <h3>Contact Number:</h3>
          {props.info.contactNumber}
        </p>
        <p>
          <h3>Address: </h3>
          {props.info.address}
        </p>
        <p>
          <h3>Email Address: </h3>
          {props.info.email}
        </p>
      </Modal>
    </div>
  );
}

export default DriversInfoModal;
