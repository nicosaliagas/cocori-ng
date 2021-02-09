import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ToolbarItem } from './core/models/Toolbar.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenavContent', { static: true, read: ElementRef })
  sidenavContent: ElementRef;
  
  menuItems: ToolbarItem[] = [
    { label: 'Démos', linkTo: '/lib-demo' },
  ];

  subscription: Subscription = new Subscription();

  constructor(
    public elementRef: ElementRef,
    public router: Router,) {
      this.sidenavContent = elementRef;

    /** au changement de route */
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          tap(() => {
            setTimeout(() => {
              this.sidenavContent.nativeElement.scrollTo(0, 0);
            });
          })
        )
        .subscribe()
    );
    }

  trackBy(index: number) {
    return index;
  }
}
