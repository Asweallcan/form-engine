import { isEmpty } from "lodash";
import { MutableRefObject } from "react";

import { Value, Field } from "../types";

export const validateField = async (params: {
  name: string;
  valueRef: MutableRefObject<Value>;
  fieldsRef: MutableRefObject<Record<string, Field>>;
}): Promise<[string, string | undefined]> => {
  const { name, valueRef, fieldsRef } = params;

  const validationRules = fieldsRef.current[name].validationRules || [];

  if (
    fieldsRef.current[name].required &&
    (typeof valueRef.current[name] === "number"
      ? false
      : isEmpty(valueRef.current[name]))
  ) {
    return [name, "Can not be empty"];
  }

  if (validationRules.length) {
    for (let i = 0; i < validationRules.length; i++) {
      const [validator, error] = validationRules[i];

      if (!(await validator(valueRef.current[name]))) {
        if (fieldsRef.current[name].hidden) return [name, undefined];

        return [name, error];
      }
    }
  }

  return [name, undefined];
};
