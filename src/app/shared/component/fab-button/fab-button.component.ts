import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent implements OnInit {

  @Input() icon!: string;

  @Input() 
  set setFontOutline(isOutline: boolean) {
    if(isOutline) this.fontset = 'material-icons-outlined'
  }
  @Output() callback = new EventEmitter<void>();
  
  fontset: string = 'material-icons';

  constructor() { }

  ngOnInit(): void { }

  onCallback() {
    this.callback.emit()
  }
}
