import { ForwardedRef, RefObject } from "react";
import { Ref, Props, Component, Wrapper as WrapperType } from "./types";
export declare const FormEngine: (props: Props & {
    ref?: ForwardedRef<Ref> | RefObject<Ref>;
}) => JSX.Element | null;
export declare const RegisterWidgets: (...widgets: Array<{
    name: string;
    Component: Component<any>;
}>) => void;
export declare const RegisterWrappers: (...wrappers: Array<{
    name: string;
    Component: WrapperType<any>;
}>) => void;
export * from "./types";
export * as Validators from "./validators";
