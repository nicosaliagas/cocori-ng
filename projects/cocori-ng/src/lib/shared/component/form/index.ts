import { ButtonComponent } from './buttons/button/button.component';
import { InputCheckboxComponent } from './inputs/input-checkbox/input-checkbox.component';
import { InputContainerComponent } from './inputs/input-container/input-container.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputNumberComponent } from './inputs/input-number/input-number.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputSelectComponent } from './inputs/input-select/input-select.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InputTextareaComponent } from './inputs/input-textarea/input-textarea.component';
import { InputViewerComponent } from './inputs/input-viewer/input-viewer.component';


export const ModuleImportFormInputs: any[] = [
    InputContainerComponent,
    InputEmailComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputTextareaComponent,
    InputViewerComponent,
    InputNumberComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    ButtonComponent
]

export enum InputComponents {
    INPUT_TEXT = 'input-text',
    INPUT_EMAIL = 'input-email',
    INPUT_CHECKBOX = 'input-checkbox',
    INPUT_NUMBER = 'input-number',
    INPUT_PASSWORD = 'input-password',
    INPUT_TEXTAREA = 'input-textarea',
    INPUT_VIEWER = 'input-viewer',
    INPUT_SELECT = 'input-select',
    BUTTON = 'button',
}

export const ClasseComponents = {
    [InputComponents.INPUT_TEXT]: InputTextComponent,
    [InputComponents.INPUT_EMAIL]: InputEmailComponent,
    [InputComponents.INPUT_CHECKBOX]: InputCheckboxComponent,
    [InputComponents.INPUT_NUMBER]: InputNumberComponent,
    [InputComponents.INPUT_PASSWORD]: InputPasswordComponent,
    [InputComponents.INPUT_TEXTAREA]: InputTextareaComponent,
    [InputComponents.INPUT_VIEWER]: InputViewerComponent,
    [InputComponents.INPUT_SELECT]: InputSelectComponent,
    [InputComponents.BUTTON]: ButtonComponent,
};

export type OutputComponents = "callback";

export type OutputCallback = {
    [key in OutputComponents]: Function
}