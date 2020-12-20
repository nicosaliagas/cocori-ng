import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/internal/Subject';

interface BroadcastEvent {
    eventKeys: EventKeys;
    eventData?: any;
}

interface Event<T> {
    eventKey: string;
    event: Observable<T>;
}

type EventKeys = (string | number)[];

@Injectable({
    providedIn: 'root',
})
export class BroadcastEventService {
    private _eventBus: Subject<BroadcastEvent>;
    private _broadcastedEvents: Event<any>[] = [];

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    broadcast(event: BroadcastEvent) {
        this._eventBus.next(event);
    }

    listen<T>(keys: EventKeys): Observable<T> {
        const eventKey: string = keys.join("-")

        if (!this.isEventKnown(eventKey)) {
            const newEvent: Observable<T> = this._eventBus.asObservable()
                .pipe(
                    filter(event => (event.eventKeys.join("-")) === eventKey),
                    map(event => event.eventData),
                );

            this._broadcastedEvents.push(<Event<T>>{ eventKey: eventKey, event: newEvent });

            return newEvent;
        } else {
            return this.returnEvent(eventKey);
        }
    }

    private isEventKnown(eventKey: string): boolean {
        const index = this._broadcastedEvents.findIndex(entrée => entrée.eventKey === eventKey);

        return index >= 0;
    }

    private returnEvent<T>(eventKey: string): Observable<T> {
        const event = this._broadcastedEvents.find(event => event.eventKey === eventKey);

        return event.event;
    }
}
