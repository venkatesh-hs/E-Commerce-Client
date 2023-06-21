import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CartItem} from '../shared/cartItem';
import {Cart} from '../shared/cart';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl: string;
  cart = new Subject<Cart>();

  constructor(private http: HttpClient, private router: Router) {
    this.cartUrl = Constants.CART_API;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addToCart(cartItem: CartItem) {
    this.http.post(this.cartUrl, cartItem, this.httpOptions).subscribe(
      (cartRes: CartItem) => {
        console.log(cartRes);
      }
    );
  }

  getUserCart(userId: Number) {
    this.http.get(this.cartUrl + '/' + userId, this.httpOptions).subscribe(
      (cart: Cart) => {
        console.log(cart);
        this.cart.next(cart);
      }
    );
  }
}
