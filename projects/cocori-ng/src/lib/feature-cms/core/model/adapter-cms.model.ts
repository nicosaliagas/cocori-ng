import {
  CenterZoneTplComponent,
} from '../../shared/component/cocoring-cms-section-templates/center-zone-tpl/center-zone-tpl.component';
import {
  TwoZonesHTplComponent,
} from '../../shared/component/cocoring-cms-section-templates/two-zones-h-tpl/two-zones-h-tpl.component';
import { EditorValues } from './cms.model';

export const TemplatesClassesComponents = {
    "CenterZoneTpl": CenterZoneTplComponent,
    "TwoZonesHTpl": TwoZonesHTplComponent,
};

export interface SectionPageDatasModel {
    backgroundColor: string,
    values: EditorValues,
    template: string,
}
