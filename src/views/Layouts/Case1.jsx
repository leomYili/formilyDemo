import React, { useState } from "react";
import {
    SchemaForm,
    SchemaMarkupField,
    SchemaField,
    useSchemaProps,
    FormButtonGroup,
    createFormActions,
    FormPath,
    Submit,
    FormSlot,
    FormMegaLayout,
} from "@formily/antd"; // 或者 @formily/next
import Printer from "@formily/printer";
import { Input, Button } from "antd";

import md from "./case.md";

const actions = createFormActions();

const CustomLayout = (props) => {
    const { children } = props;
    const schemaProps = useSchemaProps();

    console.log(schemaProps);

    return (
        <div style={{ border: "1px solid red", padding: 10 }}>
            <h2>扩展层</h2>
            {children}
        </div>
    );
};
CustomLayout.isVirtualFieldComponent = true;

const List = ({ schema, value, path, mutators }) => {
    const props = schema.getExtendsComponentProps();
    const dataSource = schema.enum || [];

    console.log(schema, value);

    return (
        <>
            <SchemaField path={FormPath.parse(path)} schema={schema.items} />
        </>
    );
};

List.isFieldComponent = true;

const Case1Form = () => {
    const handleSubmit = (values) => {
        console.log(JSON.stringify(values));

        console.log(
            "自定义获取的values为:",
            actions.getFormState((state) => state.values)
        );
    };

    return (
        <Printer>
            <SchemaForm
                components={{
                    Input,
                    CustomLayout,
                    List,
                }}
                actions={actions}
                onSubmit={handleSubmit}
            >
                <div style={{ border: "1px dashed blue" }}>
                    <h1>自定义外层(会被渲染到表单项的下面)</h1>
                    <SchemaMarkupField
                        x-component="CustomLayout"
                        name="user"
                        type="object"
                    >
                        <SchemaMarkupField
                            type="array"
                            name="child"
                            x-component="List"
                        >
                            <SchemaMarkupField type="object">
                                <SchemaMarkupField
                                    type="string"
                                    name="cname"
                                    title="cname"
                                    x-component="Input"
                                ></SchemaMarkupField>
                            </SchemaMarkupField>
                        </SchemaMarkupField>
                        <FormMegaLayout labelCol={4} labelAlign="left">
                            <SchemaMarkupField
                                name="name"
                                title="Name"
                                x-component="Input"
                            />
                        </FormMegaLayout>
                    </SchemaMarkupField>
                </div>
                <FormButtonGroup
                    style={{ marginTop: 4 }}
                    itemStyle={{ marginLeft: 20 }}
                >
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: Case1Form, markdown: md };
