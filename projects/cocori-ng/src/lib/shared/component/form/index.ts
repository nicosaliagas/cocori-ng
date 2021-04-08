import { CocoringButtonComponent } from '../button/cocoring-button.component';
import { CocoringCheckboxComponent } from './inputs/input-checkbox/cocoring-checkbox.component';
import { CocoringEmailComponent } from './inputs/input-email/cocoring-email.component';
import { CocoringNumberComponent } from './inputs/input-number/cocoring-number.component';
import { CocoringPasswordComponent } from './inputs/input-password/cocoring-password.component';
import { CocoringSelectComponent } from './inputs/input-select/cocoring-select.component';
import { CocoringTextComponent } from './inputs/input-text/cocoring-text.component';
import { CocoringTextareaComponent } from './inputs/input-textarea/cocoring-textarea.component';
import { CocoringViewerComponent } from './inputs/input-viewer/cocoring-viewer.component';

export enum InputComponents {
    INPUT_WYSIWYG = 'input-wysiwyg',
    INPUT_UPLOADER = 'input-uploader',
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
    [InputComponents.INPUT_TEXT]: CocoringTextComponent,
    [InputComponents.INPUT_EMAIL]: CocoringEmailComponent,
    [InputComponents.INPUT_CHECKBOX]: CocoringCheckboxComponent,
    [InputComponents.INPUT_NUMBER]: CocoringNumberComponent,
    [InputComponents.INPUT_PASSWORD]: CocoringPasswordComponent,
    [InputComponents.INPUT_TEXTAREA]: CocoringTextareaComponent,
    [InputComponents.INPUT_VIEWER]: CocoringViewerComponent,
    [InputComponents.INPUT_SELECT]: CocoringSelectComponent,
    [InputComponents.BUTTON]: CocoringButtonComponent,
};

export type OutputComponents = "callback";

export type OutputCallback = {
    [key in OutputComponents]: Function
}