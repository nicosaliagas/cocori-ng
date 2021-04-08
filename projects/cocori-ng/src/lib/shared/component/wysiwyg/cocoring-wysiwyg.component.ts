import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';

import { configdefault } from '../../../config/config.components';
import {
  ConfigWysiwygModel,
  InitWysiwyg,
  PluginsAvailable,
  ToolbarOptions,
} from '../../../core/model/component-wysiwyg.model';
import { ExtendInputsComponent } from '../form/inputs/extend-inputs/extend-inputs.component';

// Doc composant TinyMCE - Angular
// https://www.tiny.cloud/docs/integrations/angular/#supportedangularversions

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-wysiwyg',
  templateUrl: './cocoring-wysiwyg.component.html',
  styleUrls: ['./cocoring-wysiwyg.component.scss']
})
export class CocoringWysiwygComponent extends ExtendInputsComponent implements OnInit {

  @Input() apiKey: string;
  @Input() height: number = 500;
  @Input() inline: boolean = false;
  @Input() menubar: boolean = true;

  @Input() plugins: PluginsAvailable[] = <PluginsAvailable[]>configdefault.wysiwyg.plugins;

  @Input() toolbar: string = configdefault.wysiwyg.toolbar;

  @Input()
  set config(config: ConfigWysiwygModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.apiKey = config.apiKey

    this.configInput(config)

    this.handleParamsWysiwyg(config.params)

    this.addControlForm();
  }

  private handleParamsWysiwyg(params: InitWysiwyg) {
    if (!params) return;

    this.height = params.height || this.height
    this.inline = params.inline || this.inline
    this.menubar = params.menubar || this.menubar
    this.plugins = params.plugins || this.plugins
    this.toolbar = params.toolbar ? this.toolbarOptionsToString(params.toolbar) : this.toolbar
  }

  constructor(
    injector: Injector,
    private cdr: ChangeDetectorRef) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGroup.get(this.nameControl).valueChanges.pipe(
      debounceTime(400),
      tap(_ => this.cdr.detectChanges()),
    ).subscribe()
  }

  toolbarOptionsToString(options: ToolbarOptions[][]) {
    return options.map((option: ToolbarOptions[]) => option.join(' ')).join('|')
  }

}
