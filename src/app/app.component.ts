import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { EnvironmentService, IConfigEnvironment } from './core/service/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private environnement: EnvironmentService,
  ) {
    this.loadEnvironment()
  }

  private loadEnvironment() {
    environment.then((config: IConfigEnvironment) => {
      this.environnement.conf = config
    })
  }
}
