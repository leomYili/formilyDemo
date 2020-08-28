import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link as RLink } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

class Link extends React.PureComponent {
    render() {
        return (
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                }}
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["editor"]}
                >
                    <Menu.Item key="editor">
                        <RLink to="/editor">
                            <Icon type="code" />
                            <span className="nav-text">schema编辑器</span>
                        </RLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Link;
