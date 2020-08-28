import React, { useState, useEffect } from "react";
import Printer from "@formily/printer";
import _ from "lodash";
import {
    SchemaForm,
    FormButtonGroup,
    Submit,
    createFormActions,
    Schema,
} from "@formily/antd";
import { Input, Divider, Button, Select } from "antd";

import md from "./Case1.md";

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

const LinkCase1Form = () => {
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
    };

    const setFunc = _.debounce((e) => {
        setConditionValue(e.target.value);
    }, 500);

    const conditionChange = (e) => {
        e.persist();

        setFunc(e);
    };

    return (
        <>
            <Printer>
                <SchemaForm
                    initialValues={initialValues}
                    components={{
                        input: Input,
                        select: CustomSelect,
                    }}
                    actions={actions}
                    labelCol={7}
                    wrapperCol={12}
                    onSubmit={handleOnSubmit}
                    schema={{
                        type: "object",
                        properties: {
                            aaa: {
                                type: "string",
                                title: "aaa",
                                "x-component": "input",
                                "x-linkages": [
                                    {
                                        type: "value:schema",
                                        target: "bbb",
                                        condition: `{{ $self.value == "${conditionValue}"}}`, //当值为符合条件值时发生联动
                                        schema: {
                                            //控制bbb字段的标题，如果不指定condition，默认会走到该处
                                            title: "这是新标题",
                                            enum: ["1", "2", "123"],
                                            "x-component": "select",
                                        },
                                        otherwise: {
                                            //条件不满足时控制bbb字段标题
                                            title: "这是默认标题",
                                            enum: "",
                                            "x-component": "input",
                                        },
                                    },
                                ],
                            },
                            bbb: {
                                type: "string",
                                title: "bbb",
                                "x-component": "input",
                                "x-linkages": [
                                    {
                                        type: "value:state",
                                        target: "ccc",
                                        condition: '{{ $self.value == "123"}}', //当值为123时发生联动
                                        state: {
                                            //控制bbb字段的可编辑状态，如果不指定condition，默认会走到该处
                                            editable: true,
                                        },
                                        otherwise: {
                                            //条件不满足时控制bbb字段的编辑状态
                                            editable: false,
                                        },
                                    },
                                ],
                            },
                            ccc: {
                                type: "string",
                                title: "ccc",
                                "x-component": "input",
                            },
                        },
                    }}
                >
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

export default { component: LinkCase1Form, markdown: md };
