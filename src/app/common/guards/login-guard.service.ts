import { CanActivate } from "@angular/router";
import { JwtHelper } from "angular2-jwt";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private jwtHelper: JwtHelper){

    }
    canActivate(){
        let token = sessionStorage.getItem('auth');
        return token != null ? false : true;
    }
}