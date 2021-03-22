import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DataSourceInput, DataSourceType } from '../model/data-source.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private httpService: HttpService,) { }

  loadDataSource<T>(config: DataSourceInput, paramUrl?: any): Observable<T> {
    if (!config) return;

    switch (config.type) {
      case DataSourceType.BRUTE:
        return <Observable<T>>of(config.value).pipe(delay(1000))
        break;

      case DataSourceType.API:
        return this.httpService.get(<string>config.value, paramUrl)
        break;

      default:
        return <Observable<any>>of(null)
        break;
    }
  }
}
