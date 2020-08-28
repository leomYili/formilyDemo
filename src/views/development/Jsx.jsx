import React from "react";
import { Form, Field } from "@formily/react";
import Printer from "@formily/printer";
import {
    Form as BForm,
    FormItem,
    FormButtonGroup,
    Submit,
    createFormActions,
    createAsyncFormActions,
} from "@formily/antd";
import { Input, Row, Col, Button } from "antd";
import md from "./Jsx.md";

const action1 = createAsyncFormActions();
const action2 = createFormActions();

const JsxForm = () => {
    return (
        <>
            <Form actions={action1}>
                <div
                    style={{
                        padding: 20,
                        margin: 20,
                        border: "1px solid red",
                    }}
                >
                    Form组件内部可以随便插入UI元素了
                </div>
                <Row>
                    <Col span={6} style={{ textAlign: "right" }}>
                        别名:
                    </Col>
                    <Col span={12} offset={1}>
                        <Field
                            name="alias"
                            initialValue="121"
                            rules={[
                                {
                                    required: true,
                                    message: "别名不可为空",
                                },
                                {
                                    format: "number",
                                    message: "id is not a number.",
                                },
                            ]}
                        >
                            {({ state, mutators }) => (
                                <React.Fragment>
                                    <Input
                                        disabled={!state.editable}
                                        value={state.value || ""}
                                        onChange={mutators.change}
                                        onBlur={mutators.blur}
                                        onFocus={mutators.focus}
                                    />
                                    {state.errors}
                                    {state.warnings}
                                </React.Fragment>
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col offset={7}>
                        <Button
                            onClick={() => {
                                const result = action1.validate();

                                action1
                                    .getFormState((state) => state.values)
                                    .then((data) => {
                                        console.log("自定义提取values:", data);
                                    });

                                result.then((validateResp) => {
                                    console.log(validateResp);
                                });
                            }}
                        >
                            自定义提交
                        </Button>
                    </Col>
                </Row>
            </Form>
            <BForm
                actions={action2}
                labelCol={7}
                wrapperCol={12}
                initialValues={{ username: "用户" }}
                onSubmit={console.info}
            >
                <div
                    style={{
                        padding: 20,
                        margin: 20,
                        border: "1px solid red",
                    }}
                >
                    UI元素排序方式符合书写逻辑
                </div>
                <FormItem
                    label="用户名"
                    name="username"
                    component={Input}
                    rules={[{ required: true, message: "用户名不可为空" }]}
                />
                <FormButtonGroup
                    style={{ marginTop: 20 }}
                    itemStyle={{ marginLeft: 20 }}
                    offset={7}
                >
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </BForm>
        </>
    );
};

export default { component: JsxForm, markdown: md };
