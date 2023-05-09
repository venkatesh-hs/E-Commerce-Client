import { Component, OnDestroy, OnInit } from "@angular/core";
import { BooksService } from "../services/books.service";
import { Book } from "../shared/book";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private bookSub = new Subscription();
  books = new Array<Book>();
  constructor(private bookService: BooksService) {}

  ngOnInit() {
    this.bookService.getBooks();
    this.bookSub = this.bookService.books.subscribe((books) => {
      this.books = books;
    });
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
  }
}
