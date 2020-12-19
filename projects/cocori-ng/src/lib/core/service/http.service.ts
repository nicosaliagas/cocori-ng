import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    protected withCredentialsOption: boolean = false;

    constructor(
        private http: HttpClient
    ) { }

    public set withCredentials(avec: boolean) {
        this.withCredentialsOption = avec;
    }

    public httpGet<T>(urlApi: string, datas?: Object): Observable<T> {
        const options = {
            observe: 'response' as 'body',
            responseType: 'json' as 'json',
            params: this.construireUrl(datas), withCredentials: this.withCredentialsOption
        };

        return this.http.get(encodeURI(urlApi), options)
            .pipe(
                map(this.extractData.bind(this)),
                // tap(() => {
                //     this.notifieFrmTraitementEnCours(false);
                // }),
                catchError((error: any) => {
                    return this.handleError(error);
                }),
            ) as Observable<T>;
    }

    public httpPost<T>(urlApi: string, datas: Object): Observable<T> {
        const options = {
            observe: 'response' as 'body',
            responseType: 'json' as 'json',
            withCredentials: this.withCredentialsOption
        };

        return this.http.post(encodeURI(urlApi), datas, options)
            .pipe(
                map(this.extractData.bind(this)),
                // tap(() => {
                //     this.notifieFrmTraitementEnCours(false);
                // }),
                catchError((error: any) => {
                    return this.handleError(error);
                }),
            ) as Observable<T>;
    }

    protected extractData(res: Response) {
        const body: any = (<any>res.body);

        if (res.status === 204) return res.body;

        if (body) {
            return typeof res.body === 'string' ? JSON.parse(<any>res.body) : res.body;
        }

        return res.body;
    }

    protected handleError(erreurs: any) {
        return throwError(erreurs);
    }

    protected construireUrl(parametres: any): HttpParams {
        const params = new HttpParams();
        for (const property in parametres) {
            if (parametres.hasOwnProperty(property)) {
                params.append(property, parametres[property]);
            }
        }
        return params;
    }
}

