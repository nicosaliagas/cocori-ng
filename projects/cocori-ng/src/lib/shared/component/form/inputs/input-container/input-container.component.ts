import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-container-ng',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent {
  @Input() templateRef: TemplateRef<any>;

  @Input() form: FormGroup;
  @Input() controlName: string;

  data: string = "SUPER MEGA COOL"

  constructor() {
  }
}
