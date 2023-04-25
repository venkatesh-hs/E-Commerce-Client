import { Component, OnInit } from "@angular/core";
import { LoginUser } from "../shared/login-user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginUser = new LoginUser();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.loginUser);
  }
}
