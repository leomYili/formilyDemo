import { createContext } from "react";

const FormContext = createContext({
    subscribe: () => {},
    dispatch: () => {},
    updateFormValues: () => {},
    getFormValues: () => {},
    getFormState: () => {},
    setErrors: () => {},
});

const { Provider, Consumer } = FormContext;

export { Provider, Consumer, FormContext };
