import React from "react";
import ReactDOM from "react-dom";
import {
    SchemaForm,
    SchemaMarkupField,
    registerFormItemComponent,
} from "@formily/antd"; // 或者 @formily/next
import { Input, Divider } from "antd";
import "antd/dist/antd.css";

/* registerFormItemComponent((props) => {
    return <div>全局扩展FormItem组件{props.children}</div>;
}); */

const formItemComponent = (props) => {
    console.log(props);
    return <div>实例级扩展FormItem组件{props.children}</div>;
};

const Case2Form = () => {
    return (
        <>
            <SchemaForm
                components={{ Input }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <SchemaMarkupField
                    type="string"
                    name="name"
                    title="Name"
                    x-component="Input"
                />
            </SchemaForm>
            <Divider />
            <SchemaForm
                formItemComponent={formItemComponent}
                components={{ Input }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <SchemaMarkupField
                    type="string"
                    name="name"
                    title="Name"
                    x-component="Input"
                />
            </SchemaForm>
        </>
    );
};

export default { component: Case2Form, markdown: "" };
