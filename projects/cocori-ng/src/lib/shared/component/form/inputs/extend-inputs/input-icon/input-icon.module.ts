import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { InputIconComponent } from './input-icon.component';

@NgModule({
    declarations: [
        InputIconComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        InputIconComponent
    ]
})
export class InputIconModule { }