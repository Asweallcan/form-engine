import React from "react";
import { Ref, Props, Component, Wrapper as WrapperType } from "./types";
export declare const FormEngine: React.ForwardRefExoticComponent<Props & React.RefAttributes<Ref>>;
export declare const registWidgets: (widgets: Record<string, Component<any>>) => void;
export declare const registWrappers: (wrappers: Record<string, WrapperType<any>>) => void;
export * from "./types";
export * as Validators from "./validators";
