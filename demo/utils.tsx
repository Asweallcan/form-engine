import React from "react";
import { Checkbox, Radio, Select, Switch, Input, InputNumber } from "antd";

import { registWidgets, registWrappers } from "../src/index";

export const init = () => {
  registWidgets({
    Input: (props) => (
      <Input {...props} onChange={(e) => props.onChange(e.target.value)} />
    ),
    InputNumber,
    Switch,
    Select,
    Checkbox: (props) => (
      <Checkbox
        {...props}
        onChange={async (e) => {
          await props.onFocus();
          await props.onChange(e.target.checked);
          await props.onBlur();
        }}
      >
        {props.label}
      </Checkbox>
    ),
    CheckboxGroup: Checkbox.Group,
    RadioGroup: Radio.Group,
  });

  registWrappers({
    BlueBG: (props) => (
      <div
        {...props}
        style={{ ...props.style, backgroundColor: "cadetblue" }}
      />
    ),
  });
};
