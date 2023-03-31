import { ComponentType, ReactNode } from "react";
import { Component, Wrapper } from "./types";
export declare const EmptyObject: {};
export declare const Widgets: {
    [name: string]: Component<{}>;
    TooltipInfoIcon: ComponentType<{
        tooltip: ReactNode;
    }>;
};
export declare const Wrappers: Record<string, Wrapper<{}>>;
