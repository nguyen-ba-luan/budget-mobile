import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LedgerState, createLedgerSlice} from './ledger.store';
import {TransactionState, createTransactionSlice} from './transaction.store';
import {CategoryState, createCategorySlice} from './category.store';
import {SubCategoryState, createSubCategorySlice} from './sub-category.store';
import {DateFilterState, createDateFilterSlice} from './date-filter.store';
import {AuthState, createAuthSlice} from './auth.store';

export * from './ledger.store';
export * from './category.store';
export * from './transaction.store';
export * from './date-filter.store';
export * from './auth.store';

export type StoreState = LedgerState &
  TransactionState &
  CategoryState &
  SubCategoryState &
  DateFilterState &
  AuthState;

export const useRootStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createLedgerSlice(...a),
      ...createTransactionSlice(...a),
      ...createCategorySlice(...a),
      ...createSubCategorySlice(...a),
      ...createDateFilterSlice(...a),
      ...createAuthSlice(...a),
    }),
    {
      name: 'root-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
