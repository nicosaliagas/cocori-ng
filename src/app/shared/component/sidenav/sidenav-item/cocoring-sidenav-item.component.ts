import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { CurrentUrlRoutingService } from 'cocori-ng';
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
  styleUrls: ['./cocoring-sidenav-item.component.scss'],
  providers: [CurrentUrlRoutingService]
})
export class CocoringSidenavItemComponent implements OnInit {
  expanded: boolean = false;

  @Input() item: SidenavItem;

  constructor(private navService: CurrentUrlRoutingService) { }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        console.log(`Checking '${this.item.route}' against '${url}'`);
        
        this.expanded = url.indexOf(`${this.item.route}`) === 0;
        
        console.log(`${this.item.route} is expanded: ${this.expanded}`);
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
