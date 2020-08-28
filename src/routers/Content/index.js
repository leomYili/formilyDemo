import React from "react";
import { Switch, Route } from "react-router";
import { Layout } from "antd";

import routes from "../routes";

const { Header, Content: AntContent, Sider } = Layout;

const RouteWithSubRoutes = (route) => (
    <Route
        path={route.path}
        render={(props) => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes || []} />
        )}
    />
);

class Content extends React.PureComponent {
    render() {
        return (
            <Layout style={{ marginLeft: 200 }}>
                <AntContent
                    style={{
                        margin: "24px 16px 0",
                        height: "100vh",
                        overflow: "initial",
                    }}
                >
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </AntContent>
            </Layout>
        );
    }
}

export default Content;
