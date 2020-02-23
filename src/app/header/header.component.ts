import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  private isAuthSubscription: Subscription;
  isAuthenticated: boolean = false;

  constructor( private _authService: AuthService ) {}
  
  ngOnInit(){
    this.isAuthSubscription = this._authService.getUserAuthStatus().subscribe(isAuthFlag => {
      this.isAuthenticated = isAuthFlag;
    })    
  }
  
  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
