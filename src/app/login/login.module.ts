import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from "./login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "./services/login.service";
import { CustomHttp } from "../common/services/custom-http.service";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule } from '@angular/material';

const routes: Routes =[
    {
        path: '',
        component: LoginComponent
    }
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonModule
    ],
    providers: [ LoginService, CustomHttp ],
    bootstrap: [ LoginComponent ]
})
export class LoginModule{

}