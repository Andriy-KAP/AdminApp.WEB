import { NgModule } from "@angular/core";
import { LayoutModule } from "../common/components/navigation/layout.module";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { CommonModule } from "@angular/common";

const routes: Routes=[
    {
        path: '',
        component: UserComponent
    }
];

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    bootstrap: [ UserComponent ]
})
export class UserModule{

}