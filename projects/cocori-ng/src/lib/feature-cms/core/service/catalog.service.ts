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
          editor1: '<h1 style="text-align: center;"><span style="color: #ffffff;">Made with ❤️ by Cocorisoft</span></h1>'
        }
      }),

      new Block("CenterZoneTpl", {
        idBlock: '987CE6B5-F5F3-40BC-8760-59D52811DBD9', filename: '2.jpg',
        label: 'bloc avec une zone de texte',
        backgroundColor: '#ffffff',
        content: {
          editor1: '<h1 style="text-align: center;"><span style="color: #000000;">Cocorisoft Design Blocks</span></h1>'
        }
      }),

      new Block("TwoZonesHTpl", {
        idBlock: '987CE6B5-F5F3-40BC-8760-59D52811DBD9', filename: '3.jpg',
        label: 'bloc avec une image et une zone de texte',
        backgroundColor: '#f0eaea',
        content: {
          editor1: `<p><img style="float: right;" title="phone.jpg" src="http://localhost:8080/api/upload/image/phone.jpg" alt="" width="378" height="251" /></p>`,
          editor2: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>`,
        }
      }),

      new Block("TwoZonesHTpl", {
        idBlock: '987CE6B5-F5F3-40BC-8760-59D52811DBD9', filename: '4.jpg',
        label: 'bloc avec une zone de texte et une image',
        backgroundColor: '#f7f7f7',
        content: {
          editor1: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
          `,
          editor2: `<p><img style="display: block; margin-left: auto; margin-right: auto;" title="phone.jpg" src="http://localhost:8080/api/upload/image/desk.jpg" alt="" width="378" height="251" /></p>`,
        }
      }),

      new Block("TitleTwoZonesTpl", {
        idBlock: '02365399-98B7-42A0-BB9F-875261209451', filename: '5.jpg',
        label: 'bloc avec un titre et deux zones de texte en deuxième ligne',
        backgroundColor: '#ffffff',
        content: {
          editor1: `
          <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
          `,
          editor2: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
          `,
          editor3: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
          `
        }
      }),

      new Block("TitleTwoZonesTpl", {
        idBlock: '02365399-98B7-42A0-BB9F-875261209451', filename: '6.jpg',
        label: 'bloc avec un titre et deux zones en deuxième ligne : une image et une zone de texte',
        backgroundColor: '#e4ebec',
        content: {
          editor1: `
          <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
          `,
          editor2: `
          <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Smiley" src="http://localhost:8080/api/upload/image/smiley-happy.png" alt="" width="227" height="227" /></p>
          `,
          editor3: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
          `
        }
      }),

      new Block("TitleTwoZonesTpl", {
        idBlock: '02365399-98B7-42A0-BB9F-875261209451', filename: '7.jpg',
        label: 'bloc avec un titre et deux zones en deuxième ligne : une zone de texte et une image',
        backgroundColor: '#e4ebec',
        content: {
          editor1: `
          <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
          `,          
          editor2: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
          `,
          editor3: `
          <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Smiley" src="http://localhost:8080/api/upload/image/shape.png" alt="" width="227" height="227" /></p>
          `,
        }
      }),

      new Block("TitleTwoZonesTpl", {
        idBlock: '02365399-98B7-42A0-BB9F-875261209451', filename: '8.jpg',
        label: 'bloc avec deux zones : une zone de texte et une image qui prends toute la moitiée de la section',
        backgroundColor: '#e4ebec',
        content: {
          editor1: `
          <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
          `,          
          editor2: `
          <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
          <div>&nbsp;</div>
          <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
          `,
          editor3: `
          <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Smiley" src="http://localhost:8080/api/upload/image/shape.png" alt="" width="227" height="227" /></p>
          `,
        }
      }),
    ];
  }
}
