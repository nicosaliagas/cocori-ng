import { BlockDatasModel } from '../model/cms.model';

/** exemple: https://stackblitz.com/angular/njgkplqoqer?file=src%2Fapp%2Fad-banner.component.ts */

export class Block {
    constructor(public component: string, public data: BlockDatasModel) { }
}