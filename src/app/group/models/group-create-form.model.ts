import { FormControl, FormGroup, ValidatorFn, AsyncValidatorFn, Validators, NgForm, FormGroupDirective } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";

export class GroupCreateErrorMatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean{
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)); 
    }
}

export class GroupCreateFormControl extends FormControl {
    label: string;
    type: string;
    placeholder: string;
    modelProperty: string;
    matcher: GroupCreateErrorMatcher;

    constructor(modelProperty: string, label: string, type: string, placeholder: string, value: string, validators: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]){
        super(value, validators, asyncValidators);
        this.label = label;
        this.type= type;
        this.placeholder = placeholder;
        this.modelProperty = modelProperty;
        this.matcher = new GroupCreateErrorMatcher();
    }
    getValidationMessages(): string[]{
        let messages: string[]=[];
        if(this.errors){
            for(let error in this.errors){
                switch(error){
                    case 'required' : messages.push(`${this.label} is required`); break;
                    case 'minlength': messages.push(`${this.label} must be  minimum ${this.errors['minlength'].requiredLength}`); break;
                }
            }
        }
        return messages;
    }
}

export class GroupCreateFormGroup extends FormGroup{
    constructor(){
        super({
            name: new GroupCreateFormControl('name', 'Name', 'text', 'Name', '', [
                Validators.required,
                Validators.minLength(5)])
        });
    }

    groupCreateControls(): GroupCreateFormControl[]{
        return Object.keys(this.controls)
            .map(key=> this.controls[key] as GroupCreateFormControl);
    }

    getValidationMessages(): string[]{
        let messages: string[] = [];
        this.groupCreateControls().forEach((control)=>{
            control.getValidationMessages().forEach((message)=>{
                messages.push(message);
            })
        })
        return messages;
    }
}