import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  constructor( private _authService: AuthService, private _router: Router ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    const userObj = {
      email: form.value.email,
      password: form.value.password
    };

    this._authService.login(userObj);

    this._authService.getUserAuthStatus().subscribe(resp => {
      this.isLoading = resp;
    })
  }

  onResetPassword() {
    this._router.navigate(['/reset-password']);
  }

}
