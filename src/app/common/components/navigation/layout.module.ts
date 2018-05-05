import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

/* Material imports */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutComponent } from "./layout.component";
import { MatSnackBarModule } from "@angular/material";
import { SignalRService } from "../../../user/services/signalr.service";
@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule
    ],
    declarations: [
        LayoutComponent
    ],
    providers: [
        SignalRService
    ],
    exports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        LayoutComponent
    ],
    bootstrap: [
        LayoutComponent
    ]
})
export class LayoutModule{

}