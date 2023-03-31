import { MutationRes, Field } from "../types";
export declare const useFields: (params: {
    fields: Record<string, Field>;
}) => {
    fields: {
        [x: string]: import("lodash").Omit<Field<string>, "props" | "mutations" | "validationRules">;
    };
    fieldsRef: import("react").MutableRefObject<Record<string, Field<string>>>;
    fieldsProps: {
        [x: string]: any;
    };
    updateFields: (params: [string, MutationRes][]) => void;
};
