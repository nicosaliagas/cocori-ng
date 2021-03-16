import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.scss']
})
export class InputIconComponent implements OnInit {
  @Input() icon: string = 'close'
  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitClickEvent() {
    this.clickEvent.emit(true);
  }

}
