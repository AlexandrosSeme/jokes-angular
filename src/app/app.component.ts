import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './main-components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './main-components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    SidebarComponent,
    FooterComponent,
    MatToolbarModule,

],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'energy';
  @ViewChild('sidebar') sidebar!: SidebarComponent;


  toggleSidebar() {
    this.sidebar.toggleSidenav();
  }
}
