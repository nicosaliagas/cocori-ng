import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AutoUnsubscribeComponent } from '@cocori-ng/lib/src/lib/feature-core';
import { AppbarModel } from 'src/app/core/model/Appbar.model';
import { AppbarService } from 'src/app/core/service/appbar.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-extend-page',
  template: '',
})
export class ExtendPageComponent extends AutoUnsubscribeComponent implements OnInit {
  appbarService: AppbarService;

  constructor(injector: Injector) {
    super()

    this.appbarService = injector.get(AppbarService);
  }

  ngOnInit(): void { }

  setAppbarInfos(datas: AppbarModel) {
    this.appbarService.emitAppbarInfos(datas)
  }
}
