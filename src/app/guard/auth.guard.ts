import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let currentUser = null;
        await this.authService.getToken().then(data => {
            if (this.authService.isLoggedIn) {
                currentUser = this.authService.isLoggedIn;
            }
        });
        if (currentUser) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
    }
}
