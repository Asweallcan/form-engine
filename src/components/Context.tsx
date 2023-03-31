import React, { ReactNode } from "react";

import { Value, Errors, Field, FieldHandlers } from "../types";
import {
  FieldsContext,
  FieldHandlersContext,
  ErrorsContext,
  FocusedContext,
  ValueContext,
  FieldsPropsContext,
} from "../contexts";

export const Context: React.FC<{
  value: Value;
  fields: Record<
    string,
    Omit<Field, "props" | "mutations" | "validationRules">
  >;
  errors: Errors;
  focused: string;
  fieldsProps: Record<string, any>;
  fieldHandlers: FieldHandlers;
  children: ReactNode;
}> = (props) => {
  const {
    value,
    fields,
    errors,
    focused,
    children,
    fieldsProps,
    fieldHandlers,
  } = props;

  return (
    <FieldsContext.Provider value={fields}>
      <FieldHandlersContext.Provider value={fieldHandlers}>
        <ErrorsContext.Provider value={errors}>
          <FocusedContext.Provider value={focused}>
            <ValueContext.Provider value={value}>
              <FieldsPropsContext.Provider value={fieldsProps}>
                {children}
              </FieldsPropsContext.Provider>
            </ValueContext.Provider>
          </FocusedContext.Provider>
        </ErrorsContext.Provider>
      </FieldHandlersContext.Provider>
    </FieldsContext.Provider>
  );
};
