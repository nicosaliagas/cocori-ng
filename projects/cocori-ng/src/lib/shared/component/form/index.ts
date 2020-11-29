import { ButtonComponent } from './buttons/button/button.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputViewerComponent } from './input-viewer/input-viewer.component';

export enum InputComponents {
    INPUT_TEXT = 'input-text',
    INPUT_PASSWORD = 'input-password',
    INPUT_TEXTAREA = 'input-textarea',
    INPUT_VIEWER = 'input-viewer',
    INPUT_SELECT = 'input-select',
    BUTTON = 'button',
}

export const ComponentsFormInputs: any[] = [
    InputTextComponent,
    InputPasswordComponent,
    InputTextareaComponent,
    InputViewerComponent,
    InputSelectComponent,
    ButtonComponent
]

export const ClasseComponents = {
    [InputComponents.INPUT_TEXT]: InputTextComponent,
    [InputComponents.INPUT_PASSWORD]: InputPasswordComponent,
    [InputComponents.INPUT_TEXTAREA]: InputTextareaComponent,
    [InputComponents.INPUT_VIEWER]: InputViewerComponent,
    [InputComponents.INPUT_SELECT]: InputSelectComponent,
    [InputComponents.BUTTON]: ButtonComponent,
};

export type InputTypes =
    InputComponents.INPUT_TEXT |
    InputComponents.INPUT_PASSWORD |
    InputComponents.INPUT_SELECT |
    InputComponents.INPUT_TEXTAREA |
    InputComponents.INPUT_VIEWER |
    InputComponents.BUTTON

export type InputClassesTypes<T extends InputTypes> =
    T extends InputComponents.INPUT_TEXT ? InputTextComponent :
    T extends InputComponents.INPUT_PASSWORD ? InputPasswordComponent :
    T extends InputComponents.INPUT_TEXTAREA ? InputTextareaComponent :
    T extends InputComponents.INPUT_VIEWER ? InputViewerComponent :
    T extends InputComponents.INPUT_SELECT ? InputSelectComponent :
    T extends InputComponents.BUTTON ? ButtonComponent :
    never

export type OutputComponents = "callback";

export type OutputCallback = {
    [key in OutputComponents]: Function
}