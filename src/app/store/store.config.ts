import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from '../app.component';
import { cryptoReducer } from './crypto.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ counter: cryptoReducer })
  ]
}).catch(err => console.error(err));
