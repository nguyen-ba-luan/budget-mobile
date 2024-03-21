import {StateCreator} from 'zustand';
import {ITransaction} from '../constant';
import {LedgerState} from './ledger.store';

export interface TransactionState {
  transactionIdList: number[];
  transactionJson: {
    [id: number]: ITransaction;
  };
  addTransaction: (transaction: ITransaction) => void;
}

export const TransactionSelector = {
  selectTransactionList: (state: TransactionState & LedgerState) =>
    state.transactionIdList
      ?.map(item => state.transactionJson[item])
      ?.filter(item => item?.ledgerId === state.selectedLedgerId),
};

export const createTransactionSlice: StateCreator<
  TransactionState & LedgerState,
  [],
  [],
  TransactionState
> = set => ({
  transactionIdList: [],
  transactionJson: {},
  addTransaction: transaction =>
    set(state => ({
      transactionIdList: [...state.transactionIdList, transaction?.id],
      transactionJson: {
        ...state.transactionJson,
        [transaction?.id]: transaction,
      },
    })),
});
