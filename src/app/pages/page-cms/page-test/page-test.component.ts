import { Component, OnInit } from '@angular/core';
import { SectionModel } from '@cocori-ng/lib/src/lib/feature-cms';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core/core/service/storage.service';
import { CmsService } from 'src/app/core/service/Cms.service';

@Component({
  selector: 'page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  cmsPageSave: SectionModel[] = []

  constructor(
    private storageService: StorageService,
    private cmsService: CmsService,) { }

  ngOnInit() {
    this.cmsPageSave = this.cmsService.adapterQueryReadOnly(this.storageService.getLocalStorageItem('cms-page-save'))
  }
}
