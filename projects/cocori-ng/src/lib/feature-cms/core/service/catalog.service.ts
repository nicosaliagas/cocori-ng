import { Injectable } from '@angular/core';

import { Block } from './block';

@Injectable()
export class CatalogService {

  getBlocks() {
    return [
      new Block("CenterZoneTpl", {
        idBlock: '987CE6B5-F5F3-40BC-8760-59D52811DBD9', filename: '1.jpg',
        label: 'bloc avec une zone de texte',
        backgroundColor: '#343a40',
        content: {
          editor1: '<h1 style="text-align: center;">Made with ❤️ by Cocorisoft</h1>'
        }
      }),

      new Block("CenterZoneTpl", {
        idBlock: '5298A104-33DD-40CF-A11F-AF810FE31670',
        filename: '26.jpg',
        label: 'bloc avec une image et une zone de texte',
        backgroundColor: '#ffffff',
        content: {
          editor1: `<h1 style="text-align: center;"><span style="font-size: 24pt;"><strong><span style="color: #3598db;">Alien</span> <span style="color: #e03e2d;">Family</span></strong></span></h1>
          <p>&nbsp;</p>
          <p style="text-align: center;"><span style="font-size: 36pt;">👽</span><span style="font-size: 24pt;">👽</span><span style="font-size: 18pt;">👽</span><span style="font-size: 14pt;">👽</span></p>`
        }
      }),

      new Block("TwoZonesHTpl", {
        idBlock: 'DF59F046-E689-4A37-A874-E03C15D45EDF',
        filename: '14.jpg',
        label: 'bloc avec une image et une zone de texte',
        backgroundColor: '#ffffe1',
        content: {
          editor1: `<p><img style="float: right;" src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;fit=crop&amp;w=300" alt="" width="300" height="200" /></p>`,
          editor2: `
          <div class="texte">
          <div style="text-align: justify;">&laquo; Bienvenue &agrave; l&rsquo;&Eacute;cole Boulle ! &raquo;</div>
          <div style="text-align: justify;">&nbsp;</div>
          <div style="text-align: justify;">C&rsquo;est par ces mots que nous aurions d&ucirc; vous accueillir. La crise sanitaire en a voulu autrement. A ann&eacute;e exceptionnelle, dispositif exceptionnel, toute l&rsquo;&eacute;cole s&rsquo;est mobilis&eacute;e pour vous proposer, au plus pr&egrave;s du r&eacute;el, une visite interactive de nos locaux. Pr&egrave;s de 30 heures de direct, r&eacute;parti sur 4 cha&icirc;nes th&eacute;matiques, pour vous permettre de d&eacute;couvrir nos ateliers, nos professeurs, nos &eacute;l&egrave;ves et la vie de l&rsquo;&eacute;cole. Et ces 30 heures suffiront &agrave; peine &agrave; couvrir l&rsquo;&eacute;tendue des pratiques que l&rsquo;&eacute;cole vous propose!</div>
          <div style="text-align: justify;">J&rsquo;esp&egrave;re que vous prendrez autant de plaisir &agrave; d&eacute;couvrir nos savoirs que nous avons &agrave; les transmettre.</div>
          <div style="text-align: justify;">&nbsp;</div>
          <div style="text-align: justify;">Je vous souhaite de belles journ&eacute;es portes ouvertes.</div>
          </div>
          <div class="bloc-signature">
          <div class="signature">
          <div class="divider" style="text-align: justify;">&nbsp;</div>
          <div class="proviseure" style="text-align: right;">Josiane GIAMMARINARO</div>
          <div style="text-align: right;">Directrice de l'&eacute;cole Boulle.</div>
          </div>
          </div>`,
        }
      }),

      new Block("TwoZonesHTpl", {
        idBlock: 'B817C586-2D5D-4807-9B76-592487433E64',
        filename: '1.jpg',
        label: 'bloc avec une image et une zone de texte',
        backgroundColor: '#ebffe1',
        content: {
          editor1: `<h1 style="text-align: center;">😍</h1>`,
          editor2: `<h1 style="text-align: center;">😍</h1>`
        }
      }),
    ];
  }
}
