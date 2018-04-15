import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupComponent } from "./group.component";

const routes: Routes = [
    { path: '', component: GroupComponent }
];

@NgModule({
    declarations: [
        GroupComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers:[],
    bootstrap: []
})
export class GroupModule{

}