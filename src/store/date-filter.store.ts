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
  customFilter: {
    from: string;
    to: string;
  };
  changeFilterType(type: FilterType): void;
  changeMonthlyFilterYear(year: number): void;
  changeMonthlyFilterMonth(month: number): void;
  changeCustomFilter(data: DateFilterState['customFilter']): void;
}

export const DateFilterSelector = {
  selectSelectedType: (state: StoreState) => state.selectedType,
  selectMonthlyFilter: (state: StoreState) => state.monthlyFilter,
  selectCustomFilter: (state: StoreState) => state.customFilter,
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
  customFilter: {
    from: dayjs().startOf('month').toISOString(),
    to: dayjs().endOf('month').toISOString(),
  },
  changeFilterType: type =>
    set(() => ({
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
  changeCustomFilter: data =>
    set(() => ({
      customFilter: data,
    })),
});
