import dayjs from 'dayjs';
import {isArray} from 'ramda-adjunct';
import {DateFilterState, FilterType} from '../store';
import {ITransaction, LedgerCategoryType} from '../constant';
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

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

export const getRangeFilter = (
  input: Pick<
    DateFilterState,
    'selectedType' | 'monthlyFilter' | 'yearlyFilter' | 'customFilter'
  >,
) => {
  const {customFilter, monthlyFilter, selectedType, yearlyFilter} = input;

  if (selectedType === FilterType.CUSTOM) {
    return {
      from: customFilter?.from,
      to: customFilter?.to,
    };
  }

  if (selectedType === FilterType.MONTHLY) {
    return {
      from: dayjs()
        .year(monthlyFilter.year)
        .month(monthlyFilter.month - 1)
        .startOf('month')
        .toISOString(),
      to: dayjs()
        .year(monthlyFilter.year)
        .month(monthlyFilter.month - 1)
        .endOf('month')
        .toISOString(),
    };
  }

  return {
    from: dayjs().year(yearlyFilter.year).startOf('year').toISOString(),
    to: dayjs().year(yearlyFilter.year).endOf('year').toISOString(),
  };
};

export const outOfRange = (from: string, to: string, date: string) => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);
  const checkDate = dayjs(date);

  // @ts-ignore
  return !checkDate.isBetween(fromDate, toDate, null, '[]');
};

export const groupAndSortTransactions = (
  transactions: ITransaction[],
): Array<{
  type: LedgerCategoryType;
  date: string;
  totalCost: number;
  transactionList: ITransaction[];
}> => {
  const grouped = new Map<string, ITransaction[]>();

  transactions.forEach(transaction => {
    const date = formatDate(transaction.time);
    const key = `${transaction.type}--${date}`;

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(transaction);
  });

  const result = Array.from(grouped, ([key, transactionList]) => {
    const [type, date] = key.split('--');
    const totalCost = transactionList.reduce(
      (sum, transaction) => sum + transaction.cost,
      0,
    );
    return {date, totalCost, transactionList, type: type as LedgerCategoryType};
  });

  result.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return result;
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};
