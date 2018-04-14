import { CustomHttp } from "../../common/services/custom-http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

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
    editUser(user: User){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        let params: HttpParams = new HttpParams()
            .set('Id', user.id.toString())
            .set('Email', user.username)
            .set('GroupId', user.groupId.toString())
            .set('hashedPassword', user.hashedPassword);

        return this.http.post('User/Edit', headers, params);
    }
    deleteUser(id: number){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        let params: HttpParams = new HttpParams()
            .set('id', id.toString())

        return this.http.post('User/Remove', headers, params);
    }
}