export const isString = (value: any): value is string => typeof value === 'string';
export const isOneOfValues = <T>(constants: Record<string, T>) => (
    value: any,
  ): value is T => Object.values(constants).includes(value);
export const isNumber = (value: any): value is string => typeof value === 'number';
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';