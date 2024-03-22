import {StateCreator} from 'zustand';
import {ISubCategory} from '../constant';
import {LedgerState} from './ledger.store';
import {produce} from 'immer';
import {CategoryState} from '.';

export interface SubCategoryState {
  subCategoryJson: {
    [id: number]: ISubCategory;
  };
  addSubCategory: (params: {
    subCategory: ISubCategory;
    categoryId: number;
  }) => void;
}

export const createSubCategorySlice: StateCreator<
  SubCategoryState & LedgerState & CategoryState,
  [],
  [],
  SubCategoryState
> = set => ({
  subCategoryJson: {},
  addSubCategory: ({subCategory, categoryId}) =>
    set(state => {
      const subCategoryIdList = state.categoryJson[
        categoryId
      ]?.subCategoryIdList?.concat(subCategory?.id);

      return {
        categoryJson: {
          ...state.categoryJson,
          [categoryId]: {
            ...(state.categoryJson[categoryId] || {}),
            subCategoryIdList,
          },
        },
        subCategoryJson: {
          ...state.subCategoryJson,
          [subCategory.id]: subCategory,
        },
      };
    }),
});
