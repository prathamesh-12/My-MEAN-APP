import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export class AuthGuard implements CanActivate {

    constructor( private _authService: AuthService, private _router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        //throw new Error("Method not implemented.");
        const isAuthenticated = this._authService.checkIfUserIsAuthenticated();

        if(!isAuthenticated) {
            this._router.navigate(['/login']);
        } 
        return isAuthenticated;
    }

}