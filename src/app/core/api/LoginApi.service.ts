import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, TokenService } from 'cocori-ng/src/feature-core';
import { interval, Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
    CheckAccessTokensModel,
    ForgotPasswordModel,
    LoginModel,
    PasswordModel,
    TokensLoginModel,
    UserProfiles,
    VerifyEmailModel,
} from '../model/Login.model';
import { TokenModel } from '../model/Token.model';
import { EnvironmentService } from '../service/environment.service';

@Injectable({
    providedIn: 'root'
})
export class LoginApiService {
    private tokenPeriod: Subscription = new Subscription;

    /** redirect to this url after logging */
    public redirectUrl: string | undefined;

    constructor(
        private router: Router,
        private httpService: HttpService,
        private tokenService: TokenService,
        private environmentService: EnvironmentService
    ) { }

    logout() {
        this.deleteTokensAndTokenPeriod();
        this.router.navigate(['connexion']);
    }

    deleteTokensAndTokenPeriod() {
        this.tokenService.deleteTokens();

        if (this.tokenPeriod) {
            this.tokenPeriod.unsubscribe();
        }
    }

    refreshToken() {
        const params: any = {
            refreshToken: this.tokenService.refreshToken,
        };
        const token: TokenModel = this.tokenService.decryptAccessToken();

        // https://codepen.io/namimosha/pen/ZpkmKW
        // const tokenDuration = moment(moment.unix(token.exp)).diff(new Date());

        const tokenExpire: Date = new Date(token.exp * 1000)
        const tokenDuration = tokenExpire.getTime() - new Date().getTime()

        if (tokenDuration > 1000) {
            this.tokenPeriod.unsubscribe();

            this.tokenPeriod = interval(
                tokenDuration * 0.90,
            )
                .pipe(
                    switchMap(() => this.CheckUserAccessToken()),
                    tap((token: CheckAccessTokensModel) => {
                        this.tokenService.accessToken = token.accessToken;
                    }),
                )
                .subscribe();
        }
    }

    UserAccessToken(loginFrmDatas: LoginModel): Observable<TokensLoginModel> {
        return this.httpService.post(`${this.environmentService.appServerPath}/admin/users/access-token`, loginFrmDatas)
    }

    /** Get new access token */
    CheckUserAccessToken(): Observable<CheckAccessTokensModel> {
        return this.httpService.get(`${this.environmentService.appServerPath}/users/access-token`)
    }

    GetPassword(passwordFrmDatas: PasswordModel) {
        return this.httpService.get(`${this.environmentService.appServerPath}/users/password`, { email: passwordFrmDatas.email })
        // get<Product[]>('https://my-json-server.typicode.com/michalbujalski/products-api/products')
    }

    PutUsersPassword(datas: ForgotPasswordModel) {
        return this.httpService.put(`${this.environmentService.appServerPath}/users/password`, datas)
    }

    UserProfiles(datas: UserProfiles) {
        return this.httpService.post(`${this.environmentService.appServerPath}/user-profiles`, datas)
    }

    UsersEmail(datas: VerifyEmailModel) {
        return this.httpService.put(`${this.environmentService.appServerPath}/users/email`, datas)
    }

}