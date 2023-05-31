import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Cart} from '../shared/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.cartUrl = Constants.CART_API;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addToCart(cart: Cart) {
    this.http.post(this.cartUrl, cart, this.httpOptions).subscribe(
      (cartRes: Cart) => {
        console.log(cartRes);
      }
    );
  }
}
