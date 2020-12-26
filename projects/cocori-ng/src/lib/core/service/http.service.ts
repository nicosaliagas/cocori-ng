import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';

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

    get<T>(path: string, params?: Object): Observable<T> {
        return this.http.get(`${path}`, { params: this.buildUrlParams(params) })
            .pipe(
                map(this.extractData.bind(this))
            ) as Observable<T>;
    }

    _get<T>(path: string, params: Object): Observable<T> {
        return this.httpWithoutInterceptor.get(`${path}`, { params: this.buildUrlParams(params) })
            .pipe(
                map(this.extractData.bind(this))
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
            map(this.extractData.bind(this))
        ) as Observable<T>;
    }

    protected extractData(res: Response) {
        const body: any = (<any>res.body);

        if (res.status === 204) return res.body;

        if (body) {
            return typeof res.body === 'string' ? JSON.parse(<any>res.body) : res.body;
        }

        return res;
    }

    protected buildUrlParams(parameters: any): HttpParams {
        let params = new HttpParams();
        for (const property in parameters) {
            if (parameters.hasOwnProperty(property)) {
                params = params.append(property, parameters[property]);
            }
        }
        return params;
    }
}

