import React from "react";
import { storiesOf } from "@storybook/react";

import { RXCase1Form } from "../views";

storiesOf(`RXJS结合Form/基本用例`, module).add(
    "模拟formily",
    () => <RXCase1Form.component></RXCase1Form.component>,
    {
        notes: { markdown: RXCase1Form.markdown || "" },
    }
);
