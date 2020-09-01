import React from "react";
import { storiesOf } from "@storybook/react";

import { LayoutCase1Form } from "../views";

storiesOf(`布局方式/基本布局`, module).add(
    "官方扩展方式与自定义方式比较",
    () => <LayoutCase1Form.component></LayoutCase1Form.component>,
    {
        notes: { markdown: LayoutCase1Form.markdown || "" },
    }
);
