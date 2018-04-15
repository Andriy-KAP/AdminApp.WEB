import { Validators, AsyncValidator, FormControl, AsyncValidatorFn, FormGroup, ValidatorFn } from "@angular/forms";

export class UserCreateFormControl extends FormControl {
    label: string;
    type: string;
    placeholder: string;
    modelProperty: string;

    constructor(modelProperty: string, label: string, type: string, placeholder: string, value: string, validators: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]){
        super(value, validators, asyncValidators);
        this.label = label;
        this.type= type;
        this.placeholder = placeholder;
        this.modelProperty= modelProperty;
    }

    getValidationMessages(){
        let messages: string[]=[];
        if(this.errors){
            for(let error in this.errors){
                switch(error){
                    case 'required' : messages.push(`${this.label} is reuqired`); break;
                    case 'minlength' : messages.push(`${this.label} must be minimum ${this.errors['minlength'].requiredLength}`); break;
                }
            }
        }
        return messages;
    }
}
export class UserCreateFormGroup extends FormGroup{
    constructor(){
        super({
            username: new UserCreateFormControl('username','Username', 'text', 'Username' ,'',[ 
                Validators.required,
                Validators.minLength(5)]),
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