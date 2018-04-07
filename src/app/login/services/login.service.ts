import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { CustomHttp } from "../../common/services/custom-http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginService {
    constructor(private http: CustomHttp){

    }
    getToken(user: UserModel): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        let params: HttpParams = new HttpParams()
            .set('Email', user.username)
            .set('Password', user.password);

        return this.http.post('Account/Login', headers, params);
    }
}