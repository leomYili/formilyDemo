import React from "react";
import { SchemaForm, createEffectHook, createFormActions } from "@formily/antd";

import md from "./Case.md";

const actions = createFormActions();
const diyHook1$ = createEffectHook("diy1");
const diyHook2$ = createEffectHook("diy2");

const LifeCase1Form = () => {
    return (
        <SchemaForm
            actions={actions}
            effects={() => {
                diyHook1$().subscribe((payload) => {
                    console.log("diy1 hook triggered", payload);
                });

                diyHook2$().subscribe((payload) => {
                    console.log("diy2 hook triggered", payload);
                });
            }}
        >
            <button
                onClick={() => {
                    actions.notify("diy1", { index: 1 });
                }}
            >
                notify diy1
            </button>
            <button
                onClick={() => {
                    actions.notify("diy2", { index: 2 });
                }}
            >
                notify diy2
            </button>
        </SchemaForm>
    );
};

export default { component: LifeCase1Form, markdown: md };
