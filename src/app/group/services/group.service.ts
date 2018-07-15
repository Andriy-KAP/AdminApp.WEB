import { CustomHttp } from "../../common/services/custom-http.service";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Group } from "../models/group.model";

@Injectable()
export class GroupService {
    constructor(private http: CustomHttp){

    }
    getGroups(pageIndex: number, pageSize: number, search?: string){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        let params: HttpParams=new HttpParams()
            .set('PageIndex', pageIndex.toString())
            .set('PageSize', pageSize.toString())
            .set('Search', search)
            
        return this.http.get(`Group/GetGroupsCollection?PageIndex=${pageIndex}&PageSize=${pageSize}&Search=${search || ''}`, headers);
    }

    createGroup(group: Group){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });

        let params: HttpParams = new HttpParams()
            .set('Name', group.name)
            .set('OfficeId', group.officeId.toString())
            .set('OfficeName', group.officeName);

            return this.http.post(`Group/CreateNewGroup`, headers, params);
    }
}