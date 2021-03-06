import React, { useState } from "react";
import { unstable_trace as trace } from "scheduler/tracing";
import { Form, Input, Select, Divider, Radio, Button } from "antd";

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

const Case2Form = (props) => {
    const {
        getFieldDecorator,
        getFieldsError,
        getFieldError,
        isFieldTouched,
    } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };

    const handleSelectChange = (value) => {
        console.log(value);
        trace("主动更新表单项状态", performance.now(), () => {
            console.log(getArrayToEmpty(getArray()));
            props.form.setFieldsValue(getArrayToEmpty(getArray()));
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
            <React.Profiler id="antd-v3-form" onRender={onRenderCallback}>
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    onSubmit={handleSubmit}
                >
                    <Form.Item label="Gender">
                        {getFieldDecorator("gender", {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        })(
                            <Select onChange={handleSelectChange}>
                                <Option value="0">editable</Option>
                                <Option value="1">hidden</Option>
                            </Select>
                        )}
                    </Form.Item>
                    {getArray().map((item, index) => (
                        <Form.Item label={item.label} key={index}>
                            {getFieldDecorator(item.label, {
                                initialValue: item.value,
                            })(<Input />)}
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </React.Profiler>
        </>
    );
};

const WrappedForm = Form.create({ name: "performance_form" })(Case2Form);

export default { component: WrappedForm, markdown: "" };
