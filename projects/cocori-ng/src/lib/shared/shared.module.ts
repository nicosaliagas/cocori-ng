import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImportComponentErrorHandler } from './component/error-handler';
import { ImportComponentsFormInputs } from './component/form';
import { ImportsButtonsFormComponents } from './component/form/form-buttons';
import { FormContainerComponent } from './component/form/form-container/form-container.component';
import { EyeOptionPasswordComponent } from './component/form/input-password/eye-option-password.component';
import { DefaultImageDirective } from './directive/default-image.directive';
import { MaterialSharedModule } from './material-shared.module';
import { PrettyPrintPipe } from './pipe/pretty-print.pipe';

// import { ImportsButtonsComponents } from './component/form/buttons';
export const ImportsFormComponents: any[] = [
    FormContainerComponent,
    ...ImportComponentsFormInputs,
    ...ImportComponentErrorHandler,
    ...ImportsButtonsFormComponents,
    EyeOptionPasswordComponent
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