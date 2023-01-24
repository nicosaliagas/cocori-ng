import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrentUrlRoutingService } from 'cocori-ng/src/feature-core';
import { Subject, takeUntil } from 'rxjs';
import { SidenavItem } from 'src/app/core/model/Sidenav.model';
import { SidenavService } from 'src/app/core/service/sidenav.service';

export const animateExpandListItem =
  trigger('animateExpandListItem', [
    state('expanded', style({ opacity: 1 })),
    state('collapsed', style({ opacity: 0 })),
    transition('collapsed => expanded', animate('600ms')),
    transition('expanded => collapsed', animate('600ms')),
  ]);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-sidenav-item',
  animations: [animateExpandListItem],
  templateUrl: './cocoring-sidenav-item.component.html',
  styleUrls: ['./cocoring-sidenav-item.component.scss'],
})
export class CocoringSidenavItemComponent implements OnInit, OnDestroy {
  expanded: boolean = false;
  selected: boolean = false;

  @Input() item!: SidenavItem;
  @Input()
  set opened(isSidenavOpen: boolean) {
    this.isSidenavOpen = isSidenavOpen
  }

  isSidenavOpen: boolean = true;

  private readonly destroy$ = new Subject();

  constructor(
    private sidenavService: SidenavService,
    private cdr: ChangeDetectorRef,
    private navService: CurrentUrlRoutingService,
  ) { }

  ngOnInit() {
    this.urlChangedEvent()

    this.toggleSidenavEvent()

    if (!this.sidenavService.sidenavIsOpened()) {
      this.expanded = false
      this.cdr.detectChanges()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  private urlChangedEvent() {
    this.navService.currentUrl.pipe(
      takeUntil(this.destroy$)
    ).subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = this.selected = url.indexOf(`${this.item.route}`) === 0;
        this.cdr.detectChanges()
      }
    })
  }

  private toggleSidenavEvent() {
    if (this.item.children && this.item.children.length) {
      this.sidenavService.onOpenedChange.pipe(
        takeUntil(this.destroy$)
      ).subscribe((isOpened: boolean) => {
        if (!isOpened) {
          this.expanded = false
          this.cdr.detectChanges()
        }
      })
    }
  }

  expandItemSubList() {
    if (this.item.children && this.item.children.length) {
      this.expanded = !this.expanded;

      if (this.expanded) this.sidenavService.open()
    }
  }

  trackBy(index: number) {
    return index;
  }
}
