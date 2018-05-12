import { CanActivate } from "@angular/router";
import { JwtHelper } from "angular2-jwt/angular2-jwt";

export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelper){

    }
    canActivate(route, state){
        let token = sessionStorage.getItem('auth');
        if(!this.jwtHelper.isTokenExpired(token))
            return true;
        return false;
    }
}