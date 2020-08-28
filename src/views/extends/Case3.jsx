import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SchemaForm, SchemaMarkupField, useSchemaProps } from "@formily/antd"; // 或者 @formily/next
import { Input } from "antd";

import md from "./case3.md";

const CustomLayout = (props) => {
    const { children } = props;
    const schemaProps = useSchemaProps();

    console.log(schemaProps);

    return (
        <div style={{ border: "1px solid red", padding: 10 }}>{children}</div>
    );
};

CustomLayout.isVirtualFieldComponent = true;

const Case3Form = () => {
    return (
        <SchemaForm
            components={{
                Input,
                CustomLayout,
            }}
        >
            <SchemaMarkupField x-component="CustomLayout" type="object">
                <SchemaMarkupField
                    name="name"
                    title="Name"
                    x-component="Input"
                />
            </SchemaMarkupField>
        </SchemaForm>
    );
};

export default { component: Case3Form, markdown: md };
