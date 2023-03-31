import React, { CSSProperties, useMemo } from "react";

import {
  useValueContext,
  useFieldHandlers,
  useErrorsContext,
  useFieldsContext,
  useFocusedContext,
  useFieldsPropsContext,
} from "../../contexts";
import { Wrapper, Title, TitleText, ErrorText } from "./style";
import { Widgets } from "../../constants";

export const FormItem: React.FC<{
  name: string;
  style?: CSSProperties;
}> = (props) => {
  const { name, style } = props;

  const value = useValueContext()[name];
  const field = useFieldsContext()[name];
  const error = useErrorsContext()[name];
  const focused = useFocusedContext();
  const componentProps = useFieldsPropsContext()[name];
  const { onFieldBlur, onFieldChange, onFieldFocus } = useFieldHandlers();

  const fieldHandlers = useMemo(
    () => ({
      onBlur: () => onFieldBlur(name),
      onFocus: () => onFieldFocus(name),
      onChange: (value: any) => onFieldChange(name, value),
    }),
    [name, onFieldBlur, onFieldFocus, onFieldChange]
  );

  const { type, title, hidden, required, tooltip, ...fieldMeta } = field;

  if (!field || hidden) return null;

  const Comp = typeof type === "string" ? Widgets[type] : type;

  const hasError = !!error && focused !== name;

  return (
    <Wrapper
      style={style}
      className={`react-form-engine-form-item ${hasError && "has-error"}`}
    >
      {title ? (
        <Title className={`react-form-engine-form-item-title`}>
          <TitleText
            style={{ marginRight: 12 }}
            required={required}
            className={`react-form-engine-form-item-title-text ${
              required && "required"
            }`}
          >
            {title}
          </TitleText>
          {tooltip ? <Widgets.TooltipInfoIcon tooltip={tooltip} /> : null}
        </Title>
      ) : null}

      <Comp
        {...componentProps}
        {...fieldMeta}
        {...fieldHandlers}
        value={value}
      />

      {hasError ? (
        <ErrorText className={`react-form-engine-form-item-error-text`}>
          {error}
        </ErrorText>
      ) : null}
    </Wrapper>
  );
};
