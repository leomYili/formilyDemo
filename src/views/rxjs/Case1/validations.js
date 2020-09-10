import { size } from "lodash";

export const required = (value) => {
    return size(value) > 0 ? undefined : "不可为空"
}