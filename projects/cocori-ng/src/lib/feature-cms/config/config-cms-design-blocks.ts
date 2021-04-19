import { BlockModel } from '../core/model/cms.model';

export const configBlocksDesign: BlockModel[] = [
    {
        idBlock: '3C95FD55-6F06-449F-BD8B-A0B3CE0315BC',
        filename: '1.jpg',
        label: 'bloc avec une zone de texte',
        content: {
            texte: "<h1>Made with ❤️ by Cocorisoft</h1>"
        }
    },
    {
        idBlock: '5298A104-33DD-40CF-A11F-AF810FE31670',
        filename: '26.jpg',
        label: 'bloc avec une image et une zone de texte',
        content: {
            texte: `<h1><span style="font-size: 24pt;"><strong><span style="color: #3598db;">Alien</span> <span style="color: #e03e2d;">Family</span></strong></span></h1>
            <p>&nbsp;</p>
            <p><span style="font-size: 36pt;">👽</span><span style="font-size: 24pt;">👽</span><span style="font-size: 18pt;">👽</span><span style="font-size: 14pt;">👽</span></p>`
        }
    },
    {
        idBlock: 'DF59F046-E689-4A37-A874-E03C15D45EDF',
        filename: '26.jpg',
        label: 'bloc avec une image et une zone de texte',
        content: {
            texte: "<h1>On est pas bien là ?!</h1>"
        }
    },
    {
        idBlock: 'B817C586-2D5D-4807-9B76-592487433E64',
        filename: '1.jpg',
        label: 'bloc avec une image et une zone de texte',
        content: {
            texte: "<h1>😍</h1>"
        }
    },
]