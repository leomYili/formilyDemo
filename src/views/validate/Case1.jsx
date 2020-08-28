import React, { useState, useEffect } from "react";
import Printer from "@formily/printer";
import _ from "lodash";
import {
    SchemaForm,
    SchemaMarkupField,
    FormButtonGroup,
    Submit,
    createFormActions,
    Schema,
} from "@formily/antd";
import { Input, Divider, Button, Select } from "antd";

import md from "./Case.md";

const { Option } = Select;

const actions = createFormActions();

const printSchema = (schema) => {
    return JSON.stringify(new Schema(schema).toJSON(), null, 2);
};

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

const ValidateCase1Form = () => {
    const handleOnSubmit = () => {
        console.log(printSchema(actions.getFormSchema()));

        console.log(
            "自定义获取的values为:",
            actions.getFormState((state) => state.values)
        );
    };

    return (
        <>
            <Printer>
                <SchemaForm
                    components={{
                        input: Input,
                        select: CustomSelect,
                    }}
                    expressionScope={{
                        externalTitle: (
                            <span style={{ color: "green" }}>
                                React Node Message
                            </span>
                        ),
                        requiredReactNode: (
                            <div>
                                必填，
                                <span style={{ color: "blue" }}>
                                    自定义文本错误文案
                                </span>
                            </div>
                        ),
                    }}
                    actions={actions}
                    labelCol={7}
                    wrapperCol={12}
                    validateFirst={false}
                    onSubmit={handleOnSubmit}
                >
                    <SchemaMarkupField
                        required
                        title="Required"
                        name="required"
                        x-component="input"
                    />
                    <SchemaMarkupField
                        type="string"
                        title="{{externalTitle}}"
                        x-rules={[
                            {
                                required: true,
                                message: "{{requiredReactNode}}",
                            },
                        ]}
                        name="react_node_message"
                        x-component="input"
                    />
                    <FormButtonGroup itemStyle={{ marginLeft: 20 }} offset={7}>
                        <Submit>提交</Submit>
                    </FormButtonGroup>
                </SchemaForm>
            </Printer>
        </>
    );
};

export default { component: ValidateCase1Form, markdown: md };
