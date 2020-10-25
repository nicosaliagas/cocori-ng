import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

export enum enumInputs {
    TEXT = 0,
    TEXTAREA = 1,
}

export const FormComponents: any[] = [
    InputTextComponent,
    InputTextareaComponent,
];

export const TypesOfComponents = {
    INPUT_TEXTE: 'input-text',
    INPUT_TEXTAREA: 'input-textarea',
};

export const ListOfComponents = {
    [TypesOfComponents.INPUT_TEXTE]: InputTextComponent,
    [TypesOfComponents.INPUT_TEXTAREA]: InputTextareaComponent,
};