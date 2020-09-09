import React, { useLayoutEffect, useContext } from "react";
import { Button, Input } from "antd";
import { Subject } from "rxjs";
import { distinctUntilChanged, filter, map, tap, last } from "rxjs/operators";

import { RXForm } from "./Form";
import { RXField } from "./Field";
import { RXFormValues } from "./FormValues";

const CaseForm1 = () => {
    const handleOnSubmit = (values) => {
        console.log("正在提交!!", JSON.stringify(values, null, 2));
    };

    return (
        <RXForm initialValues={{ A: "aaa", B: "bbb", C: "1212" }}>
            {({ handleSubmit }) => (
                <RXFormValues>
                    {({ formValues, updateFormValues }) => (
                        <div style={{ width: "300px" }}>
                            <RXField name="A">
                                {(fieldProps) => (
                                    <Input {...fieldProps}></Input>
                                )}
                            </RXField>
                            <RXField name="B">
                                {(fieldProps) => (
                                    <>
                                        <Button
                                            onClick={() => {
                                                updateFormValues({
                                                    B: "&&&123",
                                                    C: "cds"
                                                });
                                            }}
                                        >
                                            设值
                                        </Button>
                                        <Input {...fieldProps}></Input>
                                    </>
                                )}
                            </RXField>
                            {formValues.A === "A" && (
                                <RXField name="C">
                                    {(fieldProps) => (
                                        <Input {...fieldProps}></Input>
                                    )}
                                </RXField>
                            )}
                            <Button
                                type="primary"
                                style={{ marginLeft: 10 }}
                                onClick={handleSubmit(handleOnSubmit)}
                            >
                                提交
                            </Button>
                        </div>
                    )}
                </RXFormValues>
            )}
        </RXForm>
    );
};

export default { component: CaseForm1, markdown: "" };
