import { MutableRefObject } from "react";
import { Value, Field, MutationRes } from "../types";
export declare const executeFieldMutation: (params: {
    name: string;
    valueRef: MutableRefObject<Value>;
    fieldsRef: MutableRefObject<Record<string, Field>>;
}) => Promise<{
    mutationRes: [string, MutationRes][];
    valueUpdatedFields: [string, any, boolean][];
}>;
