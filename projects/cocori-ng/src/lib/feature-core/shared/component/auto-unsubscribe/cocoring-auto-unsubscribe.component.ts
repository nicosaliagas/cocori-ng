import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: '',
    template: ''
})

export class AutoUnsubscribeComponent implements OnDestroy {
    protected subscriptions: Subscription = new Subscription();

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}