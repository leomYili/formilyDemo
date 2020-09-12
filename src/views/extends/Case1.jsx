import React from "react";
import ReactDOM from "react-dom";
import {
    SchemaForm,
    SchemaMarkupField as Field,
    registerFormComponent,
} from "@formily/antd"; // 或者 @formily/next
import { Input, Divider } from "antd";
import "antd/dist/antd.css";

registerFormComponent((props) => {
    return <div>全局扩展Form组件{props.children}</div>;
});

const formComponent = (props) => {
    return <div style={{border:"1px solid #000"}}>实例级扩展Form组件{props.children}</div>;
};

const Case1Form = () => {
    return (
        <>
            <SchemaForm
                components={{ Input }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Field
                    type="string"
                    name="name"
                    title="Name"
                    x-component="Input"
                />
            </SchemaForm>
            <Divider />
            <SchemaForm
                formComponent={formComponent}
                components={{ Input }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Field
                    type="string"
                    name="name"
                    title="Name"
                    x-component="Input"
                />
            </SchemaForm>
        </>
    );
};

export default { component: Case1Form, markdown: "" };
