import React from "react";
export declare const useDeepCompareEffect: (cb: React.EffectCallback, deps: React.DependencyList) => void;
export declare const useDeepCompareMemo: <T>(factory: () => T, deps: React.DependencyList) => T;
