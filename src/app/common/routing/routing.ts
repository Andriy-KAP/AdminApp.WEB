
import { Route } from "@angular/router";
import { NotFoundComponent } from "../components/notFound/not-found.component";
import { AuthGuard } from "../guards/auth-guard.service";

export const routes: Route[] = [
      { path: '', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule'},
      { path: 'group', loadChildren: './group'}
      { path: '**', component: NotFoundComponent }
    ];