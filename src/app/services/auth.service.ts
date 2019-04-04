import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';
import {Storage} from '@ionic/storage';
import {tap} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    token: any;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private env: EnvService
    ) {
    }

    login(email: String, password: String, isRememberMe: boolean = false) {
        return this.http.post(this.env.API_URL + 'auth/login',
            {email: email, password: password, remember_me: isRememberMe}
        ).pipe( // how about using subscribe here?
            tap(token => { // might need to console.log this token to see what return from api
                this.storage.set('token', token)
                    .then(
                        () => {
                            // console.log('Token Stored');
                        },
                        error => console.error('Error storing item', error)
                    );
                this.token = token;
                // console.log(this.token['token_type'] + ' ' + this.token['access_token']);
                this.isLoggedIn = true;
                return token;
            }),
        );
    }

    register(name: String, email: String, password: String) {
        return this.http.post(this.env.API_URL + 'auth/register',
            {name: name, email: email, password: password}
        ).pipe( // how about using subscribe here?
            tap(token => { // might need to console.log this token to see what return from api
                this.storage.set('token', token)
                    .then(
                        () => {
                            // console.log('Token Stored');
                        },
                        error => console.error('Error storing item', error)
                    );
                this.token = token;
                this.isLoggedIn = true;
                return token;
            }),
        );
    }

    forgot(email: String) {
        return this.http.post(this.env.API_URL + 'forgot',
            {email: email}
        ).pipe(
            // how about using subscribe here?
            tap(message => { // might need to console.log this token to see what return from api
                return message;
            }),
        );
    }

    reset(token: String, email: String, password: String, password_confirmation: String) {
        return this.http.post(this.env.API_URL + 'reset',
            {token: token, email: email, password: password, password_confirmation: password_confirmation}
        ).pipe(
            // how about using subscribe here?
            tap(message => { // might need to console.log this token to see what return from api
                return message;
            }),
        );
    }

    logout() {
        const headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
        });
        return this.http.get(this.env.API_URL + 'auth/logout', {headers: headers})
            .pipe(
                tap(data => {
                    this.storage.remove('token');
                    this.isLoggedIn = false;
                    delete this.token;
                    return data;
                })
            );
    }

    user() {
        // console.log('token' + JSON.stringify(this.token) );
        const headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
        });
        return this.http.get<User>(this.env.API_URL + 'auth/user', {headers: headers})
            .pipe(
                tap(user => {
                    return user;
                })
            );
    }

    getToken() {
        return this.storage.get('token').then(
            data => {
                this.token = data;
                if (this.token != null) {
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                }
                return this.token;
            },
            error => {
                this.token = null;
                this.isLoggedIn = false;
            }
        );
    }
}
