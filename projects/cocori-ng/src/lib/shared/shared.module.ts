import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormButtonsComponent } from './component/form/form-buttons/form-buttons.component';
import { FormContainerComponent } from './component/form/form-container/form-container.component';
import { InputTextComponent } from './component/form/input-text/input-text.component';
import { InputTextareaComponent } from './component/form/input-textarea/input-textarea.component';
import { DefaultImageDirective } from './directive/default-image.directive';
import { MaterialSharedModule } from './material-shared.module';
import { PrettyPrintPipe } from './pipe/pretty-print.pipe';

export const ImportsFormComponents: any[] = [
    FormContainerComponent,
    FormButtonsComponent,
    InputTextComponent,
    InputTextareaComponent,
];

@NgModule({
    declarations: [
        ...ImportsFormComponents,
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
        DefaultImageDirective,
        PrettyPrintPipe
    ]
})
export class SharedModule { }