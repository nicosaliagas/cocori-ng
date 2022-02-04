import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-fullscreen-viewer',
  templateUrl: './page-fullscreen-viewer.component.html',
  styleUrls: ['./page-fullscreen-viewer.component.scss']
})
export class PageFullscreenViewerComponent implements OnInit, AfterViewInit {
  currentIndex: any = -1;
  showFlag: any = false;

  imageObject: Array<any> = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    title: 'Hummingbirds are amazing creatures'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  },
  /* {
    video: 'http://player.vimeo.com/video/67124108',
    posterImage: 'https://img.youtube.com/vi/tYa6OLQHrEc/hqdefault.jpg',
    title: 'Youtube example one with title.'
  } ,
  */
  {
    video: 'https://youtu.be/tYa6OLQHrEc',
    posterImage: 'https://img.youtube.com/vi/tYa6OLQHrEc/hqdefault.jpg',
    title: 'Youtube example one with title.'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    title: 'Most beautiful birds in the world flying.'
  }];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges()
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges()
  }

  showLightbox(index: any) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
