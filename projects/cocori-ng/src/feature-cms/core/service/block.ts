import { BlockModel } from '../model/cms.model';

/** exemple: https://stackblitz.com/angular/njgkplqoqer?file=src%2Fapp%2Fad-banner.component.ts */

export class Block {
    constructor(public key: string, public data?: BlockModel) { }
}