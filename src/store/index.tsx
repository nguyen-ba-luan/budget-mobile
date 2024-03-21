import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
  defaultLedgerJson,
  ILedger,
  ISubCategory,
  ITransaction,
} from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {produce} from 'immer';

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
  addSubCategory: (input: {
    subCategory: ISubCategory;
    categoryId: number;
  }) => void;
  addTransaction: (transaction: ITransaction) => void;
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
  selectTransactionList: (state: StoreState) =>
    state.transactionIdList
      ?.map(item => state.transactionJson[item])
      ?.filter(item => item?.ledgerId === state.selectedLedgerId),
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
      addTransaction: transaction =>
        set(state => ({
          transactionIdList: [...state.transactionIdList, transaction?.id],
          transactionJson: {
            ...state.transactionJson,
            [transaction?.id]: transaction,
          },
        })),
      addSubCategory: ({categoryId, subCategory}) => {
        return set(
          produce((state: StoreState) => {
            const categoryIndex = state.ledgerJson[
              state.selectedLedgerId
            ].categories?.findIndex(item => item?.id === categoryId);

            if (categoryIndex > -1) {
              const category =
                state.ledgerJson[state.selectedLedgerId].categories[
                  categoryIndex
                ];

              category.subCategories = [subCategory, ...category.subCategories];
            }
          }),
        );
      },
    }),
    {
      name: 'root-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
