import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImportComponentErrorHandler } from './component/error-handler';
import { ModuleImportFormInputs } from './component/form';
import { ImportsButtonsFormComponents } from './component/form/form-buttons';
import { FormContainerComponent } from './component/form/form-container/form-container.component';
import { EyeOptionPasswordComponent } from './component/form/inputs/input-password/eye-option-password.component';
import { ImportModalComponent } from './component/modal';
import { ModuleImportDirectives } from './directive';
import { MaterialSharedModule } from './material-shared.module';
import { ModuleImportPipes } from './pipe';

// import { ImportsButtonsComponents } from './component/form/buttons';
export const ImportsFormComponents: any[] = [
    FormContainerComponent,
    ...ModuleImportFormInputs,
    ...ImportComponentErrorHandler,
    ...ImportModalComponent,
    ...ImportsButtonsFormComponents,
    EyeOptionPasswordComponent
];

@NgModule({
    declarations: [
        ...ImportsFormComponents,
        ...ModuleImportPipes,
        ...ModuleImportDirectives,
    ],
    imports: [
        CommonModule,
        MaterialSharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ...ImportsFormComponents,
        ...ModuleImportPipes,
        ...ModuleImportDirectives,
    ]
})
export class SharedModule { }