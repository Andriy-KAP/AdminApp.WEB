import { Validators, AsyncValidator, FormControl, AsyncValidatorFn, FormGroup, ValidatorFn, NgForm, FormGroupDirective, AbstractControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { UserListService } from "../services/user-list.service";
import { Injectable, Inject } from "@angular/core";

export class UserCreateErrorMatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean{
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
export class UserCreateFormControl extends FormControl {
    label: string;
    type: string;
    placeholder: string;
    modelProperty: string;
    matcher: UserCreateErrorMatcher;

    constructor(modelProperty: string, label: string, type: string, placeholder: string, value: string, validators: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]){
        super(value, validators, asyncValidators);
        this.label = label;
        this.type= type;
        this.placeholder = placeholder;
        this.modelProperty= modelProperty;
        this.matcher = new UserCreateErrorMatcher();
    }

    getValidationMessages(){
        let messages: string[]=[];
        if(this.errors){
            for(let error in this.errors){
                switch(error){
                    case 'required' : messages.push(`${this.label} is reuqired`); break;
                    case 'minlength' : messages.push(`${this.label} must be minimum ${this.errors['minlength'].requiredLength}`); break;
                    case 'usernameTaken' : messages.push('Username is already taken'); break;
                }
            }
        }
        return messages;
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
export class UserCreateFormGroup extends FormGroup{
    constructor(@Inject(UserListService) private userListService){
        super({
            username: new UserCreateFormControl('username','Username', 'text', 'Username' ,'',[ 
                Validators.required,
                Validators.minLength(5)],
                [
                    ValidateUsernameNotTaken.isUserExist(userListService)
                ]   
            ),
            password: new UserCreateFormControl('password','Password', 'password', 'Password', '', [
                Validators.required,
                Validators.minLength(5)
            ]),
            groupId: new UserCreateFormControl('groupId', 'Group', 'select', 'Group', '',[
                Validators.required
            ])
        })
    }

    userCreateControls(): UserCreateFormControl[]{
        return Object.keys(this.controls)
            .map(key=> this.controls[key] as UserCreateFormControl);
    }

    getValidationMessages(){
        let messages: string[]=[];
        this.userCreateControls().forEach((control)=>{
            control.getValidationMessages().forEach((message)=>{
                messages.push(message);
            })
        })
        return messages;
    }
}