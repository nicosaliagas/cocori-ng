import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponents } from './component/form';
import { DefaultImageDirective } from './directive/default-image.directive';
import { MaterialSharedModule } from './material-shared.module';
import { PrettyPrintPipe } from './pipe/pretty-print.pipe';

@NgModule({
    declarations: [
        ...FormComponents,
        DefaultImageDirective,
        PrettyPrintPipe
    ],
    imports: [
        CommonModule,
        MaterialSharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ...FormComponents,
        DefaultImageDirective,
        PrettyPrintPipe
    ]
})
export class SharedModule { }