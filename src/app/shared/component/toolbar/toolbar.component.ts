import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AutoUnsubscribeComponent } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, tap } from 'rxjs/operators';
import { AppbarModel, HeaderMenuItem } from 'src/app/core/model/Appbar.model';
import { AppbarService } from 'src/app/core/service/appbar.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends AutoUnsubscribeComponent implements OnInit, OnDestroy {

  @Output() toggleSidenav = new EventEmitter<void>();

  barTitle: string = ''

  barActions: HeaderMenuItem[] = []
  isRootUrl: boolean = true

  constructor(
    private appbarService: AppbarService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {
    super()

    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          tap((event: any) => {
            
            console.log("event >>> ", event)

            /** 💪💪 comparer la route actuelle avec la config des routes du menu (bo-layout) pour voir si racine ou pas */

            this.isRootUrl = (<string>event.url).split('/').length <= 3
          })
        )
        .subscribe()
    );
  }

  ngOnInit(): void {
    this.getInfos()
  }

  private getInfos() {
    this.subscriptions.add(
      this.appbarService.onDatasChange.subscribe((datas: AppbarModel) => {
        this.barTitle = datas.barTitle || this.barTitle
        this.barActions = datas.barActions || this.barActions

        this.cdr.detectChanges()
      })
    )
  }

  trackBy(index: number) {
    return index;
  }
}
