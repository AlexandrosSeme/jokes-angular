import { createAction, props } from '@ngrx/store';
import { Crypto } from './crypto.model';

export const loadCryptos = createAction(
  '[Crypto] Load Cryptos',
  props<{ page: number; pageSize: number }>()
);

export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptos Success',
  props<{ cryptos: Crypto[] }>()
);

export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptos Failure',
  props<{ error: string }>()
);
