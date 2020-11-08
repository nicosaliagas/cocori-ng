import { ButtonComponent } from './buttons/button/button.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

export enum InputComponents {
    INPUT_TEXT = 'input-text',
    INPUT_TEXTAREA = 'input-textarea',
    INPUT_CUSTOM = 'input-CUSTOM',
    BUTTON = 'button',
}

export const ClasseComponents = {
    [InputComponents.INPUT_TEXT]: InputTextComponent,
    [InputComponents.INPUT_TEXTAREA]: InputTextareaComponent,
    [InputComponents.INPUT_CUSTOM]: InputTextareaComponent,
    [InputComponents.BUTTON]: ButtonComponent,
};

export type InputTypes = InputComponents.INPUT_TEXT | InputComponents.INPUT_TEXTAREA | InputComponents.INPUT_CUSTOM | InputComponents.BUTTON

export type InputClassesTypes<T extends InputTypes> =
    T extends InputComponents.INPUT_TEXT ? InputTextComponent :
    T extends InputComponents.INPUT_TEXTAREA ? InputTextareaComponent :
    T extends InputComponents.INPUT_CUSTOM ? InputTextareaComponent :
    T extends InputComponents.BUTTON ? ButtonComponent :
    never

export type OutputComponents = "callback";

export type OutputCallback = {
    [key in OutputComponents]: Function
}