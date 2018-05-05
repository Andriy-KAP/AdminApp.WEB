import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'group-remove',
    templateUrl: './group-remove.component.html'
})
export class GroupRemoveComponent{
    public dataArray: any;

    constructor(public dialogRef: MatDialogRef<GroupRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){

    }

    cancel(){
        this.dialogRef.close();
    }

    save():void{
        this.dialogRef.close();
    }
}