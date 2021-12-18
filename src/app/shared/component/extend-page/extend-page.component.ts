import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppbarModel } from 'src/app/core/model/Appbar.model';
import { AppbarService } from 'src/app/core/service/appbar.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-extend-page',
  template: '',
})
export class ExtendPageComponent implements OnInit, OnDestroy {
  appbarService: AppbarService;

  readonly destroy$ = new Subject();

  constructor(injector: Injector) {
    this.appbarService = injector.get(AppbarService);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  setAppbarInfos(datas: AppbarModel) {
    this.appbarService.emitAppbarInfos(datas)
  }
}
