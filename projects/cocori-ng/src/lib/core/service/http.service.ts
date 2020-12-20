import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    protected withCredentialsOption: boolean = false;
    httpWithoutInterceptor: HttpClient;

    constructor(
        private http: HttpClient,
        private httpBackend: HttpBackend
    ) {
        this.httpWithoutInterceptor = new HttpClient(httpBackend);
    }

    public set withCredentials(avec: boolean) {
        this.withCredentialsOption = avec;
    }

    private formatErrors(error: any) {
        return throwError(error.error);
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
                    return this.formatErrors(error);
                }),
            ) as Observable<T>;
    }

    post<T>(path: string, body: Object = {}, options: Object = {}): Observable<T> {
        return this.http.post(
            `${path}`,
            JSON.stringify(body),
            options
        ).pipe(
            map(this.extractData.bind(this))
        ) as Observable<T>;
    }

    _post<T>(path: string, body: Object = {}, options: Object = {}): Observable<T> {
        return this.httpWithoutInterceptor.post(
            `${path}`,
            JSON.stringify(body),
            options
        ).pipe(
            map(this.extractData.bind(this)),
            catchError(this.formatErrors)
        ) as Observable<T>;
    }

    // public httpPost<T>(urlApi: string, datas: Object): Observable<T> {
    //     const options = {
    //         observe: 'response' as 'body',
    //         responseType: 'json' as 'json',
    //         withCredentials: this.withCredentialsOption
    //     };
    //     return this.http.post(encodeURI(urlApi), datas, options)
    //         .pipe(
    //             map(this.extractData.bind(this)),
    //             // tap(() => {
    //             //     this.notifieFrmTraitementEnCours(false);
    //             // }),
    //             catchError((error: any) => {
    //                 return this.formatErrors(error);
    //             }),
    //         ) as Observable<T>;
    // }

    protected extractData(res: Response) {
        const body: any = (<any>res.body);

        if (res.status === 204) return res.body;

        if (body) {
            return typeof res.body === 'string' ? JSON.parse(<any>res.body) : res.body;
        }

        return res;
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

