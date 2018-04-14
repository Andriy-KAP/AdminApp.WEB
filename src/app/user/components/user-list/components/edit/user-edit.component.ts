import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit{
    public dataArray: any;

    constructor(public dialogRef: MatDialogRef<UserEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataArray = data.groups;
      console.log(this.dataArray);
    }
    
      save(): void {
        this.dialogRef.close();
      }
      ngAfterViewInit(){
        console.log(this.data);
      }
      ngOnInit(){
        console.log(this.data);
      }
}