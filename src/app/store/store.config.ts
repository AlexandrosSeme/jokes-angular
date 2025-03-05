import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from '../app.component';
import { counterReducer } from './crypto.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ counter: counterReducer })
  ]
}).catch(err => console.error(err));
