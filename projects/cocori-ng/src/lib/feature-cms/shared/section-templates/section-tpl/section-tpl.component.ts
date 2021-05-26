import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'section-tpl',
  templateUrl: './section-tpl.component.html',
  styleUrls: []
})
export class SectionTplComponent implements OnInit {

  @Input() backgroundColor: string
  @Input() readOnly: boolean = false
  @Input() orientationWidth: string = '100%';
  @Input() flexWidth: string
  @Input() orientation: string = 'row'
  @Output() openBottomSheet: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
