import React, { useState } from "react";
import { Grid, Layout } from "antd";

import * as Styles from "./styles";
import { Redirect, Route } from "react-router-dom";

import HeaderAdmin from "../HeaderAdmin";
import Siderbar from "../Sidebar";
import BreadcrumbLayout from "../Breadcrumb";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

function AdminLayout({ exact, path, component: Component, action }) {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  console.log(screens);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Redirect to="/login" />;
  } else {
    if (userInfo.role === "user") {
      return <Redirect to="/" />;
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <>
                <Styles.MainLayout>
                  <Layout style={{ minHeight: "100vh" }}>
                    <HeaderAdmin />
                    <Layout>
                      <Sider
                        breakpoint="lg"
                        width={270}
                        theme="light"
                        collapsedWidth={screens.lg !== true ? 0 : 80}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                      >
                        <Siderbar {...routeProps} />
                      </Sider>
                      <Layout className="content-layout">
                        <div style={{ padding: "0 15px" }}>
                          <BreadcrumbLayout {...routeProps} />
                        </div>
                        <Content className="content">
                          <Component {...routeProps} action={action} />
                        </Content>
                      </Layout>
                    </Layout>
                  </Layout>
                </Styles.MainLayout>
              </>
            );
          }}
        />
      );
    }
  }
}

export default AdminLayout;
