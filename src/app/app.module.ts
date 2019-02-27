import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {APP_BASE_HREF} from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LandingComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    AuthGuardService,
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
