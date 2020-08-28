import React from "react";
import { Switch, Router, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";

import Content from "./Content";
import Link from "./Link";

export default () => {
    return (
        <BrowserRouter forceRefresh>
            <Layout>
                <Link />
                <Content />
            </Layout>
        </BrowserRouter>
    );
};
