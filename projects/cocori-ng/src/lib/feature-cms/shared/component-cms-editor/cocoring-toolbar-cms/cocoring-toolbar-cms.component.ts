import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-toolbar-cms',
  templateUrl: './cocoring-toolbar-cms.component.html',
  styleUrls: ['./cocoring-toolbar-cms.component.scss']
})
export class CocoringToolbarCmsComponent implements OnInit {
  @Input() showSaveBtn: boolean = false;
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private cmsService: CmsService) { }

  ngOnInit(): void { }

  saveContentPage() {
    this.cmsService.onSaveCmsContent$.next(this.cmsService.sectionsPageDatas())

    // this.storageService.setLocalStorageItem('cms-page-save', this.cmsService.sectionsPageDatas())

    // console.log("pageExported", this.storageService.getLocalStorageItem('cms-page-save'))
  }
}
