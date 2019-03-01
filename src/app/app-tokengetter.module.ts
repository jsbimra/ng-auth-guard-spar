import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

const tokenGetter = () => localStorage.getItem('token');

@NgModule({
  imports: [JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ['localhost:4200'],
      blacklistedRoutes: ['/api/login']
    }
  })],
  exports: [JwtModule]
})
export class AppJwtConfigModule { }
