import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html',
  styleUrls: ['./colorpicker-demo.component.scss']
})
export class ColorpickerDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onColorChange(color: string) {
    console.log("onColorChange>>>", color)
  }
}
