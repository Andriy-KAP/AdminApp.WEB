import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupComponent } from "./group.component";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../common/components/navigation/layout.module";
import { GroupService } from "./services/group.service";
import { CustomHttp } from "../common/services/custom-http.service";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatDialogModule, MatInputModule, MatSelectModule } from "@angular/material";
import { GroupEditComponent } from "./components/group-list/components/edit/group-edit.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { GroupRemoveComponent } from "./components/group-list/components/remove/group-remove.component";
import { GroupCreateComponent } from "./components/group-list/components/create/group-create.component";
import { OfficeService } from "./services/office.service";

const routes: Routes = [
    { path: '', component: GroupComponent }
];

@NgModule({
    declarations: [
        GroupComponent,
        GroupListComponent,
        GroupEditComponent,
        GroupRemoveComponent,
        GroupCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LayoutModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule
    ],
    providers:[
        GroupService,
        CustomHttp,
        OfficeService
    ],
    bootstrap: [],
    entryComponents: [ GroupEditComponent, GroupRemoveComponent, GroupCreateComponent ]
})
export class GroupModule{

}