import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SidenavItem } from 'src/app/core/models/Sidenav.model';

export const animateExpandListItem =
  trigger('animateExpandListItem', [
    state('expanded', style({ opacity: 1 })),
    state('collapsed', style({ opacity: 0 })),
    transition('collapsed => expanded', animate('600ms')),
    transition('expanded => collapsed', animate('600ms')),
  ]);

@Component({
  selector: 'cocoring-sidenav-item',
  animations: [animateExpandListItem],
  templateUrl: './cocoring-sidenav-item.component.html',
  styleUrls: ['./cocoring-sidenav-item.component.scss']
})
export class CocoringSidenavItemComponent implements OnInit {
  expanded: boolean = false;

  @Input() item: SidenavItem;

  constructor() { }

  ngOnInit(): void {
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
