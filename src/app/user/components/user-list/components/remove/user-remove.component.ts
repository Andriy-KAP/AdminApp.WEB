import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'user-remove',
    templateUrl: './user-remove.component.html'
})
export class UserRemoveComponent{
  constructor(public dialogRef: MatDialogRef<UserRemoveComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
    
      save(): void {
        this.dialogRef.close();
      }  
}