import { Injectable } from '@angular/core';
import { loadSettings } from 'src/environments/loadSettings';

import { EnvironmentService, IConfigEnvironment } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentLoaderService {
  constructor(
    private environmentService: EnvironmentService
  ) {

  }

  load(): Promise<any> {
    return loadSettings().then((config: IConfigEnvironment) => {
      this.environmentService.conf = config
    })
  }
}
