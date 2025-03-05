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
      import('highcharts').then(module => {
        const Highcharts = module.default;
        const categories = cryptoData.map(d => d.name);
        const createChart = (elementId: string, title: string, data: number[], color: string) => {
          const el = document.getElementById(elementId);
          if (!el) return;
          Highcharts.chart(el, {
            chart: {
              type: 'line',
              backgroundColor: 'white',
              borderRadius: 8,
              style: { fontFamily: 'Arial, sans-serif' },
              height: 350,
            },
            title: { text: title, style: { fontSize: '16px', fontWeight: 'bold', color: '#777' } },
            xAxis: { categories, labels: { style: { fontSize: '7px', color: '#777' } } },
            yAxis: {
              title: { text: title.includes('Price') ? 'Price ($)' : title.includes('Market') ? 'Market Cap ($)' : 'Volume ($)' },
              labels: { style: { fontSize: '12px', color: '#777' } },
              gridLineWidth: 0.7,
              gridLineColor: '#ddd'
            },
            tooltip: { shared: true, backgroundColor: '#fff', borderColor: color, borderRadius: 6, shadow: true, style: { color: '#333' } },
            legend: { itemStyle: { fontSize: '13px', fontWeight: 'bold', color: '#333' } },
            plotOptions: {
              line: {
                dataLabels: { enabled: true, style: { fontSize: '10px' } },
                enableMouseTracking: true,
                marker: { enabled: true, radius: 4, fillColor: color, lineWidth: 2, lineColor: '#fff' }
              }
            },
            series: [{ name: title, type: 'line', data, color, lineWidth: 3 }]
          });
        };
        
        const themeColors = { price: '#00c3ff', marketCap: '#ff7300', volume: '#7cb5ec' };
        createChart('chartPrice', 'Current Price', cryptoData.map(d => d.current_price), themeColors.price);
        createChart('chartMarketCap', 'Market Capitalization', cryptoData.map(d => d.market_cap), themeColors.marketCap);
        createChart('chartVolume', 'Trading Volume', cryptoData.map(d => d.total_volume), themeColors.volume);
      });
    }
  }

}
