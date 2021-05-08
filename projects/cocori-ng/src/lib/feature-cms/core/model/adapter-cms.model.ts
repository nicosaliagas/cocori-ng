import {
    CenterZoneReadonlyTplComponent,
} from '../../shared/component-cms-readonly/cocoring-cms-readonly-section-tpl/center-zone-tpl/center-zone-readonly-tpl.component';
import {
    TwoZonesHReadonlyTplComponent,
} from '../../shared/component-cms-readonly/cocoring-cms-readonly-section-tpl/two-zones-h-tpl/two-zones-h-readonly-tpl.component';
import {
    CenterZoneTplComponent,
} from '../../shared/component/cocoring-cms-section-tpl/center-zone-tpl/center-zone-tpl.component';
import {
    TwoZonesHTplComponent,
} from '../../shared/component/cocoring-cms-section-tpl/two-zones-h-tpl/two-zones-h-tpl.component';
import { EditorValues } from './cms.model';

export const TemplatesClassesComponents = {
    "CenterZoneTpl": CenterZoneTplComponent,
    "TwoZonesHTpl": TwoZonesHTplComponent,
};

export const ReadonlyTemplatesClassesComponents = {
    "CenterZoneTpl": CenterZoneReadonlyTplComponent,
    "TwoZonesHTpl": TwoZonesHReadonlyTplComponent,
};

export interface SectionPageDatasModel {
    backgroundColor: string,
    values: EditorValues,
    template: string,
}
