import { ButtonComponent } from './buttons/button/button.component';
import { InputContainerComponent } from './inputs/input-container/input-container.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputSelectComponent } from './inputs/input-select/input-select.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InputTextareaComponent } from './inputs/input-textarea/input-textarea.component';
import { InputViewerComponent } from './inputs/input-viewer/input-viewer.component';


export const ModuleImportFormInputs: any[] = [
    InputContainerComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputTextareaComponent,
    InputViewerComponent,
    InputSelectComponent,
    ButtonComponent
]

export enum InputComponents {
    INPUT_TEXT = 'input-text',
    INPUT_PASSWORD = 'input-password',
    INPUT_TEXTAREA = 'input-textarea',
    INPUT_VIEWER = 'input-viewer',
    INPUT_SELECT = 'input-select',
    BUTTON = 'button',
}

export const ClasseComponents = {
    [InputComponents.INPUT_TEXT]: InputTextComponent,
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