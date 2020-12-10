import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/internal/Subject';

interface BroadcastEvent {
    eventCode: string;
    eventData?: any;
}

@Injectable({
    providedIn: 'root',
})
export class BroadcastEventService {
    private _eventBus: Subject<BroadcastEvent>;
    private _tableauEcoute: any[] = [];

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    broadcast(event: BroadcastEvent) {
        this._eventBus.next(event);
    }

    listen<T>(eventCode: string): Observable<T> {
        if (!this.déjàEnEcoute(eventCode)) {
            const évènement: any = this._eventBus.asObservable()
                .pipe(
                    filter(event => event.eventCode === eventCode),
                    map(event => <T>event.eventData),
                );

            const obs: any = { "code": eventCode, "évènement": évènement };

            this._tableauEcoute.push(obs);

            return évènement;
        } else {
            return this.évènementEnEcoute(eventCode);
        }
    }

    private déjàEnEcoute(code: string): boolean {
        const index = this._tableauEcoute.findIndex(entrée => entrée.code === code);

        return index >= 0;
    }

    private évènementEnEcoute(code: string): any {
        const obs = this._tableauEcoute.find(entrée => entrée.code === code);

        return obs.évènement;
    }
}
