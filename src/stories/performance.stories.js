import React from "react";
import { storiesOf } from "@storybook/react";

import {
    PerformanceCase1Form,
    PerformanceCase2Form,
    PerformanceCase3Form,
} from "../views";

storiesOf(`性能优化/一次渲染与多次渲染`, module)
    .add(
        "formily大型表单",
        () => <PerformanceCase1Form.component></PerformanceCase1Form.component>,
        {
            notes: { markdown: PerformanceCase1Form.markdown || "" },
        }
    )
    .add(
        "Antd V3 Form",
        () => <PerformanceCase2Form.component></PerformanceCase2Form.component>,
        {
            notes: { markdown: PerformanceCase2Form.markdown || "" },
        }
    )
    .add(
        "Antd V4 Form",
        () => <PerformanceCase3Form.component></PerformanceCase3Form.component>,
        {
            notes: { markdown: PerformanceCase3Form.markdown || "" },
        }
    );
