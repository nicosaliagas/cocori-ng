import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CocoringInputErrorModule } from './component/error-handler/input-error-handler/cocoring-input-error.module';
import { ModuleImportFormInputs } from './component/form';
import { EyeOptionPasswordComponent } from './component/form/inputs/input-password/eye-option-password.component';
import { ImportModalComponent } from './component/modal';
import { ModuleImportDirectives } from './directive';
import { MaterialSharedModule } from './material-shared.module';
import { ModuleImportPipes } from './pipe';

export const ImportsFormComponents: any[] = [
    ...ModuleImportFormInputs,
    ...ImportModalComponent,
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
        FormsModule,
        MaterialSharedModule,
        CocoringInputErrorModule
    ],
    exports: [
        ...ImportsFormComponents,
        ...ModuleImportPipes,
        ...ModuleImportDirectives,
    ]
})
export class SharedModule {
    static racine(): ModuleWithProviders<SharedModule> {
        return {
          ngModule: SharedModule,
        };
      }
}