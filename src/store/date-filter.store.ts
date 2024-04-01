import {StateCreator} from 'zustand';
import {StoreState} from '.';
import dayjs from 'dayjs';

export enum FilterType {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM',
}

export interface DateFilterState {
  selectedType: FilterType;
  monthlyFilter: {
    year: number;
    month: number;
  };
  changeFilterType(type: FilterType): void;
  changeMonthlyFilterYear(year: number): void;
  changeMonthlyFilterMonth(month: number): void;
}

export const DateFilterSelector = {
  selectSelectedType: (state: StoreState) => state.selectedType,
  selectMonthlyFilter: (state: StoreState) => state.monthlyFilter,
};

export const createDateFilterSlice: StateCreator<
  DateFilterState,
  [],
  [],
  DateFilterState
> = set => ({
  selectedType: FilterType.MONTHLY,
  monthlyFilter: {
    year: dayjs().get('year'),
    month: dayjs().get('month') + 1,
  },
  changeFilterType: type =>
    set(state => ({
      selectedType: type,
    })),
  changeMonthlyFilterYear: year =>
    set(state => ({
      monthlyFilter: {
        ...state.monthlyFilter,
        year,
      },
    })),
  changeMonthlyFilterMonth: month =>
    set(state => ({
      monthlyFilter: {
        ...state.monthlyFilter,
        month,
      },
    })),
});
