import {
    isEqual,
    isArray,
    isUndefined,
    isObject,
    isEmpty,
    keys,
    mapValues,
    omit,
    reduce,
    set,
} from "lodash";

export const formUpdateField = (state, action) => {
    const { fields, values } = state;
    const { payload, meta = {}, name } = action;
    return {
        fields: {
            ...fields,
            [name]: {
                ...fields[name],
                ...meta,
            },
        },
        values: set({ ...values }, name, payload), // Notice: _.set will mutate object,
    };
};

export const formFocusField = (state, action) => {
    const { fields, values } = state;
    const { name, meta } = action;
    return {
        values,
        fields: {
            ...fields,
            [name]: {
                ...meta,
            },
        },
    };
};

export const formRemoveField = (state, action) => {
    if (action.meta && action.meta.destroyValueOnUnmount) {
        return {
            fields: omit(state.fields, action.name),
            values: omit(state.values, action.name),
        };
    }

    return {
        ...state,
        fields: omit(state.fields, action.name),
    };
};

export const formUpdateValues = (formState) => {
    return (formValues) => ({
        fields: formState.fields,
        values: { ...formState.values, ...formValues },
    });
};

export const formSetErrors = (errors, fields) => {
    if (isEmpty(errors)) {
        return mapValues(fields, (field) => {
            return {
                ...field,
                error: undefined,
            };
        });
    }

    const temp = {};
    keys(errors).forEach((name) => {
        if (fields[name]) {
            temp[name] = {
                ...fields[name],
                error: errors[name],
            };
        }
    });
    return {
        ...fields,
        ...temp,
    };
};

export const isFormValid = (fields) => {
    return reduce(
        fields,
        (result, item) => result && item && !item.error,
        true
    );
};

export const isFieldDirty = (value, defaultValue) => {
    return !isEqual(value, defaultValue);
};

export const validateField = (value, validate) => {
    if (isUndefined(validate)) {
        return;
    }

    if (isArray(validate)) {
        return combineValidators(validate)(value);
    }

    if (typeof validate === "function") {
        return validate(value);
    }

    return;
};

export const combineValidators = (validators) => {
    return (value) => {
        return reduce(
            validators,
            (error, validator) => {
                return error || validateField(value, validator);
            },
            undefined
        );
    };
};

export const pickValue = (evtOrValue) => {
    const isEvent = isObject(evtOrValue) && evtOrValue.target;
    return isEvent ? evtOrValue.target.value : evtOrValue;
};
