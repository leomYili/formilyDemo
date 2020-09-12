import React, { useState } from "react";
import { unstable_trace as trace } from "scheduler/tracing";
import Form, { Field } from "rc-field-form";
import { Input, Select, Button } from "antd";

const { Option } = Select;

const getArray = () => {
    const num = 1000;

    let _arr = [];
    for (let i = 0; i < num; i++) {
        _arr.push({ label: `item${i}`, value: i });
    }
    return _arr;
};

const getArrayToEmpty = (arr) => {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
        obj[arr[i].label] = "";
    }

    return obj;
};

const Case3Form = (props) => {
    const [form] = Form.useForm();

    const handleSubmit = (e) => {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };

    const handleSelectChange = (value) => {
        console.log(value);
        trace("主动更新表单项状态", performance.now(), () => {
            console.log(getArrayToEmpty(getArray()));
            form.setFieldsValue(getArrayToEmpty(getArray()));
        });
    };

    const onRenderCallback = (
        id, // 发生提交的 Profiler 树的 “id”
        phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
        actualDuration, // 本次更新 committed 花费的渲染时间
        baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
        startTime, // 本次更新中 React 开始渲染的时间
        commitTime, // 本次更新中 React committed 的时间
        interactions // 属于本次更新的 interactions 的集合
    ) => {
        // 合计或记录渲染时间。。。
        console.info(
            `${id},本次更新提交花费的渲染时间:${actualDuration};预估渲染整颗子树的时间:${baseDuration}`
        );
    };

    return (
        <>
            <React.Profiler id="antd-v4-form" onRender={onRenderCallback}>
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    name="antd-v4-form"
                    wrapperCol={{ span: 12 }}
                    onFinish={(values) => {
                        console.log("Finish:", values);
                    }}
                >
                    <Field label="gender" name="gender">
                        <Select onChange={handleSelectChange}>
                            <Option value="0">editable</Option>
                            <Option value="1">hidden</Option>
                        </Select>
                    </Field>
                    {getArray().map((item, index) => (
                        <Field
                            name={item.label}
                            initialValue={item.value}
                            shouldUpdate={(prevValues, currentValues) =>
                                prevValues.gender !== currentValues.gender
                            }
                            key={index}
                        >
                            {({ value, onChange }) => {
                                let disabled =
                                    form.getFieldValue("gender") === "0";

                                console.log(disabled);

                                return (
                                    <Input
                                        disabled={disabled}
                                        value={value}
                                        onChange={onChange}
                                    ></Input>
                                );
                            }}
                        </Field>
                    ))}

                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form>
            </React.Profiler>
        </>
    );
};

export default { component: Case3Form, markdown: "" };
