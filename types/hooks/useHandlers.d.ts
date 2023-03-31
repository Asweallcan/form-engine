import { MutableRefObject } from "react";
import { Value, Errors, Field, MutationRes } from "../types";
export declare const useHandlers: (params: {
    valueRef: MutableRefObject<Value>;
    errorsRef: MutableRefObject<Errors>;
    fieldsRef: MutableRefObject<Record<string, Field>>;
    setValue(value: Value): void;
    setErrors(errors: Errors): void;
    updateFields(mutationRes: [string, MutationRes][]): void;
    onChangeCallback(value: Value): void;
    onFieldChangeCallback(name: string, value: any): void;
}) => {
    focused: string;
    fieldHandlers: {
        onFieldBlur: (name: string) => Promise<void>;
        onFieldFocus: (name: string) => Promise<void>;
        onFieldChange: (name: string, value: any) => void;
    };
    submit: () => Promise<{
        value: Value;
        valid: boolean;
    }>;
};
