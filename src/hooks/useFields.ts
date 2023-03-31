import { useEffect, useRef, useState } from "react";
import { omit, pick, mapValues } from "lodash";

import { MutationRes, Field } from "../types";
import { useRefCallback } from "./useRefCallback";
import { useDeepCompareMemo } from "./useDeepCompare";

export const useFields = (params: { fields: Record<string, Field> }) => {
  const [fields, setFields] = useState(
    mapValues(params.fields, (v) =>
      omit(v, ["props", "mutations", "validationRules"])
    )
  );

  const fieldsRef = useRef(params.fields);

  const fieldsProps = useDeepCompareMemo(
    () => mapValues(params.fields, (v) => pick(v, ["props"]).props),
    [mapValues(params.fields, (v) => pick(v, ["props"]).props)]
  );

  const updateFields = useRefCallback((params: [string, MutationRes][]) => {
    const nextFields = { ...fields };

    params.forEach(([name, nextField]) => {
      nextFields[name] = { ...fields[name], ...nextField };
    });

    setFields(nextFields);
    setFieldsRef(nextFields);
  });

  const setFieldsRef = useRefCallback(
    (nextFields: Record<string, Partial<Field>>) => {
      fieldsRef.current = Object.keys(params.fields).reduce((acc, name) => {
        // @ts-ignore
        acc[name] = { ...params.fields[name], ...nextFields[name] };
        return acc;
      }, {} as Record<string, Field>);
    }
  );

  useEffect(() => {
    setFieldsRef(fields);
  }, [fields, params.fields, setFieldsRef]);

  return {
    fields,
    fieldsRef,
    fieldsProps,
    updateFields,
  };
};
