import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppbarModel, HeaderMenuItem } from 'src/app/core/model/Appbar.model';
import { AppbarService } from 'src/app/core/service/appbar.service';
import { SidenavService } from 'src/app/core/service/sidenav.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() isRootUrl: boolean = true;

  barTitle: string = ''

  barActions: HeaderMenuItem[] = []

  private readonly destroy$ = new Subject();

  constructor(
    private appbarService: AppbarService,
    private sidenavService: SidenavService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getInfos()
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  private getInfos() {
    this.appbarService.onDatasChange.pipe(
      takeUntil(this.destroy$)
    ).subscribe((datas: AppbarModel) => {
      this.barTitle = datas.barTitle || this.barTitle
      this.barActions = datas.barActions || this.barActions

      this.cdr.detectChanges()
    })
  }

  public toggleSidenavMenus() {
    this.sidenavService.toggle().then(() => this.sidenavService.emitOnOpenedChange())
  }

  trackBy(index: number) {
    return index;
  }
}
