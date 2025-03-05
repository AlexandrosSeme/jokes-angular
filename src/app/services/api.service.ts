import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(private http: HttpClient) { }

  getMarkers(page: number | string, per_page: number | string): Observable<any[]> {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('sparkline', 'false')
      .set('page', page.toString())
      .set('per_page', per_page.toString());

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      tap(() => { }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
