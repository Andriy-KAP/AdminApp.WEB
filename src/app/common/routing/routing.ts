
import { Route } from "@angular/router";
import { NotFoundComponent } from "../components/notFound/not-found.component";

export const routes: Route[] = [
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule'},
      { path: '**', component: NotFoundComponent }
    ];