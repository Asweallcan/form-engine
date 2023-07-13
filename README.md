# react-form-engine

React form engine, support any UI library.
This package using hooks, note that your React version is above 16.8 :).
[Playground](https://asweallcan.github.io/react-form-engine/), the demo contains some examples of usage

## Core characteristics

- Schema based, easy to use
- Not limited by any UI library, support custom form components
- Custom layout, support very flexiable layout
- Custom validation rules, support async function
- Custom form linkage, support async function

## Regist form components

Need to regist form components on init, widget means can be used to render field, wrapper means can be used to layout

```typescript
import { Checkbox, Radio, Select, Switch, Input, InputNumber } from "antd";

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
    <div {...props} style={{ ...props.style, backgroundColor: "cadetblue" }} />
  ),
});
```

## Basic use

```typescript
<FormEngine
  ref={form}
  value={data}
  title="Basic Use"
  fields={{
    name: {
      title: "Name",
      type: "Input",
      required: true,
    },
    age: {
      title: "Age",
      type: "InputNumber",
      required: true,
    },
    gender: {
      title: "Gender",
      type: "Select",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
  }}
  layout={["name", "age", "gender"]}
  onChange={(data) => {}}
/>
```

## Custom layout

Default every field occupy a row, but some scenarios need multiple fields in a row or need custom wrapper to wrap fields

```typescript
<FormEngine
  ref={form}
  value={data}
  title="Custom Layout"
  fields={{
    name: {
      title: "Name",
      type: "Input",
      required: true,
    },
    age: {
      title: "Age",
      type: "InputNumber",
      required: true,
    },
    gender: {
      title: "Gender",
      type: "Select",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
  }}
  layout={[
    {
      wrapper: "BlueBG",
      style: { padding: 20, width: "100%", marginBottom: 12 },
      children: [["name", "age"]],
    },
    "gender",
  ]}
  onChange={(data) => {}}
/>
```

## Validation rule

Required property will check field value if empty, also we can define custom validation rule to a field

```typescript
<FormEngine
  ref={form}
  value={data}
  title="Custom Validation Rule"
  fields={{
    name: {
      title: "Name",
      type: "Input",
      required: true,
    },
    age: {
      title: "Age",
      type: "InputNumber",
      required: true,
    },
    gender: {
      title: "Gender",
      type: "Select",
      required: true,
      props: {
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    },
    vacationType: {
      title: "Vacation Type",
      type: "Select",
      required: true,
      validationRules: [
        [
          (value) =>
            data.gender === "male" ? value !== "breastfeeding" : true,
          "Male can't breastfeeding!!!",
        ],
      ],
      props: {
        options: [
          { value: "annual", label: "Annual" },
          { value: "sick", label: "Sick" },
          { value: "wedding", label: "Wedding" },
          { value: "breastfeeding", label: "Breastfeeding" },
        ],
      },
    },
  }}
  layout={[["name", "age", "gender"], "vacationType"]}
  onChange={setData}
/>
```

## Field linkage

A field can has effect on other fields when changed, we can define this linkage

```typescript
<FormEngine
  ref={form}
  value={data}
  title="Mutator"
  fields={{
    name: {
      title: "Name",
      type: "Input",
      required: true,
    },
    age: {
      title: "Age",
      type: "InputNumber",
      required: true,
    },
    gender: {
      title: "Gender",
      type: "Select",
      required: true,
      mutations: {
        vacationType: (vacationType, gender) => {
          // when change gender, we want to affect vacation type
          if (gender === "male") {
            const maleVacationTypes = [
              { value: "annual", label: "Annual" },
              { value: "sick", label: "Sick" },
              { value: "wedding", label: "Wedding" },
            ];

            if (vacationType === "breastfeeding") {
              return {
                value: undefined,
                options: maleVacationTypes,
              };
            }

            return {
              options: maleVacationTypes,
            };
          }

          return {
            options: [
              { value: "annual", label: "Annual" },
              { value: "sick", label: "Sick" },
              { value: "wedding", label: "Wedding" },
              { value: "breastfeeding", label: "Breastfeeding" },
            ],
          };
        },
      },
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    vacationType: {
      title: "Vacation Type",
      type: "Select",
      required: true,
      options: [
        { value: "annual", label: "Annual" },
        { value: "sick", label: "Sick" },
        { value: "wedding", label: "Wedding" },
        { value: "breastfeeding", label: "Breastfeeding" },
      ],
    },
  }}
  layout={[["name", "age", "gender"], "vacationType"]}
  onChange={setData}
/>
```

## Field

```typescript
type Field = {
  type: string | Component<any>;
  props?: any;
  title?: ReactNode;
  hidden?: boolean;
  disabled?: boolean;
  required?: boolean;
  mutations?: RestrictKeyRecord<K, Mutation>;
  validationRules?: ValidationRule[];
  [metaName: string]: any;
};
```

`props/mutations/validationRules` can not be changed in a mutation, but `props` is reactive.
Except properties defined above, others defined in `Field` will pass to component and can be changed by a mutation

## Form component

```typescript
type Component = ComponentType<{
  value: V;
  disabled: boolean;
  onBlur(): void;
  onFocus(): void;
  onChange(value: V): void;
}>;
```

These props need to pass to a custom component

## Submit

When want to submit, we need to get if form is valid and form data

```typescript
const form = useRef<Ref>(null);

<FormEngine ref={form} />;

<Button
  onClick={async () => {
    const { value, valid } = await form.current!.submit();
  }}
>
  Submit
</Button>;
```

## Timing

Validation and mutation will execute on field onBlur and submit, so ensure onBlur is called in custom component and call formRef.submit before you post
