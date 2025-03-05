import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Crypto } from '../store/crypto.model';
import { CryptoState } from '../store/crypto.model';
import { selectCryptos } from '../store/crypto.selectors';

@Component({
  standalone: true,
  selector: 'app-charts',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit, AfterViewInit {
  chart: any;
  cryptos$: Observable<Crypto[]>;

  constructor(private store: Store<{ crypto: CryptoState }>) {
    this.cryptos$ = this.store.select(selectCryptos);
  }

  ngOnInit() {
    this.cryptos$.subscribe(cryptos => {
      this.initCharts(cryptos);
    });
  }

  ngAfterViewInit(): void {
    this.cryptos$.subscribe(cryptos => {
      this.initCharts(cryptos);
    });
  }

  initCharts(cryptoData: Crypto[]): void {
    if (typeof window !== 'undefined') {
      import('highcharts').then(Highcharts => {
        const categories = cryptoData.map(d => d.name);
        new Highcharts.Chart({
          chart: { type: 'line', renderTo: 'chartPrice' },
          title: { text: 'Current Price' },
          xAxis: { categories },
          yAxis: { title: { text: 'Price ($)' } },
          series: [{ name: 'Price', type: 'line', data: cryptoData.map(d => d.current_price) }]
        });
        new Highcharts.Chart({
          chart: { type: 'line', renderTo: 'chartMarketCap' },
          title: { text: 'Market Capitalization' },
          xAxis: { categories },
          yAxis: { title: { text: 'Market Cap ($)' } },
          series: [{ name: 'Market Cap', type: 'line', data: cryptoData.map(d => d.market_cap) }]
        });
        new Highcharts.Chart({
          chart: { type: 'line', renderTo: 'chartVolume' },
          title: { text: 'Trading Volume' },
          xAxis: { categories },
          yAxis: { title: { text: 'Volume ($)' } },
          series: [{ name: 'Trading Volume', type: 'line', data: cryptoData.map(d => d.total_volume) }]
        });
      });
    }
  }
}
