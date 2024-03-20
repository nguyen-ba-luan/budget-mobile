export enum LedgerCategoryType {
  EXPENSES = 'EXPENSES',
  INCOME = 'INCOME',
}

export enum PeriodType {
  ONE_TIME = 'ONE_TIME',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM',
}

export const CURRENCY = {
  1: {
    id: 1,
    symbol: 'đ',
    name: 'VNĐ',
  },
};

export interface ICurrency {
  id: number;
  symbol: string;
  name: string;
}

export interface IBudget {
  amount: number;
  period: PeriodType;
  /**
   * Dữ liệu cho trường hợp custom
   */
  startDate?: string;
  budgetCycle?: number; // unit: ngày
}

export interface ISubCategory {
  id: number;
  name: string;
}

export interface ILedgerCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  type: LedgerCategoryType;
  budget: IBudget;
  subCategories: ISubCategory[];
}

export interface ILedger {
  id: number;
  name: string;
  icon: string;
  color: string;
  currency: ICurrency;
  categories: ILedgerCategory[];
}

export interface ITransaction {
  id: number;
  type: LedgerCategoryType;
  categoryId: ILedgerCategory;
  subCategoryId: string;
  time: string;
  note: string;
}

export const defaultLedgerJson = {
  1: {
    id: 1,
    color: '#ff2f22',
    currency: CURRENCY[1],
    icon: 'icon',
    name: 'Chi tiêu',
    categories: [
      {
        id: 1,
        color: '#f3f3f3',
        icon: 'icon',
        name: 'Gia đình',
        budget: {
          amount: 150000,
          period: PeriodType.MONTHLY,
        },
        subCategories: [
          {
            id: 1,
            name: 'Tiền nhà',
          },
        ],
        type: LedgerCategoryType.EXPENSES,
      },
    ],
  },
};
