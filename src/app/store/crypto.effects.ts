import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CryptoActions from './crypto.actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class CryptoEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CryptoActions.loadCryptos),
      mergeMap(action =>
        this.apiService.getMarkers(action.page, action.pageSize).pipe(
          map(cryptos => CryptoActions.loadCryptosSuccess({ cryptos })),
          catchError(error => of(CryptoActions.loadCryptosFailure({ error: error.message })))
        )
      )
    )
  );
}
