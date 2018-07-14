import { Validators, AsyncValidator, FormControl, AsyncValidatorFn, FormGroup, ValidatorFn, NgForm, FormGroupDirective, AbstractControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { SaleListService } from "../services/sale-list.service";
import { Injectable, Inject } from "@angular/core";

export class SaleCreateErrorMatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean{
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
export class SaleCreateFormControl extends FormControl {
    label: string;
    type: string;
    placeholder: string;
    modelProperty: string;
    matcher: SaleCreateErrorMatcher;

    constructor(modelProperty: string, label: string, type: string, placeholder: string, value: string, validators: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]){
        super(value, validators, asyncValidators);
        this.label= label;
        this.type = type;
        this.placeholder = placeholder;
        this.modelProperty = modelProperty;
        this.matcher = new SaleCreateErrorMatcher();
    }

    getValidationMessages(){
        let messages: string[]=[];
        if(this.errors){
            for(let error in this.errors){
                switch(error){
                    case 'required' : messages.push(`${this.label} is required`); break;
                    case 'minlength' : messages.push(`${this.label} must be minimum ${this.errors['minlength'].requiredLength}`); break;
                    case 'usernameTaken' : messages.push('Username is already taken'); break;
                }
            }
        }
        return messages;
    }
}
export class SaleCreateFormGroup extends FormGroup{
    constructor(@Inject(SaleListService) private saleListService){
        super({
            name: new SaleCreateFormControl('name','Name','text','Name','',[
                Validators.required,
                Validators.minLength(5)
            ]),
            groupId: new SaleCreateFormControl('groupId', 'Group', 'select', 'Group', '', [ Validators.required ])
        })
    }

    saleCreateControls(): SaleCreateFormControl[]{
        return Object.keys(this.controls)
            .map(key => this.controls[key] as SaleCreateFormControl);
    }   

    getValidationMessages(){
        let messages: string[] = [];
        this.saleCreateControls().forEach((control)=>{
            control.getValidationMessages().forEach((message)=>{
                messages.push(message);
            })
        })
        return messages;
    }
}