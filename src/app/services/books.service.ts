import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Book} from '../shared/book';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksUrl: string;
  private booksToDisplay: Book[];
  public books = new Subject<Book[]>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.booksUrl = Constants.BOOKS_API;
  }

  getBooks() {
    return this.http
      .get(this.booksUrl, this.httpOptions)
      .pipe(
        map((res) => {
          const books = [];
          books.push(res);
          return books[0];
        })
      )
      .subscribe((books) => {
        this.booksToDisplay = books;
        console.log(this.booksToDisplay);
        this.books.next(this.booksToDisplay);
      });
  }
}
