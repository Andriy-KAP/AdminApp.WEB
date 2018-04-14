import { CanActivate } from "@angular/router";
import { JwtHelper } from "angular2-jwt/angular2-jwt";

export class AuthGuard implements CanActivate {
    constructor(){

    }
    canActivate(route, state){
        // if(!this.jwtHelper.isTokenExpired(sessionStorage.getItem('auth')))
        //     return true;
        // return false;
        return true;
    }
}