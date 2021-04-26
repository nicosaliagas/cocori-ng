import { Component, ElementRef, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { SidenavItem } from './core/model/Sidenav.model';
import { EnvironmentService, IConfigEnvironment } from './core/service/environment.service';

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
      label: 'Accueil démos', route: '/lib-demo'
    },
    {
      label: 'Démos', route: '/demos', children: [
        { label: 'Form générique', route: '/demos/generic-form' },
        { label: 'Form statique', route: '/demos/static-form' },
        { label: 'Inputs chaînés', route: '/demos/static-inputs-chained' },
        { label: 'Modal', route: '/demos/modal-page' },
        { label: 'Page CMS', route: '/demos/page-cms' },
      ]
    },
    {
      label: 'Composants', route: '/component', children: [
        { label: 'Grille', route: '/component/grille' },
        { label: 'Upload', route: '/component/upload' },
        { label: 'Wysiwyg', route: '/component/wysiwyg' },
        { label: 'Color picker', route: '/component/colorpicker' },
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
    mediaObserver: MediaObserver,
    public elementRef: ElementRef,
    public router: Router,
    private environnement: EnvironmentService,
  ) {
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

    this.loadEnvironment()
  }

  private loadEnvironment() {
    environment.then((config: IConfigEnvironment) => {
      this.environnement.conf = config
    })
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
