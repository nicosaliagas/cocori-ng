import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImportsButtonsComponents } from './component/form/buttons';
import { ImportsButtonsFormComponents } from './component/form/form-buttons';
import { FormContainerComponent } from './component/form/form-container/form-container.component';
import { InputSelectComponent } from './component/form/input-select/input-select.component';
import { InputTextComponent } from './component/form/input-text/input-text.component';
import { InputTextareaComponent } from './component/form/input-textarea/input-textarea.component';
import { InputViewerComponent } from './component/form/input-viewer/input-viewer.component';
import { DefaultImageDirective } from './directive/default-image.directive';
import { MaterialSharedModule } from './material-shared.module';
import { PrettyPrintPipe } from './pipe/pretty-print.pipe';

export const ImportsFormComponents: any[] = [
    FormContainerComponent,
    ...ImportsButtonsFormComponents,
    InputTextComponent,
    InputTextareaComponent,
    InputViewerComponent,
    InputSelectComponent,
    ...ImportsButtonsComponents
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