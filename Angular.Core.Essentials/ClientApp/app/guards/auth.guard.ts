import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/authenticate.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/signin']);
            return false;
        }
    }

    //canActivate(
    //  next: ActivatedRouteSnapshot,
    //  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //  return true;
    //}
}
