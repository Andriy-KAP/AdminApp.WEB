import { CustomHttp } from "../../common/services/custom-http.service";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserListService{
    constructor(private http: CustomHttp){

    }
    getUsers(pageIndex: number, pageSize: number){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });

        return this.http.get(`User/GetUserCollection?PageIndex=${pageIndex}&PageSize=${pageSize}&DataCount=${pageSize}`, headers);
    }
}