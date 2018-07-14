import { Component } from "@angular/core";

@Component({
    selector: 'sale',
    templateUrl: './sale.component.html'
})
export class SaleComponent{
    public isDataLoaded: boolean = false; 
    constructor(){
        
    }
    onDataLoaded(event: any):void{
        this.isDataLoaded = true;
    }
    onDataLoading(event: any):void{
        this.isDataLoaded = false;
    }
}