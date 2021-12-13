import { Component, Injector, OnInit } from '@angular/core';
import { ToastMessageService } from 'cocori-ng/src/feature-core';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends ExtendPageComponent implements OnInit {

  constructor(
    public injector: Injector,
    private toastMessageService: ToastMessageService) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Accueil Bo - Cocori-ng` })
  }

  eventClickFab() {
    this.toastMessageService.info("🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺")
  }
}
