import React from "react";
import { Menu, Layout } from "antd";

import "./style.scss";
import { getItem, removeItem } from "../../shared/store";
const { Header } = Layout;
/**
 * @description: Wraps auth component
 * @param {any} props
 * @returns
 */

function Navbar() {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1" className="brand">
          Purge Emails
        </Menu.Item>
        {getItem("token") ? (
          <Menu.Item key="1" onClick={e => removeItem("token")}>
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item key="1">
            <a href="http://127.0.0.1:4000/auth/google">Login</a>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}
export default Navbar;
