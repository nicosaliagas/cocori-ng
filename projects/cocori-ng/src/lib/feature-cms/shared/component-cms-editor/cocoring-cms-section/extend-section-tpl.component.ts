import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnDestroy,
    ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
    CocoringWysiwygComponent,
    FileModel,
    FormHelperService,
    InitWysiwyg,
    InjectComponentService,
    WysiwygConfigSection,
} from '@cocori-ng/lib/src/lib/feature-core';
import { debounceTime, filter, tap } from 'rxjs/operators';

import {
    ApisConfigCmsModel,
    BottomSheetSectionReturnAction,
    EditorValues,
    SectionModel,
} from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { ExtendPreviewActionsComponent } from '../../extend-preview-actions.component';
import { CocoringCmsImageUploadComponent } from '../cocoring-cms-image-upload/cocoring-cms-image-upload.component';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-tpl',
    template: '',
    host: { 'class': 'input-form' },
})

export abstract class ExtendSectionTplComponent extends ExtendPreviewActionsComponent implements OnDestroy {
    @Input() section: SectionModel
    @Input() apisConfig: ApisConfigCmsModel

    private fb: FormBuilder;
    private _bottomSheet: MatBottomSheet;
    public cdr: any;
    public cmsService: CmsService;

    formulaire: FormGroup
    nbEditorView: number
    nbBackgroundImage: number;

    nameControl: string = 'editor'
    backgroundImageControl: string = 'backgroundImage'
    backgroundImageUpload: FileModel
    uploadProgress: number;
    isUploading: boolean = false;

    configsWysiwyg: WysiwygConfigSection[];
    readOnly: boolean = false;
    value: any;
    formHelper: FormHelperService;
    injectComponentService: any;

    constructor(injector: Injector) {
        super(injector);

        this.injectComponentService = injector.get(InjectComponentService);
        this.fb = injector.get(FormBuilder);
        this._bottomSheet = injector.get(MatBottomSheet);
        this.cdr = injector.get(ChangeDetectorRef);
        this.cmsService = injector.get(CmsService);
        this.formHelper = injector.get(FormHelperService);
    }

    init(nbEditorView: number, nbBackgroundImage: number = 0) {
        this.nbEditorView = nbEditorView
        this.nbBackgroundImage = nbBackgroundImage

        this.buildForm();

        this.catalogBlocksOpenedEvent()

        this.onBackgroundColorEvent()
    }

    private buildForm() {
        this.formulaire = this.fb.group({});
        this.configsWysiwyg = []

        for (let i = 1; i <= this.nbEditorView; i++) {
            const nameControl: string = `${this.nameControl}${i}`

            this.formulaire.addControl(nameControl, new FormControl(this.initSectionValue(nameControl)))

            this.configsWysiwyg[nameControl] = this.configComponent(nameControl)
        }

        for (let i = 1; i <= this.nbBackgroundImage; i++) {
            const nameControl: string = `${this.backgroundImageControl}${i}`

            this.formulaire.addControl(nameControl, new FormControl(this.initSectionValue(nameControl)))
        }

        this.saveSectionValues()

        this.onSectionValuesChanged()
    }

    onBackgroundFileUploadedCallback(nameControl: string, apiFileUploaded: string,) {
        this.formulaire.get(nameControl).setValue(apiFileUploaded)
    }

    removeBackgroundFileCallback(nameControl: string) {
        this.formulaire.get(nameControl).reset()

        this.saveSectionValues()

        this.cdr.detectChanges()
    }

    /** ex valeur du formulaire : {editor1: "<h1>coucou</h1>", editor2: "<h1>hello</h1>"} */
    private onSectionValuesChanged() {
        this.subscriptions.add(
            this.formulaire.valueChanges.pipe(
                debounceTime(500),
                tap((values: any) => {
                    this.section.values = values

                    this.cdr.detectChanges()
                })
            ).subscribe()
        )
    }

    private saveSectionValues() {
        this.section.values = this.formulaire.value
    }

    private initSectionValue(nameControl: string) {
        const blockContent: EditorValues = this.section.values

        const blockValue: string = blockContent?.hasOwnProperty(nameControl) ? blockContent[nameControl] : null
        const sectionValue: string = this.section.values?.hasOwnProperty(nameControl) ? this.section.values[nameControl] : null

        return sectionValue || blockValue
    }

    private configComponent(nameControl: string) {
        let config = {
            apiFile: this.apisConfig.apiFile,
            apiFileDownload: this.apisConfig.apiFileDownload,
            apiKey: this.apisConfig.apiKey,
            params: <InitWysiwyg>{
                inline: true
            },
            nameLabel: '',
            formGroup: this.formulaire,
            nameControl: nameControl,
            validators: []
        }

        return config
    }

    private catalogBlocksOpenedEvent() {
        this.subscriptions.add(
            this.cmsService.catalogBlocksOpened$.pipe(
                tap((isOpened: boolean) => {
                    this.readOnly = isOpened

                    if (isOpened && this.formHelper.countControlsForm(this.formulaire) > 0) {
                        this.value = this.formulaire.value
                    }
                }),
                tap(_ => this.cdr.detectChanges())
            ).subscribe()
        )
    }

    /** @param : tableau des références où seront ajouter le composant Wysiwyg */
    public addWysiwygComponentToViewEvent(refs: ViewContainerRef[]) {
        for (let i = 1; i <= refs.length; i++) {
            const nameControl: string = `${this.nameControl}${i}`

            this.injectComponentService.loadAndAddComponentToContainer(CocoringWysiwygComponent, refs[i - 1],
                [{ config: this.configsWysiwyg[nameControl] }], null)
        }
    }

    public addImageUploadComponentToViewEvent(refs: ViewContainerRef[]) {
        for (let i = 1; i <= refs.length; i++) {
            const nameControl: string = `${this.backgroundImageControl}${i}`

            this.injectComponentService.loadAndAddComponentToContainer(CocoringCmsImageUploadComponent, refs[i - 1],
                [{ section: this.section, apisConfig: this.apisConfig, nameBackgroundImage: nameControl }],
                {
                    apiFileUploaded: (apiFile: string) => this.onBackgroundFileUploadedCallback(nameControl, apiFile),
                    removeBackgroundImage: () => this.removeBackgroundFileCallback(nameControl)
                })
        }
    }

    private onBackgroundColorEvent() {
        this.subscriptions.add(
            this.cmsService.backgroundColor$.pipe(
                filter((idSection: string) => idSection === this.section.id),
                tap(_ => this.cdr.detectChanges()),
            ).subscribe()
        )
    }

    openBottomSheet() {
        if (!this.readOnly) return;

        const bottomSheet = this._bottomSheet.open(CocoringCmsSectionActionsComponent, {
            panelClass: 'bottom-sheet-container',
            data: <any>{
                section: this.section,
            }
        });

        this.subscriptions.add(
            bottomSheet.afterDismissed().subscribe((datas: BottomSheetSectionReturnAction) => {
                if (!datas) return;

                switch (datas.action) {
                    case 'remove':
                        this.cmsService.removeSection(this.section.id)

                        break;

                    case 'duplicate':
                        this.cmsService.duplicateSection(this.section)

                        break;

                    case 'backgroundColor':
                        this.saveSectionBackgroundColor(datas.value)

                        break;

                    default:
                        break;
                }
            })
        )
    }

    private saveSectionBackgroundColor(color: string) {
        this.section.backgroundColor = color
    }
}
