import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TutorialsComponent } from './pages/tutorials/tutorials.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'tutorials', component: TutorialsComponent }
];
