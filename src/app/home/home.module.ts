import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../common/components/navigation/layout.module";

const routes: Routes =[
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports:[
        CommonModule,
        LayoutModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    bootstrap: [ HomeComponent ]
})
export class HomeModule{

}