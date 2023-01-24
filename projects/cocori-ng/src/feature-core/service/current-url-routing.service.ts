import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CurrentUrlRoutingService {
    public currentUrl = new BehaviorSubject<string>(undefined);
}
