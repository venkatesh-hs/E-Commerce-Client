import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Book } from "../shared/book";
import { Constants } from "../constants";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  private booksUrl: string;
  private booksToDisplay: Book[];
  public books = new Subject<Book[]>();

  constructor(private http: HttpClient) {
    this.booksUrl = Constants.BOOKS_API;
  }

  getBooks(userId: number) {
    return this.http
      .get(this.booksUrl, setHttpOptions(<string>(<undefined>userId)))
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

function setHttpOptions(userId: string) {
  return {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "bearer " + sessionStorage.getItem(<string>(<undefined>userId)),
    }),
  };
}
