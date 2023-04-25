import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../shared/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {
    this.userUrl = "http://localhost:8082/api/v1/users";
  }

  public setUser(user: User) {
    this.http.post(this.userUrl, user, this.httpOptions).subscribe((res) => {
      console.log(res);
    });
  }

  public getUsers() {
    const users = this.http.get(this.userUrl).toPromise;
    console.log(users);
  }
}
