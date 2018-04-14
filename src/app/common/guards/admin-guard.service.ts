import { CanActivate } from "@angular/router";

export class AdminGuard implements CanActivate {
    canActivate(){
        return true;
    }
}