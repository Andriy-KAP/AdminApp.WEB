import { CanActivate } from "@angular/router";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelper){

    }
    canActivate(route, state){
        let token = sessionStorage.getItem('auth');
        
        return this.jwtHelper.isTokenExpired(token) ? true : false;
    }
}