import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    public loggedIn: Subject<boolean> = new Subject<boolean>();

    // make isLoggedIn public readonly
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    constructor(private http: HttpClient) {
        this.loggedIn.next(false);
    }

    public login(username: string, password: string): Observable<boolean> {

        return this.http.post<{ token: string, expiresIn:any }>('api/login', { username: username, password: password })
            .pipe(
                map(result => {
                    //set token here: 
                    console.log(result);
                    const expiresAt = moment().add(result.expiresIn, 'second');
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
                    localStorage.setItem("isLoggedIn", "true");

                    //this.set loggedIn
                    // this.loggedIn.next(true);
                    return true;
                })
            )
    }

    public logout() {
        console.log('Logout invoked auth service ');
        this.loggedIn.next(false);
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("isLoggedIn");
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token ? true : false;
        // return !this.jwtHelper.isTokenExpired(token);
    }
}