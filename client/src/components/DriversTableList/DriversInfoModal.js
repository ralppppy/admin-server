import React, { useState } from "react";
import { Modal, Button } from "antd";

function DriversInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);

    console.log(props.info);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Details
      </Button>
      <Modal
        title="Driver Info"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
