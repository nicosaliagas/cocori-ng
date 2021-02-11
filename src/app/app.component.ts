import { Component, ElementRef, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { SidenavItem } from './core/models/Sidenav.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenavContent', { static: true, read: ElementRef })
  sidenavContent: ElementRef;

  activeMediaQuery = '';

  menuItems: SidenavItem[] = [
    {
      label: 'Démos', children: [
        { label: 'Child 1', linkTo: '/lib-demo' },
        { label: 'Child 2', linkTo: '/lib-demo' },
      ]
    },
    { label: "Features", menuGroup: true },
    { label: 'Démos 1', linkTo: '/lib-demo', children: [] },
    { label: 'Démos 2', linkTo: '/lib-demo', children: [] },
  ];

  subscription: Subscription = new Subscription();
  hidemobile: boolean = false;
  sidenavPosition: string = "side";
  isSidenavCloseDisabled = true;
  isSidenavOpen: boolean = true;

  constructor(
    mediaObserver: MediaObserver,
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

    this.eventSizeScreen(mediaObserver);
  }

  private eventSizeScreen(mediaObserver: MediaObserver) {
    this.subscription.add(
      mediaObserver.media$.subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

        if (change.mqAlias === 'xs') {
          this.sidenavPosition = 'over';
          this.isSidenavOpen = false;
          this.isSidenavCloseDisabled = false;
        } else {
          this.sidenavPosition = 'side';
          this.isSidenavOpen = true;
          this.isSidenavCloseDisabled = true;
        }

        this.hidemobile = change.mqAlias === 'xs';
      })
    );
  }

  trackBy(index: number) {
    return index;
  }
}
