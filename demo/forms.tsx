import React, { useState } from "react";
import { Button } from "antd";

import "antd/dist/reset.css";

import { FormEngine, Ref } from "../src";
import { FormWrapper } from "./style";
import { useRef } from "react";

export const BasicUse: React.FC = () => {
  const [data, setData] = useState({});

  const form = useRef<Ref>(null);

  return (
    <FormWrapper>
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
            props: {
              options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ],
            },
          },
        }}
        layout={["name", "age", "gender"]}
        onChange={setData}
      />
      <Button
        type="primary"
        style={{ display: "inline-block", marginTop: 12 }}
        onClick={async () => {
          const { value, valid } = await form.current!.submit();

          confirm(
            `form is ${
              valid ? "valid" : "invalid"
            }\nform value: ${JSON.stringify(value)}`
          );
        }}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};

export const CustomLayout: React.FC = () => {
  const [data, setData] = useState({});

  const form = useRef<Ref>(null);

  return (
    <FormWrapper>
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
            props: {
              options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ],
            },
          },
          confirm: {
            type: "Checkbox",
            props: {
              label: "Agree xxx terms.",
            },
            validationRules: [[(value) => !!value, "Please confirm"]],
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
        onChange={setData}
      />
      <Button
        type="primary"
        style={{ display: "inline-block", marginTop: 12 }}
        onClick={async () => {
          const { value, valid } = await form.current!.submit();

          confirm(
            `form is ${
              valid ? "valid" : "invalid"
            }\nform value: ${JSON.stringify(value)}`
          );
        }}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};

export const CustomValidationRule: React.FC = () => {
  const [data, setData] = useState<any>({});

  const form = useRef<Ref>(null);

  return (
    <FormWrapper>
      <div style={{ marginBottom: 12 }}>
        When your gender is male, your vacation select breastfeeding will throw
        error
      </div>
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
      <Button
        type="primary"
        style={{ display: "inline-block", marginTop: 12 }}
        onClick={async () => {
          const { value, valid } = await form.current!.submit();

          confirm(
            `form is ${
              valid ? "valid" : "invalid"
            }\nform value: ${JSON.stringify(value)}`
          );
        }}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};

export const Mutator: React.FC = () => {
  const [data, setData] = useState<any>({});

  const form = useRef<Ref>(null);

  return (
    <FormWrapper>
      <div style={{ marginBottom: 12 }}>
        When your gender is male, then your vacation type won't have
        breastfeeding
      </div>
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
      <Button
        type="primary"
        style={{ display: "inline-block", marginTop: 12 }}
        onClick={async () => {
          const { value, valid } = await form.current!.submit();

          confirm(
            `form is ${
              valid ? "valid" : "invalid"
            }\nform value: ${JSON.stringify(value)}`
          );
        }}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};
