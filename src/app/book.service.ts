import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public baseUrl = 'https://localhost:8000/api';
  public books = 'https://localhost:8000/api/books';

  constructor(private http: HttpClient) { }

  

  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.books).pipe(
      tap(_ => console.log('fetched Books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }
  createBook(book: Book): Observable<any> {
    return this.http.post<Book>('https://localhost:8000/api/books', book, httpOptions).pipe(
      tap((newBook: Book) => console.log(`added hero w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('create'))
    );
  }
  getBook(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/book/${id}`);
  }
  /*
 updateBook(id: number, book: Book): Observable<any> {
  return this.http.put<Book>(`https://localhost:8000/api/book/${id}`, book, httpOptions).pipe(
    tap((newBook: Book) => console.log(`added hero w/ id=${newBook.id}`)),
    catchError(this.handleError<Book>('create'))
  );
}
*/
  updateBook(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/book/${id}`, value);
  }
  

  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${'https://127.0.0.1:8000/api/book'}/${id}`;
    console.log(id);

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Book id=${id}`)),
      catchError(this.handleError<Book>('delete'))
    );
  }

  
  getBooksList(): Observable<any> {
    return this.http.get(`${this.books}`);
  }
  
}