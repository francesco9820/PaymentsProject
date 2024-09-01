const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const isString = (value: any): value is string => typeof value === 'string';
export const isOneOfValues = <T>(constants: Record<string, T>) => (
    value: any,
  ): value is T => Object.values(constants).includes(value);
export const isNumber = (value: any): value is string => typeof value === 'number';
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';
export const isValidEmail = (value: any): value is string => isString(value)
  && EMAIL_REGEX.test(value);