import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CryptoState } from '../store/crypto.model';

export const selectCryptoState = createFeatureSelector<CryptoState>('crypto');

export const selectCryptos = createSelector(selectCryptoState, state => state.cryptos);
export const selectLoading = createSelector(selectCryptoState, state => state.loading);
export const selectPage = createSelector(selectCryptoState, state => state.page);
export const selectPageSize = createSelector(selectCryptoState, state => state.pageSize);
