import { Component, OnInit } from '@angular/core';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core/core/service/storage.service';

@Component({
  selector: 'page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  cmsPageSave: any[] = []

  constructor(private storageService: StorageService,) { }

  ngOnInit() {
    this.cmsPageSave = this.storageService.getLocalStorageItem('cms-page-save')

    console.log("Cms Page", this.cmsPageSave)
  }
}
