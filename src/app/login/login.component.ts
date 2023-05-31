import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user = new User();
  errorMessage: string = null;
  errorSub = new Subscription();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.errorSub = this.userService.error.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  onSubmit() {
    this.userService.validateUser(this.user);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
