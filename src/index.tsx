import React, {
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  RefObject,
} from "react";

import { Context } from "./components/Context";
import { useValue } from "./hooks/useValue";
import { useFields } from "./hooks/useFields";
import { LayoutItem } from "./components/LayoutItem";
import { useHandlers } from "./hooks/useHandlers";
import { useStateRef } from "./hooks/useStateRef";
import { useRefCallback } from "./hooks/useRefCallback";
import { Ref, Props, Errors, Component, Wrapper as WrapperType } from "./types";
import { Title, Wrapper } from "./style";
import { Widgets, Wrappers, EmptyObject } from "./constants";

export const FormEngine: (
  props: Props & { ref?: ForwardedRef<Ref> | RefObject<Ref> }
) => JSX.Element | null = forwardRef((props, ref) => {
  const { style, title, layout, className } = props;

  const onChangeCallback = useRefCallback(props.onChange);
  const onFieldChangeCallback = useRefCallback(props.onFieldChange);

  const [value, valueRef, setValue] = useValue(props);
  const [errors, errorsRef, setErrors] = useStateRef<Errors>({});
  const { fields, fieldsRef, fieldsProps, updateFields } = useFields({
    fields: props.fields,
  });
  const { focused, fieldHandlers, submit } = useHandlers({
    valueRef,
    fieldsRef,
    errorsRef,
    setValue,
    setErrors,
    updateFields,
    onChangeCallback,
    onFieldChangeCallback,
  });

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <Context
      value={value}
      fields={fields}
      errors={errors}
      focused={focused}
      fieldsProps={fieldsProps || EmptyObject}
      fieldHandlers={fieldHandlers}
    >
      <Wrapper style={style} className={`react-form-engine ${className}`}>
        {title ? (
          <Title className={`react-form-engine-title`}>{title}</Title>
        ) : null}
        {layout.map((layoutItem, index) => (
          <LayoutItem key={index} layoutItem={layoutItem} />
        ))}
      </Wrapper>
    </Context>
  );
});

export const registWidgets = (widgets: Record<string, Component<any>>) => {
  Object.entries(widgets).forEach(([name, Component]) => {
    Widgets[name] = Component;
  });
};

export const registWrappers = (wrappers: Record<string, WrapperType<any>>) => {
  Object.entries(wrappers).forEach(([name, Component]) => {
    Wrappers[name] = Component;
  });
};

export * from "./types";

export * as Validators from "./validators";
