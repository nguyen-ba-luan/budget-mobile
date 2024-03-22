import {StateCreator} from 'zustand';
import {ILedger, defaultLedgerJson} from '../constant';
import {CategorySelector, StoreState} from '.';

export interface LedgerState {
  selectedLedgerId: number;
  ledgerIdList: number[];
  ledgerJson: {
    [id: number]: ILedger;
  };
  addLedger: (ledger: ILedger) => void;
  selectLedger: (id: number) => void;
}

export const LedgerSelector = {
  selectSelectedLedger: (state: StoreState) => ({
    ...state.ledgerJson[state.selectedLedgerId],
    categoryList:
      state.ledgerJson[state.selectedLedgerId]?.categoryIdList?.map(
        item => state.categoryJson[item],
      ) || [],
  }),
  selectLedgerList: (state: LedgerState) =>
    state.ledgerIdList?.map(item => state.ledgerJson[item]),
};

export const createLedgerSlice: StateCreator<
  LedgerState,
  [],
  [],
  LedgerState
> = set => ({
  selectedLedgerId: 1,
  ledgerIdList: [1],
  ledgerJson: defaultLedgerJson,
  selectLedger: (id: number) =>
    set(() => ({
      selectedLedgerId: id,
    })),
  addLedger: (ledger: ILedger) =>
    set((state: LedgerState) => ({
      ledgerIdList: [...state.ledgerIdList, ledger.id],
      ledgerJson: {
        ...state.ledgerJson,
        [ledger?.id]: ledger,
      },
    })),
});
