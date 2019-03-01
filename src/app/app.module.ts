import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {APP_BASE_HREF} from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';


import { AppJwtConfigModule } from './app-tokengetter.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { LoginService } from './login.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';

/*
If we are using JwtModule authorization token would be passed along with every 
http request, hence no need of using interceptor in this case.
If we need to set other things with every request we can take a use of interceptor for sure!
*/
// export const tokenGetter = () => localStorage.getItem('token');
//error in terminal while prod build angular-cli ts error :
//Function expressions are not supported in decorators in 'tokenGetter'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LandingComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppJwtConfigModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthGuardService,
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
