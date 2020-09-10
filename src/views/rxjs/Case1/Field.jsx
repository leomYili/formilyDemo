import { get, isUndefined } from "lodash";
import React, { useContext, useLayoutEffect, useMemo, useState } from "react";
import { Subject } from "rxjs/internal/Subject";
import { distinctUntilChanged, filter, map, tap } from "rxjs/operators";
import { isFieldDirty, pickValue, validateField } from "./FormHelps";
import { FormContext } from "./FormContext";
import { useValueRef } from "./utils";

import { FormActionTypes, FieldActionTypes } from "./constant";

/* interface IFieldProps {
  name: string;
  children: TChildrenRender<IFieldInnerProps>;
  defaultValue?: TFieldValue;
  validate?: TValidator | TValidator[];
  format?: (value: TFieldValue) => TFieldValue;
  parse?: (value: TFieldValue) => TFieldValue;
  normalize?: (value: TFieldValue) => TFieldValue;
  endEffects: (func) => func
  destroyValueOnUnmount?: boolean;
} */

const getFieldValue = ({ defaultValue, formValues, prefixedName }) => {
    const initialValue = get(formValues, prefixedName);
    if (!isUndefined(initialValue)) {
        return initialValue;
    }
    return defaultValue;
};

export function RXField(props) {
    const {
        dispatch,
        subscribe,
        subscribeFormAction,
        getFormValues,
        fieldPrefix,
    } = useContext(FormContext);
    const prefixedName = `${fieldPrefix || ""}${props.name}`;

    const defaultFieldValue = getFieldValue({
        defaultValue: props.defaultValue,
        formValues: getFormValues(),
        prefixedName,
    });

    const [fieldValue, setFieldValue] = useState(defaultFieldValue);
    const [fieldMeta, setFieldMeta] = useState({});
    const fieldValueRef = useValueRef(fieldValue);
    const fieldMetaRef = useValueRef(fieldMeta);
    const propsRef = useValueRef(props);

    const {
        registerField,
        triggerChange,
        onFocus,
        onChange,
        onBlur,
        formatValue,
    } = useMemo(() => {
        const parseValue = (value) => {
            const { parse, normalize } = propsRef.current || {};
            if (parse && typeof parse === "function") {
                value = parse(value);
            }

            if (normalize && typeof normalize === "function") {
                value = normalize(value);
            }

            return value;
        };

        const triggerChange = (evtOrValue, otherMeta) => {
            const { validate } = propsRef.current || {};
            const value = parseValue(pickValue(evtOrValue));
            const dirty = isFieldDirty(value, defaultFieldValue); // use `defaultValue` here previously

            const meta = {
                ...otherMeta,
                error: validateField(value, validate),
                dirty,
            };

            dispatch({
                name: prefixedName,
                type: FieldActionTypes.change,
                meta,
                payload: value,
            });
        };

        return {
            registerField: ({ value, meta }) => {
                dispatch({
                    name: prefixedName,
                    type: FieldActionTypes.register,
                    meta,
                    payload: parseValue(value),
                });
            },
            onFocus: () => {
                dispatch({
                    name: prefixedName,
                    type: FieldActionTypes.focus,
                    meta: {
                        visited: true,
                    },
                });
            },
            triggerChange,
            onChange: (evtOrValue) => triggerChange(evtOrValue),
            onBlur: (evtOrValue) => {
                const value = pickValue(evtOrValue);
                dispatch({
                    name: prefixedName,
                    type: FieldActionTypes.blur,
                    meta: {
                        visited: true,
                        touched: true,
                    },
                    payload: parseValue(value),
                });
            },
            formatValue: (value) => {
                const { format, normalize } = propsRef.current || {};
                if (format && typeof format === "function") {
                    value = format(value);
                }

                if (normalize && typeof normalize === "function") {
                    value = normalize(value);
                }

                return value;
            },
        };
    }, []);

    useLayoutEffect(() => {
        let formStateSubscription = null;
        let formActionSubscription = null;

        const onFormStateChange = () => {
            const formStateObserver$ = new Subject();

            formStateObserver$
                .pipe(
                    map(({ fields, values }) => ({
                        meta: fields[prefixedName],
                        value: get(values, prefixedName),
                    })),
                    distinctUntilChanged(
                        (next, prev) =>
                            next.meta === prev.meta && prev.value === next.value
                    ),
                    tap(({ meta, value }) => {
                        if (meta || value) {
                            setFieldValue(value);
                            setFieldMeta(meta);
                        }
                    })
                )
                .subscribe();

            formStateSubscription = subscribe(formStateObserver$); // 注册状态监听器
        };

        const onFormActionChange = () => {
            const formActionObserver$ = new Subject();

            formActionObserver$
                .pipe(
                    filter(({ type }) => type === FormActionTypes.startSubmit),
                    tap(() =>
                        triggerChange(fieldValueRef.current, {
                            ...fieldMetaRef.current,
                            visited: true,
                            touched: true,
                        })
                    )
                )
                .subscribe();

            formActionSubscription = subscribeFormAction(formActionObserver$); // 注册行为监听器
        };

        onFormStateChange();
        onFormActionChange();

        registerField({
            value: fieldValueRef.current,
            meta: fieldMetaRef.current,
        });

        return () => {
            dispatch({
                name: prefixedName,
                type: FieldActionTypes.destroy,
                meta: {
                    destroyValueOnUnmount: (propsRef.current || {})
                        .destroyValueOnUnmount,
                },
            });

            if (formStateSubscription) {
                formStateSubscription.unsubscribe();
            }
            if (formActionSubscription) {
                formActionSubscription.unsubscribe();
            }
        };
    }, []);

    console.log(fieldMeta);

    return (
        <div style={{ margin: 10 }}>
            {props.children({
                value: formatValue(fieldValueRef.current),
                meta: fieldMeta,
                name: prefixedName,
                onChange,
                onFocus,
                onBlur,
            })}
            <p style={{ color: "red" }}>{fieldMeta.error}</p>
        </div>
    );
}
