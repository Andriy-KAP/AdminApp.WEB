import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BadInput } from "../models/error_models/bad-input.model";
import { NotFoundError } from "../models/error_models/not-found.model";
import { AppError } from "../models/error_models/app-error.model";

@Injectable()
export class CustomHttp{
    public static serverUrl:string='http://localhost:55484/api/';

    constructor(private http: HttpClient){

    }

    static saveToken(token: string):void{
        sessionStorage.setItem('auth', token);
    }
    static getToken():string{
        return sessionStorage.getItem('auth');
    }
    static removeToken():void{
        sessionStorage.removeItem('auth');
    }

    private errorHandling(error:Response){
        if(error.status === 404)
            return Observable.throw(new NotFoundError(''));
        if(error.status === 400)
            return Observable.throw(new BadInput(''));
        return Observable.throw(new AppError(error));
    }

    public get(url:string, headers: HttpHeaders){
        return this.http.get(CustomHttp.serverUrl.concat(url), { headers })
            .catch(this.errorHandling);
    }
    public post(url:string, headers: HttpHeaders, params?: HttpParams){
        return this.http.post(CustomHttp.serverUrl.concat(url), params, { headers })
            .catch(this.errorHandling);
    }
}