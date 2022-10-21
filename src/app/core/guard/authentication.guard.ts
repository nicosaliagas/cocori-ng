import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from 'cocori-ng/src/feature-form';
import { Observable } from 'rxjs';

import { LoginApiService } from '../api/LoginApi.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router, private loginApiService: LoginApiService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.tokenService.accessToken) {
            return true;
        } else {
            this.loginApiService.redirectUrl = state.url;

            this.router.navigate(['connexion']);

            return false;
        }
    }
}
