import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GroupCreateFormGroup } from "../../../../models/group-create-form.model";

@Component({
    selector: 'group-create',
    templateUrl: './group-create.component.html'
})

export class GroupCreateComponent{
    public dataArray: any;
    public form: GroupCreateFormGroup;
    
    constructor(private dialogRef: MatDialogRef<GroupCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){
        this.form = new GroupCreateFormGroup();
        this.dataArray = data.offices;
        debugger;
    }

    cancel():void{
        this.dialogRef.close();
    }
    create():void{
        if(!this.form.valid){
            Object.keys(this.form.controls).forEach(control=>{
                this.form.controls[control].markAsTouched();
            });
            return;
        }
        this.dialogRef.close(this.form.value);
    }
}