import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../user.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;

  constructor( private _authService: AuthService ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const user = {
      email: form.value.email,
      password: form.value.password
    } 

    this._authService.signUp(user);

    this._authService.getUserCreationStatus().subscribe(isUserCreated => {
      console.log(isUserCreated);
      this.isLoading = isUserCreated;
    })
  }

}
