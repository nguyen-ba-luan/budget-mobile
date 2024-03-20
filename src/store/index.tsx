import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {defaultLedgerJson, ILedger, ITransaction} from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreState {
  selectedLedgerId: number;
  ledgerIdList: number[];
  ledgerJson: {
    [id: number]: ILedger;
  };
  transactionIdList: number[];
  transactionJson: {
    [id: number]: ITransaction;
  };
  addLedger: (ledger: ILedger) => void;
  selectLedger: (id: number) => void;
}

export const RootStoreSelector = {
  selectSelectedLedger: (state: StoreState) =>
    state.ledgerJson[state.selectedLedgerId],
  selectLedgerList: (state: StoreState) =>
    state.ledgerIdList?.map(item => state.ledgerJson[item]),
  selectLedgerCategory:
    (ledgerId: number, categoryId: number) => (state: StoreState) =>
      state.ledgerJson[ledgerId].categories?.find(
        item => item?.id === categoryId,
      ),
};

export const useRootStore = create<StoreState>()(
  persist(
    set => ({
      selectedLedgerId: 1,
      ledgerIdList: [1, 2],
      ledgerJson: defaultLedgerJson,
      transactionIdList: [],
      transactionJson: {},
      selectLedger: id =>
        set(() => ({
          selectedLedgerId: id,
        })),
      addLedger: ledger =>
        set(state => ({
          ledgerIdList: [...state.ledgerIdList, ledger.id],
          ledgerJson: {
            ...state.ledgerJson,
            [ledger?.id]: ledger,
          },
        })),
    }),
    {
      name: 'root-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
