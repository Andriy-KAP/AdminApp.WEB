import { CanActivate, Router } from "@angular/router";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelper, private router: Router){

    }
    canActivate(route, state){
        let token = sessionStorage.getItem('auth');

        if(token != null){
            if(!this.jwtHelper.isTokenExpired(token)){
                return true;
            }
        }
        this.redirect();
        return true;
    }
    private redirect():void{
        sessionStorage.removeItem('auth');
        this.router.navigate(['/login']);
    }
}