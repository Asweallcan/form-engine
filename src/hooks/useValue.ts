import { MutableRefObject, useEffect } from "react";

import { Value } from "../types";
import { useStateRef } from "./useStateRef";

export const useValue = (
  props: { value: Value } | { defaultValue?: Value }
) => {
  const reactive = "value" in props && props.value;

  const [value, valueRef, setValue] = useStateRef<Value>(
    "value" in props ? props.value : {}
  );

  useEffect(() => {
    if (reactive) {
      setValue(reactive);
    } else {
      // @ts-ignore
      setValue(props.defaultValue || {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactive, setValue]);

  return [value, valueRef, setValue] as [
    Value,
    MutableRefObject<Value>,
    typeof setValue
  ];
};
