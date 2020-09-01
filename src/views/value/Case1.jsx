import React, { useState } from "react";
import {
    SchemaForm,
    SchemaMarkupField as Field,
    FormButtonGroup,
    Submit,
    Reset,
} from "@formily/antd";
import { Button, Input } from "antd";
import Printer from "@formily/printer";

import md from "./case1.md";

const CustomInput = (props) => {
    console.log("render?");
    return (
        <input
            value={props.value || ""}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );
};

const ValueCase1Form = () => {
    const [value, setValue] = useState({
        aa: "first render value",
        bb: "11111",
    });
    return (
        <Printer>
            <SchemaForm
                value={value}
                components={{
                    Input,
                    CustomInput,
                }}
            >
                <Field type="string" name="aa" x-component="Input" />
                <Field type="string" name="bb" x-component="CustomInput" />
                <FormButtonGroup>
                    <Submit>提交</Submit>
                    <Button
                        onClick={() => {
                            setValue({
                                ...value,
                                aa: Math.random() * 1000 + "",
                            });
                        }}
                    >
                        刷新
                    </Button>
                    <Reset>重置会置空数据</Reset>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: ValueCase1Form, markdown: md };
