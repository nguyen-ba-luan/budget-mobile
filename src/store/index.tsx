import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {defaultLedgerJson, ILedger} from '../constant';

interface StoreState {
  selectedLedgerId: number;
  ledgerIdList: number[];
  ledgerJson: {
    [id: number]: ILedger;
  };
  addLedger: (ledger: ILedger) => void;
  selectLedger: (id: number) => void;
}

export const RootStoreSelector = {
  selectSelectedLedger: (state: StoreState) =>
    state.ledgerJson[state.selectedLedgerId],
  selectLedgerList: (state: StoreState) =>
    state.ledgerIdList?.map(item => state.ledgerJson[item]),
};

export const useRootStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedLedgerId: 1,
      ledgerIdList: [1],
      ledgerJson: defaultLedgerJson,
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
    },
  ),
);
