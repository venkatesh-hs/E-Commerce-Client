import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../services/cart.service';
import {Subscription} from 'rxjs';
import {Cart} from '../shared/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  private userId: number;
  cartSub = new Subscription();
  cart = new Cart();

  constructor(private route: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.cartService.getUserCart(this.userId);
    this.cartSub = this.cartService.cart.subscribe((cart) => {
      console.log('Inside cart subscriber :', cart);
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

}
