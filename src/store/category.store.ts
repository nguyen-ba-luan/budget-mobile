import {StateCreator} from 'zustand';
import {IFullLedgerCategory, ILedgerCategory} from '../constant';
import {LedgerState} from './ledger.store';
import {StoreState} from '.';
import {omit} from 'ramda';
import {addCategory} from '../service/api';

export interface CategoryState {
  categoryJson: {
    [id: number]: ILedgerCategory;
  };
  addCategory: (params: {category: ILedgerCategory; ledgerId: number}) => void;
}

export const CategorySelector = {
  selectLedgerCategory: (categoryId?: number) => (state: StoreState) =>
    categoryId
      ? {
          ...omit(['subCategoryIdList'], state.categoryJson[categoryId]),
          subCategoryList: state.categoryJson[
            categoryId
          ]?.subCategoryIdList?.map(item => state.subCategoryJson[item]),
        }
      : ({} as IFullLedgerCategory),
};

export const createCategorySlice: StateCreator<
  CategoryState & LedgerState,
  [],
  [],
  CategoryState
> = set => ({
  categoryJson: {},
  addCategory: async ({category, ledgerId}) => {
    const id = await addCategory(category, ledgerId);
    const categoryId = id || category?.id!;

    set(state => {
      const categoryIdList =
        state.ledgerJson[ledgerId]?.categoryIdList?.concat(categoryId);

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
          [categoryId]: {...category, id: categoryId},
        },
      };
    });
  },
});
