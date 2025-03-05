import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { cryptoReducer } from './store/crypto.reducer';
import { CryptoEffects } from './store/crypto.effects';
import { ApiService } from './services/api.service'; // ✅ Ensure this is imported

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ crypto: cryptoReducer }), // ✅ Ensure correct state key
    provideEffects([CryptoEffects]), // ✅ Provide NgRx Effects
    provideHttpClient(withFetch()), // ✅ Enable fetch API for better SSR compatibility
    ApiService // ✅ Ensure ApiService is available globally
  ]
};
