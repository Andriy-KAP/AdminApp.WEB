import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserEditFormGroup } from "../../../../models/user-edit-form.model";
import { UserListService } from "../../../../services/user-list.service";


@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent{
    public dataArray: any;
    public form: UserEditFormGroup;
    
    constructor(@Inject(UserListService) private userListService, public dialogRef: MatDialogRef<UserEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataArray = data.groups.items;
      this.form= new UserEditFormGroup(userListService);
      this.mapFormData(data);
    }
    
    save(): void {
      if(!this.form.valid){
        Object.keys(this.form.controls).forEach(control=>{
          this.form.controls[control].markAsTouched();
        });
        return;
      }
      this.dialogRef.close(this.form);
    }
    private mapFormData(data: object):void{
      Object.keys(data).forEach(key=>{
        if(this.form.controls[key]!= undefined){
          let a = this.form.controls[key];
          let b = data[key];
          this.form.controls[key].setValue(data[key]);
        }
      })
    }
}