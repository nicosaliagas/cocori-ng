import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CurrentUrlRoutingService } from '@cocori-ng/lib';
import { SidenavItem } from 'src/app/core/model/Sidenav.model';

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
export class CocoringSidenavItemComponent implements OnInit {
  expanded: boolean = false;
  selected: boolean = false;

  @Input() item!: SidenavItem;
  @Input()
  set opened(isSidenavOpen: boolean) {
    this.isSidenavOpen = isSidenavOpen
  }

  isSidenavOpen: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private navService: CurrentUrlRoutingService,
    ) { }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = this.selected = url.indexOf(`${this.item.route}`) === 0;
        this.cdr.detectChanges()
      }
    });
  }

  expandItemSubList() {
    if (this.item.children && this.item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  trackBy(index: number) {
    return index;
  }

}
