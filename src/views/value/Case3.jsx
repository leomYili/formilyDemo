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

const CustomInput = (props) => {
    console.log("render?");
    return (
        <input
            value={props.value || ""}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );
};

const ValueCase2Form = () => {
    const [value, setValue] = useState({
        aa: "first render value",
    });
    return (
        <Printer>
            <SchemaForm
                initialValues={value}
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
                                bb: 1000,
                                aa: Math.random() * 1000 + "",
                            });
                        }}
                    >
                        刷新
                    </Button>
                    <Reset>重置</Reset>
                    <Reset forceClear>清空</Reset>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default {
    component: ValueCase2Form,
    markdown: `默认值则不会被重置,除非重置函数传参进行置空`,
};
