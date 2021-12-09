import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';

import { ExtendPreviewActionsComponent } from '../extend-preview-actions.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'section-tpl',
  templateUrl: './section-tpl.component.html',
  styleUrls: []
})
export class SectionTplComponent extends ExtendPreviewActionsComponent implements OnInit {

  @Input() backgroundColor: string
  @Input() readOnly: boolean = false

  @Output() openBottomSheet: EventEmitter<void> = new EventEmitter<void>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void { }
}
