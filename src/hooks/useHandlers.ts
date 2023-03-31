import { get, set, cloneDeep, isEmpty, uniqBy, isEqual } from "lodash";
import { useMemo, MutableRefObject } from "react";

import { Value, Errors, Field, MutationRes } from "../types";
import { executeFieldMutation } from "../utils/executeFieldMutation";
import { validateField } from "../utils/validateField";
import { usePendingEvents } from "./usePendingEvents";
import { useRefCallback } from "./useRefCallback";
import { useStateRef } from "./useStateRef";

export const useHandlers = (params: {
  valueRef: MutableRefObject<Value>;
  errorsRef: MutableRefObject<Errors>;
  fieldsRef: MutableRefObject<Record<string, Field>>;
  setValue(value: Value): void;
  setErrors(errors: Errors): void;
  updateFields(mutationRes: [string, MutationRes][]): void;
  onChangeCallback(value: Value): void;
  onFieldChangeCallback(name: string, value: any): void;
}) => {
  const {
    valueRef,
    errorsRef,
    fieldsRef,
    setValue,
    setErrors,
    updateFields,
    onChangeCallback,
    onFieldChangeCallback,
  } = params;

  const [focused, focusedRef, setFocused] = useStateRef("");
  const { wait, addPendingEvent } = usePendingEvents();

  const verify = async (name?: string) => {
    const event = addPendingEvent(name ? `${name}-blur` : "submit");

    await wait(event.promise);

    const valueBeforeMutation = cloneDeep(valueRef.current);

    const allMutationRes = await Promise.all(
      Object.keys(
        name ? { [name]: fieldsRef.current[name] } : fieldsRef.current
      ).map(async (name) =>
        executeFieldMutation({
          name,
          valueRef,
          fieldsRef,
        })
      )
    );

    if (event.canceled) return false;

    updateFields(
      allMutationRes
        .map((r) => {
          r.mutationRes.forEach(([name, res]) => {
            if (res?.hidden) delete errorsRef.current[name];
          });

          return r.mutationRes;
        })
        .flat()
    );

    const valueUpdatedFields = allMutationRes
      .map((r) => r.valueUpdatedFields)
      .flat()
      .filter(([name, value]) => {
        if (
          isEqual(get(valueBeforeMutation, name), get(valueRef.current, name))
        ) {
          set(valueRef.current, name, value);

          return true;
        }

        return false;
      });

    if (valueUpdatedFields.length) {
      setValue(valueRef.current);
      onChangeCallback(valueRef.current);
      uniqBy(valueUpdatedFields, (f) => f[0]).forEach(([name]) => {
        onFieldChangeCallback(name, get(valueRef.current, name));
      });
    }

    const valueBeforeValidation = cloneDeep(valueRef.current);

    const allValidationRes = await Promise.all(
      Object.keys(name ? {} : fieldsRef.current)
        .concat(valueUpdatedFields.map((f) => f[0]))
        .filter((n) => !name || errorsRef.current[n])
        .concat(name || "")
        .filter(Boolean)
        .map(async (name) =>
          validateField({
            name,
            valueRef,
            fieldsRef,
          })
        )
    );

    if (event.canceled) return false;

    const errorUpdatedFields = allValidationRes.filter(([name, error]) => {
      if (
        isEqual(get(valueBeforeValidation, name), get(valueRef.current, name))
      ) {
        if (error) {
          errorsRef.current[name] = error;
        } else {
          delete errorsRef.current[name];
        }

        return true;
      }

      return false;
    });

    if (errorUpdatedFields.length) {
      setErrors(errorsRef.current);
    }

    event.resolve();

    return true;
  };

  const onFieldBlur = useRefCallback(async (name: string) => {
    if (focused !== name) return;

    setFocused("");

    await verify(name);
  });

  const onFieldFocus = useRefCallback(async (name: string) => {
    setFocused(name);
  });

  const onFieldChange = useRefCallback((name: string, value: any) => {
    set(valueRef.current, name, value);

    setValue(valueRef.current);
    onChangeCallback(valueRef.current);
    onFieldChangeCallback(name, value);
  });

  const submit: () => Promise<{ value: Value; valid: boolean }> =
    useRefCallback(async () => {
      if (focusedRef.current) {
        await new Promise((r) => setTimeout(r, 20));
        return submit();
      }

      const effective = await verify();

      return {
        value: valueRef.current,
        valid: effective ? isEmpty(errorsRef.current) : false,
      };
    });

  const fieldHandlers = useMemo(
    () => ({ onFieldBlur, onFieldFocus, onFieldChange }),
    [onFieldBlur, onFieldFocus, onFieldChange]
  );

  return {
    focused,
    fieldHandlers,
    submit,
  };
};
