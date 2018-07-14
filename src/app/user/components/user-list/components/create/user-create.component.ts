import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserCreateFormGroup } from "../../../../models/user-create-form.model";
import { UserListService } from "../../../../services/user-list.service";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent{
    public form: UserCreateFormGroup;
    public dataArray: any[];

    constructor(@Inject(UserListService) private userListService, public dialogRef: MatDialogRef<UserCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
        this.form = new UserCreateFormGroup(userListService);
        this.dataArray = data.groups.items;
    }
    create():void {
        if(!this.form.valid){
            Object.keys(this.form.controls).forEach(control=>{
                this.form.controls[control].markAsTouched();
            });
            return;
        }
        this.dialogRef.close(this.form);
    }
    close():void{
        this.dialogRef.close();
    }
}