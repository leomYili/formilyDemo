import React, { useState, useEffect } from "react";
import Printer from "@formily/printer";
import _ from "lodash";
import {
    SchemaForm,
    SchemaMarkupField,
    FormButtonGroup,
    FormEffectHooks,
    Submit,
    createFormActions,
    Schema,
} from "@formily/antd";
import { Input, Divider, Button, Select } from "antd";

import md from "./Case1.md";

const { Option } = Select;

const { onFieldValueChange$, onFieldInit$ } = FormEffectHooks;

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

const getInitialValues = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                daterange: ["2018-12-19", "2018-12-19"],
                aaa: "this is string",
                bbb: "2",
                ccc: ["2", "3", "4"],
            });
        }, 2000);
    });
};

const LinkCase2Form = () => {
    const [initialValues, setInitialValues] = useState({});

    const [conditionValue, setConditionValue] = useState("123");

    useEffect(() => {
        getInitialValues().then((initialValues) => {
            setInitialValues(initialValues);
        });
    }, []);

    const handleOnSubmit = () => {
        console.log(printSchema(actions.getFormSchema()));

        console.log(
            "自定义获取的values为:",
            actions.getFormState((state) => state.values)
        );

        actions.setFieldState("aaa",(state) => {

        })
    };

    const setFunc = _.debounce((e) => {
        setConditionValue(e.target.value);
    }, 500);

    const conditionChange = (e) => {
        e.persist();

        setFunc(e);
    };

    console.log("render?");

    return (
        <>
            <Printer>
                <SchemaForm
                    initialValues={initialValues}
                    components={{
                        input: Input,
                        select: CustomSelect,
                    }}
                    effects={({ setFieldState }) => {
                        let callback = (fieldState) => {
                            setFieldState("bbb", (state) => {
                                if (fieldState.value === conditionValue) {
                                    state.props.title = "这是新标题";
                                    state.props.enum = ["1", "2", "123"];
                                    state.props["x-component"] = "select";
                                } else {
                                    state.props.title = "这是默认标题";
                                    state.props.enum = "";
                                    state.props["x-component"] = "input";
                                }
                            });
                        };
                        onFieldInit$("aaa").pipe().subscribe(callback);
                        onFieldValueChange$("aaa").subscribe(callback);

                        onFieldValueChange$("bbb").subscribe((fieldState) => {
                            setFieldState("ccc", (state) => {
                                if (fieldState.value === "123") {
                                    state.editable = true;
                                } else {
                                    state.editable = false;
                                }
                            });
                        });
                    }}
                    actions={actions}
                    labelCol={7}
                    wrapperCol={12}
                    onSubmit={handleOnSubmit}
                >
                    <SchemaMarkupField
                        type="string"
                        title="aaa"
                        name="aaa"
                        x-component="input"
                    />
                    <SchemaMarkupField
                        type="string"
                        title="bbb"
                        name="bbb"
                        x-component="Input"
                    />
                    <SchemaMarkupField
                        type="string"
                        title="ccc"
                        name="ccc"
                        x-component="Input"
                    />
                    <FormButtonGroup itemStyle={{ marginLeft: 20 }} offset={7}>
                        <Submit>提交</Submit>
                    </FormButtonGroup>
                </SchemaForm>
            </Printer>
            <Divider />
            <Input
                defaultValue={conditionValue}
                onChange={conditionChange}
            ></Input>
        </>
    );
};

export default { component: LinkCase2Form, markdown: md };
