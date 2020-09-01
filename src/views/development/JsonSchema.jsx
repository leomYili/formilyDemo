import React, { useState, useEffect } from "react";
import Printer from "@formily/printer";
import {
    SchemaForm,
    FormButtonGroup,
    Submit,
    createFormActions,
    Schema,
} from "@formily/antd";
import { Input, Divider, Button, Select } from "antd";

import md from "./JsonSchema.md";

const { TextArea } = Input;
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

const JsonSchemaForm = () => {
    const [customSchema, setCustomSchema] = useState({
        type: "object",
        "x-component-props": {
            labelCol: 7,
            wrapperCol: 12,
        },
        properties: {
            username: {
                title: "用户名",
                "x-component": "input",
            },
        },
    });

    const handleOnSubmit = () => {
        console.log(printSchema(actions.getFormSchema()));

        console.log(
            "自定义获取的values为:",
            actions.getFormState((state) => state.values)
        );
    };

    const handleRefresh = () => {
        actions.reset({
            forceClear: true,
            validate: true,
            clearInitialValue: true,
        });
    };

    const handleOnGraph = () => {
        console.log(actions.getFormGraph());

        let nodes = actions.getFormGraph();

        nodes.username.props.title = "自定义字符串";

        console.log(nodes);

        actions.setFormGraph(nodes);
    };

    const handleReplaceSchema = (e) => {
        setCustomSchema(JSON.parse(e.target.value));
        // handleRefresh()
    };

    return (
        <>
            <Printer className="printer">
                <SchemaForm
                    components={{
                        input: Input,
                        select: CustomSelect,
                    }}
                    actions={actions}
                    labelCol={4}
                    wrapperCol={10}
                    initialValues={{ username: "11" }}
                    onSubmit={handleOnSubmit}
                    schema={customSchema}
                >
                    <FormButtonGroup itemStyle={{ marginLeft: 20 }} offset={7}>
                        <Submit>提交</Submit>
                        <Button onClick={handleRefresh}>
                            自定义重置(刷新schema的)
                        </Button>
                        <Button onClick={handleOnGraph}>
                            自定义设置FormGraph
                        </Button>
                    </FormButtonGroup>
                </SchemaForm>
            </Printer>
            <Divider />
            <h2>
                自定义schema(符合{" "}
                <a
                    style={{ display: "inline-block" }}
                    href="https://json-schema.org/understanding-json-schema/"
                >
                    JSON-SCHEMA规范
                </a>
                )
            </h2>
            <TextArea rows={10} onPressEnter={handleReplaceSchema} />
        </>
    );
};

export default { component: JsonSchemaForm, markdown: md };
