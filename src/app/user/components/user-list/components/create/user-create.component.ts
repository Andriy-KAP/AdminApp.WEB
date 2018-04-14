import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserCreateFormGroup } from "../../../../models/user-create-form.model";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent{
    public form: UserCreateFormGroup;
    public dataArray: any[];

    constructor(public dialogRef: MatDialogRef<UserCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
        this.form = new UserCreateFormGroup();
        this.dataArray = data.groups;
    }
    save():void {
        this.dialogRef.close();
    }
}