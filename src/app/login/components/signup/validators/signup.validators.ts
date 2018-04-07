import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class SignupValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null{
        if((control.value as string).indexOf(' ') != -1)
            return { cannotContainSpace: true }
        return null;
    }
    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors> | null{
        return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    if(control.value === 'mosh'){
                        console.log(control);
                        return resolve({ shouldBeUnique: true })
                    }
                    else{
                        console.log(control); 
                        return resolve(null);
                    }
                }, 1000);
        });
    }
}