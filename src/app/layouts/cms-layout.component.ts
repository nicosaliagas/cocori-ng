import { Component, ElementRef, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentUrlRoutingService } from '@cocori-ng/lib';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { SidenavItem } from '../core/model/Sidenav.model';

@Component({
  selector: 'app-cms-layout',
  template: `
  <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
    <mat-sidenav-container class="layout-container" fullscreen>
      <mat-sidenav class="sidenav" #sidenav [disableClose]="isSidenavCloseDisabled" [mode]="sidenavPosition"
          position="start" [opened]="isSidenavOpen">
          <mat-nav-list>
              <cocoring-sidenav-item *ngFor="let item of menuItems; trackBy: trackBy" [item]="item">
              </cocoring-sidenav-item>
          </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content #sidenavContent>
          <div class="main">
              <router-outlet></router-outlet>
          </div>
      </mat-sidenav-content>
  </mat-sidenav-container>
`,
  styleUrls: ['./cms-layout.component.scss'],
  providers: [CurrentUrlRoutingService]
})
export class CmsLayoutComponent {
  @ViewChild('sidenavContent', { static: true, read: ElementRef })
  sidenavContent: ElementRef;

  activeMediaQuery = '';

  menuItems: SidenavItem[] = [
    {
      label: 'Accueil démos', route: '/lib-demo'
    },
    {
      label: 'Démos', route: '/demos', children: [
        { label: 'Form générique', route: '/demos/generic-form' },
        { label: 'Form statique', route: '/demos/static-form' },
        { label: 'Inputs chaînés', route: '/demos/static-inputs-chained' },
        { label: 'Modal', route: '/demos/modal-page' },
      ]
    },
    {
      label: 'Page CMS', route: '/page-cms', children: [
        { label: 'Editeur', route: '/page-cms/editor' },
        { label: 'Page test', route: '/page-cms/preview/page-test' },
      ]
    },
    {
      label: 'Composants', route: '/component', children: [
        { label: 'Grille', route: '/component/grille' },
        { label: 'Upload', route: '/component/upload' },
        { label: 'Wysiwyg', route: '/component/wysiwyg' },
        { label: 'Color picker', route: '/component/colorpicker' },
        { label: 'Toast / Snackbar', route: '/component/toast' },
      ]
    },
    { label: "Liens externes", menuGroup: true },
    { label: 'Bitbucket', route: '', url: 'https://bitbucket.org/nicosaliagas/cocori-ng/src/develop/' },
    { label: 'Readme', route: '', url: 'https://bitbucket.org/nicosaliagas/cocori-ng/src/develop/README.md' },
  ];

  subscription: Subscription = new Subscription();
  hidemobile: boolean = false;
  sidenavPosition: string = "side";
  isSidenavCloseDisabled = true;
  isSidenavOpen: boolean = true;

  constructor(
    private navService: CurrentUrlRoutingService,
    mediaObserver: MediaObserver,
    public elementRef: ElementRef,
    public router: Router,
  ) {
    this.sidenavContent = elementRef;

    /** au changement de route */
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          tap((event: any) => this.navService.currentUrl.next(event.urlAfterRedirects)),
          tap(_ => {
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
