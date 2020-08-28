import React from "react";
import { Basic, Editor } from "../views";
import { Redirect } from "react-router-dom";

const routes = [
    {
        path: "/editor",
        component: Editor,
    },
    {
        path: "/development",
        component: (props) => <>{props.children}</>,
        routes: [
            {
                path: "/development/jsx",
                component: Basic,
            },
            /* {
                path: "/development/json-schema",
                component: Basic,
            },
            {
                path: "/development/jsx-schema",
                component: Basic,
            }, */
        ],
    },
    {
        path: "*",
        component: Basic,
    },
];

export default routes;
