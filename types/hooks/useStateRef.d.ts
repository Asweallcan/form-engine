import { MutableRefObject } from "react";
export declare const useStateRef: <T>(initialState: T) => [T, MutableRefObject<T>, (nextState: T) => void];
