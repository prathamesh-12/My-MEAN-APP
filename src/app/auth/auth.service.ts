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
  private tokenTimer:any; //NodeJS.Timer;
  

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
    this._http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/auth/login', userObj)
      .subscribe(resp => {
        const expiresIn = resp.expiresIn;
        this.setAuthTimer(expiresIn);
        const currentDate = new Date().getTime();
        const expirationDate = new Date(currentDate + (expiresIn*1000));
        this.token = resp.token;

        this.saveAuthData(this.token, expirationDate);
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
    console.log("Logout called");
    this.token = null;
    this.isUserAuthenticated = null;
    this._router.navigate(['/']);
    this.isAuthenticated.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString()) //used toISOString for storing searalized version of date
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  autoLoggedInUser() {
    const authInfo = this.getAuthDataFromLocalStorage();
    if(!authInfo) {
      return;
    }
    //check if token is still valid thereby cmparing with current date
    const current = new Date().getTime();
    const expDate = authInfo.expirationDate.getTime();
    const tokenWillExpireIn = expDate - current;
    if(tokenWillExpireIn > 0) {
      this.token = authInfo.token;
      this.isUserAuthenticated = true;
      this.setAuthTimer(tokenWillExpireIn/1000);
      this.isAuthenticated.next(true);
    }
  }

  private getAuthDataFromLocalStorage() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expirationDate');

    if(!token || !expDate) {
      return;
    }

    return {
      token : token,
      expirationDate: new Date(expDate)
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }

  

}
