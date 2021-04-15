import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms',
  templateUrl: './cocoring-cms.component.html',
  styleUrls: ['./cocoring-cms.component.scss']
})
export class CocoringCmsComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  responsive:string = 'computer'
  subscription: Subscription = new Subscription();
  activeMediaQuery = '';
  sidenavMode: string = 'side'
  isSidenavOpen: boolean = false;
  nbSections: number = 1;
  
  constructor(mediaObserver: MediaObserver,) {
    this.eventSizeScreen(mediaObserver);
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private eventSizeScreen(mediaObserver: MediaObserver) {
    this.subscription.add(
      mediaObserver.media$.subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

        if (change.mqAlias === 'xs') {
          this.sidenavMode = 'over';
        } else {
          this.sidenavMode = 'side';
        }
      })
    );
  }

  toggleSidenavBlocks() {
    this.sidenav.toggle()
    
    this.isSidenavOpen = this.sidenav.opened
  }

}
