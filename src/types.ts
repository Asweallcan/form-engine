import { CSSProperties, ComponentType, ReactNode } from "react";

export type Props = ({ value: any } | { defaultValue?: any }) & {
  title?: ReactNode;
  style?: CSSProperties;
  fields: Record<string, Field>;
  layout: LayoutItem[];
  className?: string;
  onChange?: (value: any) => void;
  onFieldChange?: (name: string, value: any) => void;
};

export type ValidationRule = [
  (value: any) => boolean | Promise<boolean>,
  string
];

export type MutationRes =
  | Omit<Field, "type" | "props" | "mutations" | "validationRules">
  | undefined;

export type Mutation = (
  currentFieldValue: any,
  triggerFieldValue: any
) => MutationRes | Promise<MutationRes>;

export type Field<K extends string = string> = {
  type: string | Component<any>;
  props?: any;
  title?: ReactNode;
  hidden?: boolean;
  tooltip?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  mutations?: RestrictKeyRecord<K, Mutation>;
  validationRules?: ValidationRule[];
  [metaName: string]: any;
};

export type LayoutItem<T extends string = string> =
  | T
  | { field: T; style: CSSProperties }
  | {
      wrapper?: "FlexRow" | "FlexColumn";
      style?: CSSProperties;
      title?: ReactNode;
      children: LayoutItem<T>[];
    }
  | {
      wrapper?: Wrapper;
      style?: CSSProperties;
      children: LayoutItem<T>[];
    }
  | LayoutItem<T>[];

export type Value<K extends string = string> = RestrictKeyRecord<K, any>;

export type Errors<K extends string = string> = RestrictKeyRecord<K, string>;

export type FieldHandlers = {
  onFieldBlur(name: string): void;
  onFieldFocus(name: string): void;
  onFieldChange(name: string, value: any): void;
};

export type ComponentProps<V = any> = {
  value: V;
  disabled: boolean;
  onBlur(): void;
  onFocus(): void;
  onChange(value: V): void;
};

export type Component<T = {}> = ComponentType<ComponentProps & T>;

export type Wrapper<T = {}> = ComponentType<
  {
    style?: CSSProperties;
    children: ReactNode;
  } & T
>;

export type RestrictKeyRecord<K extends string, V extends any> = {
  [key in K]?: V;
};

export type Ref = {
  submit(): Promise<{
    value: any;
    valid: boolean;
  }>;
};

export type TooltipInfoIconType = ComponentType<{ tooltip: ReactNode }>;
