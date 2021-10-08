import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentUrlRoutingService } from '@cocori-ng/lib';
import { AutoUnsubscribeComponent, StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, tap } from 'rxjs/operators';

import { LoginApiService } from '../core/api/LoginApi.service';
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
      label: 'Démos', route: '/bo/demo', icon: 'engineering', children: [
        { label: 'Form générique', route: '/bo/demo/generic-form' },
        { label: 'Form statique', route: '/bo/demo/static-form' },
        { label: 'Inputs chaînés', route: '/bo/demo/static-inputs-chained' },
        { label: 'Modal', route: '/bo/demo/modal-page' },
      ]
    },
    {
      label: 'Page CMS', route: '/bo/cms', icon: 'engineering', children: [
        { label: 'Editeur', route: '/bo/cms/editor' },
        { label: 'Page test', route: '/bo/cms/preview/page-test' },
      ]
    },
    {
      label: 'Composants', route: '/bo/component', icon: 'engineering', children: [
        { label: 'Grille', route: '/bo/component/grille' },
        { label: 'Upload', route: '/bo/component/upload' },
        { label: 'Wysiwyg', route: '/bo/component/wysiwyg' },
        { label: 'Color picker', route: '/bo/component/colorpicker' },
        { label: 'Toast / Snackbar', route: '/bo/component/toast' },
      ]
    },
    { label: "Liens externes", menuGroup: true },
    { label: 'Bitbucket', route: '', icon: 'engineering', url: 'https://bitbucket.org/nicosaliagas/cocori-ng/src/develop/' },
    { label: 'Readme', route: '', icon: 'engineering', url: 'https://bitbucket.org/nicosaliagas/cocori-ng/src/develop/README.md' },
  ];

  hidemobile: boolean = false;
  sidenavPosition: string = "side";
  isSidenavCloseDisabled = true;
  isSidenavOpen: boolean = true; /** linkedin */
  isRootUrl: boolean = true;
  isRootUrlArray: string[] = [];

  constructor(
    private storageService: StorageService,
    private navService: CurrentUrlRoutingService,
    private loginApiService: LoginApiService,
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
          tap((event: any) => {

            this.isRootUrl = this.checkIsRootUrl(<string>event.url)

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
    this.loginApiService.logout()
  }

  onOpenedChange(newSidenavStatut: boolean) {
    this.storageService.setLocalStorageItem('sidenav', newSidenavStatut)
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

  trackBy(index: number) {
    return index;
  }

  private checkIsRootUrl(url: string): boolean {
    let urlFound: boolean = false;

    const urlAlreadyFound: number = this.isRootUrlArray.findIndex((urlFound: string) => urlFound === url)

    if (urlAlreadyFound !== -1 || url === '/') {
      return true
    }

    for (let i = 0; i < this.menuItems.length; i++) {
      const item: SidenavItem = this.menuItems[i];

      if (item.route === url) {
        urlFound = true;

        this.isRootUrlArray.push(url)

        break;
      } else if (item.children) {
        const routeFound: any = item.children.find((item: SidenavItem) => item.route === url)

        if (routeFound) {
          urlFound = true;

          this.isRootUrlArray.push(url)
          break;
        }
      }
    }

    return urlFound;
  }
}
