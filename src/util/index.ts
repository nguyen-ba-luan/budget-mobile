import dayjs from 'dayjs';
import {isArray} from 'ramda-adjunct';

export const generateUUID = () => Date.now();

export const formatNumber = (num: number) => num?.toLocaleString('vi');

export const formatDate = (input: string, outputFormat = 'DD-MM-YYYY') =>
  dayjs(input).format(outputFormat);

export const map = <T, S>(
  input: T[] | undefined,
  callback: (value: T, index: number, array: T[]) => S,
): S[] => {
  if (!isArray(input)) {
    return [];
  }

  return input.map(callback);
};

export const insertIf = (condition: boolean, ...elements: any[]) => {
  return condition ? [...elements] : [];
};

export const insertObjectIf = <T1 extends {}>(
  condition: boolean | any,
  elements1: T1,
): Partial<T1> => {
  return condition ? elements1 : ({} as T1);
};

export const insertObjectIfElse = <T1, T2>(
  condition: boolean,
  elements1: T1,
  elements2: T2,
): Partial<T1 | T2> => {
  return condition ? elements1 : elements2;
};
