import { get, omit } from "lodash";
import { MutableRefObject } from "react";

import { Value, Field, MutationRes } from "../types";

export const executeFieldMutation = async (params: {
  name: string;
  valueRef: MutableRefObject<Value>;
  fieldsRef: MutableRefObject<Record<string, Field>>;
}) => {
  const { name, valueRef, fieldsRef } = params;

  const valueUpdatedFields: [string, any, boolean][] = [];

  const mutationRes: [string, MutationRes][] = await Promise.all(
    Object.entries(fieldsRef.current[name].mutations || {})
      .filter(([targetField]) => fieldsRef.current[targetField])
      .map(async ([targetField, mutation]) => {
        const res =
          (await mutation?.(
            get(valueRef.current, targetField),
            get(valueRef.current, name)
          )) || {};

        if (
          "value" in res &&
          res.value !== get(valueRef.current, targetField)
        ) {
          valueUpdatedFields.push([targetField, res.value, false]);
        }

        return [
          targetField,
          omit(res || {}, ["type", "props", "mutations", "validationRules"]),
        ];
      })
  );

  return {
    mutationRes,
    valueUpdatedFields,
  };
};
