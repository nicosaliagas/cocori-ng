import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class SubscriptionService {
    private _subscriptions: Subscription[] = [];

    constructor() { }

    public set subscribe(newSubscription: Subscription) {
        this._subscriptions.push(newSubscription);
    }

    public get subscriptions(): Subscription[] {
        return this._subscriptions;
    }

    public unsubscribeAll() {
        this._subscriptions.forEach((souscription: Subscription) => souscription.unsubscribe());
        this._subscriptions.splice(0, this._subscriptions.length);
    }
}
