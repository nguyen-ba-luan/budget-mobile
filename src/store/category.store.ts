import {StateCreator} from 'zustand';
import {ISubCategory} from '../constant';
import {LedgerState} from './ledger.store';
import {produce} from 'immer';

export interface CategoryState {
  addSubCategory: (input: {
    subCategory: ISubCategory;
    categoryId: number;
  }) => void;
}

export const createCategorySlice: StateCreator<
  CategoryState & LedgerState,
  [],
  [],
  CategoryState
> = set => ({
  addSubCategory: ({categoryId, subCategory}) => {
    return set(
      produce((state: CategoryState & LedgerState) => {
        const categoryIndex = state.ledgerJson[
          state.selectedLedgerId
        ].categories?.findIndex(item => item?.id === categoryId);

        if (categoryIndex > -1) {
          const category =
            state.ledgerJson[state.selectedLedgerId].categories[categoryIndex];

          category.subCategories = [subCategory, ...category.subCategories];
        }
      }),
    );
  },
});
