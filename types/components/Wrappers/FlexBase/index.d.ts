import React, { CSSProperties, ReactNode } from "react";
export declare const FlexBase: React.FC<{
    style?: CSSProperties;
    title?: ReactNode;
    children: ReactNode;
    className: string;
    direction: "row" | "column";
}>;
