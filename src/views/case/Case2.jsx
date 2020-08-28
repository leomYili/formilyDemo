import React from "react";
import {
    SchemaForm,
    SchemaMarkupField,
    SchemaField,
    Submit,
    FormPath,
    FormButtonGroup,
} from "@formily/antd";
import Printer from "@formily/printer";
import { Checkbox, Input } from "antd";
import "antd/dist/antd.css";

const transformOptions = (dataSource = [], path, currentValue = []) => {
    return dataSource.map(({ label, value, schema, ...others }, key) => {
        return (
            <div key={key}>
                <Checkbox {...others} value={value}>
                    {label}
                </Checkbox>
                <div style={{ marginTop: 10 }}>
                    {schema && currentValue.indexOf(value) > -1 && (
                        <SchemaField
                            path={FormPath.parse(path).parent()}
                            schema={schema}
                            onlyRenderProperties
                        />
                    )}
                </div>
            </div>
        );
    });
};

const DynamicCheckbox = ({ schema, value, path, mutators }) => {
    const props = schema.getExtendsComponentProps();
    const dataSource = schema.enum || [];
    return (
        <Checkbox.Group
            {...props}
            value={value}
            onChange={(...args) => {
                mutators.change(...args);
            }}
        >
            {transformOptions(dataSource, path, value)}
        </Checkbox.Group>
    );
};

DynamicCheckbox.isFieldComponent = true;

const Case2 = () => {
    return (
        <Printer>
            <SchemaForm
                components={{
                    Input,
                    DynamicCheckbox,
                }}
            >
                <SchemaMarkupField
                    name="aa"
                    type="array"
                    enum={[
                        {
                            label: "选项1",
                            schema: {
                                type: "object",
                                properties: {
                                    bb: {
                                        type: "string",
                                        title: "输入项1",
                                        "x-component": "Input",
                                    },
                                    cc: {
                                        type: "string",
                                        title: "继续嵌套",
                                        enum: [
                                            {
                                                label: "嵌套选项1",
                                                value: "111",
                                                schema: {
                                                    type: "object",
                                                    properties: {
                                                        dd: {
                                                            type: "string",
                                                            title: "输入项1",
                                                            "x-component":
                                                                "Input",
                                                        },
                                                        ee: {
                                                            type: "string",
                                                            title: "输入项1",
                                                            "x-component":
                                                                "Input",
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                label: "嵌套选项2",
                                                value: "222",
                                            },
                                        ],
                                        "x-component": "DynamicCheckbox",
                                    },
                                },
                            },
                            value: "111",
                        },
                        {
                            label: "选项2",
                            schema: {
                                type: "object",
                                properties: {
                                    ff: {
                                        type: "string",
                                        title: "输入项2",
                                        "x-component": "Input",
                                    },
                                },
                            },
                            value: "222",
                        },
                    ]}
                    x-component="DynamicCheckbox"
                />
                <FormButtonGroup>
                    <Submit />
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: Case2, markdown: "" };
