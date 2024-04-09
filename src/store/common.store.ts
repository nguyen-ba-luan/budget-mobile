import {StateCreator} from 'zustand';
import {StoreState} from '.';

export interface CommonState {
  globalLoading: boolean;
  setGlobalLoading(loading: boolean): void;
}

export const CommonSelector = {
  selectGlobalLoading: (state: StoreState) => state.globalLoading,
};

export const createCommonSlice: StateCreator<
  CommonState,
  [],
  [],
  CommonState
> = set => ({
  globalLoading: false,
  setGlobalLoading: (loading: boolean) =>
    set(() => ({
      globalLoading: loading,
    })),
});
