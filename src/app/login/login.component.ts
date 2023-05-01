import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../shared/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public user = new User();
  private errorMessage: string = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.error.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  onSubmit() {
    this.userService.validateUser(this.user);
  }
}
