import { CenterZoneReadonlyTplComponent } from 'src/app/pages/page-cms/blocks/center-zone/center-zone-readonly.component';
import { CenterZoneTplComponent } from 'src/app/pages/page-cms/blocks/center-zone/center-zone.component';
import {
  ImageFullTextReadonlyComponent,
} from 'src/app/pages/page-cms/blocks/image-full-text/image-full-text-readonly.component';
import { ImageFullTextComponent } from 'src/app/pages/page-cms/blocks/image-full-text/image-full-text.component';
import {
  TextImageFullReadonlyComponent,
} from 'src/app/pages/page-cms/blocks/text-image-full/text-image-full-readonly.component';
import { TextImageFullComponent } from 'src/app/pages/page-cms/blocks/text-image-full/text-image-full.component';
import {
  TitleTwoZonesReadonlyComponent,
} from 'src/app/pages/page-cms/blocks/title-two-zones/title-two-zones-readonly.component';
import { TitleTwoZonesComponent } from 'src/app/pages/page-cms/blocks/title-two-zones/title-two-zones.component';
import { TwoZonesHReadonlyComponent } from 'src/app/pages/page-cms/blocks/two-zones-h/two-zones-h-readonly.component';
import { TwoZonesHComponent } from 'src/app/pages/page-cms/blocks/two-zones-h/two-zones-h.component';

/**
 * Adapteur lecture / écriture entre le back et le front
 * clé => SectionModel.key
 * valeur => composant visuel du block qui sera chargé dans la vue
 */

export const EditorAdapterCmsBlocks = {
  "CenterZone": CenterZoneTplComponent,
  "TwoZonesH": TwoZonesHComponent,
  "TitleTwoZones": TitleTwoZonesComponent,
  "TextImageFull": TextImageFullComponent,
  "ImageFullText": ImageFullTextComponent,
};

export const ReadonlyAdapterCmsBlocks = {
  "CenterZone": CenterZoneReadonlyTplComponent,
  "TwoZonesH": TwoZonesHReadonlyComponent,
  "TitleTwoZones": TitleTwoZonesReadonlyComponent,
  "TextImageFull": TextImageFullReadonlyComponent,
  "ImageFullText": ImageFullTextReadonlyComponent,

};
