import React, { useMemo } from "react";
import { BehaviorSubject, Subject } from "rxjs";

import {
    isFormValid,
    formFocusField,
    formUpdateField,
    formUpdateValues,
    formSetErrors,
    formRemoveField,
} from "./FormHelps";
import { FieldActionTypes, FormActionTypes } from "./constant";
import { Provider } from "./FormContext";

export function RXForm(props) {
    const { handleSubmit, ...CTXValue } = useMemo(() => {
        const formStateSubject$ = new BehaviorSubject({
            fields: {},
            values: JSON.parse(JSON.stringify(props.initialValues)) || {},
        });
        const formActionSubject$ = new Subject();

        const dispatch = (action) => {
            const prevState = JSON.parse(
                JSON.stringify(formStateSubject$.getValue())
            );

            switch (action.type) {
                case FieldActionTypes.register:
                case FieldActionTypes.blur:
                case FieldActionTypes.change: {
                    const nextFormState = formUpdateField(
                        formStateSubject$.getValue(),
                        action
                    );
                    formStateSubject$.next(nextFormState);
                    break;
                }
                case FieldActionTypes.focus: {
                    const nextFormState = formFocusField(
                        formStateSubject$.getValue(),
                        action
                    );
                    formStateSubject$.next(nextFormState);
                    break;
                }
                case FieldActionTypes.destroy: {
                    const nextFormState = formRemoveField(
                        formStateSubject$.getValue(),
                        action
                    );
                    formStateSubject$.next(nextFormState);
                    break;
                }
                case FormActionTypes.startSubmit: {
                    notifyFormActionChange(action);
                    break;
                }
                default:
                    break;
            }

            const nextState = formStateSubject$.getValue();

            console.info({
                action,
                prevState,
                nextState,
            });
        };

        const notifyFormActionChange = (action) => {
            formActionSubject$.next(action);
        };

        const setErrors = (errors) => {
            const fromState = formStateSubject$.getValue();
            const nextFormState = {
                values: fromState.values,
                fields: formSetErrors(errors, fromState.fields),
            };

            formStateSubject$.next(nextFormState);
        };

        const getFormValues = () => {
            return formStateSubject$.getValue().values;
        };

        const getFormState = () => {
            return formStateSubject$.getValue();
        };

        return {
            subscribe: (observer) => {
                return formStateSubject$.subscribe(observer);
            },
            dispatch,
            subscribeFormAction: (observer) => {
                return formActionSubject$.subscribe(observer);
            },
            updateFormValues: (formValues) => {
                const nextFormState = formUpdateValues(
                    formStateSubject$.getValue()
                )(formValues);
                formStateSubject$.next(nextFormState);
            },
            getFormValues,
            getFormState,
            setErrors,
            handleSubmit: (onSubmit) => {
                return (evt) => {
                    evt.preventDefault();

                    dispatch({
                        type: FormActionTypes.startSubmit,
                    });

                    if (!isFormValid(formStateSubject$.getValue().fields)) {
                        return;
                    }

                    onSubmit(getFormValues(), setErrors);

                    dispatch({
                        type: FormActionTypes.endSubmit,
                    });
                };
            },
        };
    }, []);

    return (
        <Provider value={CTXValue}>
            {props.children({
                handleSubmit,
                updateFormValues: CTXValue.updateFormValues,
            })}
        </Provider>
    );
}
