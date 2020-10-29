import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

export enum InputComponents {
    INPUT_TEXTE = 'input-text',
    INPUT_TEXTAREA = 'input-textarea',
}

export const ClasseComponents = {
    [InputComponents.INPUT_TEXTE]: InputTextComponent,
    [InputComponents.INPUT_TEXTAREA]: InputTextareaComponent,
};

export type InputTypes = InputComponents.INPUT_TEXTE | InputComponents.INPUT_TEXTAREA

export type InputClassesTypes<T extends InputTypes> =
    T extends InputComponents.INPUT_TEXTE ? InputTextComponent :
    T extends InputComponents.INPUT_TEXTAREA ? InputTextareaComponent :
    never
