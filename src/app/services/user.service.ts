import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { Constants } from '../constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string;
  private authenticateUrl: string;
  public error = new Subject<string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.userUrl = Constants.USERS_API;
  }

  public setUser(user: User) {
    this.http.post(this.userUrl, user, this.httpOptions).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.message);
      }
    );
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate([Constants.REDIRECT_LOGIN]);
  }

  public authenticateUser(user: User) {
    this.authenticateUrl = Constants.USERS_AUTHENTICATE;
    console.log(this.authenticateUrl);
    this.http.post<any>(this.authenticateUrl, user, this.httpOptions).subscribe(
      (res) => {
        if (res != null) {
          console.log(res);
          const userId = res.user.id;
          const token = res.token;
          sessionStorage.setItem(userId, token);
          console.log('sessionStorage data: ' + sessionStorage.getItem(userId));
          this.redirectToUserDashboard(userId);
        }
      },
      (err) => {
        this.error.next(err.message);
      }
    );
  }

  redirectToUserDashboard(id: string) {
    this.router.navigate([Constants.REDIRECT_USER_DASHBOARD, id]);
  }
}
