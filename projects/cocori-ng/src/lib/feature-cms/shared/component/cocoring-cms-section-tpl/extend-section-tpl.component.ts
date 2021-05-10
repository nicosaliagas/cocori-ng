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
    BroadcastEventService,
    CocoringWysiwygComponent,
    ConfigEvents,
    FormHelperService,
    InitWysiwyg,
    InjectComponentService,
    WysiwygConfigSection,
} from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

import {
    BottomSheetSectionReturnAction,
    EditorValues,
    SectionModel,
    WysiwygSectionCmsModel,
} from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-tpl',
    template: '',
    host: { 'class': 'input-form' },
})

export abstract class ExtendSectionTplComponent implements OnDestroy {
    @Input() section: SectionModel
    @Input() wysiwyg: WysiwygSectionCmsModel

    private subscriptions: Subscription = new Subscription();
    private fb: FormBuilder;
    private _bottomSheet: MatBottomSheet;
    private cdr: any;
    public cmsService: CmsService;

    orientation: string = 'row'
    formulaire: FormGroup
    nbEditorView: number
    nameControl: string = 'editor'

    configsWysiwyg: WysiwygConfigSection[];
    subscription: Subscription = new Subscription();
    readOnly: boolean = true;
    value: any;
    formHelper: FormHelperService;
    injectComponentService: any;
    broadcastEventService: BroadcastEventService;

    constructor(injector: Injector) {
        this.injectComponentService = injector.get(InjectComponentService);
        this.fb = injector.get(FormBuilder);
        this._bottomSheet = injector.get(MatBottomSheet);
        this.cdr = injector.get(ChangeDetectorRef);
        this.cmsService = injector.get(CmsService);
        this.formHelper = injector.get(FormHelperService);
        this.broadcastEventService = injector.get(BroadcastEventService);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    init(nbEditorView: number) {
        this.nbEditorView = nbEditorView

        this.buildForm();

        this.catalogBlocksOpenedEvent()

        this.onBackgroundColorEvent()

        this.onOrientationChanged()
    }

    private onOrientationChanged() {
        this.subscription.add(
            this.broadcastEventService.listen([ConfigEvents.CMS_RESPONSIVE_ORIENTATION_CHANGED]).subscribe((screen: string) => {
                if (screen !== 'computer') {
                    this.orientation = 'column'
                } else {
                    this.orientation = 'row'
                }

                this.cdr.detectChanges()
            })
        )
    }

    private buildForm() {
        this.formulaire = this.fb.group({});
        this.configsWysiwyg = []

        for (let i = 1; i <= this.nbEditorView; i++) {
            const nameControl: string = `${this.nameControl}${i}`

            this.formulaire.addControl(nameControl, new FormControl(this.initSectionValue(nameControl)))

            this.configsWysiwyg[nameControl] = this.configComponent(nameControl)
        }

        this.saveSectionValues()

        this.onSectionValuesChanged()
    }

    /** ex valeur du formulaire : {editor1: "<h1>coucou</h1>", editor2: "<h1>hello</h1>"} */
    private onSectionValuesChanged() {
        this.subscription.add(
            this.formulaire.valueChanges.pipe(
                debounceTime(500),
                tap((values: any) => {
                    this.section.values = values
                })
            ).subscribe()
        )
    }

    private saveSectionValues() {
        this.section.values = this.formulaire.value
    }

    private initSectionValue(nameControl: string) {
        const blockContent: EditorValues = this.section.block.data.content

        const blockValue: string = blockContent?.hasOwnProperty(nameControl) ? blockContent[nameControl] : null
        const sectionValue: string = this.section.values?.hasOwnProperty(nameControl) ? this.section.values[nameControl] : null

        return sectionValue || blockValue
    }

    private configComponent(nameControl: string) {
        let config = {
            apiFile: this.wysiwyg.apiFile,
            apiFileDownload: this.wysiwyg.apiFileDownload,
            apiKey: this.wysiwyg.apiKey,
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
        this.subscription.add(
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

        this.cdr.detectChanges()
    }

    private onBackgroundColorEvent() {
        this.subscription.add(
            this.cmsService.backgroundColor$.pipe(
                filter((idSection: string) => idSection === this.section.idSection),
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

        this.subscription.add(
            bottomSheet.afterDismissed().subscribe((datas: BottomSheetSectionReturnAction) => {
                if (!datas) return;

                switch (datas.action) {
                    case 'remove':
                        this.cmsService.removeSection(this.section.idSection)

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
