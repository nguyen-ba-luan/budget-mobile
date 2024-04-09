import {StateCreator} from 'zustand';
import {ITransaction} from '../constant';
import {LedgerState} from './ledger.store';
import {StoreState} from '.';
import {getRangeFilter, outOfRange} from '../util';
import {addTransaction} from '../service/api';

export interface TransactionState {
  transactionIdList: {
    [ledgerId: number]: number[];
  };
  transactionJson: {
    [id: number]: ITransaction;
  };
}

export const TransactionSelector = {
  selectTransactionList: (state: StoreState) =>
    state.transactionIdList[state.selectedLedgerId]?.map(
      item => state.transactionJson[item],
    ) || [],
  selectTransactionListForHome: (state: StoreState) => {
    const result: ITransaction[] = [];

    const transactionIdList =
      state.transactionIdList[state.selectedLedgerId] || [];

    const {from, to} = getRangeFilter(state);

    for (const transactionId of transactionIdList) {
      const transaction = state.transactionJson[transactionId];
      if (outOfRange(from, to, transaction?.time)) {
        continue;
      }

      result.push(transaction);
    }

    return result;
  },
  selectTransactionById: (transactionId: number) => (state: StoreState) =>
    transactionId ? state.transactionJson[transactionId] : ({} as ITransaction),
};

export const createTransactionSlice: StateCreator<
  TransactionState & LedgerState,
  [],
  [],
  TransactionState
> = set => ({
  transactionIdList: {},
  transactionJson: {},
});
