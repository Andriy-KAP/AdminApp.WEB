import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { routes } from './common/routing/routing'

/* Custom components */
import { NotFoundComponent } from "./common/components/notFound/not-found.component";

/* Guards */
import { AuthGuard } from "./common/guards/auth-guard.service";
import { JwtHelper } from 'angular2-jwt';
import { AdminGuard } from './common/guards/admin-guard.service';
import { LoginGuard } from './common/guards/login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    JwtHelper,
    AuthGuard,
    AdminGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
