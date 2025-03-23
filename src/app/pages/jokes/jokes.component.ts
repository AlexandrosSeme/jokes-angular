import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jokes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  joke: any = null;
  showPunchLine: boolean = false;
  loading: boolean = false;
  loadingPunch: boolean = false;
  favoritesJokes: any[] = [];
  searchTerm: string = '';
  sortField: 'type' | 'setup' | 'punchline' = 'type';
  sortAsc: boolean = true;
  stars = [1, 2, 3, 4, 5];


  constructor(private req: ApiService) { }

  ngOnInit(): void {
    this.initFavouritesTable();
  }

  initFavouritesTable() {
    const storedFavorites = localStorage.getItem('favoritesJokes');
    this.favoritesJokes = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  onToggleChange(event: any) {
    this.showPunchLine = false;
    this.loading = true;
    this.loadingPunch = true
    const selectedCategory = event.value;
    this.req.getJokes(selectedCategory).subscribe({
      next: (res) => {
        this.loading = res ? false : true;
        this.joke = Array.isArray(res) ? res[0] : res;
        setTimeout(() => {
          this.showPunchLine = true
          this.loadingPunch = false;
        }, 2000)
      },
      error: (err) => {
        const errorTitle = err.error?.message || 'An unexpected error occurred';
        const errorStatus = err.status || 'Unknown Status';
        const errorLink = err.url || 'No request URL';
        Swal.fire({
          icon: 'error',
          title: `Error:  ${errorStatus}`,
          text: errorTitle,
          footer: `<a href="${errorLink}" target="_blank">${errorLink}</a>`,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#d33',
          backdrop: true
        });
        this.loading = false;
        this.loadingPunch = false
      }
    });
  }

  addFavorite(joke: any) {
    const exists = this.favoritesJokes.find(j => j.id === joke.id);
    if (!exists) {
      this.favoritesJokes.push({ ...joke, rating: 0 });
      localStorage.setItem('favoritesJokes', JSON.stringify(this.favoritesJokes));
    }
  }

  removeFavorite(joke: any) {
    this.favoritesJokes = this.favoritesJokes.filter(el => el.id !== joke.id);
    localStorage.setItem('favoritesJokes', JSON.stringify(this.favoritesJokes));
  }

  filteredAndSortedFavorites(): any[] {
    let filtered = this.favoritesJokes.filter(joke =>
      joke.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      joke.setup.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      joke.punchline.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return filtered.sort((a, b) => {
      const aVal = a[this.sortField].toLowerCase();
      const bVal = b[this.sortField].toLowerCase();
      return this.sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }

  toggleSortOrder() {
    this.sortAsc = !this.sortAsc;
  }

  setRating(joke: any, rating: number) {
    const index = this.favoritesJokes.findIndex(j => j.id === joke.id);
    if (index !== -1) {
      this.favoritesJokes[index].rating = rating;
      localStorage.setItem('favoritesJokes', JSON.stringify(this.favoritesJokes));
    }
  }

  getStarArray(count: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < count);
  }

}
