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
    symbol: '₫',
    name: 'VNĐ',
  },
};

export interface ICurrency {
  id: number;
  symbol: string;
  name: string;
}

export interface IBudget {
  cost: number;
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
  subCategoryIdList: number[];
}

export interface ILedger {
  id: number;
  name: string;
  icon: string;
  color: string;
  currency: ICurrency;
  categoryIdList: number[];
}

export interface ITransaction {
  id: number;
  ledgerId: number;
  cost: number;
  type: LedgerCategoryType;
  categoryId: number;
  subCategoryId: number | null;
  time: string;
  note: string;
}

export const defaultLedgerJson: {
  [id: number]: ILedger;
} = {
  1: {
    id: 1,
    color: '#ff2f22',
    currency: CURRENCY[1],
    icon: 'icon',
    name: 'Chi tiêu',
    categoryIdList: [1, 2],
  },
};

export const defaultCategoryJson: {
  [id: number]: ILedgerCategory;
} = {
  1: {
    id: 1,
    color: '#f3f3f3',
    icon: 'icon',
    name: 'Gia đình',
    budget: {
      cost: 150000,
      period: PeriodType.MONTHLY,
    },
    subCategoryIdList: [],
    type: LedgerCategoryType.EXPENSES,
  },
  2: {
    id: 2,
    color: '#f3f3f3',
    icon: 'icon',
    name: 'Salary',
    budget: {
      cost: 150000,
      period: PeriodType.MONTHLY,
    },
    subCategoryIdList: [],
    type: LedgerCategoryType.INCOME,
  },
};

export enum KeyCapType {
  NUMBER = 'NUMBER',
  DELETE = 'DELETE',
  ACTION = 'ACTION',
  SUBMIT = 'SUBMIT',
  RESET = 'RESET',
}

export interface IKeyCap {
  type: KeyCapType;
  label: string | number;
  icon?: string;
  bgColor?: string;
  iconColor?: string;
}

export const keyCapList: IKeyCap[] = [
  {type: KeyCapType.NUMBER, label: 7},
  {type: KeyCapType.NUMBER, label: 8},
  {type: KeyCapType.NUMBER, label: 9},
  {type: KeyCapType.DELETE, label: 'Del', icon: 'delete'},
  {type: KeyCapType.NUMBER, label: 4},
  {type: KeyCapType.NUMBER, label: 5},
  {type: KeyCapType.NUMBER, label: 6},
  {type: KeyCapType.ACTION, label: ''},
  {type: KeyCapType.NUMBER, label: 1},
  {type: KeyCapType.NUMBER, label: 2},
  {type: KeyCapType.NUMBER, label: 3},
  {type: KeyCapType.ACTION, label: ''},
  {type: KeyCapType.ACTION, label: ''},
  {type: KeyCapType.NUMBER, label: 0},
  {type: KeyCapType.ACTION, label: ','},
  {
    type: KeyCapType.SUBMIT,
    label: 'Done',
    icon: 'check',
    bgColor: 'gold',
  },
];

export const keyCapBudgetList: IKeyCap[] = [
  {type: KeyCapType.NUMBER, label: 7},
  {type: KeyCapType.NUMBER, label: 8},
  {type: KeyCapType.NUMBER, label: 9},
  {type: KeyCapType.DELETE, label: 'Del', icon: 'delete'},
  {type: KeyCapType.NUMBER, label: 4},
  {type: KeyCapType.NUMBER, label: 5},
  {type: KeyCapType.NUMBER, label: 6},
  {type: KeyCapType.ACTION, label: ''},
  {type: KeyCapType.NUMBER, label: 1},
  {type: KeyCapType.NUMBER, label: 2},
  {type: KeyCapType.NUMBER, label: 3},
  {type: KeyCapType.ACTION, label: ''},
  {
    type: KeyCapType.RESET,
    label: '',
    icon: 'trash-2',
    iconColor: 'red',
  },
  {type: KeyCapType.NUMBER, label: 0},
  {type: KeyCapType.ACTION, label: ','},
  {
    type: KeyCapType.SUBMIT,
    label: 'Done',
    icon: 'check',
    bgColor: 'gold',
  },
];
