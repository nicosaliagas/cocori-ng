import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribeComponent } from '@cocori-ng/lib/src/lib/feature-core';
import { AppbarModel, HeaderMenuItem } from 'src/app/core/model/Appbar.model';
import { AppbarService } from 'src/app/core/service/appbar.service';
import { SidenavService } from 'src/app/core/service/sidenav.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends AutoUnsubscribeComponent implements OnInit, OnDestroy {
  @Input() isRootUrl: boolean = false;

  barTitle: string = ''

  barActions: HeaderMenuItem[] = []

  constructor(
    private appbarService: AppbarService,
    private sidenavService: SidenavService,
    private cdr: ChangeDetectorRef,
  ) {
    super()
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

  public toggleSidenavMenus() {
    this.sidenavService.toggle().then(() => this.sidenavService.emitOnOpenedChange())
  }

  trackBy(index: number) {
    return index;
  }
}
