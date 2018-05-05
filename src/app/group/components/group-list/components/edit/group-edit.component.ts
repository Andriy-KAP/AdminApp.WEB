import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'group-edit',
    templateUrl: './group-edit.component.html'
})
export class GroupEditComponent{
    public dataArray: any;

    constructor(public dialogRef: MatDialogRef<GroupEditComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any){
        this.dataArray = data;
    }
}