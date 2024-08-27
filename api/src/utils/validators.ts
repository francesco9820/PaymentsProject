export const isString = (value: any): value is string => typeof value === 'string';
export const isOneOfValues = <T>(constants: Record<string, T>) => (
    value: any,
  ): value is T => Object.values(constants).includes(value);