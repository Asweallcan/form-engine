import React, { ReactNode } from "react";
import { Value, Errors, Field, FieldHandlers } from "../types";
export declare const Context: React.FC<{
    value: Value;
    fields: Record<string, Omit<Field, "props" | "mutations" | "validationRules">>;
    errors: Errors;
    focused: string;
    fieldsProps: Record<string, any>;
    fieldHandlers: FieldHandlers;
    children: ReactNode;
}>;
