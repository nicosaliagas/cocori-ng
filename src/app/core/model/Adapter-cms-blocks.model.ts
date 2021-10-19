import { CenterZoneReadonlyTplComponent } from 'src/app/pages/page-cms/blocks/center-zone/center-zone-readonly.component';
import { CenterZoneTplComponent } from 'src/app/pages/page-cms/blocks/center-zone/center-zone.component';
import { TwoZonesHReadonlyComponent } from 'src/app/pages/page-cms/blocks/two-zones-h/two-zones-h-readonly.component';
import { TwoZonesHComponent } from 'src/app/pages/page-cms/blocks/two-zones-h/two-zones-h.component';

/**
 * Adapteur lecture / écriture entre le back et le front
 * clé => SectionModel.key
 * valeur => composant visuel du block qui sera chargé dans la vue
 */

export const EditorAdapterCmsBlocks = {
  "CenterZoneTpl": CenterZoneTplComponent,
  "TwoZonesHTpl": TwoZonesHComponent,
};

export const ReadonlyAdapterCmsBlocks = {
  "CenterZoneTpl": CenterZoneReadonlyTplComponent,
  "TwoZonesHTpl": TwoZonesHReadonlyComponent,
};
