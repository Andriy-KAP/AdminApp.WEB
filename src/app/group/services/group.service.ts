import { CustomHttp } from "../../common/services/custom-http.service";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class GroupService {
    constructor(private http: CustomHttp){

    }
    getGroups(){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });

        return this.http.get(`Group/GetGroupsCollection`, headers);
    }
}