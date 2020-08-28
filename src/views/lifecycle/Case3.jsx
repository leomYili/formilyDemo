import React, { useEffect, useState } from "react";
import {
    SchemaForm,
    SchemaMarkupField as Field,
    FormButtonGroup,
    LifeCycleTypes,
    createFormActions,
    FormProvider,
    FormSpy,
    Submit,
    Reset,
} from "@formily/antd"; // 或者 @formily/next
import Printer from "@formily/printer";
import { Button } from "antd";
import { Input, Select } from "antd"; // 或者@formily/next-components

import md from "./Case.md";

const { Option } = Select;

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

const components = {
    Input,
    Select:CustomSelect,
};

const actions = createFormActions();

const LifeCase3Form = () => {
    return (
        <Printer>
        <FormProvider>
            <SchemaForm
                actions={actions}
                labelCol={5}
                wrapperCol={14}
                components={components}
                effects={($, { setFieldState }) => {
                    $("customEvent").subscribe(() => {
                        setFieldState("cc", (state) => {
                            state.visible = !state.visible;
                        });
                    });
                }}
            >
                <Field type="string" title="BB" name="bb" x-component="Input" />
                <Field type="string" title="CC" name="cc" x-component="Input" />
                <FormButtonGroup offset={5}>
                    <Submit>查询</Submit>
                    <Reset>重置</Reset>
                </FormButtonGroup>
                <FormSpy
                    initialState={{
                        actions: [],
                    }}
                    reducer={(state, action) => {
                        return {
                            actions: state.actions.concat(action),
                        };
                    }}
                >
                    {({ state }) => {
                        const { actions } = state;
                        return (
                            <div>
                                全量生命周期
                                <div
                                    style={{
                                        margin: 20,
                                        height: 100,
                                        overflow: "auto",
                                        border: "1px solid red",
                                        padding: 10,
                                    }}
                                >
                                    {(actions || []).map((action, key) => {
                                        return (
                                            <div key={key}>{action.type}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }}
                </FormSpy>
                <FormSpy
                    selector="*(onFormChange,onFieldChange)"
                    initialState={{
                        actions: [],
                    }}
                    reducer={(state, action) => {
                        return {
                            actions: state.actions.concat(action),
                        };
                    }}
                >
                    {({ state }) => {
                        const { actions } = state;
                        return (
                            <div>
                                指定生命周期
                                <div
                                    style={{
                                        margin: 20,
                                        height: 100,
                                        overflow: "auto",
                                        border: "1px solid red",
                                        padding: 10,
                                    }}
                                >
                                    {(actions || []).map((action, key) => {
                                        return (
                                            <div key={key}>{action.type}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }}
                </FormSpy>
            </SchemaForm>
            <FormSpy
                selector="customEvent"
                initialState={{
                    actions: [],
                }}
                reducer={(state, action) => {
                    return {
                        actions: state.actions.concat(action),
                    };
                }}
            >
                {({ state }) => {
                    const { actions } = state;
                    return (
                        <div>
                            指定生命周期
                            <div
                                style={{
                                    margin: 20,
                                    height: 100,
                                    overflow: "auto",
                                    border: "1px solid red",
                                    padding: 10,
                                }}
                            >
                                {(actions || []).map((action, key) => {
                                    return <div key={key}>{action.type}</div>;
                                })}
                            </div>
                        </div>
                    );
                }}
            </FormSpy>
            <FormButtonGroup align="center">
                <Button
                    onClick={() => {
                        actions.dispatch("customEvent");
                    }}
                >
                    自定义生命周期
                </Button>
            </FormButtonGroup>
        </FormProvider>
        </Printer>
    );
};

export default { component: LifeCase3Form, markdown:  md};
