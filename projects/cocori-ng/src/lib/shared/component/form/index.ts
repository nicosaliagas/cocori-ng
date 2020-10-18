import { InputTextComponent } from './input-text/input-text.component';
import { TextareaComponent } from './textarea/textarea.component';

export const FormComponents: any[] = [
    InputTextComponent,
    TextareaComponent,
];

export const TypesOfComponents = {
    INPUT_TEXTE: 'input-text',
    INPUT_TEXTAREA: 'input-textarea',
};

export const ListOfComponents = {
    [TypesOfComponents.INPUT_TEXTE]: InputTextComponent,
    [TypesOfComponents.INPUT_TEXTAREA]: TextareaComponent,
};