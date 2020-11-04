import { ButtonComponent } from './buttons/button/button.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

export enum InputComponents {
    INPUT_TEXT = 'input-text',
    INPUT_TEXTAREA = 'input-textarea',
    SUBMIT_BUTTON = 'submit-button',
}

export const ClasseComponents = {
    [InputComponents.INPUT_TEXT]: InputTextComponent,
    [InputComponents.INPUT_TEXTAREA]: InputTextareaComponent,
    [InputComponents.SUBMIT_BUTTON]: ButtonComponent,
};

export type InputTypes = InputComponents.INPUT_TEXT | InputComponents.INPUT_TEXTAREA | InputComponents.SUBMIT_BUTTON

export type InputClassesTypes<T extends InputTypes> =
    T extends InputComponents.INPUT_TEXT ? InputTextComponent :
    T extends InputComponents.INPUT_TEXTAREA ? InputTextareaComponent :
    T extends InputComponents.SUBMIT_BUTTON ? ButtonComponent :
    never
