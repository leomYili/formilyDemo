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
    FormEffectHooks,
    setValidationLocale,
} from "@formily/antd";
import { Input, Button, Select } from "antd";

import md from "./Case.md";

setValidationLocale({
    zh: {
        url: "URL格式不合法，注意：必须要带上协议，可以直接以//开头",
    },
});

const { Option } = Select;

const actions = createFormActions();

const { onFieldValueChange$ } = FormEffectHooks;

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

const placehodlers = {
    url: "https://test.alibaba.com",
    email: "test@alibaba-inc.com",
    qq: "123",
    date: "2012-12-12",
    idcard: "433533199312058746",
    zip: "333333",
    money: "$12.33",
    ipv6: "2001:0db8:86a3:08d3:1319:8a2e:0370:7344",
    ipv4: "168.1.1.0",
    phone: "16835646823",
    zh: "我爱中国",
};

const ValidateCase2Form = () => {
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
                    effects={({ setFieldState }) => {
                        onFieldValueChange$("format_type").subscribe(
                            (fieldState) => {
                                setFieldState("format_text", (state) => {
                                    state.value =
                                        placehodlers[fieldState.value];
                                    state.rules = [
                                        fieldState.value,
                                        { required: true, message: "不能为空" },
                                    ];
                                    state.props["x-component-props"] =
                                        state.props["x-component-props"] || {};
                                    state.props[
                                        "x-component-props"
                                    ].placeholder =
                                        placehodlers[fieldState.value];
                                });
                            }
                        );
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
                        title="联动校验类型"
                        name="format_type"
                        enum={[
                            "url",
                            "email",
                            "ipv6",
                            "ipv4",
                            "idcard",
                            "taodomain",
                            "qq",
                            "phone",
                            "money",
                            "zh",
                            "date",
                            "zip",
                        ]}
                        x-component="select"
                    />
                    <SchemaMarkupField
                        type="string"
                        required
                        title="联动校验文本"
                        name="format_text"
                        x-component="input"
                    />
                    <SchemaMarkupField
                        type="string"
                        required
                        title="异步校验"
                        x-rules={(value) => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(
                                        value !== "57350"
                                            ? "验证码验证失败"
                                            : ""
                                    );
                                }, 1000);
                            });
                        }}
                        name="remote_code"
                        x-props={{
                            hasFeedback: true,
                            triggerType: "onBlur",
                        }}
                        x-component="input"
                        x-component-props={{
                            placeholder: "Please input remote code:57350",
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

export default { component: ValidateCase2Form, markdown: md };
