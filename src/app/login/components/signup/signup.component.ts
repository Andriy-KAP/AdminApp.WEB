import { Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SignupValidators } from "./validators/signup.validators";
import { SignupFormGroup } from "../../models/signup-form.model";
import { LoginService } from "../../services/login.service";
import { UserModel } from "../../models/user.model";
import { CustomHttp } from "../../../common/services/custom-http.service";
import { Router } from "@angular/router";

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
@Injectable()
export class SignupComponent implements OnInit{
    public form: SignupFormGroup = new SignupFormGroup();

    constructor(private loginService:LoginService, private router: Router){

    }
    // public form: FormGroup = new FormGroup({
    //     username: new FormControl('',[
    //         Validators.required,
    //         Validators.minLength(3),
    //         SignupValidators.cannotContainSpace
    //     ], SignupValidators.shouldBeUnique),
    //     password: new FormControl('', [
    //         Validators.required,
    //         Validators.minLength(5)
    //     ])
    // });

    // get username(){
    //     return this.form.get('username');
    // }
    // get password(){
    //     return this.form.get('password');
    // }

    ngOnInit(){
        
    }

    login(){
        let isValid = this.form.valid;
        if(!isValid){
            this.form.setErrors({
                invalidCredentials: true
            });
            return;
        }
        let user: UserModel = new UserModel(this.form.value['username'], this.form.value['password']);
        this.loginService.getToken(user).subscribe((response)=>{
            console.log(response);
            CustomHttp.saveToken(response.data);
            this.router.navigate(['/']);
        });
    }
}