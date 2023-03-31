import { MutableRefObject } from "react";
import { Value, Field } from "../types";
export declare const validateField: (params: {
    name: string;
    valueRef: MutableRefObject<Value>;
    fieldsRef: MutableRefObject<Record<string, Field>>;
}) => Promise<[
    string,
    string | undefined
]>;
