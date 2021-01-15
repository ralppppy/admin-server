import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Input } from "antd";
import axios from "axios";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import DriversInfoModal from "./DriversInfoModal";

function DriversTableList() {
  const [drivers, setDrivers] = useState([]);
  const { Search } = Input;
  const [dataFromModal, setDataFromModal] = useState("");

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

  const onSearch = (value) => {
    axios
      .post("/api/v1/drivers/search_drivers", { value: value })
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        setDrivers(data);
        console.log("success");
      });

    console.log(value);
  };

  const modalClosed = () => {
    console.log("Passed data from modal", dataFromModal);
  };

  return (
    <div>
      <Space direction="vertical">
        <Search placeholder="Search drivers" onSearch={onSearch} enterButton />
      </Space>
      <Table dataSource={drivers} scroll={{ x: 1000, y: 500 }} sticky>
        <ColumnGroup title="ID" dataIndex="id" key="id"></ColumnGroup>
        <ColumnGroup title="Name" key="name">
          <Column title="FN" dataIndex="firstName" key="firstName"></Column>
          <Column title="MN" dataIndex="middleName" key="middleName"></Column>
          <Column title="LN" dataIndex="lastName" key="lastName"></Column>
        </ColumnGroup>
        <ColumnGroup
          title="Contact Number"
          dataIndex="contactNumber"
          key="contactNumber"
        ></ColumnGroup>
        <ColumnGroup
          title="Address"
          dataIndex="address"
          key="address"
        ></ColumnGroup>
        <ColumnGroup
          title="Email Address"
          dataIndex="email"
          key="email"
        ></ColumnGroup>
        <ColumnGroup
          title="Actions"
          key="actions"
          fixed="right"
          render={(value) => (
            <Space>
              <DriversInfoModal
                info={value}
                passedData={setDataFromModal}
                afterClosing={modalClosed}
              />
            </Space>
          )}
        ></ColumnGroup>
      </Table>
    </div>
  );
}

export default DriversTableList;
