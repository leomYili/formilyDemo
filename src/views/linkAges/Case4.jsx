import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
    SchemaForm,
    SchemaMarkupField as Field,
    FormButtonGroup,
    createFormActions,
    FormEffectHooks,
    Submit,
} from "@formily/antd"; // 或者 @formily/next
import { Input, Select } from "antd";
import Printer from "@formily/printer";
import "antd/dist/antd.css";

const { Option } = Select;

const CustomSelect = (props) => {
    return (
        <Select value={props.value} onChange={props.onChange}>
            {props.dataSource &&
                props.dataSource.map((item, index) => (
                    <Option key={item.value} value={item.value}>
                        {item.label}
                    </Option>
                ))}
        </Select>
    );
};

const { onFieldValueChange$ } = FormEffectHooks;

const useOneToManyEffects = (setFly) => {
    const { setFieldState } = createFormActions();
    onFieldValueChange$("aa").subscribe(({ value }) => {
        setFieldState("*(bb,cc,dd,ff,card)", (state) => {
            state.value = "";
            state.visible = value;
        });
    });

    onFieldValueChange$("bb").subscribe(({ value }) => {
        if (value === "123") {
            setFieldState("*(cc,dd)", (state) => {
                state.value = "";
                //state.visible = false;
            });

            setFly(2);
        } else {
            setFieldState("cc", (state) => {
                state.visible = true;
            });

            setFly(1);
        }
    });
};

const Case4Form = () => {
    const [fly, setFly] = useState(1);

    return (
        <Printer>
            <SchemaForm
                components={{ Input, Select: CustomSelect }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                effects={useOneToManyEffects.bind(this, setFly)}
            >
                <Field
                    type="string"
                    enum={[
                        { label: "visible", value: true },
                        { label: "hidden", value: false },
                    ]}
                    default={false}
                    name="aa"
                    title="AA"
                    x-component="Select"
                />
                <Field type="string" name="bb" title="BB" x-component="Input" />
                <Field type="string" name="cc" title="CC" x-component="Input" />
                {fly === 1 && (
                    <Field
                        type="string"
                        name="dd"
                        title="DD"
                        x-component="Input"
                    />
                )}
                <Field type="object" name="card">
                    <Field
                        type="string"
                        name="dd"
                        title="c-DD"
                        x-component="Input"
                    />
                    <Field
                        type="string"
                        name="ff"
                        title="c-FF"
                        x-component="Input"
                    />
                </Field>
                <FormButtonGroup>
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: Case4Form, markdown: "" };
