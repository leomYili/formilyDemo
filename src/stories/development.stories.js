import React from "react";
import { storiesOf } from "@storybook/react";

import { JsxForm, JsonSchemaForm, JsxSchemaForm } from "../views";

storiesOf(`开发模式/纯JSX`, module).add(
    "JSX",
    () => <JsxForm.component></JsxForm.component>,
    {
        notes: { markdown: JsxForm.markdown || "" },
    }
);

storiesOf(`开发模式/JSON-Schema`, module).add(
    "formily json schema ",
    () => <JsonSchemaForm.component></JsonSchemaForm.component>,
    {
        notes: { markdown: JsonSchemaForm.markdown || "" },
    }
);

storiesOf(`开发模式/Jsx-Schema`, module).add(
    "混合模式",
    () => <JsxSchemaForm.component></JsxSchemaForm.component>,
    {
        notes: { markdown: JsxSchemaForm.markdown || "" },
    }
);
