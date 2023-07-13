import { Component, Wrapper } from "./types";

export const EmptyObject = {};

export const Widgets = {} as {
  [name: string]: Component;
};

export const Wrappers = {} as Record<string, Wrapper>;
