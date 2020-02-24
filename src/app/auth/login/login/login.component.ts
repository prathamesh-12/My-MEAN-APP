import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  constructor( private _authService: AuthService ) { }

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

}
