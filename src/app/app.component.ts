import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ChartsComponent } from "./charts/charts.component";
import {  TableComponent } from './table/table.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ChartsComponent,
    TableComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'energy';
}
