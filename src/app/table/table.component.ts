import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Crypto } from '../store/crypto.model';
import * as CryptoActions from '../store/crypto.actions';
import { CryptoState } from '../store/crypto.model';
import { selectCryptos, selectLoading, selectPage, selectPageSize } from '../store/crypto.selectors';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id', 'name', 'symbol', 'current_price', 'market_cap',
    'total_volume', 'high_24h', 'low_24h', 'price_change_percentage_24h', 'circulating_supply'
  ];
  dataSource = new MatTableDataSource<Crypto>();
  searchTerm: string = '';
  selectedSymbols = new FormControl<string[]>([], { nonNullable: true });
  availableSymbols: string[] = [];
  isLoading$: Observable<boolean>;
  cryptos$: Observable<Crypto[]>;
  page$: Observable<number>;
  pageSize$: Observable<number>;

  constructor(private store: Store<{ crypto: CryptoState }>) {
    this.cryptos$ = this.store.select(selectCryptos);
    this.isLoading$ = this.store.select(selectLoading);
    this.page$ = this.store.select(selectPage);
    this.pageSize$ = this.store.select(selectPageSize);
  }

  ngOnInit() {
    this.store.dispatch(CryptoActions.loadCryptos({ page: 1, pageSize: 50 }));
    this.cryptos$.subscribe(cryptos => {
      this.dataSource.data = cryptos;
      this.availableSymbols = [...new Set(cryptos.map((item: Crypto) => item.symbol))];

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      if (['market_cap', 'current_price', 'total_volume', 'high_24h', 'low_24h', 'circulating_supply'].includes(property)) {
        return Number(item[property]) || 0;
      }
      return (item[property] || '').toString().toLowerCase();
    };
    this.dataSource.filterPredicate = (data: any) => {
      const searchValue = this.searchTerm.trim().toLowerCase();
      if (this.selectedSymbols.value.length > 0 && !this.selectedSymbols.value.includes(data.symbol)) {
        return false;
      }
      return (
        data.name.toLowerCase().includes(searchValue) ||
        data.symbol.toLowerCase().includes(searchValue) ||
        data.market_cap.toString().includes(searchValue)
      );
    };
  }

  applyFilter() {
    this.dataSource.filter = Math.random().toString();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageSelect(event: any) {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.store.dispatch(CryptoActions.loadCryptos({ page, pageSize }));

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  formatPercentage(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return "0.00%";
    }
    return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  }

  resetSearch() {
    this.searchTerm = '';
    this.applyFilter();
  }

  resetFilters() {
    this.selectedSymbols.setValue([]);
    this.applyFilter();
  }
}
