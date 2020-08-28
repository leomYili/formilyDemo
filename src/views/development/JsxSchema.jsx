import React from "react";
import Printer from "@formily/printer";
import {
    SchemaForm,
    SchemaMarkupField,
    FormButtonGroup,
    Submit,
    createFormActions,
} from "@formily/antd";
import { Input, Radio, Select } from "antd";
import md from "./JsxSchema.md";

const { Option } = Select;

const actions = createFormActions();

const CustomSelect = (props) => {
    console.log(props);

    return (
        <Select value={props.value} onChange={props.onChange}>
            {props.dataSource.map((item, index) => (
                <Option key={item.value} value={item.value}>
                    {item.label}
                </Option>
            ))}
        </Select>
    );
};

const JsxSchemaForm = () => {
    actions.validate();

    return (
        <Printer className="printer">
            <SchemaForm
                components={{
                    asdad: Input,
                    radio: Radio,
                    select: CustomSelect,
                }}
                actions={actions}
                labelCol={7}
                wrapperCol={12}
                onSubmit={console.log}
                schema={{
                    type: "object",
                    properties: {
                        radio: {
                            key: "radio",
                            enum: ["1", "2", "3", "4"],
                            title: "Radio",
                            name: "radio",
                            "x-component": "radio",
                            "x-index": 0,
                        },
                        select: {
                            key: "select",
                            enum: ["1", "2", "3", "4"],
                            title: "Select",
                            name: "select",
                            "x-component": "select",
                            "x-index": 2,
                        },
                    },
                }}
            >
                <div
                    style={{ padding: 20, margin: 20, border: "1px solid red" }}
                >
                    这是一个非Field类标签，会被挪到最底部渲染
                </div>
                <SchemaMarkupField
                    title="用户名"
                    name="username"
                    description="这是表单项描述"
                    x-component="asdad"
                    x-rules={[{ required: true, message: "用户名不可为空" }]}
                    x-index={1}
                />
                <FormButtonGroup itemStyle={{ marginLeft: 20 }} offset={7}>
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: JsxSchemaForm, markdown: md };
