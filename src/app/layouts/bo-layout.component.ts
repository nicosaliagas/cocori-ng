import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentUrlRoutingService } from '@cocori-ng/lib';
import { AutoUnsubscribeComponent, StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, tap } from 'rxjs/operators';

import { SidenavItem } from '../core/model/Sidenav.model';
import { SidenavService } from '../core/service/sidenav.service';

@Component({
  selector: 'app-bo-layout',
  templateUrl: './bo-layout.component.html',
  styleUrls: ['./bo-layout.component.scss'],
  providers: [CurrentUrlRoutingService]
})
export class BoLayoutComponent extends AutoUnsubscribeComponent implements OnInit {
  @ViewChild('sidenavContent', { static: true, read: ElementRef }) sidenavContent: ElementRef;
  @ViewChild('sidenav', { static: true, read: MatSidenav }) sidenav!: MatSidenav;
  
  activeMediaQuery = '';

  menuItems: SidenavItem[] = [
    {
      label: 'Accueil', route: '/bo/home', icon: 'home'
    },
    {
      label: 'Démos', route: '/bo/demo', icon: 'engineering' , children: [
        { label: 'Form générique', route: '/bo/demo/generic-form' },
        { label: 'Form statique', route: '/bo/demo/static-form' },
        { label: 'Inputs chaînés', route: '/bo/demo/static-inputs-chained' },
        { label: 'Modal', route: '/bo/demo/modal-page' },
      ]
    },
    {
      label: 'Page CMS', route: '/bo/cms', icon: 'engineering' , children: [
        { label: 'Editeur', route: '/bo/cms/editor' },
        { label: 'Page test', route: '/bo/cms/preview/page-test' },
      ]
    },
    {
      label: 'Composants', route: '/bo/component', icon: 'engineering' , children: [
        { label: 'Grille', route: '/bo/component/grille' },
        { label: 'Upload', route: '/bo/component/upload' },
        { label: 'Wysiwyg', route: '/bo/component/wysiwyg' },
        { label: 'Color picker', route: '/bo/component/colorpicker' },
        { label: 'Toast / Snackbar', route: '/bo/component/toast' },
      ]
    },
    { label: "Liens externes", menuGroup: true },
    { label: 'Bitbucket', route: '', icon: 'engineering' , url: 'https://bitbucket.org/nicosaliagas/cocori-ng/src/develop/' },
    { label: 'Readme', route: '', icon: 'engineering' , url: 'https://bitbucket.org/nicosaliagas/cocori-ng/src/develop/README.md' },
  ];

  hidemobile: boolean = false;
  sidenavPosition: string = "side";
  isSidenavCloseDisabled = true;
  isSidenavOpen: boolean = true; /** linkedin */

  constructor(
    private storageService: StorageService,
    private navService: CurrentUrlRoutingService,
    private sidenavService: SidenavService,
    mediaObserver: MediaObserver,
    public elementRef: ElementRef,
    public router: Router,
  ) {
    super()

    this.sidenavContent = elementRef;

    this.isSidenavOpen = <boolean>this.storageService.getLocalStorageItem('sidenav')

    if (this.isSidenavOpen === null) this.isSidenavOpen = true

    /** au changement de route */
    this.subscriptions.add(
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

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  logout() {
    console.log("not implemented")
  }

  private eventSizeScreen(mediaObserver: MediaObserver) {
    this.subscriptions.add(
      mediaObserver.media$.subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

        if (change.mqAlias === 'xs') {
          this.sidenavPosition = 'over';
          this.isSidenavOpen = false;
        } else {
          this.sidenavPosition = 'side';
        }

        this.hidemobile = change.mqAlias === 'xs';
      })
    );
  }

  onOpenedChange(newSidenavStatut: boolean) {
    this.storageService.setLocalStorageItem('sidenav', newSidenavStatut)
  }

  trackBy(index: number) {
    return index;
  }
}
