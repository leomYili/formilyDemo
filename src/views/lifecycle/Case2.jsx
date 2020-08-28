import React from "react";
import {
    SchemaForm,
    SchemaMarkupField as Field,
    FormButtonGroup,
    LifeCycleTypes,
    Submit,
    createFormActions,
    Reset,
} from "@formily/antd"; // 或者 @formily/next
import Printer from "@formily/printer";
import { merge } from "rxjs";
import { Input, Select } from "antd"; // 或者@formily/next-components
import "antd/dist/antd.css";

import md from "./Case.md";

const { Option } = Select;

const actions = createFormActions();

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
    Select: CustomSelect,
};

const LifeCase2Form = () => {
    return (
        <Printer>
            <SchemaForm
                labelCol={5}
                actions={actions}
                wrapperCol={14}
                components={components}
                effects={($, { setFieldState }) => {
                    $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
                        setFieldState("aa", (state) => {
                            state.value = 321;
                        });
                    });
                    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, "aa").subscribe(
                        (fieldState) => {
                            setFieldState("bb", (state) => {
                                state.visible = fieldState.value === 123;
                            });
                        }
                    );
                }}
            >
                <Field
                    type="string"
                    title="AA"
                    enum={[
                        { label: "123", value: 123 },
                        { label: "321", value: 321 },
                    ]}
                    name="aa"
                    x-component="Select"
                />
                <Field type="string" title="BB" name="bb" x-component="Input" />
                <FormButtonGroup offset={5}>
                    <Submit>查询</Submit>
                    <Reset>重置</Reset>
                </FormButtonGroup>
            </SchemaForm>
        </Printer>
    );
};

export default { component: LifeCase2Form, markdown: md };
