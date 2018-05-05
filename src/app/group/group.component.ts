import { Component } from '@angular/core';

@Component({
    selector: 'group',
    templateUrl: './group.component.html'
})
export class GroupComponent{
    public isDataLoaded: boolean = false; 

    onDataLoaded(event: any):void{
        this.isDataLoaded = true;
    }
    onDataLoading(event: any):void{
        this.isDataLoaded = false;
    }
}