import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { SaleListService } from "../../../../services/sale-list.service";
import { SaleCreateFormGroup } from "../../../../models/sale-create-from.model";

@Component({
    selector: 'sale-create',
    templateUrl: './sale-create.component.html'
})
export class SaleCreateComponent{
    public form: SaleCreateFormGroup;
    public dataArray: any[];
    
    constructor(@Inject(SaleListService) private saleListService, public dialogRef: MatDialogRef<SaleCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
        this.form = new SaleCreateFormGroup(saleListService);
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