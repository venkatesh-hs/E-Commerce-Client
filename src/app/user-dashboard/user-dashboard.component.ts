import { Component, OnDestroy, OnInit } from "@angular/core";
import { BooksService } from "../services/books.service";
import { Book } from "../shared/book";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private bookSub = new Subscription();
  books = new Array<Book>();
  userId: string;
  //clicked = false; (Implementation of disabling the botton on adding the book to cart)
  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];
    this.bookService.getBooks();
    this.bookSub = this.bookService.books.subscribe((books) => {
      this.books = books;
    });
  }

  addToCart(id: string) {
    console.log("Inside addToCart : " + id);
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
  }
}
