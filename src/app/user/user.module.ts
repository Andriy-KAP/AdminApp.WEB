import { NgModule } from "@angular/core";
import { LayoutModule } from "../common/components/navigation/layout.module";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./components/user-list/user-list.component";
import { MatTableModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSortModule, 
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule} from '@angular/material';
import { UserListService } from "./services/user-list.service";
import { HttpClientModule } from "@angular/common/http";
import { CustomHttp } from "../common/services/custom-http.service";
import { UserEditComponent } from "./components/user-list/components/edit/user-edit.component";
import { FormsModule } from "@angular/forms";

const routes: Routes=[
    {
        path: '',
        component: UserComponent
    }
];

@NgModule({
    declarations: [
        UserComponent,
        UserListComponent,
        UserEditComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        LayoutModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        UserListService,
        CustomHttp
    ],
    bootstrap: [ UserComponent ],
    entryComponents: [ UserEditComponent ]
})
export class UserModule{

}