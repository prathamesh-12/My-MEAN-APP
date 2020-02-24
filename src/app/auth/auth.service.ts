import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated: boolean = false;
  private token: string;
  private isAuthenticated = new Subject<boolean>();
  private isUserCreated = false;
  private userCreationSubject = new Subject<boolean>();

  constructor( private _http: HttpClient, private _router: Router ) { }

  signUp(userObj: User) {
    this._http.post('http://localhost:3000/api/auth/signup', userObj)
      .subscribe(resp => {
        console.log(resp);
        this.isUserCreated = true;
        this.userCreationSubject.next(true);
        this._router.navigate(['login']);
      })
  }

  login(userObj: User) {
    this._http.post<{token: string}>('http://localhost:3000/api/auth/login', userObj)
      .subscribe(resp => {
        this.token = resp.token;
        this.isUserAuthenticated = true;
        this._router.navigate(['/']);
        this.isAuthenticated.next(true);
      })
  }

  getToken() {
    return this.token;
  }

  getUserAuthStatus() {
    return this.isAuthenticated.asObservable();
  }

  checkIfUserIsAuthenticated() {
    return this.isUserAuthenticated;
  }

  checkIfUserCreated() {
    return this.isUserCreated;
  }

  getUserCreationStatus() {
    return this.userCreationSubject.asObservable();
  }

  logout() {
    this.token = null;
    this.isUserAuthenticated = null;
    this._router.navigate(['/']);
    this.isAuthenticated.next(false);
  }

}
