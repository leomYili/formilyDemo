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
import { Input, InputNumber, Button, Select } from "antd";

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

const ValidateCase3Form = () => {
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
                        InputNumber,
                    }}
                    actions={actions}
                    labelCol={7}
                    wrapperCol={12}
                    validateFirst={false}
                    onSubmit={handleOnSubmit}
                >
                    <SchemaMarkupField
                        type="string"
                        required
                        title="函数式校验"
                        x-rules={[
                            {
                                whitespace: true,
                                min: 5,
                                max: 10,
                                validator(value) {
                                    return value.indexOf("asd") > -1
                                        ? "文本里不能包含asd"
                                        : "";
                                },
                            },
                        ]}
                        name="custom_rules"
                        x-component="input"
                    />
                    <SchemaMarkupField
                        type="number"
                        required
                        title="阀值校验"
                        x-rules={(value) => {
                            if (value > 0 && value < 100) {
                                actions.setFieldState("threshold", (state) => {
                                    state.props[
                                        "x-props"
                                    ].validateStatus = "success";
                                });
                                return {
                                    message: "第一阶梯",
                                };
                            } else if ((value >= 100) & (value < 500)) {
                                actions.setFieldState("threshold", (state) => {
                                    state.props[
                                        "x-props"
                                    ].validateStatus = "validating";
                                });
                                return {
                                    message: "第二阶梯",
                                };
                            } else if ((value >= 500) & (value < 1000)) {
                                actions.setFieldState("threshold", (state) => {
                                    state.props[
                                        "x-props"
                                    ].validateStatus = "warning";
                                });
                                return {
                                    type: "warning",
                                    message: "第三阶梯",
                                };
                            } else if (value >= 1000) {
                                actions.setFieldState("threshold", (state) => {
                                    state.props[
                                        "x-props"
                                    ].validateStatus = "error";
                                });
                                return {
                                    type: "error",
                                    message: "第四阶梯",
                                };
                            }
                        }}
                        name="threshold"
                        x-component="input"
                        x-props={{
                            hasFeedback: true,
                        }}
                    />
                    <FormButtonGroup itemStyle={{ marginLeft: 20 }} offset={7}>
                        <Submit>提交</Submit>
                    </FormButtonGroup>
                </SchemaForm>
            </Printer>
        </>
    );
};

export default { component: ValidateCase3Form, markdown: md };
