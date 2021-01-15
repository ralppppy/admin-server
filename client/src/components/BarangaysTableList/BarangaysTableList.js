import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Input } from "antd";
import axios from "axios";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";

function BarangaysTableList() {
  const [barangays, setBarangays] = useState([]);
  const { Search } = Input;
  const [dataFromModal, setDataFromModal] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/barangays/")
      .then((res) => {
        console.log(res);

        let data = res.data;
        setBarangays(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    axios
      .post("/api/v1/barangays/search_barangays", { value: value })
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        setBarangays(data);
        console.log("success");
      });

    console.log(value);
  };

  const modalClosed = () => {
    console.log(dataFromModal);
  };
  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="Search barangays"
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Table dataSource={barangays} scroll={{ x: 1000, y: 500 }} sticky>
        <ColumnGroup title="ID" dataIndex="id" key="id"></ColumnGroup>
        <ColumnGroup
          title="Barangay"
          dataIndex="barangayName"
          key="barangayName"
        ></ColumnGroup>

        <ColumnGroup
          title="Location"
          dataIndex="location"
          key="location"
        ></ColumnGroup>
        <ColumnGroup
          title="Description"
          dataIndex="barangayDescription"
          key="barangayDescription"
        ></ColumnGroup>
        <ColumnGroup
          title="Actions"
          key="actions"
          fixed="right"
          render={(value) => <Space></Space>}
        ></ColumnGroup>
      </Table>
    </div>
  );
}

export default BarangaysTableList;
