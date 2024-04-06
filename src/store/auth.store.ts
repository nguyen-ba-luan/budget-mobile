import {StateCreator} from 'zustand';
import {StoreState} from '.';

export interface AuthState {
  token: string;
  setToken(token: string): void;
}

export const AuthSelector = {
  selectLogged: (state: StoreState) => !!state.token,
};

export const createAuthSlice: StateCreator<
  AuthState,
  [],
  [],
  AuthState
> = set => ({
  token: '',
  setToken: (token: string) =>
    set(() => ({
      token,
    })),
});
