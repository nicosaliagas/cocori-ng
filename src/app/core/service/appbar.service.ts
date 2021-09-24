import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AppbarModel } from '../model/Appbar.model';

@Injectable({
  providedIn: 'root'
})
export class AppbarService {
  public onDatasChange: Subject<AppbarModel> = new Subject<AppbarModel>();

  constructor() { }

  public emitAppbarInfos(datas: AppbarModel) {
    this.onDatasChange.next(datas)
  }
}
