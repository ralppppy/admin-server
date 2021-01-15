import React, { Suspense, useState, useEffect } from "react";
import "../App.css";
import Dashboard from "./Dashboard";
import JeepneyDasboard from "./JeepneyDasboard";
import BarangayDashboard from "./BarangayDashboard";
import UploadDashboard from "./UploadDashboard";
import DriversTableListContent from "./DriversTableListContent";
import BarangaysTableListContent from "./BarangaysTableListContent";

import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Imaged from "./Imaged";

const { Header, Content, Footer, Sider } = Layout;

function Admin() {
  const [selected, setSelected] = useState("");
  const clickSideBar = (selectedMenuItem) => {
    console.log(selectedMenuItem);
    setSelected(selectedMenuItem);
  };

  function getContent(selected) {
    return <div></div>;
  }

  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[""]}>
              <Imaged />
              <Menu.Item
                key="1"
                icon={<UserOutlined />}
                onClick={() => clickSideBar("1")}
              >
                Drivers
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<VideoCameraOutlined />}
                onClick={() => clickSideBar("2")}
              >
                Jeepneys
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<UploadOutlined />}
                onClick={() => clickSideBar("3")}
              >
                Barangays
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<UserOutlined />}
                onClick={() => clickSideBar("4")}
              >
                Image Upload
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<UserOutlined />}
                onClick={() => clickSideBar("5")}
              >
                Driver List
              </Menu.Item>
              <Menu.Item
                key="6"
                icon={<UploadOutlined />}
                onClick={() => clickSideBar("6")}
              >
                Barangay List
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0, textAlign: "center" }}
            >
              <h1 style={{ color: "white" }}>Retrack Admin</h1>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 500 }}
              >
                {(() => {
                  switch (selected) {
                    case "1":
                      console.log("case 1");
                      return <Dashboard />;
                    case "2":
                      return <JeepneyDasboard />;
                    case "3":
                      return <BarangayDashboard />;
                    case "4":
                      return <UploadDashboard />;
                    case "5":
                      return <DriversTableListContent />;
                    case "6":
                      return <BarangaysTableListContent />;
                    case "":
                      return "Welcome";
                  }
                })()}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design �2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
        ,
      </Suspense>
    </div>
  );
}

export default Admin;
