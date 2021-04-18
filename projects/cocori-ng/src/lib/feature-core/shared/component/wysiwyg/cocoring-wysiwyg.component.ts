import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';

import { DefaultConfigComponent } from '../../../config/config.components';
import { ConfigAPIsFile, FileModel } from '../../../core/model/component-uploader.model';
import { ConfigWysiwygModel, InitWysiwyg, PluginsAvailable } from '../../../core/model/component-wysiwyg.model';
import { UploaderService } from '../../../core/service/uploader/uploader.service';
import { WysiwygService } from '../../../core/service/wysiwyg/wysiwyg.service';
import { ExtendInputsComponent } from '../form/inputs/extend-inputs/extend-inputs.component';

// Doc composant TinyMCE - Angular
// https://www.tiny.cloud/docs/integrations/angular/#supportedangularversions
// file : https://www.tiny.cloud/docs/demo/file-picker/

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-wysiwyg',
  templateUrl: './cocoring-wysiwyg.component.html',
  styleUrls: ['./cocoring-wysiwyg.component.scss'],
  providers: [WysiwygService]
})
export class CocoringWysiwygComponent extends ExtendInputsComponent implements OnInit {
  initParams: any
  editor: any
  apisFile: ConfigAPIsFile
  fileModel: FileModel = { fileName: null, description: null }

  @Input() apiKey: string;
  @Input() height: number = 500;
  @Input() inline: boolean = false;
  @Input() menubar: boolean = true;
  @Input() plugins: PluginsAvailable[] = <PluginsAvailable[]>DefaultConfigComponent.wysiwyg.plugins;
  @Input() toolbar: string = DefaultConfigComponent.wysiwyg.toolbar;
  callbackFileUplad: any;
  fileUploaded: File;
  uploadImageDialogInstance: any;


  @Input()
  set config(config: ConfigWysiwygModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.apiKey = config.apiKey

    this.apisFile = { apiFile: config.apiFile, apiFileDownload: config.apiFileDownload }

    this.configInput(config)

    this.handleParamsWysiwyg(config.params)

    this.addControlForm();
  }

  private handleParamsWysiwyg(params: InitWysiwyg) {
    if (!params) return;

    const height = params.height || this.height
    const inline = params.inline || this.inline
    const menubar = params.menubar || this.menubar
    const plugins = params.plugins || this.plugins
    const toolbar = params.toolbar ? this.wysiwygService.toolbarOptionsToString(params.toolbar) : this.toolbar

    this.initParams = {
      language: 'fr_FR',
      height: height,
      inline: inline,
      // menubar: menubar,
      menubar: false,
      // plugins: plugins,
      plugins: 'quickbars image imagetools',
      quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
      // toolbar: toolbar,
      toolbar: false,
      image_title: true,
      automatic_uploads: true,
      paste_data_images: true,
      setup: editor => {
        this.editor = editor;

        editor.on('OpenWindow', (eventDetails) => {
          this.uploadImageDialogInstance = eventDetails.dialog;
        });

        editor.on('init', () => { });

        editor.on('change', () => { });
      },
      file_picker_types: 'image',
      // https://www.tiny.cloud/docs/configure/file-image-upload/
      file_picker_callback: (cb, value, meta) => this.filePickerCallback(cb, value, meta)
    }
  }

  constructor(
    injector: Injector,
    private wysiwygService: WysiwygService,
    public uploaderService: UploaderService,
    private cdr: ChangeDetectorRef) {
    super(injector);
  }

  ngOnInit(): void {

    this.uploaderService.apisFile = this.apisFile

    this.onFileUploaded()

    this.onError()

    this.onValueEditorChanged()
  }

  private filePickerCallback(cb, value, meta) {
    this.callbackFileUplad = cb

    var input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = () => {
      this.uploadImageDialogInstance.block('Uploading file...');

      this.fileUploaded = input.files[0];

      this.fileModel.fileName = this.fileUploaded.name

      this.cdr.detectChanges()

      this.uploaderService.uploadFile(this.fileUploaded)
    }

    input.click();
  }

  private onFileUploaded() {
    this.subscriptions.add(
      this.uploaderService.fileUploaded$.pipe(
        tap((id: string) => this.validateFileValue(id)),
        tap(_ => this.uploadImageDialogInstance.unblock()),
      ).subscribe()
    )
  }
  private onError() {
    this.subscriptions.add(
      this.uploaderService.fileOnError$.pipe(
        tap(_ => this.uploadImageDialogInstance.unblock()),
        tap(_ => this.uploadImageDialogInstance.close()),
        tap(_ => {
          this.editor.notificationManager.open({
            text: 'Une erreur est survenue, veuillez réessayer',
            type: 'error'
          });
        }),
      ).subscribe()
    )
  }

  private onValueEditorChanged() {
    this.subscriptions.add(
      this.formGroup.get(this.nameControl).valueChanges.pipe(
        debounceTime(400),
        tap(_ => this.cdr.detectChanges()),
      ).subscribe()
    )
  }

  private validateFileValue(id: string) {
    this.fileModel.id = id

    this.callbackFileUplad(this.apisFile.apiFile(id), { title: this.fileModel.fileName });
  }
}
