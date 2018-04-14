import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent{
    constructor(){
        let jwtHelper =  new JwtHelper();
        let token = sessionStorage.getItem('auth');
        console.log(jwtHelper.getTokenExpirationDate(token));
        console.log(jwtHelper.isTokenExpired(token));
        console.log(jwtHelper.decodeToken(token));
    }
}