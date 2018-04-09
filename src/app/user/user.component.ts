import { Component } from "@angular/core";

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent{
    public isDataLoaded: boolean = false; 

    onDataLoaded(event: any):void{
        this.isDataLoaded = true;
    }
    onDataLoading(event: any):void{
        this.isDataLoaded = false;
    }
}