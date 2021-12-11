import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    startLoading() {
        this.subject.next(true);
    }

    stopLoading() {
        this.subject.next(false);
    }
}

