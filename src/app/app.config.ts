import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    ApiService,
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
  ]
};
