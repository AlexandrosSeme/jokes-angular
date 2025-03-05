import { createReducer, on } from '@ngrx/store';
import * as CryptoActions from './crypto.actions';
import { CryptoState } from './crypto.model';

export const initialState: CryptoState = {
  cryptos: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 50,
};

export const cryptoReducer = createReducer(
  initialState,
  on(CryptoActions.loadCryptos, (state, { page, pageSize }) => ({
    ...state,
    loading: true,
    page,
    pageSize
  })),
  on(CryptoActions.loadCryptosSuccess, (state, { cryptos }) => ({
    ...state,
    loading: false,
    cryptos,
    error: null
  })),
  on(CryptoActions.loadCryptosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
