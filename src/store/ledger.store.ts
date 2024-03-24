import {StateCreator} from 'zustand';
import {ILedger, ILedgerCategory, ISubCategory} from '../constant';
import {CategorySelector, StoreState} from '.';
import {omit, uniq} from 'ramda';

interface AddLedgerPayload extends ILedger {
  categoryJson: {
    [id: number]: ILedgerCategory;
  };
  subCategoryJson: {
    [id: number]: ISubCategory;
  };
}

export interface LedgerState {
  selectedLedgerId: number;
  ledgerIdList: number[];
  ledgerJson: {
    [id: number]: ILedger;
  };
  addLedger: (ledger: AddLedgerPayload) => void;
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
  selectLedgerById: (id?: number) => (state: StoreState) =>
    id
      ? {
          ...state.ledgerJson[id],
          categoryList:
            state.ledgerJson[id]?.categoryIdList?.map(item =>
              CategorySelector.selectLedgerCategory(item)(state),
            ) || [],
        }
      : undefined,
};

export const createLedgerSlice: StateCreator<
  StoreState,
  [],
  [],
  LedgerState
> = set => ({
  selectedLedgerId: 0,
  ledgerIdList: [],
  ledgerJson: {},
  selectLedger: (id: number) =>
    set(() => ({
      selectedLedgerId: id,
    })),
  addLedger: (payload: AddLedgerPayload) =>
    set((state: StoreState) => ({
      ledgerIdList: uniq([...state.ledgerIdList, payload.id]),
      ledgerJson: {
        ...state.ledgerJson,
        [payload?.id]: omit(['categoryJson', 'subCategoryJson'], payload),
      },
      categoryJson: {
        ...state.categoryJson,
        ...payload?.categoryJson,
      },
      subCategoryJson: {
        ...state.subCategoryJson,
        ...payload?.subCategoryJson,
      },
    })),
});
