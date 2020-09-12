import React from "react";
import {
    SchemaForm,
    SchemaMarkupField,
    SchemaField,
    Submit,
    FormPath,
    FormButtonGroup,
    createFormActions,
} from "@formily/antd";
import Printer from "@formily/printer";
import { Button, Select, Input } from "antd";

import md from "./case3.md";

const { Option } = Select;

const actions = createFormActions();

const getArray = () => {
    const num = 50;

    let _arr = [];
    for (let i = 0; i < num; i++) {
        _arr.push({});
    }
    return _arr;
};

const CustomSelect = (props) => {
    console.log(props.dataSource);
    return (
        <Select
            style={{ width: 100 }}
            value={props.value}
            onChange={props.onChange}
        >
            {props.dataSource &&
                props.dataSource.map((item, index) => (
                    <Option key={item.value} value={item.value}>
                        {item.value}
                    </Option>
                ))}
        </Select>
    );
};

CustomSelect.isFieldComponent = true;

const SelfIncList = ({ schema, value, path, mutators }) => {
    const props = schema.getExtendsComponentProps();
    const dataSource = schema.enum || [];

    console.log(schema);

    return (
        <>
            {value.map((_, key) => {
                return (
                    <div key={key} style={{ display: "flex" }}>
                        <SchemaField
                            path={FormPath.parse(path).concat(key)}
                            schema={schema.items}
                        />
                        <Button
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                                mutators.remove(key);
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                );
            })}
            <Button
                onClick={() => {
                    mutators.push(schema.items.getEmptyValue());
                }}
            >
                Add
            </Button>
        </>
    );
};

SelfIncList.isFieldComponent = true;

const Case3Form = () => {
    const handleOnClick = () => {
        actions.hostUpdate(() => {
            actions.setFieldState("aa.*", (state) => {
                state.editable = false;
            });
        });
    };

    return (
        <Printer>
            <SchemaForm
                components={{
                    Input,
                    Select: CustomSelect,
                    SelfIncList,
                }}
                initialValues={{
                    aa: getArray(),
                }}
                actions={actions}
                onSubmit={console.info}
            >
                <SchemaMarkupField
                    name="aa"
                    type="array"
                    x-component="SelfIncList"
                >
                    <SchemaMarkupField type="object">
                        <SchemaMarkupField
                            name="bb"
                            title="输入项"
                            type="string"
                            default=""
                            x-component="Input"
                        />
                        <SchemaMarkupField
                            name="cc"
                            title="选择项"
                            type="string"
                            enum={["1", "2", "3"]}
                            x-component="Select"
                        />
                    </SchemaMarkupField>
                </SchemaMarkupField>
                <FormButtonGroup>
                    <Submit>提交</Submit>
                </FormButtonGroup>
                <Button onClick={handleOnClick}>切换可编辑状态</Button>
            </SchemaForm>
        </Printer>
    );
};

export default { component: Case3Form, markdown: md };
