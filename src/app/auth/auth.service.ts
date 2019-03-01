import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    get isLoggedIn() {
        return this.isAuthenticated();
    }

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    login(username: string, password: string): Observable<boolean> {

        return this.http.post<{ token: string, expiresIn: any }>('api/login', { username: username, password: password })
            .pipe(
                map(result => {
                    //set token here: 
                    console.log(result);
                    const expiresAt = moment().add(result.expiresIn, 'second');
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

                    return true;
                })
            )
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
    }

    testSecretApiLogic() {
        console.log('test Secret api logic  called');
        // this.http.get('api/secretTest')
        this.http.get('api/users')
            .subscribe(
                result => {
                    console.log(result);
                    // return true;
                },

                err => console.error(err),
                () => console.log('secretTestLogic promise completed')
            )
    }
}