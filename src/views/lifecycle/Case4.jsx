import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    SchemaForm,
    SchemaMarkupField,
    FormItem,
    FormButtonGroup,
    FormEffectHooks,
    useFormEffects,
    createFormActions,
    Submit,
    Reset,
    Schema,
} from "@formily/antd"; // 或者 @formily/next
import Printer from "@formily/printer";
import { merge } from "rxjs";
import { Input, Select } from "antd"; // 或者@formily/next-components
import "antd/dist/antd.css";

import md from "./Case.md";

const actions = createFormActions();

const { onFieldValueChange$, onFieldInit$ } = FormEffectHooks;

const { Option } = Select;

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

const CustomComponent = () => {
    useFormEffects(($, { setFieldState }) => {
        setFieldState("aa", (state) => {
            state.value = 321;
        });
        onFieldValueChange$("aa").subscribe((fieldState) => {
            setFieldState("bb", (state) => {
                state.visible = fieldState.value === 123;
            });
        });
    });
    return (
        <div>
            <FormItem
                label="AA"
                dataSource={[
                    { label: "123", value: 123 },
                    { label: "321", value: 321 },
                ]}
                name="aa"
                component={CustomSelect}
            />
            <FormItem label="BB" name="bb" component={Input} />
        </div>
    );
};

const LifeCase4Form = () => {
    const handleOnSubmit = () => {
        console.log(printSchema(actions.getFormSchema()));

        console.log(
            "自定义获取的values为:",
            actions.getFormState((state) => state.values)
        );
    };

    return (
        <Printer>
            <SchemaForm
                labelCol={5}
                wrapperCol={14}
                actions={actions}
                components={{
                    Input,
                    CustomComponent,
                }}
                onSubmit={handleOnSubmit}
            >
                <SchemaMarkupField
                    title="自定义组件"
                    x-component="CustomComponent"
                />
                <SchemaMarkupField title="嵌套表单项" type="object" name="obj">
                    <div>
                        <SchemaMarkupField
                            name="aaa"
                            title="asdadasd"
                            x-component="Input"
                        ></SchemaMarkupField>
                    </div>
                </SchemaMarkupField>
                <FormButtonGroup itemStyle={{ marginLeft: 20 }} offset={7}>
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: LifeCase4Form, markdown: md };
