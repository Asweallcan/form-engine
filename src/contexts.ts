import { createContext, useContext } from "react";

import { Value, Errors, Field, FieldHandlers } from "./types";

const f = () => {};

export const FieldsContext = createContext<
  Record<string, Omit<Field, "props" | "mutations" | "validationRules">>
>({});
export const useFieldsContext = () => useContext(FieldsContext);

export const ValueContext = createContext<Value>({});
export const useValueContext = () => useContext(ValueContext);

export const FieldHandlersContext = createContext<FieldHandlers>({
  onFieldBlur: f,
  onFieldFocus: f,
  onFieldChange: f,
});
export const useFieldHandlers = () => useContext(FieldHandlersContext);

export const ErrorsContext = createContext<Errors>({});
export const useErrorsContext = () => useContext(ErrorsContext);

export const FocusedContext = createContext("");
export const useFocusedContext = () => useContext(FocusedContext);

export const FieldsPropsContext = createContext<Record<string, any>>({});
export const useFieldsPropsContext = () => useContext(FieldsPropsContext);
