import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "../services/cart.service";
import { Subscription } from "rxjs";
import { Cart } from "../shared/cart";
import { Constants } from "../constants";
import { C } from "@angular/core/src/render3";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, OnDestroy {
  private userId: number;
  cartSub = new Subscription();
  cartCountSub = new Subscription();
  cart = new Cart();
  cartCount: number;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];
    this.cartService.getUserCart(this.userId);
    this.cartSub = this.cartService.cart.subscribe((cart) => {
      console.log("Inside cart subscriber :", cart);
      this.cart = cart;
    });
    this.cartService.cartItemCount.subscribe((count) => {
      console.log("Inside cart subscriber --> count :", count);
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.cartCountSub.unsubscribe();
  }

  redirectToDashboard() {
    this.router.navigate([Constants.REDIRECT_USER_DASHBOARD, this.userId]);
  }

  removeFromCart(bookId: number) {
    console.log("Inside removeFromCart : " + bookId);
    this.cartService.removeFromCart(bookId, this.userId);
  }
}
