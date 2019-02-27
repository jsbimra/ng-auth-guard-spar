import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'about', component: AboutComponent,
    // canActivate: [AuthGuard],

  },
  {
    path: 'contact', component: ContactComponent,
    // canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
