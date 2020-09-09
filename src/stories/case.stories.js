import React from "react";
import { storiesOf } from "@storybook/react";

import {
    Case1Form,
    Case2Form,
    Case3Form,
    Case4Form,
    Case5Form,
    LinkCase1Form,
    LinkCase2Form,
    LinkCase3Form,
    LinkCase4Form,
    LifeCase1Form,
    LifeCase2Form,
    LifeCase3Form,
    LifeCase4Form,
    ValidateCase1Form,
    ValidateCase2Form,
    ValidateCase3Form,
    ExtendsCase1Form,
    ExtendsCase2Form,
    ExtendsCase3Form,
    ExtendsCase4Form,
} from "../views";

storiesOf(`案例/异步更新`, module).add(
    "查询列表页",
    () => <Case1Form.component></Case1Form.component>,
    {
        notes: { markdown: Case1Form.markdown || "" },
    }
);

storiesOf(`案例/表单联动`, module)
    .add(
        "联动协议",
        () => <LinkCase1Form.component></LinkCase1Form.component>,
        {
            notes: { markdown: LinkCase1Form.markdown || "" },
        }
    )
    .add(
        "联动协议转换版",
        () => <LinkCase2Form.component></LinkCase2Form.component>,
        {
            notes: { markdown: LinkCase2Form.markdown || "" },
        }
    )
    .add(
        "扩展联动协议",
        () => <LinkCase3Form.component></LinkCase3Form.component>,
        {
            notes: { markdown: LinkCase3Form.markdown || "" },
        }
    )
    .add(
        "jsx原生联动",
        () => <LinkCase4Form.component></LinkCase4Form.component>,
        {
            notes: { markdown: LinkCase4Form.markdown || "" },
        }
    );

storiesOf(`案例/生命周期`, module)
    .add(
        "自定义hook",
        () => <LifeCase1Form.component></LifeCase1Form.component>,
        {
            notes: { markdown: LifeCase1Form.markdown || "" },
        }
    )
    .add(
        "字段联动",
        () => <LifeCase2Form.component></LifeCase2Form.component>,
        {
            notes: { markdown: LifeCase2Form.markdown || "" },
        }
    )
    .add(
        "外部监听",
        () => <LifeCase3Form.component></LifeCase3Form.component>,
        {
            notes: { markdown: LifeCase3Form.markdown || "" },
        }
    )
    .add(
        "自定义组件",
        () => <LifeCase4Form.component></LifeCase4Form.component>,
        {
            notes: { markdown: LifeCase4Form.markdown || "" },
        }
    );

storiesOf(`案例/表单校验`, module)
    .add("静态校验", () => <ValidateCase1Form.component />, {
        notes: { markdown: ValidateCase1Form.markdown || "" },
    })
    .add("联动校验", () => <ValidateCase2Form.component />, {
        notes: { markdown: ValidateCase2Form.markdown || "" },
    })
    .add("函数式校验", () => <ValidateCase3Form.component />, {
        notes: { markdown: ValidateCase3Form.markdown },
    });

storiesOf(`案例/复杂案例`, module)
    .add("自定义递归渲染", () => <Case2Form.component />, {
        notes: { markdown: Case2Form.markdown || "" },
    })
    .add("自定义自增列表渲染", () => <Case3Form.component />, {
        notes: { markdown: Case3Form.markdown || "" },
    })
    .add("拓展自增列表渲染(官方版)", () => <Case4Form.component />, {
        notes: { markdown: Case4Form.markdown || "" },
    })
    .add(
        "超复杂自定义组件(嵌套过深带来的通信)",
        () => <Case5Form.component />,
        {
            notes: { markdown: Case5Form.markdown || "" },
        }
    );

storiesOf(`案例/表单扩展`, module)
    .add("Form自身扩展", () => <ExtendsCase1Form.component />, {
        notes: { markdown: ExtendsCase1Form.markdown || "" },
    })
    .add("FormItem扩展", () => <ExtendsCase2Form.component />, {
        notes: { markdown: ExtendsCase2Form.markdown || "" },
    })
    .add("VirtualField布局组件扩展", () => <ExtendsCase3Form.component />, {
        notes: { markdown: ExtendsCase3Form.markdown || "" },
    })
    .add("Effect扩展", () => <ExtendsCase4Form.component />, {
        notes: { markdown: ExtendsCase4Form.markdown || "" },
    });
