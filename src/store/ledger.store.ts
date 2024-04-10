import {StateCreator} from 'zustand';
import {ILedger, ILedgerCategory, ISubCategory} from '../constant';
import {CategorySelector, StoreState} from '.';
import {omit, uniq} from 'ramda';
import {getApplicationData} from '../service/api';
import {sliceResetFns} from './util';

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
  deleteLedger: (ledgerId: number) => void;
  selectLedger: (id: number) => void;
  fetchApplicationData: () => void;
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
const initialLedgerState = {
  selectedLedgerId: 0,
  ledgerIdList: [],
  ledgerJson: {},
};

export const createLedgerSlice: StateCreator<
  StoreState,
  [],
  [],
  LedgerState
> = set => {
  sliceResetFns.add(() => set(initialLedgerState));

  return {
    ...initialLedgerState,
    fetchApplicationData: async () => {
      const {
        categoryJson,
        ledgerIdList,
        ledgerJson,
        subCategoryJson,
        transactionIdList,
        transactionJson,
      } = await getApplicationData();
      set({
        categoryJson,
        ledgerIdList,
        ledgerJson,
        subCategoryJson,
        transactionIdList,
        transactionJson,
      });
    },
    selectLedger: (id: number) =>
      set(() => ({
        selectedLedgerId: id,
      })),
    addLedger: (payload: AddLedgerPayload) =>
      set((state: StoreState) => ({
        selectedLedgerId: payload?.id,
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
    deleteLedger: (ledgerId: number) =>
      set((state: StoreState) => {
        const newLedgerIdList = state.ledgerIdList?.filter(
          item => item !== ledgerId,
        );
        return {
          selectedLedgerId:
            state?.selectedLedgerId === ledgerId
              ? newLedgerIdList[0]
              : state?.selectedLedgerId,
          ledgerIdList: newLedgerIdList,
          ledgerJson: omit([ledgerId], state.ledgerJson),
        };
      }),
  };
};
