import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BroadcastEventService, ConfigEvents } from '@cocori-ng/lib/src/lib/feature-core';

import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-toolbar-cms',
  templateUrl: './cocoring-toolbar-cms.component.html',
  styleUrls: ['./cocoring-toolbar-cms.component.scss']
})
export class CocoringToolbarCmsComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  responsive: string = 'computer'

  constructor(
    private cmsService: CmsService,
    private broadcastEventService: BroadcastEventService,) { }

  ngOnInit(): void {

  }

  saveContentPage() {
    this.cmsService.exportPage()
  }

  onResponsiveChange($event) {
    this.broadcastEventService.broadcast({ eventKeys: [ConfigEvents.CMS_RESPONSIVE_ORIENTATION_CHANGED], eventData: $event })
  }
}
