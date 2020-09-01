import React, { Fragment } from "react";
import {
    SchemaForm,
    SchemaMarkupField,
    SchemaField,
    FormButtonGroup,
    createFormActions,
    Submit,
} from "@formily/antd";
import {
    registerFormField,
    FormPath,
    InternalField,
    useFormEffects,
    FormEffectHooks,
} from "@formily/react-schema-renderer";
import { Input, Form, Divider } from "antd";

const FormItem = ({ component, ...props }) => {
    return (
        <InternalField {...props}>
            {({ state, mutators }) => {
                const messages = [].concat(
                    state.errors || [],
                    state.warnings || []
                );
                let status = "";
                if (state.loading) {
                    status = "validating";
                }
                if (state.invalid) {
                    status = "error";
                }
                if (state.warnings && state.warnings.length) {
                    status = "warning";
                }
                return (
                    <Form.Item
                        {...props}
                        help={
                            messages.length
                                ? messages
                                : props.help && props.help
                        }
                        validateStatus={status}
                    >
                        {React.createElement(component, {
                            ...state.props,
                            value: state.value,
                            onChange: mutators.change,
                            onBlur: mutators.blur,
                            onFocus: mutators.focus,
                        })}
                    </Form.Item>
                );
            }}
        </InternalField>
    );
};

//不用connect包装
const Complex = ({ path }) => {
    useFormEffects(({ setFieldState }) => {
        FormEffectHooks.onFieldValueChange$("ccc").subscribe(({ value }) => {
            if (value === "123") {
                setFieldState("ddd", (state) => {
                    state.value = "this is linkage relationship";
                });
            }
        });
    });

    return (
        <>
            <FormItem
                name={FormPath.parse(path).concat("aaa")}
                component={Input}
            />
            <FormItem
                name={FormPath.parse(path).concat("bbb")}
                component={Input}
            />
            <FormItem name="ccc" component={Input} />
            <FormItem name="ddd" component={Input} />
        </>
    );
};

const actions = createFormActions();

const Case5Form = () => {
    const handleOnSubmit = () => {
        console.log(
            "自定义获取的values为:",
            actions.getFormState((state) => state.values)
        );
    };

    return (
        <>
            <h2>自定义版本</h2>
            <SchemaForm
                components={{ Complex }}
                actions={actions}
                onSubmit={handleOnSubmit}
            >
                <SchemaMarkupField
                    name="username"
                    x-component="Complex"
                    x-rules={[
                        {
                            required: true,
                            message: "不可为空",
                        },
                    ]}
                    title="用户信息"
                />
                <FormButtonGroup>
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </>
    );
};

export default { component: Case5Form, markdown: `` };
