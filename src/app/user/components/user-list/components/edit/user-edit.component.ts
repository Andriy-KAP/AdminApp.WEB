import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent{
    constructor(public dialogRef: MatDialogRef<UserEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
    
      save(): void {
        debugger;
        this.dialogRef.close();
      }
}