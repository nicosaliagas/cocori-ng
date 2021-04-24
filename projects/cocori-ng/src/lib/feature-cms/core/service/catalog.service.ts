import { Injectable } from '@angular/core';

import {
  CenterZoneTplComponent,
} from '../../shared/component/cocoring-cms-section-templates/center-zone-tpl/center-zone-tpl.component';
import {
  TwoZonesHTplComponent,
} from '../../shared/component/cocoring-cms-section-templates/two-zones-h-tpl/two-zones-h-tpl.component';
import { Block } from './block';

@Injectable()
export class CatalogService {

  getBlocks() {
    return [
      new Block(CenterZoneTplComponent, {
        idBlock: '987CE6B5-F5F3-40BC-8760-59D52811DBD9', filename: '1.jpg',
        label: 'bloc avec une zone de texte',
        content: {
          editor1: '<h1 style="text-align: center;">Made with ❤️ by Cocorisoft</h1>'
        }
      }),

      new Block(CenterZoneTplComponent, {
        idBlock: '5298A104-33DD-40CF-A11F-AF810FE31670',
        filename: '26.jpg',
        label: 'bloc avec une image et une zone de texte',
        content: {
          editor1: `<h1 style="text-align: center;"><span style="font-size: 24pt;"><strong><span style="color: #3598db;">Alien</span> <span style="color: #e03e2d;">Family</span></strong></span></h1>
          <p>&nbsp;</p>
          <p style="text-align: center;"><span style="font-size: 36pt;">👽</span><span style="font-size: 24pt;">👽</span><span style="font-size: 18pt;">👽</span><span style="font-size: 14pt;">👽</span></p>`
        }
      }),

      new Block(TwoZonesHTplComponent, {
        idBlock: 'DF59F046-E689-4A37-A874-E03C15D45EDF',
        filename: '14.jpg',
        label: 'bloc avec une image et une zone de texte',
        content: {
          editor1: `<h1 style="text-align: center;">On est pas bien l&agrave; ?!</h1>`,
          editor2: `<h1 style="text-align: center;">Grave bro ! On est bien entre <span style="font-size: 36pt;">🍆</span>🍆</h1>`,
        }
      }),

      new Block(TwoZonesHTplComponent, {
        idBlock: 'B817C586-2D5D-4807-9B76-592487433E64',
        filename: '1.jpg',
        label: 'bloc avec une image et une zone de texte',
        content: {
          editor1: `<h1 style="text-align: center;">😍</h1>`,
          editor2: `<h1 style="text-align: center;">😍</h1>`
        }
      }),
    ];
  }
}
