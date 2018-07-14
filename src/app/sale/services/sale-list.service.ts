import { Injectable } from "@angular/core";
import { CustomHttp } from "../../common/services/custom-http.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class SaleListService{
    constructor(private http: CustomHttp){

    }
    getSales(pageIndex: number, pageSize: number, search?: string){
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth')}`
        });

        return this.http.get(`Sale/GetSalesCollection?PageIndex=${pageIndex}&PageSize=${pageSize}&DataCount=${pageSize}&Search=${search || ''}`, headers);
    }
}