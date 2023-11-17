import { Injectable } from "@angular/core";
import { Constants } from "../constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CartItem } from "../shared/cartItem";
import { Cart } from "../shared/cart";
import { Subject } from "rxjs";
import { forEach } from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartUrl: string;
  cart = new Subject<Cart>();
  cartItemCount = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) {
    this.cartUrl = Constants.CART_API;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  addToCart(cartItem: CartItem) {
    this.http
      .post(
        this.cartUrl,
        cartItem,
        setHttpOptions(<string>(<undefined>cartItem.userId))
      )
      .subscribe((cart: Cart) => {
        console.log("Inside add to cart service : ", cart);
        this.cartItemCount.next(calculateCartItemCount(cart));
      });
  }

  getUserCart(userId: Number) {
    this.http
      .get(
        this.cartUrl + "/" + userId,
        setHttpOptions(<string>(<undefined>userId))
      )
      .subscribe((cart: Cart) => {
        console.log(cart);
        this.cart.next(cart);
        this.cartItemCount.next(calculateCartItemCount(cart));
      });
  }

  removeFromCart(bookId: number, userId: number) {
    this.http
      .patch(
        this.cartUrl + "/" + userId + "/remove/" + bookId,
        null,
        setHttpOptions(<string>(<undefined>userId))
      )
      .subscribe((cart: Cart) => {
        console.log(cart);
        this.cart.next(cart);
        this.cartItemCount.next(calculateCartItemCount(cart));
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

function calculateCartItemCount(cart: Cart) {
  let count: number = 0;
  for (var bookItem of cart.bookItems) {
    count += bookItem.quantity;
  }
  return count;
}
