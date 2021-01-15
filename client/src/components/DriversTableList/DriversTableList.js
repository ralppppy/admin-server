import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Input } from "antd";
import axios from "axios";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import DriversInfoModal from "./DriversInfoModal";

// const columns = [
//   {
//     title: "Name",
//     dataIndex: [{ dataIndex: "firstName" }],
//     width: 100,
//     key: "name",
//     fixed: "left",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Contact Number",
//     dataIndex: "contactNumber",
//     key: "contactNumber",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "Tags",
//     key: "tags",
//     dataIndex: "tags",

//     // render: (tags) => (
//     //   <>
//     //     {tags.map((tag) => {
//     //       let color = tag.length > 5 ? "geekblue" : "green";
//     //       if (tag === "loser") {
//     //         color = "volcano";
//     //       }
//     //       return (
//     //         <Tag color={color} key={tag}>
//     //           {tag.toUpperCase()}
//     //         </Tag>
//     //       );
//     //     })}
//     //   </>
//     // ),
//   },
//   {
//     title: "Action",
//     key: "action",
//     width: 120,
//     fixed: "right",
//     render: (text, record) => (
//       <Space size="middle">
//         <a>Invite </a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

function DriversTableList() {
  const [drivers, setDrivers] = useState([]);
  const { Search } = Input;

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
      .post("/api/v1/drivers/search_drivers", {
        id: value,
        firstName: value,
        middleName: value,
        lastName: value,
        contactNumber: value,
        address: value,
        email: value,
      })
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        setDrivers(data);
        console.log("success");
      });

    console.log(value);
  };

  const viewDetails = (value) => {
    console.log(value);
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
              <DriversInfoModal info={value} />
            </Space>
          )}
        ></ColumnGroup>
      </Table>
    </div>
  );
}

export default DriversTableList;
