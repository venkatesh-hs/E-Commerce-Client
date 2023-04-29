import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Constants } from "../constants";
import { User } from "../shared/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public user = new User();

  constructor(private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.userService.validateUser(this.user);
  }
}
