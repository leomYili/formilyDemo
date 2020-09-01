import React from "react";
import { storiesOf } from "@storybook/react";

import { ValueCase1Form, ValueCase2Form, ValueCase3Form } from "../views";

storiesOf(`传值属性/实例`, module)
    .add("value", () => <ValueCase1Form.component></ValueCase1Form.component>, {
        notes: { markdown: ValueCase1Form.markdown || "" },
    })
    .add(
        "defaultValue",
        () => <ValueCase2Form.component></ValueCase2Form.component>,
        {
            notes: { markdown: ValueCase2Form.markdown || "" },
        }
    )
    .add(
        "initialValues",
        () => <ValueCase3Form.component></ValueCase3Form.component>,
        {
            notes: { markdown: ValueCase3Form.markdown || "" },
        }
    );
