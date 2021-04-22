import { Type } from '@angular/core';

import { BlockDatasModel } from '../model/cms.model';

export class Block {
    constructor(public component: Type<any>, public data: BlockDatasModel) { }
}