import {IBudget, IFullLedgerCategory} from '../constant';

export type RootStackParamList = {
  Home: undefined;
  AddLedger?: {
    ledgerId?: number;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
    color?: string;
    icon?: string;
    category?: IFullLedgerCategory;
    categoryId?: number;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
  };
  AddTransaction: {
    ledgerId: number;
    categoryId: number;
    costTotal: number;
  };
  AddCategory: {
    ledgerId?: number;
    category?: IFullLedgerCategory;
    previousScreen: string;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
    color?: string;
    icon?: string;
    budget?: IBudget;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
  };
  ChooseColor: {
    color?: string;
    previousScreen: string;
  };
  ChooseIcon: {
    icon?: string;
    previousScreen: string;
  };
  AddBudget: {
    previousScreen: string;
    budget?: IBudget;
  };
  DateFilter: {
    previousScreen: string;
  };
};

export type StatisticTransactionParamList = {
  StatisticTransaction: undefined;
  TransactionDetail: {
    transactionId: number;
  };
  DateFilter: {
    previousScreen: string;
  };
};
