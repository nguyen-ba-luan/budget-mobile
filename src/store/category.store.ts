import {StateCreator} from 'zustand';
import {ILedgerCategory, defaultCategoryJson} from '../constant';
import {LedgerState} from './ledger.store';
import {StoreState} from '.';

export interface CategoryState {
  categoryJson: {
    [id: number]: ILedgerCategory;
  };
  addCategory: (params: {category: ILedgerCategory; ledgerId: number}) => void;
}

export const CategorySelector = {
  selectLedgerCategory: (categoryId: number) => (state: StoreState) => ({
    ...state.categoryJson[categoryId],
    subCategoryList: state.categoryJson[categoryId]?.subCategoryIdList?.map(
      item => state.subCategoryJson[item],
    ),
  }),
};

export const createCategorySlice: StateCreator<
  CategoryState & LedgerState,
  [],
  [],
  CategoryState
> = set => ({
  categoryJson: defaultCategoryJson,
  addCategory: ({category, ledgerId}) =>
    set(state => {
      const categoryIdList = state.ledgerJson[ledgerId]?.categoryIdList?.concat(
        category?.id,
      );

      return {
        ledgerJson: {
          ...state.ledgerJson,
          [ledgerId]: {
            ...(state.ledgerJson[ledgerId] || {}),
            categoryIdList,
          },
        },
        categoryJson: {
          ...state.categoryJson,
          [category.id]: category,
        },
      };
    }),
});
