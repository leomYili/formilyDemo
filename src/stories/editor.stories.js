import React from "react";
import { storiesOf } from "@storybook/react";

import { Editor } from "../views";

storiesOf("编辑器/schema编辑器", module).add(
    "formily原生",
    () => <Editor.component></Editor.component>,
    {
        notes: { markdown: Editor.markdown },
    }
);
