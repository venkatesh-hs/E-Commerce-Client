import {Component, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.setUser(this.user);
    console.log(this.user);
    console.log('user registered successfully');
  }
}
