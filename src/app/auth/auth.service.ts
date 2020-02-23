import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = new Subject<boolean>();

  constructor( private _http: HttpClient ) { }

  signUp(userObj: User) {
    this._http.post('http://localhost:3000/api/auth/signup', userObj)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  login(userObj: User) {
    this._http.post<{token: string}>('http://localhost:3000/api/auth/login', userObj)
      .subscribe(resp => {
        this.token = resp.token;
        this.isAuthenticated.next(true);
      })
  }

  getToken() {
    return this.token;
  }

  getUserAuthStatus() {
    return this.isAuthenticated.asObservable();
  }
  
}
