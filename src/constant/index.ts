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
  id?: number;
  temporaryId?: number;
  cost: number;
  period: PeriodType;
  /**
   * Dữ liệu cho trường hợp custom
   */
  startDate?: string;
  budgetCycle?: number; // unit: ngày
}

export interface ISubCategory {
  id?: number;
  temporaryId?: number;
  name: string;
}

export interface ILedgerCategory {
  id?: number;
  temporaryId?: number;
  name: string;
  icon: string;
  color: string;
  type: LedgerCategoryType;
  budget: IBudget;
  subCategoryIdList: number[];
}
export interface IFullLedgerCategory
  extends Omit<ILedgerCategory, 'subCategoryIdList'> {
  subCategoryList: ISubCategory[];
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
  subCategoryId?: number;
  time: string;
  note: string;
}

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

export const ICON_LIST = [
  'minuscircle',
  'pluscircle',
  'infocirlce',
  'exclamationcircle',
  'closecircle',
  'checkcircle',
  'clockcircle',
  'frown',
  'areachart',
  'star',
  'meho',
  'shoppingcart',
  'tags',
  'cloud',
  'cloudupload',
  'clouddownload',
  'qrcode',
  'home',
  'enviroment',
  'eye',
  'camera',
  'windows',
  'ie',
  'pushpin',
  'heart',
  'smile-circle',
  'calculator',
  'chrome',
  'github',
  'piechart',
  'codesquare',
  'checksquare',
  'play',
  'tag',
  'calendar',
  'dingding',
  'dingding-o',
  'tablet1',
  'apple1',
  'android1',
  'aliwangwang',
  'pay-circle1',
  'earth',
  'appstore1',
  'table',
  'alipay-square',
  'codepen-circle',
  'taobao-circle',
  'twitter',
  'yuque',
  'aliyun',
  'slack-square',
  'behance-square',
  'CodeSandbox',
];
