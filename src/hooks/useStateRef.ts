import { MutableRefObject, useCallback, useRef, useState } from "react";
import { cloneDeep } from "lodash";

export const useStateRef = <T>(initialState: T) => {
  const ref = useRef(initialState);
  const [state, _setState] = useState(cloneDeep(initialState));

  const setState = useCallback(
    (nextState: T) => {
      ref.current = nextState;
      _setState(cloneDeep(nextState));
    },
    [_setState]
  );

  return [state, ref, setState] as [T, MutableRefObject<T>, typeof setState];
};
