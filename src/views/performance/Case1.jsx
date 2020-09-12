import React, { useState } from "react";
import ReactDOM from "react-dom";
import { List } from "react-virtualized";
import { unstable_trace as trace } from "scheduler/tracing";
import {
    SchemaForm,
    Form,
    FormItem,
    SchemaMarkupField as Field,
    FormButtonGroup,
    createFormActions,
    FormEffectHooks,
    Submit,
} from "@formily/antd"; // 或者 @formily/next
import { Input, Select, Divider, Radio } from "antd";
import Printer from "@formily/printer";

const { Option } = Select;

const actions = createFormActions();

const getArray = () => {
    const num = 1000;

    let _arr = [];
    for (let i = 0; i < num; i++) {
        _arr.push({ label: `item${i}`, value: i });
    }
    return _arr;
};

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

const { onFieldValueChange$, onFormInit$, on } = FormEffectHooks;

const useOneToManyEffects = (openHostUpdate, $) => {
    console.log(openHostUpdate);
    onFieldValueChange$("aa").subscribe(({ label, value }) => {
        if (value === true) {
            trace("主动更新表单项状态", performance.now(), () => {
                if (openHostUpdate) {
                    actions.hostUpdate(() => {
                        /* setFieldState("card.*", (state) => {
                            state.value = "";
                        }); */
                        actions.setFieldValue("card.*", "");
                    });
                } else {
                    /* setFieldState("card.*", (state) => {
                        state.value = "";
                    }); */
                    actions.setFieldValue("card.*", "");
                }
            });
        }
    });
};

const Case1Form = () => {
    const [openHostUpdate, setOpenHostUpdate] = useState(false);

    const onRenderCallback = (
        id, // 发生提交的 Profiler 树的 “id”
        phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
        actualDuration, // 本次更新 committed 花费的渲染时间
        baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
        startTime, // 本次更新中 React 开始渲染的时间
        commitTime, // 本次更新中 React committed 的时间
        interactions // 属于本次更新的 interactions 的集合
    ) => {
        // 合计或记录渲染时间。。。
        console.info(
            `${id},本次更新提交花费的渲染时间:${actualDuration};预估渲染整颗子树的时间:${baseDuration}`
        );
    };

    return (
        <>
            <Radio.Group
                onChange={(e) => {
                    setOpenHostUpdate(e.target.value);
                }}
                value={openHostUpdate}
            >
                <Radio value={false}>默认</Radio>
                <Radio value={true}>开启</Radio>
            </Radio.Group>
            <React.Profiler id="formily-form" onRender={onRenderCallback}>
                <Printer>
                    <SchemaForm
                        components={{ Input, Select: CustomSelect }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                        actions={actions}
                        effects={useOneToManyEffects.bind(this, openHostUpdate)}
                    >
                        <Field
                            type="string"
                            enum={[
                                { label: "editable", value: true },
                                { label: "hidden", value: false },
                            ]}
                            default={false}
                            name="aa"
                            title="AA"
                            x-component="Select"
                        />
                        <Field type="object" name="card">
                            {getArray().map((item, index) => (
                                <Field
                                    key={index}
                                    type="string"
                                    name={item.label}
                                    default={item.value}
                                    title={item.label}
                                    x-component="Input"
                                />
                            ))}
                        </Field>
                        <FormButtonGroup>
                            <Submit>提交</Submit>
                        </FormButtonGroup>
                    </SchemaForm>
                </Printer>
            </React.Profiler>
        </>
    );
};

export default { component: Case1Form, markdown: "" };
