import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    startLoading() {
        this.subject.next(true);
    }

    stopLoading() {
        this.subject.next(false);
    }

    httpLoading(): Observable<boolean> {
        return this.subject.asObservable();
    }
}

