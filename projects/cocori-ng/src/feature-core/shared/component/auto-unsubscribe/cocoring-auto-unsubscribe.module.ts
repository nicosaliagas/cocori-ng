import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoUnsubscribeComponent } from './cocoring-auto-unsubscribe.component';

@NgModule({
    declarations: [AutoUnsubscribeComponent],
    imports: [
        CommonModule
    ],
    exports: [AutoUnsubscribeComponent]
})
export class CocoringAutoUnsubscribeModule { }