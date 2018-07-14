import { FormControl, FormGroup, ValidatorFn, Validators, AsyncValidatorFn, FormGroupDirective, NgForm } from "@angular/forms";
import { SignupValidators } from "../components/signup/validators/signup.validators";
import { ErrorStateMatcher } from "@angular/material";

export class SignupErrormatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean
    {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export class SignupFormControl extends FormControl {
    label: string;
    modelProperty: string;
    placeholder: string;
    type: string;

    constructor(label: string, modelProperty: string, placeholder: string, type: string, value: any, validator: ValidatorFn [], asyncValidators? : AsyncValidatorFn[]){
        super(value, validator, asyncValidators);
        this.label = label;
        this.modelProperty = modelProperty;
        this.placeholder = placeholder;
        this.type = type;
    }

    getValidationMessages(){
        let messages = [];
        if(this.errors){
            for(let error in this.errors){
                switch(error){
                    case 'required' : messages.push(`${this.label} is required`); break;
                    case 'minlength' : messages.push(`${this.label} must be minimum ${this.errors['minlength'].requiredLength}`); break;
                    case 'shouldBeUnique': messages.push (`${this.label} should be unique`); break;
                    case 'cannotContainSpace' : messages.push(`${this.label} cannot contain spaces.`); break;
                }
            }
        }
        return messages;
    }
}

export class SignupFormGroup extends FormGroup {
    constructor(){
        super({
            username: new SignupFormControl('username', 'username', 'Username', 'text', '', [
                Validators.required,
                Validators.minLength(3),
                SignupValidators.cannotContainSpace
            ],[
                SignupValidators.shouldBeUnique
            ]),
            password: new SignupFormControl('password', 'password', 'Password', 'password', '', [
                Validators.required
            ])})
        }
        get signupControls(): SignupFormControl[]{
            return Object.keys(this.controls)
                .map(key=> this.controls[key] as SignupFormControl);
        }
        getValidationMessages(){
            let messages = [];
            this.signupControls.forEach(control=> control.getValidationMessages()
                .forEach(message=> messages.push(message))
            );
            return messages;
        }
    }