import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CocoringLoaderComponent } from './cocoring-loader/cocoring-loader.component';

@NgModule({
    declarations: [
        CocoringLoaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
    ],
    exports: [
        CocoringLoaderComponent,
    ]
})
export class CocoringLoaderModule { }