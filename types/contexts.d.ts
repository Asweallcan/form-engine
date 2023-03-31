/// <reference types="react" />
import { Value, Errors, Field, FieldHandlers } from "./types";
export declare const FieldsContext: import("react").Context<Record<string, Omit<Field<string>, "props" | "mutations" | "validationRules">>>;
export declare const useFieldsContext: () => Record<string, Omit<Field<string>, "props" | "mutations" | "validationRules">>;
export declare const ValueContext: import("react").Context<Value<string>>;
export declare const useValueContext: () => Value<string>;
export declare const FieldHandlersContext: import("react").Context<FieldHandlers>;
export declare const useFieldHandlers: () => FieldHandlers;
export declare const ErrorsContext: import("react").Context<Errors<string>>;
export declare const useErrorsContext: () => Errors<string>;
export declare const FocusedContext: import("react").Context<string>;
export declare const useFocusedContext: () => string;
export declare const FieldsPropsContext: import("react").Context<Record<string, any>>;
export declare const useFieldsPropsContext: () => Record<string, any>;
