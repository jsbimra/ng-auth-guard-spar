import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const userRole = route.data.userRole || '';

        const token = localStorage.getItem('token');
        //decode the token to gets its payload
        const tokenPayload: any = jwt_decode(token);

        console.log(tokenPayload);
        console.log('route payload data: ', userRole);
        console.log('isAuthenticated? ', this.auth.isAuthenticated());

        
        if (this.auth.isAuthenticated() && tokenPayload.role !== userRole) {
            this.router.navigate(['/home']);
            return false;
        }

        if (!this.auth.isAuthenticated() && tokenPayload.role !== userRole) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
