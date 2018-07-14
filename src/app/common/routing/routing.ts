
import { Route } from "@angular/router";
import { NotFoundComponent } from "../components/notFound/not-found.component";
import { AuthGuard } from "../guards/auth-guard.service";
import { AdminGuard } from "../guards/admin-guard.service";
import { LoginGuard } from "../guards/login-guard.service";

export const routes: Route[] = [
      { path: '', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
      { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [LoginGuard] },
      { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard] },
      { path: 'group', loadChildren: './group/group.module#GroupModule', canActivate: [AuthGuard] },
      { path: 'sale', loadChildren: './sale/sale.module#SaleModule', canActivate: [AuthGuard] },      
      { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] }
    ];