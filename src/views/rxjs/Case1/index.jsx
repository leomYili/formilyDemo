import React, { useLayoutEffect, useContext } from "react";
import { Button, Input } from "antd";
import { isEmpty } from "lodash";
import { Subject } from "rxjs";
import { distinctUntilChanged, filter, map, tap, last } from "rxjs/operators";

import { RXForm } from "./Form";
import { RXField } from "./Field";
import { RXFormValues } from "./FormValues";
import { required } from "./validations";

const CaseForm1 = () => {
    const handleOnSubmit = (values, setError) => {
        const errors = {};

        if (values.A.length === 0) {
            errors.A = "A没有值";
        }

        if (!isEmpty(errors)) {
            setError(errors);
        } else {
            console.log("正在提交!!", JSON.stringify(values, null, 2));
        }
    };

    return (
        <RXForm initialValues={{ A: "aaa", B: "bbb", C: "1212", D: "x" }}>
            {({ handleSubmit, updateFormValues }) => (
                <div style={{ width: "300px" }}>
                    <RXFormValues>
                        {({ formValues }) => (
                            <>
                                <RXField name="A">
                                    {(fieldProps) => {
                                        console.log("一直触发");
                                        return <Input {...fieldProps}></Input>;
                                    }}
                                </RXField>
                                {formValues.A === "A" && (
                                    <RXField name="C">
                                        {(fieldProps) => (
                                            <Input {...fieldProps}></Input>
                                        )}
                                    </RXField>
                                )}
                            </>
                        )}
                    </RXFormValues>
                    <RXField name="B">
                        {(fieldProps) => (
                            <>
                                <Button
                                    onClick={() => {
                                        updateFormValues({
                                            B: "&&&123",
                                        });
                                    }}
                                >
                                    设值
                                </Button>
                                <Input {...fieldProps}></Input>
                            </>
                        )}
                    </RXField>
                    <RXField name="D" validate={[required]}>
                        {(fieldProps) => {
                            console.log("按需更新");
                            return <Input {...fieldProps}></Input>;
                        }}
                    </RXField>
                    <Button
                        type="primary"
                        style={{ marginLeft: 10 }}
                        onClick={handleSubmit(handleOnSubmit)}
                    >
                        提交
                    </Button>
                </div>
            )}
        </RXForm>
    );
};

export default { component: CaseForm1, markdown: "" };
