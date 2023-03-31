import { isEqual } from 'lodash';

type Validator = (...args: any[]) => (value: any) => boolean;

export const pattern: Validator = (regexp: RegExp) => {
    return (value: string) => regexp.test(value);
};

export const max: Validator = (number: number) => {
    return (value: number) => value <= number;
};

export const min: Validator = (number: number) => {
    return (value: number) => value >= number;
};

export const maxLength: Validator = (length: number) => {
    return (value: string | Array<any>) => value.length <= length;
};

export const minLength: Validator = (length: number) => {
    return (value: string | Array<any>) => value.length >= length;
};

export const gt = (number: number) => {
    return (value: number) => value > number;
};

export const gte = (number: number) => {
    return (value: number) => value >= number;
};

export const lt = (number: number) => {
    return (value: number) => value < number;
};

export const lte = (number: number) => {
    return (value: number) => value <= number;
};

export const equals = (tagetValue: any) => {
    return (value: any) => isEqual(value, tagetValue);
};

export const isPositionInteger = () => {
    return (number: number) => number > 0 && number === Math.ceil(number);
};
