import { CustomHttp } from "../../common/services/custom-http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import 'rxjs/add/operator/map';

@Injectable()
export class UserListService{
    constructor(private http: CustomHttp){

    }
    getUsersInfo(){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });

        return this.http.get(`User/GetGlobalUserInfo`, headers);
    }
    getUsers(pageIndex: number, pageSize: number, search?: string){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });

        return this.http.get(`User/GetUserCollection?PageIndex=${pageIndex}&PageSize=${pageSize}&DataCount=${pageSize}&Search=${search || ''}`, headers);
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
    createUser(user: User){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        let params: HttpParams = new HttpParams()
            .set('Email', user.username)
            .set('Password', user.hashedPassword)
            .set('GroupId', user.groupId.toString()) 

        return this.http.post('User/Create', headers, params);
    }
    isUserExist(username: string){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        
        return this.http.get(`User/IsUserExist?username=${username}`, headers);
    }
}