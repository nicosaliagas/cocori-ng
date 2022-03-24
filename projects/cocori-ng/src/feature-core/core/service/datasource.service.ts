import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DataSourceInput, DataSourceType } from '../model/data-source.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private httpService: HttpService,) { }

  loadDataSource<T>(config: DataSourceInput, queryString: string = ''): Observable<T> {
    if (!config) return;

    switch (config.type) {
      case DataSourceType.BRUTE:
        // return <Observable<T>>of(config.value).pipe(delay(1000))
        return <Observable<T>>of(config.value)
        break;

      case DataSourceType.API:
        return this.httpService.get(`${config.value}?${queryString}`)
        break;

      default:
        return <Observable<any>>of(null)
        break;
    }
  }
}
