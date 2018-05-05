import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent{
    constructor(private snackBar: MatSnackBar){

    }

    openSnackBar(message: string):void {
        let snackBarRef = this.snackBar.open(message, '',{
            duration: 10000
        });
    }
    onCreated(flag: boolean){
        debugger;
        this.openSnackBar('New user has been created.');
    }
}