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
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule} from '@angular/material';
import { UserListService } from "./services/user-list.service";
import { HttpClientModule } from "@angular/common/http";
import { CustomHttp } from "../common/services/custom-http.service";
import { UserEditComponent } from "./components/user-list/components/edit/user-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRemoveComponent } from "./components/user-list/components/remove/user-remove.component";
import { GroupService } from "../group/services/group.service";
import { UserCreateComponent } from "./components/user-list/components/create/user-create.component";
import { SignalRService } from "./services/signalr.service";
import { NotificationComponent } from "../common/components/notification/notification.component";

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
        UserEditComponent,
        UserRemoveComponent,
        UserCreateComponent,
        NotificationComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
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
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatSnackBarModule
    ],
    providers: [
        UserListService,
        GroupService,
        CustomHttp,
        SignalRService
    ],
    bootstrap: [ UserComponent ],
    entryComponents: [ UserEditComponent, UserRemoveComponent, UserCreateComponent, NotificationComponent ]
})
export class UserModule{

}