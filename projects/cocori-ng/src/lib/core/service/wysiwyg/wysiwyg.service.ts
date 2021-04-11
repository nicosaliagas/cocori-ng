import { Injectable } from '@angular/core';

import { ToolbarOptions } from '../../model/component-wysiwyg.model';

@Injectable()
export class WysiwygService {

  constructor() { }

  public toolbarOptionsToString(options: ToolbarOptions[][]) {
    return options.map((option: ToolbarOptions[]) => option.join(' ')).join('|')
  }
}
