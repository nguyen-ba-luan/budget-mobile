import {StateCreator} from 'zustand';
import {ISubCategory} from '../constant';
import {LedgerState} from './ledger.store';
import {CategoryState, StoreState} from '.';
import {addSubCategory} from '../service/api';

export interface SubCategoryState {
  subCategoryJson: {
    [id: number]: ISubCategory;
  };
  addSubCategory: (params: {
    subCategory: ISubCategory;
    categoryId: number;
  }) => void;
}

export const SubCategorySelector = {
  selectSubCategoryById: (subCategoryId?: number) => (state: StoreState) =>
    subCategoryId ? state.subCategoryJson[subCategoryId] : ({} as ISubCategory),
};

export const createSubCategorySlice: StateCreator<
  SubCategoryState & LedgerState & CategoryState,
  [],
  [],
  SubCategoryState
> = set => ({
  subCategoryJson: {},
  addSubCategory: async ({subCategory, categoryId}) => {
    const id = await addSubCategory(subCategory, categoryId);
    const subCategoryId = id || subCategory?.id;
    set(state => {
      const subCategoryIdList =
        state.categoryJson[categoryId]?.subCategoryIdList?.concat(
          subCategoryId,
        );

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
          [subCategoryId]: {...subCategory, id: subCategoryId},
        },
      };
    });
  },
});
