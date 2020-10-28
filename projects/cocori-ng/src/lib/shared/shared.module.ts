import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImportsFormComponents } from './component/form';
import { FormContainerComponent } from './component/form/form-container/form-container.component';
import { DefaultImageDirective } from './directive/default-image.directive';
import { MaterialSharedModule } from './material-shared.module';
import { PrettyPrintPipe } from './pipe/pretty-print.pipe';

@NgModule({
    declarations: [
        ...ImportsFormComponents,
        FormContainerComponent,
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
        ...ImportsFormComponents,
        FormContainerComponent,
        DefaultImageDirective,
        PrettyPrintPipe
    ]
})
export class SharedModule { }