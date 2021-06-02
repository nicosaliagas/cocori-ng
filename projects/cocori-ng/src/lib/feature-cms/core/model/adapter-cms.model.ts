import {
  CenterZoneTplComponent,
} from '../../shared/component-cms-editor/cocoring-cms-section-tpl/center-zone-tpl/center-zone-tpl.component';
import {
  TextImageFullTplComponent,
} from '../../shared/component-cms-editor/cocoring-cms-section-tpl/text-image-full-tpl/text-image-full-tpl.component';
import {
  TitleTwoZonesTplComponent,
} from '../../shared/component-cms-editor/cocoring-cms-section-tpl/title-two-zones-tpl/title-two-zones-tpl.component';
import {
  TwoZonesHTplComponent,
} from '../../shared/component-cms-editor/cocoring-cms-section-tpl/two-zones-h-tpl/two-zones-h-tpl.component';
import {
  CenterZoneReadonlyTplComponent,
} from '../../shared/component-cms-readonly/cocoring-cms-readonly-section-tpl/center-zone-tpl/center-zone-readonly-tpl.component';
import {
  TextImageFullReadonlyTplComponent,
} from '../../shared/component-cms-readonly/cocoring-cms-readonly-section-tpl/text-image-full-tpl/text-image-full-readonly-tpl.component';
import {
  TitleTwoZonesReadonlyTplComponent,
} from '../../shared/component-cms-readonly/cocoring-cms-readonly-section-tpl/title-two-zones-tpl/title-two-zones-readonly-tpl.component';
import {
  TwoZonesHReadonlyTplComponent,
} from '../../shared/component-cms-readonly/cocoring-cms-readonly-section-tpl/two-zones-h-tpl/two-zones-h-readonly-tpl.component';
import { EditorValues } from './cms.model';

/**
 * Adapteur lecture / écriture entre le back et le front
 */

export const TemplatesClassesComponents = {
    "CenterZoneTpl": CenterZoneTplComponent,
    "TwoZonesHTpl": TwoZonesHTplComponent,
    "TitleTwoZonesTpl": TitleTwoZonesTplComponent,
    "TextImageFullTpl": TextImageFullTplComponent,
    "ImageFullTextTpl": TextImageFullTplComponent,
};

export const ReadonlyTemplatesClassesComponents = {
    "CenterZoneTpl": CenterZoneReadonlyTplComponent,
    "TwoZonesHTpl": TwoZonesHReadonlyTplComponent,
    "TitleTwoZonesTpl": TitleTwoZonesReadonlyTplComponent,
    "TextImageFullTpl": TextImageFullReadonlyTplComponent,
    "ImageFullTextTpl": TextImageFullReadonlyTplComponent,
};

export interface SectionPageDatasModel {
    backgroundColor: string,
    values: EditorValues,
    template: string,
}
