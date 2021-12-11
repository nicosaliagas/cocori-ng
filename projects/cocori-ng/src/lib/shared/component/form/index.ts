import {
    CocoringCheckboxComponent,
    CocoringCheckboxIndeterminateComponent,
    CocoringDateComponent,
    CocoringEmailComponent,
    CocoringNumberComponent,
    CocoringPasswordComponent,
    CocoringSelectComponent,
    CocoringTextareaComponent,
    CocoringTextComponent,
    CocoringViewerComponent,
    FormInputComponents,
} from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringButtonComponent } from '../button/cocoring-button.component';

export const ClasseComponents = {
    [FormInputComponents.INPUT_TEXT]: CocoringTextComponent,
    [FormInputComponents.INPUT_EMAIL]: CocoringEmailComponent,
    [FormInputComponents.INPUT_CHECKBOX]: CocoringCheckboxComponent,
    [FormInputComponents.INPUT_CHECKBOX_INDETERMINATE]: CocoringCheckboxIndeterminateComponent,
    [FormInputComponents.INPUT_NUMBER]: CocoringNumberComponent,
    [FormInputComponents.INPUT_PASSWORD]: CocoringPasswordComponent,
    [FormInputComponents.INPUT_DATE]: CocoringDateComponent,
    [FormInputComponents.INPUT_TEXTAREA]: CocoringTextareaComponent,
    [FormInputComponents.INPUT_VIEWER]: CocoringViewerComponent,
    [FormInputComponents.INPUT_SELECT]: CocoringSelectComponent,
    [FormInputComponents.BUTTON]: CocoringButtonComponent,
};