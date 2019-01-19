import { Injectable } from '@angular/core';
import { Book } from '../book/book';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + 'book')
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
