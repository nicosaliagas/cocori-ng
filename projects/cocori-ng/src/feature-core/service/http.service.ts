import { HttpBackend, HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SkipHeaders {
    TRUE = 'true',
    FALSE = 'false',
}

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    protected withCredentialsOption: boolean = false;
    httpWithoutInterceptor: HttpClient;

    private skip: SkipHeaders = SkipHeaders.FALSE;

    constructor(
        private http: HttpClient,
        private httpBackend: HttpBackend
    ) {
        this.httpWithoutInterceptor = new HttpClient(httpBackend);
    }

    public set withCredentials(value: boolean) {
        this.withCredentialsOption = value;
    }

    public get withCredentials() {
        return this.withCredentialsOption;
    }

    /** TODO: à tester car pas sûr que cela fonctionne... */
    delete<T>(path: string, params?: Object, skip: string = SkipHeaders.FALSE): Observable<T> {
        let options = { params: this.buildUrlParams(params), withCredentials: this.withCredentialsOption }

        if (skip === SkipHeaders.FALSE) {

            options['headers'] = { skip: skip }

            return this.http.delete(`${path}`, options)
                .pipe(
                    map(this.extractData.bind(this))
                ) as Observable<T>;
        } else {
            return this.httpWithoutInterceptor.delete(`${path}`, options)
                .pipe(
                    map(this.extractData.bind(this))
                ) as Observable<T>;
        }
    }

    get<T>(path: string, params?: Object, skip: string = SkipHeaders.FALSE): Observable<T> {
        let options = { params: this.buildUrlParams(params), withCredentials: this.withCredentialsOption }

        if (skip === SkipHeaders.FALSE) {
            options['headers'] = { skip: skip }

            return this.http.get(`${path}`, options)
                .pipe(map(this.extractData.bind(this)))
        } else {
            return this.httpWithoutInterceptor.get(`${path}`, options)
                .pipe(map(this.extractData.bind(this)))
        }
    }

    post<T>(path: string, body: Object = {}, skip: string = SkipHeaders.FALSE): Observable<T> {
        let options: Object = { withCredentials: this.withCredentialsOption }

        if (skip === SkipHeaders.FALSE) {
            options['headers'] = new HttpHeaders().set('skip', skip)

            return this.http.post(
                `${path}`,
                JSON.stringify(body),
                options
            ).pipe(map(this.extractData.bind(this)))
        } else {
            options['headers'] = new HttpHeaders()
                .set('Content-Type', 'application/json; charset=utf-8')

            return this.httpWithoutInterceptor.post(
                `${path}`,
                JSON.stringify(body),
                options
            ).pipe(map(this.extractData.bind(this)))
        }
    }

    put<T>(path: string, body: Object = {}, skip: string = SkipHeaders.FALSE): Observable<any> {
        let options = { withCredentials: this.withCredentialsOption }

        if (skip === SkipHeaders.FALSE) {
            options['headers'] = { skip: skip }

            return this.http.put(
                `${path}`,
                JSON.stringify(body),
                options
            ).pipe(map(this.extractData.bind(this)))
        } else {
            return this.httpWithoutInterceptor.put(`${path}`, JSON.stringify(body))
                .pipe(map(this.extractData.bind(this)))
        }
    }

    patch<T>(path: string, body: Object = {}, skip: string = SkipHeaders.FALSE): Observable<T> {
        let options: Object = { withCredentials: this.withCredentialsOption }

        if (skip === SkipHeaders.FALSE) {
            options['headers'] = new HttpHeaders().set('skip', skip)

            return this.http.patch(
                `${path}`,
                JSON.stringify(body),
                options
            ).pipe(map(this.extractData.bind(this)))
        } else {
            options['headers'] = new HttpHeaders()
                .set('Content-Type', 'application/json; charset=utf-8')

            return this.httpWithoutInterceptor.patch(
                `${path}`,
                JSON.stringify(body),
                options
            ).pipe(map(this.extractData.bind(this)))
        }
    }

    file<T>(path: string, params?: Object): Observable<T> {
        return this.http.get(`${path}`, { params: this.buildUrlParams(params), withCredentials: this.withCredentialsOption, responseType: 'blob' })
            .pipe(
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

