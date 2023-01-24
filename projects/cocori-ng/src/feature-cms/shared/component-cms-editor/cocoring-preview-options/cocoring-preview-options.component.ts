import { Component, OnInit } from '@angular/core';
import { BroadcastEventService } from 'cocori-ng/src/feature-core';
import { ConfigEvents } from 'cocori-ng/src/feature-form';

import { ResponsiveOrientation } from '../../../core/model/cms.model';

@Component({
  selector: 'cocoring-preview-options',
  templateUrl: './cocoring-preview-options.component.html',
  styleUrls: ['./cocoring-preview-options.component.scss']
})
export class CocoringPreviewOptionsComponent implements OnInit {

  responsive: string = 'computer'

  orientationComputer: ResponsiveOrientation = 'computer'
  orientationTabletLand: ResponsiveOrientation = 'tablet-land'
  orientationTabletPort: ResponsiveOrientation = 'tablet-port'
  orientationMobile: ResponsiveOrientation = 'mobile'

  constructor(
    private broadcastEventService: BroadcastEventService,
  ) { }

  ngOnInit(): void {
  }

  reset() {
    this.responsive = this.orientationComputer

    this.broadcastEventService.broadcast({ eventKeys: [ConfigEvents.CMS_RESPONSIVE_ORIENTATION_CHANGED], eventData: this.responsive })
  }

  onResponsiveChange($event) {
    this.broadcastEventService.broadcast({ eventKeys: [ConfigEvents.CMS_RESPONSIVE_ORIENTATION_CHANGED], eventData: $event })
  }
}
