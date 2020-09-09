import {useRef} from "react";

export const useValueRef = (value) => {
    const ref = useRef(null);

    ref.current = value;

    return ref;
}