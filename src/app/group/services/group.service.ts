import { CustomHttp } from "../../common/services/custom-http.service";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class GroupService {
    constructor(private http: CustomHttp){

    }
    getGroups(pageIndex: number, pageSize: number){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        let params: HttpParams=new HttpParams()
            .set('PageIndex', pageIndex.toString())
            .set('PageSize', pageSize.toString())
            
        return this.http.get(`Group/GetGroupsCollection?PageIndex=${pageIndex}&PageSize=${pageSize}`, headers);
    }
}