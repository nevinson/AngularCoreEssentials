import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoginViewModel } from '../viewmodels/login.viewmodel';
import { RegisterViewModel } from '../viewmodels/register.viewmodel';

@Injectable()
export class AuthenticateService {
    authToken: any;
    user: any;
    authenticated: boolean;

    constructor(private http: Http) { }

    registerUser(user: RegisterViewModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let ep = 'api/Accounts/';

        return this.http.post(ep, user, { headers: headers })
            .map(res => res.json());
    }

    authenticateUser(user: LoginViewModel) {
        // let body = `username=${user.username}&password=${user.password}&grant_type=password`
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let ep = 'api/Authenticate/';

        return this.http.post(ep, user, { headers: headers })
            .map(res => res.json());
    }

    storeUserData(token: string) { //, user
        localStorage.setItem('access_token', token);
        //localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        //this.user = user;
        this.authenticated = true;
    }

    loadToken() {
        const token = localStorage.getItem('access_token');
        this.authToken = token;
    }

    loadUser() {
        const user = localStorage.getItem('user');
        this.user = user;
    }

    loggedIn() {
        return this.authenticated; // tokenNotExpired();
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
        this.authenticated = false;
    }
}
