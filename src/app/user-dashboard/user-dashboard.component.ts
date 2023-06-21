import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../services/books.service';
import {Book} from '../shared/book';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CartItem} from '../shared/CartItem';
import {CartService} from '../services/cart.service';
import {Constants} from '../constants';

function prepareCartModel(bookId: number, userId: number) {
  return new CartItem(userId, bookId);
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private bookSub = new Subscription();
  books = new Array<Book>();
  userId: number;

  // clicked = false; (Implementation of disabling the button on adding the book to cart)
  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.bookService.getBooks();
    this.bookSub = this.bookService.books.subscribe((books) => {
      this.books = books;
    });
  }

  addToCart(bookId: number) {
    console.log('Inside addToCart : ' + bookId);
    this.cartService.addToCart(prepareCartModel(bookId, this.userId));
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
  }

  redirectToUserCart() {
    this.router.navigate([Constants.REDIRECT_USER_CART, this.userId]);
  }

  redirectToDashboard() {
    this.router.navigate([Constants.REDIRECT_USER_DASHBOARD, this.userId]);
  }
}
