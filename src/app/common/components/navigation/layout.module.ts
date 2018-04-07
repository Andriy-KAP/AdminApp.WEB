import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

/* Material imports */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutComponent } from "./layout.component";
@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule
    ],
    declarations: [
        LayoutComponent
    ],
    providers: [],
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