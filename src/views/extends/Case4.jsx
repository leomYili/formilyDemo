import React from "react";
import ReactDOM from "react-dom";
import {
    SchemaForm,
    SchemaMarkupField as Field,
    FormEffectHooks,
    createEffectHook,
    createFormActions,
} from "@formily/antd"; // 或者 @formily/next
import { Input, Select, Button } from "antd";

import md from "./case4.md";

const { Option } = Select;

const { onFieldValueChange$ } = FormEffectHooks;

const customEvent$ = createEffectHook("custom_event");

const CustomSelect = (props) => {
    console.log(props);

    return (
        <Select value={props.value} onChange={props.onChange}>
            {props.dataSource.map((item, index) => (
                <Option key={index} value={item.value}>
                    {item.label}
                </Option>
            ))}
        </Select>
    );
};

const useMyEffect = () => {
    const { setFieldState } = createFormActions(); //局部actions，它会继承全局actions
    onFieldValueChange$("aa").subscribe(({ value }) => {
        setFieldState("bb", (state) => {
            state.visible = value;
        });
    });
    customEvent$().subscribe(() => {
        setFieldState("bb", (state) => {
            state.visible = !state.visible;
        });
    });
};

const actions = createFormActions();

const Case4Form = () => {
    return (
        <SchemaForm
            actions={actions}
            components={{ Input, Select: CustomSelect }}
            labelCol={7}
            wrapperCol={12}
            effects={useMyEffect}
        >
            <Field
                type="string"
                name="aa"
                title="AA"
                x-component="Select"
                enum={[
                    { label: "Visible", value: true },
                    { label: "Hidden", value: false },
                ]}
            />
            <Field type="string" name="bb" title="BB" x-component="Input" />
            <Button
                onClick={() => {
                    actions.dispatch("custom_event");
                }}
            >
                Click
            </Button>
        </SchemaForm>
    );
};

export default { component: Case4Form, markdown: md };
