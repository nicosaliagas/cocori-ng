import { FormInputComponents } from 'cocori-ng/src/feature-core';

import { CocoringButtonLinkComponent } from '../button-link/cocoring-button-link.component';
import { CocoringButtonComponent } from '../button/cocoring-button.component';
import {
    CocoringCheckboxIndeterminateComponent,
} from './inputs/input-checkbox-indeterminate/checkbox-indeterminate.component';
import { CocoringCheckboxComponent } from './inputs/input-checkbox/cocoring-checkbox.component';
import { CocoringDateComponent } from './inputs/input-date/cocoring-date.component';
import { CocoringEmailComponent } from './inputs/input-email/cocoring-email.component';
import { CocoringNumberComponent } from './inputs/input-number/cocoring-number.component';
import { CocoringPasswordComponent } from './inputs/input-password/cocoring-password.component';
import { CocoringSelectComponent } from './inputs/input-select/cocoring-select.component';
import { CocoringSlideToggleComponent } from './inputs/input-slide-toggle/cocoring-slide-toggle.component';
import { CocoringTextComponent } from './inputs/input-text/cocoring-text.component';
import { CocoringTextareaComponent } from './inputs/input-textarea/cocoring-textarea.component';
import { CocoringViewerComponent } from './inputs/input-viewer/cocoring-viewer.component';


export const ClasseComponents = {
    [FormInputComponents.INPUT_TEXT]: CocoringTextComponent,
    [FormInputComponents.INPUT_EMAIL]: CocoringEmailComponent,
    [FormInputComponents.INPUT_CHECKBOX]: CocoringCheckboxComponent,
    [FormInputComponents.INPUT_CHECKBOX_INDETERMINATE]: CocoringCheckboxIndeterminateComponent,
    [FormInputComponents.INPUT_NUMBER]: CocoringNumberComponent,
    [FormInputComponents.INPUT_PASSWORD]: CocoringPasswordComponent,
    [FormInputComponents.INPUT_DATE]: CocoringDateComponent,
    [FormInputComponents.INPUT_SLIDE_TOGGLE]: CocoringSlideToggleComponent,
    [FormInputComponents.INPUT_TEXTAREA]: CocoringTextareaComponent,
    [FormInputComponents.INPUT_VIEWER]: CocoringViewerComponent,
    [FormInputComponents.INPUT_SELECT]: CocoringSelectComponent,
    [FormInputComponents.BUTTON]: CocoringButtonComponent,
    [FormInputComponents.LINK]: CocoringButtonLinkComponent,
};