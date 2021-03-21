import { HttpBackend, HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    public set withCredentials(value: boolean) {
        this.withCredentialsOption = value;
    }

    get<T>(path: string, params?: Object): Observable<T> {
        return this.http.get(`${path}`, { params: this.buildUrlParams(params), withCredentials: this.withCredentialsOption })
            .pipe(
                map(this.extractData.bind(this))
            ) as Observable<T>;
    }

    _get<T>(path: string, params?: Object): Observable<T> {
        return this.httpWithoutInterceptor.get(`${path}`, { params: this.buildUrlParams(params), withCredentials: this.withCredentialsOption })
            .pipe(
                map(this.extractData.bind(this))
            ) as Observable<T>;
    }

    put<T>(path: string, body: Object = { withCredentials: this.withCredentialsOption }): Observable<any> {
        return this.http.put(
            `${path}`,
            JSON.stringify(body)
        ).pipe(
            map(this.extractData.bind(this))
        ) as Observable<T>;
    }

    _put<T>(path: string, body: Object = { withCredentials: this.withCredentialsOption }): Observable<T> {
        return this.httpWithoutInterceptor.put(`${path}`, JSON.stringify(body))
            .pipe(
                map(this.extractData.bind(this))
            ) as Observable<T>;
    }

    post<T>(path: string, body: Object = {}, options: Object = { withCredentials: this.withCredentialsOption }): Observable<T> {
        options['headers'] = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        return this.http.post(
            `${path}`,
            JSON.stringify(body),
            options
        ).pipe(
            map(this.extractData.bind(this))
        ) as Observable<T>;
    }

    upload<T>(path: string, body: Object = {}, options: Object = { withCredentials: this.withCredentialsOption }): Observable<HttpEvent<T>> {
        options['headers'] = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        options['reportProgress'] = true;
        options['observe'] = "events";

        return this.http.post(
            `${path}`,
            JSON.stringify(body),
            options
        ) as Observable<HttpEvent<T>>;
    }

    _post<T>(path: string, body: Object = {}, options: Object = { withCredentials: this.withCredentialsOption }): Observable<T> {
        options['headers'] = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        return this.httpWithoutInterceptor.post(
            `${path}`,
            JSON.stringify(body),
            options
        ).pipe(
            map(this.extractData.bind(this))
        ) as Observable<T>;
    }

    protected extractData(res: Response) {
        if (!res) return res

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

