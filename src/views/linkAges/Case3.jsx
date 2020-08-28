import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SchemaForm, useValueLinkageEffect } from "@formily/antd"; // 或者 @formily/next
import { Input, Select } from "antd";
import "antd/dist/antd.css";

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

const LinkCase3Form = () => {
    const [value, setValue] = useState({});

    const useValueDisabledLinkageEffect = () => {
        useValueLinkageEffect({
            type: "value:disabled",
            resolve: ({ target }, { setFieldState }) => {
                setFieldState(target, (innerState) => {
                    innerState.props["x-component-props"] = {
                        disabled: true,
                    };
                });
            },
            reject: ({ target }, { setFieldState }) => {
                setFieldState(target, (innerState) => {
                    innerState.props["x-component-props"] = {
                        disabled: false,
                    };
                });
            },
        });
    };

    return (
        <SchemaForm
            components={{ Input, Select:CustomSelect }}
            effects={useValueDisabledLinkageEffect}
            schema={{
                type: "object",
                properties: {
                    aa: {
                        type: "string",
                        title: "aa",
                        enum: [
                            { label: "Disabled", value: true },
                            { label: "Undisabled", value: false },
                        ],
                        default: true,
                        "x-linkages": [
                            {
                                type: "value:disabled",
                                condition: "{{ !!$self.value }}",
                                target: "bb",
                            },
                        ],
                        "x-component": "Select",
                    },
                    bb: {
                        type: "string",
                        title: "bb",
                        "x-component": "Input",
                    },
                },
            }}
            onChange={(values) => {
                setValue(values);
            }}
        >
            {JSON.stringify(value, null, 2)}
        </SchemaForm>
    );
};

export default { component: LinkCase3Form, md: "" };
