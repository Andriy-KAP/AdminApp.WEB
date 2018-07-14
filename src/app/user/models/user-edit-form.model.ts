import { FormControl, NgForm, FormGroupDirective, FormGroup, Validators, AsyncValidatorFn, ValidatorFn, AbstractControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { UserListService } from "../services/user-list.service";
import { Inject, Injectable } from "@angular/core";

export class UserEditErrorMatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean{
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export class UserEditFormControl extends FormControl {
    label: string;
    type: string;
    placeholder: string;
    modelProperty: string;
    matcher: UserEditErrorMatcher;

    constructor(modelProperty: string, label: string, type: string, placeholder: string, value: string, validators: ValidatorFn[], asyncValidators?: AsyncValidatorFn[] ){
        super(value, validators, asyncValidators);
        this.label = label;
        this.type = type;
        this.placeholder = placeholder;
        this.modelProperty = modelProperty;
        this.matcher = new UserEditErrorMatcher();
    }

    getValidationMessages(){
        let messages: string[] = [];
        if(this.errors){
            for(let error in this.errors){
                switch(error){
                    case 'required' : messages.push(`${this.label} is required`); break;
                    case 'minlength' : messages.push(`${this.label} must be a minimum ${this.errors['minlength'].requiredLength}`); break;
                    case 'usernameTaken' : messages.push('Username is already taken'); break;
                }
            }
            return messages;
        }
    }
}

export class ValidateUsernameNotTaken{
    static isUserExist(userListService: UserListService){
        return (control: AbstractControl)=>{
            return userListService.isUserExist(control.value).map(result=>{
                return result ? {usernameTaken: true} : null;
            })
        }
    }
}

@Injectable()
export class UserEditFormGroup extends FormGroup{
    constructor(@Inject(UserListService) private userListService){
        super({
            username: new UserEditFormControl('username', 'Username', 'text', 'Username','',[
                    Validators.required,
                    Validators.minLength(5)
                ],
                [
                    ValidateUsernameNotTaken.isUserExist(userListService)
                ]
            ),
            groupId: new UserEditFormControl('groupId', 'Group', 'select', 'Group', '', [
                Validators.required
            ])
        })
        debugger;
    }
    userEditControls(): UserEditFormControl[]{
        return Object.keys(this.controls)
            .map(key=>this.controls[key] as UserEditFormControl);
    }

    getValidationMessages(){
        let messages: string[] = [];
        this.userEditControls().forEach((control)=>{
            control.getValidationMessages().forEach((message)=>{
                messages.push(message);
            })
        })
        return messages;
    }
}