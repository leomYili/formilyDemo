import { isEqual } from "lodash";
import { useContext, useLayoutEffect, useState } from "react";
import { Subject } from "rxjs/internal/Subject";
import { Subscription } from "rxjs/internal/Subscription";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { FormContext } from "./FormContext";

export function RXFormValues(props) {
    const { updateFormValues, getFormValues, subscribe } = useContext(
        FormContext
    );
    const defaultFormValues = getFormValues();
    const [formValues, setFormValues] = useState(defaultFormValues);

    useLayoutEffect(() => {
        let subscription = null;

        const formStateObserver$ = new Subject();
        formStateObserver$
            .pipe(
                map((formState) => ({
                    ...formState.values,
                })),
                distinctUntilChanged(isEqual),
                tap((values) => setFormValues(values))
            )
            .subscribe();

        subscription = subscribe(formStateObserver$);

        return () => {
            if (subscription) {
                subscription.unsubscribe();
                subscription = null;
            }
        };
    }, []);

    return props.children({
        formValues,
        updateFormValues,
    });
}
