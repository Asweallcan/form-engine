import { ComponentType, ReactNode } from "react";
import { Component, Wrapper } from "./types";

export const EmptyObject = {};

export const Widgets = {} as {
  [name: string]: Component;
  // @ts-ignore
  TooltipInfoIcon: ComponentType<{ tooltip: ReactNode }>;
};

export const Wrappers = {} as Record<string, Wrapper>;
