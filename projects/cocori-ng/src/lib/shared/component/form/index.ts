import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

export const ImportsFormComponents: any[] = [
    InputTextComponent,
    InputTextareaComponent,
];

export enum InputTypes {
    INPUT_TEXTE = 'input-text',
    INPUT_TEXTAREA = 'input-textarea',
}

export const ListOfComponents = {
    [InputTypes.INPUT_TEXTE]: InputTextComponent,
    [InputTypes.INPUT_TEXTAREA]: InputTextareaComponent,
};

export type FieldType = InputTypes.INPUT_TEXTE | InputTypes.INPUT_TEXTAREA

export type Field<T extends FieldType> =
    T extends InputTypes.INPUT_TEXTE ? InputTextComponent :
    T extends InputTypes.INPUT_TEXTAREA ? InputTextareaComponent :
    never
