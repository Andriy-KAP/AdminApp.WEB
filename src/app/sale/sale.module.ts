import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SaleComponent } from "./sale.component";
import { LayoutModule } from "../common/components/navigation/layout.module";
import { CommonModule } from "@angular/common";
import { SaleListComponent } from "./components/sale-list/sale-list.component";
import { MatCardModule, MatSortModule, MatButtonModule, MatDialogModule, MatTableModule, MatGridListModule, MatPaginatorModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatExpansionModule, MatCheckboxModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SaleListService } from "./services/sale-list.service";
import { CustomHttp } from "../common/services/custom-http.service";
import { SignalRService } from "../user/services/signalr.service";
import { SaleCreateComponent } from "./components/sale-list/components/create/sale-create.component";
import { GroupService } from "../group/services/group.service";

const routes: Routes=[
    {
        path: '',
        component: SaleComponent
    }
];

@NgModule({
    declarations: [
        SaleComponent,
        SaleListComponent,
        SaleCreateComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LayoutModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        MatGridListModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatCheckboxModule
    ],
    providers: [
        CustomHttp,
        SaleListService,
        SignalRService,
        GroupService
    ],
    bootstrap: [
        SaleComponent
    ],
    entryComponents: [
        SaleCreateComponent
    ]
})
export class SaleModule{

}