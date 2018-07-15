import { Injectable } from "@angular/core";
import { CustomHttp } from "../../common/services/custom-http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class OfficeService{
    constructor(private http: CustomHttp){
        
    }
    getOffices(pageIndex: number, pageSize: number, search?: string){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });
        let params: HttpParams=new HttpParams()
            .set('PageIndex', pageIndex.toString())
            .set('PageSize', pageSize.toString())
            .set('Search', search)
            
        return this.http.get(`Office/GetOfficeCollection?PageIndex=${pageIndex}&PageSize=${pageSize}&Search=${search || ''}`, headers);
    }
}