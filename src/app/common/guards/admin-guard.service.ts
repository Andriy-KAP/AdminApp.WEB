import { CanActivate } from "@angular/router";
import { JwtHelper } from "angular2-jwt";

export class AdminGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelper){

    }
    canActivate(){
        let token = sessionStorage.getItem('auth');
        let decodedToken = this.jwtHelper.decodeToken(token);
        
        return decodedToken.role === 'Admin' ? true : false;
    }
}