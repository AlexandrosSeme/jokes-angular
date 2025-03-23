import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://official-joke-api.appspot.com/random_joke';

  constructor(private http: HttpClient) { }

  getJokes(category: string): Observable<any> {
    let url = '';
    if (category === 'Random') {
      url = 'https://official-joke-api.appspot.com/random_joke';
    } else if (category === 'Programming') {
      url = 'https://official-joke-api.appspot.com/jokes/programming/random';
    }
    return this.http.get<any>(url).pipe(
      tap(() => { }),
      catchError((err) => {
        throw err;
      })
    );
  }

}


