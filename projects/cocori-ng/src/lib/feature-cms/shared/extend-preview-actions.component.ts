import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy } from '@angular/core';
import { BroadcastEventService, ConfigEvents } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';

import { OrientationParamsTpl, ResponsiveOrientation } from '../core/model/cms.model';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-preview-tpl',
    template: ''
})

export abstract class ExtendPreviewActionsComponent implements OnDestroy {
    public cdr: any;
    public subscriptions: Subscription = new Subscription();

    subscription: Subscription = new Subscription();
    broadcastEventService: BroadcastEventService;

    orientation: string = 'row'
    orientationWidth: string = '100%';
    flexWidth: string;

    constructor(injector: Injector) {
        this.cdr = injector.get(ChangeDetectorRef);
        this.broadcastEventService = injector.get(BroadcastEventService);

        this.onOrientationChanged()
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    private onOrientationChanged() {
        this.subscription.add(
            this.broadcastEventService.listen([ConfigEvents.CMS_RESPONSIVE_ORIENTATION_CHANGED]).subscribe((orientation: ResponsiveOrientation) => {
                this.getOrientationParams(orientation)

                this.cdr.detectChanges()
            })
        )
    }

    getOrientationParams(type: ResponsiveOrientation) {
        this.flexWidth = null

        var orientations: OrientationParamsTpl = {
            'mobile': () => {
                this.orientation = 'column'
                this.orientationWidth = '375px'
                this.flexWidth = '100%'
            },
            'tablet-port': () => {
                this.orientation = 'column'
                this.orientationWidth = '768px'
            },
            'tablet-land': () => {
                this.orientation = 'row'
                this.orientationWidth = '1024px'
            },
            'computer': () => {
                this.orientation = 'row'
                this.orientationWidth = '100%'
            }
        };

        (orientations[type] || orientations['default'])();
    }
}
