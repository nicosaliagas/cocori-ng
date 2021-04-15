import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-toolbar-cms',
  templateUrl: './cocoring-toolbar-cms.component.html',
  styleUrls: ['./cocoring-toolbar-cms.component.scss']
})
export class CocoringToolbarCmsComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
}
