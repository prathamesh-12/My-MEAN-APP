import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private _authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //throw new Error("Method not implemented.");
        const token = this._authService.getToken();
        const tokenReq = req.clone({
          headers:  req.headers.set('Authorization', 'Bearer '+token)
        })
        return next.handle(tokenReq);
    }
    
}