import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent{
    public isDataLoaded: boolean = false; 
    @Output() onCreatedEvent = new EventEmitter<boolean>();
    
    constructor(private route: ActivatedRoute){
    }

    onDataLoaded(event: any):void{
        this.isDataLoaded = true;
    }
    onDataLoading(event: any):void{
        this.isDataLoaded = false;
    }
    ngOnInit(){
        
    }
}