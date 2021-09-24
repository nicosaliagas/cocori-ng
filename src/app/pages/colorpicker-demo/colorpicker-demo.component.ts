import { Component, Injector, OnInit } from '@angular/core';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

@Component({
  selector: 'colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html',
  styleUrls: ['./colorpicker-demo.component.scss']
})
export class ColorpickerDemoComponent extends ExtendPageComponent implements OnInit {

  constructor(public injector: Injector,) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Démo du composant Color-picker` })
  }

  onColorChange(color: string) {
    console.log("onColorChange>>>", color)
  }
}
