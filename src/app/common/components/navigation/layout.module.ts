import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

/* Material imports */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutComponent } from "./layout.component";
import { MatSnackBarModule, MatIconModule, MatButtonModule } from "@angular/material";
import { SignalRService } from "../../../user/services/signalr.service";
import { RouterModule } from "@angular/router";
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatIconModule
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