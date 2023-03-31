import { MutableRefObject } from "react";
import { Value } from "../types";
export declare const useValue: (props: {
    value: Value;
} | {
    defaultValue?: Value;
}) => [Value<string>, MutableRefObject<Value<string>>, (nextState: Value<string>) => void];
