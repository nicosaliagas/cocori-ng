import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Gallery, GalleryConfig, GalleryItem, GalleryRef, ImageItem, VideoItem, YoutubeItem } from 'ng-gallery';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-gallery',
  templateUrl: './page-gallery.component.html',
  styleUrls: ['./page-gallery.component.scss']
})
export class PageGalleryComponent implements OnInit, AfterViewInit {

  galleryRef: GalleryRef;
  items: GalleryItem[] = [];
  imageData = data;
  galleryId = 'myGallery'

  // https://github.com/MurhafSousli/ngx-gallery/wiki/Gallery-API#gallery-config-api
  config: GalleryConfig = {
    loop: true,
    dots: true,
    thumb: true
  };

  constructor(public gallery: Gallery) { }

  ngAfterViewInit() {
    this.galleryRef = this.gallery.ref(this.galleryId);
    this.galleryRef.setConfig(this.config)
  }

  ngOnInit() {
    // Create gallery items
    this.imageData.forEach((item) => {
      if (item.type === 'image') {
        this.items.push(new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }))
      } else if (item.type === 'youtube') {
        this.items.push(new YoutubeItem({ src: item.srcUrl }))
      } else if (item.type === 'video') {
        this.items.push(new VideoItem({ src: item.srcUrl, thumb: item.previewUrl, poster: item.previewUrl }))
      }
    })
    // this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
  }
}

const data = [
  {
    type: 'image',
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    type: 'image',
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  },
  {
    type: 'image',
    srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
  },
  {
    type: 'youtube',
    srcUrl: 'VBlFHuCzPgY'
  },
  {
    type: 'image',
    srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
  },
  {
    type: 'video',
    srcUrl: 'http://localhost:5050/assets/video/kickflip_1.mp4',
    previewUrl: 'http://localhost:5050/assets/img/firstTry.jpg'
  }
];