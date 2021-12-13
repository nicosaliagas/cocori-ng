import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ExtendSectionReadonlyTplComponent } from 'cocori-ng/src/feature-cms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-full-text-tpl',
  templateUrl: './image-full-text.component.html',
  styleUrls: ['./text-image-full.component.scss']
})
export class ImageFullTextReadonlyComponent extends ExtendSectionReadonlyTplComponent implements OnInit {
  apiFile: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)
  }
  browseFile(name) { }
}
