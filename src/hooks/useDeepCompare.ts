import React, { useRef, useEffect, useMemo } from "react";
import deepEqual from "fast-deep-equal/react";

const useDeepCompareMemoize = <T extends React.DependencyList>(deps: T): T => {
  const ref = useRef<T>(deps);

  if (!ref.current || !deepEqual(ref.current, deps)) {
    ref.current = deps;
  }
  return ref.current;
};

export const useDeepCompareEffect = (
  cb: React.EffectCallback,
  deps: React.DependencyList
): void => useEffect(cb, useDeepCompareMemoize(deps));

export const useDeepCompareMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => useMemo(factory, useDeepCompareMemoize(deps));
